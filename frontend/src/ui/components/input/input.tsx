import { InputHTMLAttributes } from "react";
import { forwardRef,memo } from "react";
import './input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string,
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
