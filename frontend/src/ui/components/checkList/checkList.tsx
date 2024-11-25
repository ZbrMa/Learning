import { useState, memo, HTMLAttributes } from "react";
import { IoCheckmarkOutline, IoCloseOutline } from "react-icons/io5";

export interface ICheckItem {
    checked:boolean,
    children:React.ReactNode,
};

interface ChekcListProps extends HTMLAttributes<HTMLElement> {
    items:ICheckItem[],
};

export function CheckList({items,...props}:ChekcListProps){

    return(
        <div className="flex-col g-8 mt-16" {...props}>
            {items.map((item,index)=>(
                <ChekcItem checked={item.checked} key={index}>
                    {item.children}
                </ChekcItem>
            ))}
        </div>
    );
};

export const ChekcItem = memo(function CheckItem({children,checked}:ICheckItem){
    return(
        <div className="check__item flex g-8 tx-sm">
            {checked ? (
                <IoCheckmarkOutline className="tc-green"/>
            ):(
                <IoCloseOutline className="tc-red"/>
            )}
            {children}
        </div>
    );
});