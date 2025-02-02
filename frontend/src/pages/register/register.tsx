import { Layout } from "../../ui/blocks/common/layout/layout";
import { Button } from "../../ui/components/button/button";
import "../login/login.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/reduxStore";
import { logout } from "../../api/authSlice";
import { useSelector } from "react-redux";
import { NewUser } from "./ui/newUser";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IconButton } from "../../ui/components/button/button";
import { IoHomeOutline } from "react-icons/io5";

export function Register() {
  const token = useSelector((root: RootState) => root.auth.token);
  const dispatch = useDispatch<AppDispatch>();

  const { t } = useTranslation("logReg");

  if (token) {
    return (
      <Layout
        button={
                  <Link to="/">
                    
                    <IconButton>
                      <IoHomeOutline/>
                    </IconButton>
                  </Link>
                }
        left={<div>ahoj</div>}
        right={
          
            <div className="m-auto w-fit h-full flex-col items-center content-center">
              <p className="mb-32">{t("register.alreadyLoggedIn")}</p>
              <Button
                variant="secondary"
                className="xbold tx-sm"
                onClick={() => dispatch(logout())}
              >
                {t("register.logout")}
              </Button>
            </div>
        }
      />
    );
  }

  return <NewUser />;
}
