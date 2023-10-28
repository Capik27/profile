import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./NavBar.module.scss";
import {
  MAIN_ROUTE,
  ABOUT_ROUTE,
  CONTACTS_ROUTE,
  CREATE_ROUTE,
} from "5_shared/router/paths";
import useAdmin from "5_shared/hooks/useAdmin";
import { useDispatch } from "react-redux";
import { setAdminMode } from "5_shared/store/adminSlice";
import { useState } from "react";
import LoginModal from "4_features/LoginModal";

export const NavBar: React.FC = () => {
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = useAdmin();

  const handleShow = () => {
    setModalShow(true);
  };
  const handleHide = () => {
    setModalShow(false);
  };

  const handleExit = () => {
    dispatch(setAdminMode(false));
    if (
      location.pathname !== MAIN_ROUTE &&
      location.pathname !== ABOUT_ROUTE &&
      location.pathname !== CONTACTS_ROUTE
    ) {
      navigate(MAIN_ROUTE);
    }
  };

  return (
    <header className={style.navbar_wrapper}>
      <Box className={style.navbar}>
        <h2 className={style.title}>Konstantin Shikhov Page</h2>

        <Box className={style.links}>
          <Link to={MAIN_ROUTE} className={style.links_item}>
            <Button variant="outlined" color="primary" fullWidth>
              Home
            </Button>
          </Link>

          <Link to={ABOUT_ROUTE} className={style.links_item}>
            <Button variant="outlined" fullWidth>
              About
            </Button>
          </Link>
          <Link to={CONTACTS_ROUTE} className={style.links_item}>
            <Button variant="outlined" fullWidth>
              Contacts
            </Button>
          </Link>

          {isAdmin && (
            <>
              <Link to={CREATE_ROUTE} className={style.links_item}>
                <Button variant="contained" color="secondary" fullWidth>
                  Create
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={handleExit}
                className={style.links_item}
              >
                Exit
              </Button>
            </>
          )}
          {!isAdmin && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleShow}
              className={style.links_item}
            >
              Admin
            </Button>
          )}
        </Box>
      </Box>

      <Box className={style.navbar_mobile}>
        <Box className={style.title_wrapper}>
          <h2 className={style.title}>ShikhovKS Page</h2>
        </Box>

        <Box className={style.links}>
          <Link to={ABOUT_ROUTE} className={style.links_item}>
            <Button variant="outlined" fullWidth>
              About
            </Button>
          </Link>
          <Link to={CONTACTS_ROUTE} className={style.links_item}>
            <Button variant="outlined" fullWidth>
              Contacts
            </Button>
          </Link>
        </Box>

        <Box className={isAdmin ? style.links_3x : style.links}>
          <Link to={MAIN_ROUTE} className={style.links_item}>
            <Button variant="outlined" color="primary" fullWidth>
              Home
            </Button>
          </Link>
          {isAdmin && (
            <>
              <Link to={CREATE_ROUTE} className={style.links_item}>
                <Button variant="contained" color="secondary" fullWidth>
                  Create
                </Button>
              </Link>
              <Button
                variant="outlined"
                color="error"
                onClick={handleExit}
                className={style.links_item}
              >
                Exit
              </Button>
            </>
          )}
          {!isAdmin && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleShow}
              className={style.links_item}
            >
              Admin
            </Button>
          )}
        </Box>
      </Box>

      <LoginModal show={modalShow} onClose={handleHide} />
    </header>
  );
};
