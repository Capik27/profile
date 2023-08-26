import ImageItem from "5_shared/ui/ImageItem";
import { Props } from "./model";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SyntheticEvent, useState, useRef, useEffect } from "react";
import style from "./ImageForm.module.scss";
import { Reorder, AnimatePresence } from "framer-motion";
import {
	Image,
	FilesArray,
	ExportedFilesArray,
	TypedFile,
	TypedImage,
	previewNameT,
} from "5_shared/models";
import createImage from "5_shared/api/storage/createImage";
import useIsMounted from "5_shared/hooks/useIsMounted";

export const ImageForm: React.FC<Props> = ({ data, returnImages }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [items, setItems] = useState<Image[]>(data || []);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const filesRef = useRef<ExportedFilesArray>([]);

	function triggerEnd() {
		(inputRef.current as HTMLInputElement).value = "";
		(inputRef.current as HTMLInputElement).files = null;
	}

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleDeleteItem = (e: SyntheticEvent, item: Image) => {
		e.preventDefault();

		setItems((prev: any) =>
			prev.filter((i: Image, idx: number) => {
				if (i.id !== item.id) {
					return true;
				} else {
					filesRef.current.splice(idx, 1);
					return false;
				}
			})
		);
	};

	const handleClear = (e: SyntheticEvent) => {
		filesRef.current = [];
		setItems([]);
	};

	const handleChange = async (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;

		if (!target?.files?.length) return;

		setLoading(true);

		const promises: Promise<Image>[] = [];
		const files: File[] = Array.from(target?.files);
		const fileNames = filesRef.current.map((file) => file.name);

		if (!filesRef.current.length) {
			filesRef.current = [...files] as TypedFile[];
		} else {
			let hasNewFile = false;
			files.forEach((file: File, index: number) => {
				const uniqName = file.name;
				if (!fileNames.includes(uniqName)) {
					filesRef.current.push(file as TypedFile);
					if (!hasNewFile) {
						hasNewFile = true;
					}
				}
			});

			if (!hasNewFile) {
				setLoading(false);
				triggerEnd();
				return;
			}
		}

		for (let i = 0, l = files.length; i < l; i++) {
			if (!fileNames.includes(files[i].name)) {
				const promise = new Promise<Image>((resolve) => {
					const reader = new FileReader();

					reader.onload = (e: ProgressEvent) => {
						const fileTarget = e.target as FileReader;
						const base64res = fileTarget.result as ArrayBuffer;
						const imageObj = createImage(files[i], base64res);
						resolve(imageObj);
					};
					reader.readAsDataURL(files[i]);
				});
				promises.push(promise);
			}
		}

		await Promise.all(promises).then((result) => {
			setItems((prev: any) => {
				const merged: Image[] = [...prev, ...result];

				// получение неповторяющихся items
				const names: previewNameT[] = Array.from(
					new Set(merged.map((item) => item.name))
				);

				const uniqFiles = merged.filter((item: Image) => {
					if (names.includes(item.name)) {
						names.splice(names.indexOf(item.name), 1);
						return true;
					} else {
						return false;
					}
				});

				return uniqFiles;
			});
			setLoading(false);
		});

		triggerEnd();
	};

	useEffect(() => {
		if (isMounted() && !!returnImages) {
			// console.log("upd files", data?.length, filesRef.current);
			returnImages(filesRef.current as FilesArray);
		}
	}, [items]);

	useEffect(() => {
		if (data) {
			if (!isMounted()) {
				filesRef.current = [...data] as TypedImage[];
			}
			if (data.length === 0) {
				setItems([]);
			}
		}
	}, [data]);

	const isMounted = useIsMounted();

	//////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////

	const takenItem = useRef<Image>();

	function dragHandlerStart(e: SyntheticEvent, item: Image) {
		takenItem.current = item;
	}
	function dragHandlerLeave(e: SyntheticEvent) {
		(e.target as HTMLElement)
			.closest("[data-item]")
			?.classList.remove(style.over);
	}
	function dragHandlerOver(e: SyntheticEvent, item: Image) {
		e.preventDefault();
		if (item.id === takenItem.current?.id) return;
		(e.target as HTMLElement).closest("[data-item]")?.classList.add(style.over);
	}
	function dragHandlerEnd(e: SyntheticEvent) {
		(e.target as HTMLElement)
			.closest("[data-item]")
			?.classList.remove(style.over);
	}
	function dragHandlerDrop(e: SyntheticEvent, item: Image) {
		e.preventDefault();
		(e.target as HTMLElement)
			.closest("[data-item]")
			?.classList.remove(style.over);
		if (item.id === takenItem.current?.id) return;

		const takedIndex = items.indexOf(takenItem.current as Image);
		const dropIndex = items.indexOf(item);

		const newItems = [...items];
		newItems[takedIndex] = item;
		newItems[dropIndex] = takenItem.current as Image;

		const refTakenItem = filesRef.current[takedIndex];
		filesRef.current[takedIndex] = filesRef.current[dropIndex];
		filesRef.current[dropIndex] = refTakenItem;

		setItems(newItems);
	}

	console.log("IMAGE FORM RENDER ");

	return (
		<form>
			<Box className={style.controls}>
				<LoadingButton
					variant="outlined"
					loading={loading}
					onClick={handleClick}
				>
					Select Images
					<input
						ref={inputRef}
						onChange={handleChange}
						type="file"
						accept=".png, .jpg, .jpeg"
						multiple
						hidden
					/>
				</LoadingButton>
				{items?.length > 0 && (
					<LoadingButton
						loading={loading}
						variant="contained"
						color="error"
						onClick={handleClear}
					>
						Delete Images
					</LoadingButton>
				)}
			</Box>

			<Box className={style.list}>
				{items?.map((item) => (
					<div
						data-item
						key={item.id}
						className={style.item}
						onDragStart={(e: SyntheticEvent) => dragHandlerStart(e, item)}
						onDragLeave={(e: SyntheticEvent) => dragHandlerLeave(e)}
						onDragOver={(e: SyntheticEvent) => dragHandlerOver(e, item)}
						onDragEnd={(e: SyntheticEvent) => dragHandlerEnd(e)}
						onDrop={(e: SyntheticEvent) => dragHandlerDrop(e, item)}
						draggable={true}
					>
						<ImageItem image={item} onClose={handleDeleteItem} />
					</div>
				))}
			</Box>
		</form>
	);
};

// <Box className={style.list}>
// 				{items?.map((item) => (
// 					<div
// 						data-item
// 						key={item.id}
// 						className={style.item}
// 						onDragStart={(e: SyntheticEvent) => dragHandlerStart(e, item)}
// 						onDragLeave={(e: SyntheticEvent) => dragHandlerLeave(e)}
// 						onDragOver={(e: SyntheticEvent) => dragHandlerOver(e, item)}
// 						onDragEnd={(e: SyntheticEvent) => dragHandlerEnd(e)}
// 						onDrop={(e: SyntheticEvent) => dragHandlerDrop(e, item)}
// 						draggable={true}
// 					>
// 						<ImageItem image={item} onClose={handleDeleteItem} />
// 					</div>
// 				))}
// 			</Box>

{
	/* <Reorder.Group
				axis="x"
				values={items}
				onReorder={setItems}
				className={style.list}
			>
				<AnimatePresence>
					{items?.map((item) => (
						<Reorder.Item
							key={item.id}
							id={item.id}
							value={item}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							whileDrag={{ scale: 1.1 }}
							className={style.item}
						>
							<ImageItem image={item} onClose={handleDeleteItem} />
						</Reorder.Item>
					))}
				</AnimatePresence>
			</Reorder.Group> */
}
