import { Props } from "./model";
import style from "./Layout.module.scss";

export const Layout: React.FC<Props> = ({ children }) => {
	return <div className={style.container}>{children}</div>;
};
