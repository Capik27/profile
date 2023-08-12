import Editor from "3_widgets/Editor";

const data = {
	id: 23,
	title: "",
	description: "description",
	previewUrls: ["previewURL"],
	previewNames: ["previewName"],
	createdAt: new Date(),
};

const CreatePage: React.FC = () => {
	return (
		<>
			<Editor data={data} />
		</>
	);
};

export default CreatePage;
