import { HTMLAttributes } from 'react';
import './buttonGroup.css';

interface ButtonGroupProps extends HTMLAttributes<HTMLElement> {
    children:React.ReactNode,
    variant?:'row' | 'col',
};

export function ButtonGroup({children, variant='row',className='',...props}:ButtonGroupProps){

    return(
        <div className={`button__group ${variant} ${className}`} {...props}>
            {children}
        </div>
    )
};