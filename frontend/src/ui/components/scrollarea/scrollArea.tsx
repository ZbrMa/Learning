import { HTMLAttributes } from "react";
import './scrollarea.css';

interface ScrollAreaProps extends HTMLAttributes<HTMLElement> {
    children:React.ReactNode,
}

export function ScrollArea({children,className,...props}:ScrollAreaProps){

    return(
        <div className={`scrollarea pb-16 pr-16 box ${className}`} {...props}>
            {children}
        </div>
    );
};