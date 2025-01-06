import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { IFieldConfig,IFormConfig } from "../../../types/form";
import { Input } from "../input/input";
import { Button } from "../button/button";
import './form.css';
import { Select } from "../select/select";
import { Textarea } from "../textarea/textarea";
import { FormHTMLAttributes, useState, useEffect} from "react";
import { IValidationRules } from "../../../types/formTypes";
import { CheckList, ICheckItem } from "../checkList/checkList";
import { IoCloseCircleOutline } from "react-icons/io5";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    config:IFormConfig,
    btnText:string,
    checkList?:boolean,
    checkField?:string,
};

export function Form({config,btnText,checkList = false,checkField = "password",...props}:FormProps){
const { register, handleSubmit, control, watch } = useForm();
const [checkItems, setCheckItems] = useState<ICheckItem[]>([]);

const password = useWatch({ control, name: checkField });

   const onSubmit: SubmitHandler<{ [key: string]: any }> = (data) => {
        config.onSubmit(data);
    };

    useEffect(() => {
        if (password !== undefined && checkList) {
            const items: ICheckItem[] = [
                {
                    checked: password.length >= 8,
                    children: "Minimální délka 8 znaků"
                },
                {
                    checked: /[!@#$%^&*(),.?":{}|<>]/.test(password),
                    children: "Obsahuje speciální znak"
                }
            ];
            setCheckItems(items);
        }
    }, [password, checkList]);

    const newPass = watch('newPass');
    const newPassRepeat = watch('newPassRepeat');
    const passwordsMatch = newPass === newPassRepeat;

    const renderField = (field: IFieldConfig, key: number) => {
        const { name, label, type, placeholder, options, validation } = field;
        const validationRules: IValidationRules = {};
    
        if (validation?.required) {
            validationRules.required = true;
        }

        if (validation?.minLength) {
            validationRules.length = validation.minLength;
        }

        switch (type) {
            case 'textarea':
                return (
                    <Textarea
                        defaultValue={field.defaultValue}
                        label={label}
                        labelPosition='out'
                        {...register(name, validationRules)}
                        key={key}
                    />
                );
    
            case 'select':
                return (
                    <Select
                        defaultValue={field.defaultValue}
                        label={label}
                        labelPosition='out'
                        options={options}
                        {...register(name, validationRules)}
                        key={key}
                    />
                );
    
            default:
                return (
                    <Input
                        defaultValue={field.defaultValue}
                        label={label}
                        labelPosition='out'
                        type={type}
                        {...register(name, validationRules)}
                        key={key}
                    />
                );
        }
    };

    return(

        <div className="form__container">
            <form onSubmit={handleSubmit(onSubmit)} {...props}>
                {config.fields.map((field,index)=>(
                    renderField(field,index)
                ))}
                <Button type="submit" style={{width:'100%',fontSize:'1rem'}} className="xbold mt-32" disabled={checkList && (!passwordsMatch || checkItems.every(item=> !item.checked))}>{btnText}</Button>
            </form>
            {checkList && 
                <CheckList 
                    items={checkItems}
                    
                />
            }
            {!passwordsMatch && newPass && newPassRepeat && (
                    <p className="bg-lightred tx-sm mt-16 flex g-8 items-center tc-darkred p-8"><IoCloseCircleOutline/>Hesla se neshodují</p>
            )}
        </div>
    );  
};