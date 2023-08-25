import { Props } from "./model";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SyntheticEvent, useRef, useState, useEffect, memo } from "react";
import TextInput from "4_features/TextInput";
import ImageForm from "4_features/ImageForm";
import uploadPost from "5_shared/api/firestore/uploadPost";
import { FilesArray, Image, previewNameT } from "5_shared/models";
import { changedData } from "5_shared/api/firestore/changePost/model";
import changePost from "5_shared/api/firestore/changePost";

const Editor: React.FC<Props> = ({ data }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [files, setFiles] = useState<FilesArray | Image[]>(data?.images || []);
	const [title, setTitle] = useState<string>(data?.title || "");
	const [content, setContent] = useState<string>(data?.description || "");

	const handleTitleChange = (e: SyntheticEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setTitle(value);
	};
	const handleContentChange = (e: SyntheticEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setContent(value);
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (data) {
			// change
			const changedData: changedData = {
				orderedFiles: files,
				delete: [],
			};

			console.log("changedData", changedData);

			const onlyNewFiles: File[] = files.filter(
				(item: File | Image) => item instanceof File
			) as File[];

			if (onlyNewFiles.length) {
				// const dataFileNames: previewNameT[] = data.images.map(
				// 	(item: File | Image) => item.name
				// );
				const newFileNames: previewNameT[] = files.map(
					(item: File | Image) => item.name
				);
				// add new files
				// onlyNewFiles.forEach((item: File) => {
				// 	if (!dataFileNames.includes(item.name)) {
				// 		changedData.add.push(item);
				// 	}
				// });
				// delete files
				data.images.forEach((item: Image) => {
					if (!newFileNames.includes(item.name)) {
						changedData.delete.push(item.name);
					}
				});
			} else {
				// no new files
				// let orderChanged = false;
				for (let i = 0; i < data.images.length; i++) {
					if (data.images[i].name !== files[i].name) {
						console.log("ORDER CHANGED", changedData.orderedFiles);
						await changePost(data, title, content, changedData);
						break;
					}
				}
				setLoading(false);
				return;
				// if (orderChanged) {
				// 	// true
				// }
			}
			console.log("changedData end", changedData);
			await changePost(data, title, content, changedData);
		} else {
			//create
			await uploadPost(title, content, files);
			setTitle("");
			setContent("");
			setFiles([]);
		}

		setLoading(false);
	};

	console.log("Editor RENDER");

	return (
		<Box style={{ display: "grid", justifyItems: "start" }}>
			<TextInput
				label="Title"
				value={title}
				onChange={handleTitleChange}
				size="small"
				margin="dense"
			/>
			<TextInput
				label="Content"
				value={content}
				onChange={handleContentChange}
				multiline
				rows={3}
				fullWidth
				size="small"
				margin="dense"
			/>
			<ImageForm data={files as Image[]} returnImages={setFiles} />
			<LoadingButton
				variant="contained"
				loading={loading}
				disabled={loading || !title || !content || !files.length}
				onClick={handleSubmit}
				style={{ justifySelf: "end" }}
			>
				Submit
			</LoadingButton>
		</Box>
	);
};

export default Editor;
