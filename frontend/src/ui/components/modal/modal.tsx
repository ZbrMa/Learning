import { IoCloseOutline } from "react-icons/io5";
import { HTMLAttributes, memo, useContext } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../../context/modalContext";
import './modal.css';

type ModalProps = {
    children:React.ReactNode,
    title?:string,
    id:string,
    custom?:boolean,
};

export function Modal({children,title,id,custom= false}:ModalProps){

    const { modal, setModal } = useContext(ModalContext);

    if(modal === id){
        if (custom){
            return ReactDOM.createPortal(
                <div className="modal__container flex items-center content-center" id={id}>
                    <div className="page--shadow"></div>
                    {children}
                </div>,
                document.body
            );
        }
        return ReactDOM.createPortal(
            <div className="modal__container flex items-center content-center" id={id}>
                <div className="page--shadow"></div>
                <div className="modal__content">
                    <ModalHeader close={() => setModal(null)}>{title}</ModalHeader>
                    <ModalBody>{children}</ModalBody>
                </div>
            </div>,
            document.body
        );
    };

    return null;
    
};


interface ModalBodyProps extends HTMLAttributes<HTMLElement> {
    children:React.ReactNode,
};

function ModalBody({children,...props}:ModalBodyProps){
    return(
        <div className="modal__body p-16" {...props}>
            {children}
        </div>
    );
};


type ModalHeaderProps = {
    children:React.ReactNode,
    close:()=>void,
};

const ModalHeader = memo(function ModalHeader({children,close}:ModalHeaderProps){

    return(
        <div className="modal__header flex g-16 items-center content-space p-16">
            <h3 className="h-md bold">{children}</h3>
            <IoCloseOutline onClick={close}/>
        </div>
    )
});