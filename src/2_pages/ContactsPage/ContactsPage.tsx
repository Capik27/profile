import Editor from "3_widgets/Editor";
// import NotFound from "4_features/NotFound/NotFound";
import useFindPost from "5_shared/hooks/useFindPost";
import { ERROR_ROUTE } from "5_shared/router/paths";
import { Navigate, useParams } from "react-router-dom";
import style from "./ContactsPage.module.scss";
import TelegramIcon from "@mui/icons-material/Telegram";
import EmailIcon from "@mui/icons-material/Email";

export const ContactsPage: React.FC = () => {
    return (
        <>
            <h1 className={style.title}>Contacts</h1>
            <div className={style.links_container}>
                <a href="mailto:ShikhovKS@gmail.com" className={style.link}>
                    <EmailIcon className={style.icon} />
                </a>
                <a
                    href="https://telegram.me/Kaplan31"
                    target="_black"
                    className={style.link}
                >
                    <TelegramIcon className={style.icon} />
                </a>
            </div>
        </>
    );
};
