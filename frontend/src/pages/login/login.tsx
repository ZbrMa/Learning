import { useEffect } from "react";
import { Form } from "../../ui/components/form/form";
import { IFormConfig } from "../../types/form";
import { useLoginMutation } from "../../api/userApiSlice";
import { Spinner } from "../../ui/components/spinner/spinner";
import { Button, IconButton } from "../../ui/components/button/button";
import { Layout } from "../../ui/blocks/common/layout/layout";
import "./login.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/reduxStore";
import { loginSuccess, logout } from "../../api/authSlice";
import { useSelector } from "react-redux";
import { Alert } from "../../ui/components/alert/alert";
import { useAlert } from "../../context/alertContext";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { ForgotPassModal } from "../../ui/modals/forgotPassModal";
import { useTranslation } from "react-i18next";
import { setLang } from "../../redux/languageSlice";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export function Login() {
  const [loginTrigger, { data, isLoading }] = useLoginMutation();
  const token = useSelector((root: RootState) => root.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useAlert();
  const { setModal } = useContext(ModalContext);
  const { t } = useTranslation("logReg");

  const loginConfig: IFormConfig = {
    fields: [
      {
        name: "email",
        type: "email",
        label: t("login.email"),
        validation: {
          required: true,
        },
      },
      {
        name: "password",
        type: "password",
        label: t("login.password"),
        validation: {
          required: true,
        },
      },
    ],
    onSubmit: (data) => {
      const loginUser: { email: string; password: string } = {
        email: data["email"],
        password: data["password"],
      };
      loginTrigger(loginUser);
    },
  };

  useEffect(() => {
    if (data !== undefined) {
      if (typeof data === "string") {
        showAlert(
          <Alert type="negative">{t("login.incorrectCredentials")}</Alert>
        );
      } else {
        const token = data.token;
        const expiryTime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem("authToken", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        dispatch(loginSuccess({ ...data.user, token, authChecked: true }));

        if (data.user.lang) {
          dispatch(setLang(data.user.lang));
        }

        navigate(`/app/home`);
      }
    }
  }, [data, dispatch, navigate, showAlert, t]);

  return (
    <>
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
          token ? (
            <div>
              <p>{t("login.alreadyLoggedIn")}</p>
              <Button variant="secondary" onClick={() => dispatch(logout())}>
                {t("login.logout")}
              </Button>
            </div>
          ) : (
            <div className="register__container">
              <h2 className="h-lg xbold mb-32">{t("login.welcomeBack")}</h2>
              {isLoading && <Spinner />}
              <Form
                config={loginConfig}
                btnText={t("login.btnLogin")}
                className="mb-32"
                checkList={false}
              />
              <div className="register__bottom pt-32">
                <div className="mb-16 flex content-space items-center">
                  <p className="tx-sm">{t("login.forgotPassword")}</p>
                  <Button
                    variant="link"
                    className="xbold"
                    style={{ fontSize: "1rem", padding: "8px" }}
                    onClick={() => setModal("forgotPassModal")}
                  >
                    {t("login.resetPassword")}
                  </Button>
                </div>
                <div className="flex content-space items-center">
                  <p className="tx-sm">{t("login.registerAccount")}</p>
                  <Button
                    variant="link"
                    className="xbold"
                    style={{ fontSize: "1rem", padding: "8px" }}
                    onClick={() => navigate("/register")}
                  >
                    {t("login.register")}
                  </Button>
                </div>
              </div>
            </div>
          )
        }
      />
      <ForgotPassModal />
    </>
  );
}
