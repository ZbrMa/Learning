import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../../../api/userApiSlice";
import { IFieldConfig, IFormConfig } from "../../../../types/form";
import { Form } from "../../../components/form/form";
import { RootState } from "../../../../store/userStore";
import { Modal } from "../../../components/modal/modal";

const changePassFields:IFieldConfig[] = [
    {
        name:'oldPass',
        label:'Staré heslo',
        type:'password',
        validation:{
            required:true,
        }
    },
    {
        name:'newPass',
        label:'Nové heslo',
        type:'password',
        validation:{
            required:true,
        }
    },
    {
        name:'newPassRepeat',
        label:'Nové heslo znovu',
        type:'password',
        validation:{
            required:true,
        }
    }
]



export function ChnagePasswordForm(){
    const [sendPass,{data,isLoading,error}] = useChangePasswordMutation();
    const userId = useSelector((root:RootState)=>root.auth.id)

    const changePassFormConfig:IFormConfig = {
        fields:changePassFields,
        onSubmit:(data)=>{
            sendPass({
                id:userId,
                old:data['oldPass'],
                new:data['newPass'],
            });
        },
    }

    return(
        <Modal id="editPassModal" title="Změna hesla">
            <Form config={changePassFormConfig} btnText="Změnit heslo" chekList checkField="newPass"/>
        </Modal>
        
    );
};