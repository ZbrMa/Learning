import { IoCloseOutline } from "react-icons/io5";
import { Button } from "../button/button";
import './alert.css';
import { useEffect, useState } from "react";

type AlertProps = {
    children:React.ReactNode,
    type:'positive'|'negative'|'neutral',
    trigger:()=>boolean,
};

export function Alert({children,type,trigger}:AlertProps){
    const [active,setActive] = useState(false);

    useEffect(()=>{
        console.log(trigger());
        if(trigger()){
            setActive(trigger);
            setTimeout(()=>setActive(false),3000);
        };
    },[trigger]);

    return(
        <div className={`alert__container ${active ? '':'idle'} ${type}`}>
            <div className="alert--content">{children}</div>
            <Button variant='ghost' style={{color:'inherit'}} onClick={()=>setActive(false)}><IoCloseOutline/></Button>
        </div>
    )
};