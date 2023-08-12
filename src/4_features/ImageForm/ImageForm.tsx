import ImageItem from "5_shared/ui/ImageItem";
import { Props } from "./model";
import { Button, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SyntheticEvent, useState, useRef, useEffect } from "react";
import style from "./ImageForm.module.scss";
import { PreviewArray, previewURLT } from "5_shared/models";

export const ImageForm: React.FC<Props> = ({ data, returnImages }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [items, setItems] = useState(data || []);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleClick = () => {
		inputRef.current?.click();
	};

	const handleDelete = (e: SyntheticEvent, item: ArrayBuffer | previewURLT) => {
		e.preventDefault();

		setItems((prev: any) =>
			prev.filter((i: ArrayBuffer | previewURLT) => i !== item)
		);
	};

	const handleClear = (e: SyntheticEvent) => {
		setItems([]);
	};

	const handleChange = (e: SyntheticEvent) => {
		const target = e.target as HTMLInputElement;
		if (!target?.files?.length) return;

		setLoading(true);

		const promises: Promise<ArrayBuffer>[] = [];
		const files = Array.from(target?.files);

		// file.name

		for (let i = 0, l = files.length; i < l; i++) {
			const promise = new Promise<ArrayBuffer>((resolve) => {
				const reader = new FileReader();
				reader.onload = (e: ProgressEvent) => {
					const fileTarget = e.target as FileReader;
					const base64res = fileTarget.result as ArrayBuffer;
					resolve(base64res);
				};
				reader.readAsDataURL(files[i]);
			});
			promises.push(promise);
		}

		Promise.all(promises).then((result) => {
			setItems((prev: any) => {
				const uniqSet = new Set([...prev, ...result]);
				const uniqFiles = Array.from(uniqSet);
				return uniqFiles;
			});
			setLoading(false);
		});
	};

	useEffect(() => {
		if (items.length && !!returnImages) {
			console.log("upd images");
			returnImages(items as any);
		}
	}, [items]);

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
				{items.length > 0 && (
					<Button variant="contained" color="error" onClick={handleClear}>
						Delete Images
					</Button>
				)}
			</Box>

			<Box className={style.list}>
				{items.map((item) => (
					<ImageItem data={item} key={String(item)} onClose={handleDelete} />
				))}
			</Box>
		</form>
	);
};
