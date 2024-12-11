import { ButtonHTMLAttributes } from "react";
import './button.css';

//normlaní tlačítko
export interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode,
    img?:React.ReactNode,
    variant?:'primary'|'secondary'| 'ternary' | 'ghost' | 'link',
    size?:'large' | 'def' | 'small',
};

export function Button({children,img,variant='primary',className, size,...props}:BtnProps){
    return(
        <button className={`button tx-md flex items-center content-center g-8 ${variant} ${size} ${className}`} {...props}>{children} {img}</button>
    );      
};

//ikonkové tlačítko
interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children:React.ReactNode,
    variant?:'primary'|'secondary' | 'ternary' | 'red',
};

export function IconButton({children,variant='primary',...props}:IconBtnProps){
    return(
        <button className={`icon--button ${variant}`} {...props}>{children}</button>
    );      
};