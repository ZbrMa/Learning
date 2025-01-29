import { useResetPasswordMutation } from "../../api/userApiSlice";
import { IFieldConfig, IFormConfig } from "../../types/form";
import { Form } from "../components/form/form";
import { Modal } from "../components/modal/modal";
import { useAlert } from "../../context/alertContext";
import { Alert } from "../components/alert/alert";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";
import { Spinner } from "../components/spinner/spinner";
import { useTranslation } from "react-i18next";

const forgotPassFields:IFieldConfig[] = [
    {
        name:'email',
        label:'E-mail',
        type:'text',
        validation:{
            required:true,
        }
    },
]



export function ForgotPassModal(){
    const [sendPass,{isLoading}] = useResetPasswordMutation();
    const {showAlert} = useAlert();
    const {setModal} = useContext(ModalContext);

    const {t} = useTranslation("common");

    const forgotPassFormConfig:IFormConfig = {
        fields:forgotPassFields,
        onSubmit:async(data)=>{
            const response = await sendPass({
                email:data['email'],
            });

            if(response.error){
                showAlert(<Alert type="negative" title="Chyba serveru" >{t("errors.server")}</Alert>)
            } else if (response.data.success) {
                showAlert(<Alert type="positive" title="Email odeslán">{t("success.passReset")}</Alert>,3000);
                setModal(null);
            } else {
                showAlert(<Alert type="negative" title="Nesprávný email">{t("errors.email")}</Alert>,3000);
            }

        },
    }

    return(
        <Modal id="forgotPassModal" title="Zapomenuté heslo">
            {isLoading && (<Spinner/>)}
            <p className="tx-md tx-gray mb-32 mt-16">Po odeslání zkontroluj svůj email.</p>
            <Form config={forgotPassFormConfig} btnText="Odeslat" />
        </Modal>
        
    );
};