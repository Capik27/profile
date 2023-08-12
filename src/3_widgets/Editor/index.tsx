import { Props } from "./model";
import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useRef, useState } from "react";
import TextInput from "4_features/TextInput";
import ImageForm from "4_features/ImageForm";
import uploadPost from "5_shared/api/firestore/uploadPost";

const Editor: React.FC<Props> = ({ data }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [files, setFiles] = useState(data?.previewUrls || []);
	const titleRef = useRef<null | HTMLInputElement>();
	const contentRef = useRef<null | HTMLInputElement>();

	const handleSubmit = async () => {
		const title = titleRef.current?.value ?? "";
		const desc = contentRef.current?.value ?? "";
		setLoading(true);
		uploadPost(title, desc, files);
		setLoading(false);

		// console.log("title", title);
		// console.log("content", desc);
		// setTimeout(() => setLoading(false), 2000);
	};

	console.log("Editor RENDER");

	return (
		<Box style={{ display: "grid", justifyItems: "start" }}>
			<TextInput
				label="Title"
				value={data?.title}
				inputRef={titleRef}
				size="small"
				margin="dense"
			/>
			<TextInput
				label="Content"
				value={data?.description}
				inputRef={contentRef}
				multiline
				rows={3}
				fullWidth
				size="small"
				margin="dense"
			/>
			<ImageForm data={data?.previewUrls} returnImages={setFiles} />
			<LoadingButton
				variant="contained"
				loading={loading}
				onClick={handleSubmit}
				style={{ justifySelf: "end" }}
			>
				Submit
			</LoadingButton>
		</Box>
	);
};

export default Editor;
