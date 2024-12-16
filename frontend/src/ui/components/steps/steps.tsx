
import { HTMLAttributes, memo, useContext } from "react";
import { StepsContext } from "./stepsContext";
import './steps.css';
import { Button } from "../button/button";
import { IoArrowForwardOutline,IoArrowBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

interface StepItemProps extends HTMLAttributes<HTMLElement> {
    children:React.ReactNode,
    value:number,
};

export const StepItem = memo(function StepMember({children,value,...props}:StepItemProps){
    const {active} = useContext(StepsContext);

    if (active === value){
        return(
            <div className="step__item" {...props}>
                {children}
            </div>
        );
    }   
    return null;
    
});
type StepBodyProps = {
    children:React.ReactNode,
};

export const StepsBody = memo(function StepBody({children}:StepBodyProps){

        return(
            <div className="steps__body">
                {children}
            </div>
        )
    
});

type StepsHeaderProps = {
    children:React.ReactNode,
    direction?:'vertical' | 'horizotnal',
};

export const StepsHeader = memo(function StepsHeader({children,direction='horizotnal'}:StepsHeaderProps){
    return(
        <div className={`steps__header ${direction} g-16`}>
            {children}
        </div>
    );
});

interface StepsHeaderItemProps extends HTMLAttributes<HTMLElement> {
    children:React.ReactNode,
    value:number,
};

export const StepsHeaderItem = memo(function StepsHeaderItem({children,value,...props}:StepsHeaderItemProps){
    const {active,setActive} = useContext(StepsContext);

    return(
        <div className={`steps__header--item tx-md ${active >= value ? 'done':''}`} onClick={()=> active >= value && setActive(value)} {...props}>
            {children}
        </div>
    );
});

type StepMoveProps = {
    direction:1 | -1;
    disabled?:boolean,
    onMove?:()=>void,
};

export function StepMove({direction,disabled,onMove}:StepMoveProps){
    const {active,setActive} = useContext(StepsContext);

    const { t } = useTranslation('common');

    const handleMove = () => {
        if (onMove){
            onMove();
        } else {
            setActive(prevActive => prevActive + direction);
        }
    }

    if (direction === -1){
        return (
            <Button variant="secondary" size="small" onClick={handleMove} disabled={disabled}><IoArrowBackOutline/>{t('button.prev')}</Button>
        );
    };

    return (
        <Button size="small" onClick={handleMove} disabled={disabled}>{t('button.next')}<IoArrowForwardOutline/></Button>
    );
};