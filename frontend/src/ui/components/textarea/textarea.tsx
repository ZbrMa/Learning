import { forwardRef, TextareaHTMLAttributes } from "react";
import './textarea.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label:string,
    labelPosition?:'in'|'out',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextAreaProps>(function({label,labelPosition,...props},ref){

    return (
        <div className="textarea__container">
            {labelPosition === 'out' &&(<label>{label}:</label>)}
            <textarea {...props} ref={ref} placeholder={`${labelPosition === 'in' ? label:''}`} className="box"/>
        </div>
    )
}
);