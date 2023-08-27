export type Props = {
	show?: boolean;
	onClose?: () => void;
};

export const ADMIN_KEY: string | undefined =
	process.env.REACT_APP_adminPassword;
