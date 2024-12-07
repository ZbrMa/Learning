import { useEffect, useState } from "react";
import { Form } from "../../../../ui/components/form/form";
import { IFormConfig } from "../../../../types/form";
import { IUser } from "../../../../types/users";
import {
  useLoginMutation,
} from "../../../../api/userApiSlice";
import { Spinner } from "../../../../ui/components/spinner/spinner";
import { Button } from "../../../../ui/components/button/button";
import { VisitorLayout } from "../../../visitor/visitorLayout";
import "./login.css";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/userStore";
import { loginSuccess, logout } from "../../../../api/authSlice";
import { useSelector } from "react-redux";
import { Alert } from "../../../../ui/components/alert/alert";
import { BodyBlock } from "../../../../ui/blocks/bodyBlock/bodyBlock";
import { useAlert } from "../../../../context/alertContext";
import { useContext } from "react";
import { ModalContext } from "../../../../context/modalContext";
import { ForgotPassModal } from "../../../../ui/modals/forgotPassModal";

export function Login() {
  const [loginTrigger, { data, isLoading, isError }] = useLoginMutation();
  const token = useSelector((root: RootState) => root.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {showAlert} = useAlert();
  const {setModal} = useContext(ModalContext);

  const loginConfig: IFormConfig = {
    fields: [
      {
        name: "email",
        type: "email",
        label: "E-mail",
        validation: {
          required: true,
        },
      },
      {
        name: "password",
        type: "password",
        label: "Heslo",
        validation: {
          required: true,
        },
      },
    ],
    onSubmit: (data) => {
      const loginUser: {email:string,password:string} = {
        email: data["email"],
        password: data["password"],
      };
      loginTrigger(loginUser);
    },
  };

  useEffect(() => {
    if (data !== undefined) {
      if (typeof data === "string") {
        showAlert(<Alert type='negative'>Nesprávné přihlašovací údaje</Alert>)
        
      } else {
        const token = data.token;
        const expiryTime = new Date().getTime() + 30 * 60 * 1000;
        localStorage.setItem("authToken", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        localStorage.setItem("userData", JSON.stringify(data.user));
        dispatch(loginSuccess({ ...data.user, token,authChecked:true }));
        navigate(`/`);
      }
    }
  }, [data, dispatch, navigate]);

  return (
    <VisitorLayout>
      <BodyBlock style={{alignContent:'center',minHeight:'calc(100vh - 64px)'}}>
      {token ? (
        <div>
          <p>Již je někdo přihlášen</p>
          <Button
            variant="secondary"
            onClick={() => dispatch(logout())}
          >
            Odhlásit se
          </Button>
        </div>
      ) : (
        <div className="register__container"> 
          <h2 className="h-lg xbold mb-32">Vítej zpět!</h2>
          {isLoading && (
              <Spinner />
          )}
          <Form config={loginConfig} btnText="Přihlásit" className="mb-32"/>
          <div className="register__bottom pt-32">
            <div className="mb-16 flex content-space items-center">
            <p className="tx-sm">Zapomněl jsi heslo?</p>
              <Button
                variant="link"
                className="xbold"
                style={{ fontSize: "1rem", padding:'8px' }}
                onClick={() => setModal('forgotPassModal')}
              >
                Obnovit</Button>
            </div>
            <div className="flex content-space items-center">
            <p className="tx-sm">Ještě nemáš účet?</p>
            <Button
              variant="link"
              className="xbold"
              style={{ fontSize: "1rem", padding:'8px' }}
              onClick={() => navigate("/app/register")}
            >
              Zaregistrovat
            </Button>
            </div>
            
          </div>
        </div>
      )}
      </BodyBlock>
      <ForgotPassModal/>
    </VisitorLayout>
  );
}