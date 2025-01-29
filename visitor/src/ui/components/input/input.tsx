import { InputHTMLAttributes } from "react";
import { forwardRef,memo } from "react";
import './input.css';
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    labelPosition?: 'in' | 'out',
};

export const Input = memo(forwardRef<HTMLInputElement, InputProps>(function({ label, labelPosition = 'in', ...props }, ref) {
    return (
        <div className="input__container">
            {labelPosition === 'out' && <label className="bold">{label}:{props.required && " *"}</label>}
            <input {...props} ref={ref} placeholder={labelPosition === 'in' && !props.placeholder ? label : props.placeholder}/>
        </div>
    );
}));

interface MyInputProps extends InputProps {
    changeEvent:(formattedValue:string)=>void,
}

export const MyPhoneInput = forwardRef<HTMLInputElement,MyInputProps>(function({label,labelPosition,changeEvent,...props},ref) {
    return(
        <div className="input__container">
            {labelPosition === 'out' && <label className="bold">{label}:{props.required && " *"}</label>}
            <PhoneInput
                onChange={(value, data, event, formattedValue) =>
                    changeEvent(formattedValue)
                  }
                isValid
            />
        </div>
    )
    
}) ;