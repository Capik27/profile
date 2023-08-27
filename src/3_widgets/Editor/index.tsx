import { CONFIRM_DELAY, Props } from "./model";
import { Alert, Box, Snackbar } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { SyntheticEvent, useRef, useState, useEffect, memo } from "react";
import TextInput from "4_features/TextInput";
import ImageForm from "4_features/ImageForm";
import uploadPost from "5_shared/api/firestore/uploadPost";
import { Portal } from "@mui/base";
import { FilesArray, Image, previewNameT } from "5_shared/models";
import { changedData } from "5_shared/api/firestore/changePost/model";
import changePost from "5_shared/api/firestore/changePost";
import deletePost from "5_shared/api/firestore/deletePost";
import { setUpdate } from "5_shared/store/postsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MAIN_ROUTE } from "5_shared/router/paths";

const Editor: React.FC<Props> = ({ data }) => {
	const [alert, setAlert] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [del, setDel] = useState<number>(0);
	const currentData = useRef<FilesArray | Image[]>(data?.images || []);
	const [files, setFiles] = useState<FilesArray | Image[]>(data?.images || []);
	const [title, setTitle] = useState<string>(data?.title || "");
	const [content, setContent] = useState<string>(data?.description || "");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleTitleChange = (e: SyntheticEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setTitle(value);
	};
	const handleContentChange = (e: SyntheticEvent) => {
		const value = (e.target as HTMLInputElement).value;
		setContent(value);
	};
	const handleAlertClose = () => {
		setAlert(false);
	};
	const getAlertMsg = () => {
		let result;
		const msg = `Post '${title}' successfully`;
		if (del) {
			result = msg + " deleted";
		} else {
			result = data ? msg + " modified" : msg + " created";
		}
		return result;
	};

	const handleDeletePost = () => {
		if (del) {
			setLoading(true);
			deletePost(data?.id, currentData.current);
			dispatch(setUpdate(true));
			const timer = setTimeout(() => {
				clearTimeout(timer);
				setAlert(true);
				setLoading(false);
				setDel(0);
				navigate(MAIN_ROUTE);
			}, 1000);
		} else {
			setDel(CONFIRM_DELAY);
		}
	};

	const handleSubmit = async () => {
		setLoading(true);

		if (data) {
			// change
			const changedData: changedData = {
				orderedFiles: files,
				delete: [],
			};

			const newFileNames: previewNameT[] = files.map(
				(item: File | Image) => item.name
			);

			currentData.current.forEach((item: Image | File) => {
				if (!newFileNames.includes(item.name)) {
					changedData.delete.push(item.name);
				}
			});
			currentData.current = [...files];

			await changePost(data, title, content, changedData);
		} else {
			//create
			await uploadPost(title, content, files);

			setTitle("");
			setContent("");
			setFiles([]);
		}
		setAlert(true);
		setLoading(false);
		dispatch(setUpdate(true));
		navigate(MAIN_ROUTE);
	};

	useEffect(() => {
		if (del > 0) {
			const timer = setTimeout(() => {
				setDel((prev) => prev - 1);
				clearTimeout(timer);
			}, 1000);
		}
	}, [del]);

	return (
		<>
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
					minRows={3}
					fullWidth
					size="small"
					margin="dense"
				/>
				<ImageForm data={files as Image[]} returnImages={setFiles} />
				<Box style={{ display: "flex", justifySelf: "end", gap: 8 }}>
					{data && (
						<LoadingButton
							sx={{ width: 150, minWidth: 50 }}
							variant="contained"
							color={del ? "warning" : "error"}
							loading={loading && !!del}
							disabled={loading}
							onClick={handleDeletePost}
						>
							{del ? `Confirm? ${del}` : "Delete post"}
						</LoadingButton>
					)}
					<LoadingButton
						variant="contained"
						loading={loading}
						disabled={!!del || loading || !title || !content || !files.length}
						onClick={handleSubmit}
					>
						Submit
					</LoadingButton>
				</Box>
			</Box>
			<Portal>
				<Snackbar
					open={alert}
					autoHideDuration={3000}
					onClose={handleAlertClose}
					anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
				>
					<Alert
						onClose={handleAlertClose}
						severity="success"
						sx={{
							backgroundColor: "greenligth",
							border: "1px solid #00000050",
						}}
					>
						{getAlertMsg()}
					</Alert>
				</Snackbar>
			</Portal>
		</>
	);
};

export default Editor;
