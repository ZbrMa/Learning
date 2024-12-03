import { useSelector } from "react-redux";
import { useForgotPasswordMutation } from "../../api/userApiSlice";
import { IFieldConfig, IFormConfig } from "../../types/form";
import { Form } from "../components/form/form";
import { RootState } from "../../store/userStore";
import { Modal } from "../components/modal/modal";
import { useAlert } from "../../context/alertContext";
import { Alert } from "../components/alert/alert";
import { useContext } from "react";
import { ModalContext } from "../../context/modalContext";

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
    const [sendPass,{data,isLoading,error}] = useForgotPasswordMutation();
    const {showAlert} = useAlert();
    const {setModal} = useContext(ModalContext);

    const forgotPassFormConfig:IFormConfig = {
        fields:forgotPassFields,
        onSubmit:async(data)=>{
            const response = await sendPass({
                email:data['email'],
            });

            if(response.error){
                showAlert(<Alert type="negative" title="Chyba serveru" >Nastala chyba. Zkus to později.</Alert>)
            } else if (response.data.success) {
                showAlert(<Alert type="positive" title="Email odeslán">{response.data.message}</Alert>,3000);
                setModal(null);
            } else {
                showAlert(<Alert type="negative" title="Nesprávný email">{response.data.message}</Alert>,3000);
            }

        },
    }

    return(
        <Modal id="forgotPassModal" title="Zapomenuté heslo">
            <p className="tx-md tx-gray mb-16">Po odeslání zkontroluj svůj email.</p>
            <Form config={forgotPassFormConfig} btnText="Odeslat" />
        </Modal>
        
    );
};