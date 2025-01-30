import { IoCloseOutline } from "react-icons/io5";
import { HTMLAttributes, memo, useContext, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalContext } from "../../../context/modalContext";
import './modal.css';

type ModalProps = {
    children:React.ReactNode,
    title?:string,
    id:string,
    custom?:boolean,
    color?:'default'|'black',
    onClose?:()=>void,
};

export function Modal({children,title,id,custom= false, color='default',onClose}:ModalProps){

    const { modal, setModal } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement>(null);
    const modalContRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (modalContRef.current && modalContRef.current.contains(event.target as Node) && modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setModal(null);
        }
    };

        useEffect(() => {
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, []);

    if(modal === id){
        if (custom){
            return ReactDOM.createPortal(
                <div className="modal__container flex items-center content-center" id={id} ref={modalContRef}>
                    <div ref={modalRef} className="custom-modal">
                        {children}
                    </div>
                    
                </div>,
                document.body
            );
        }
        return ReactDOM.createPortal(
            <div className="modal__container flex items-center content-center" id={id} ref={modalContRef}>
                <div className="modal__content" ref={modalRef}>
                    <ModalHeader close={onClose ?? (() => setModal(null))} color={color}>{title}</ModalHeader>
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
    color?:'default'|'black',
};

const ModalHeader = memo(function ModalHeader({children,close,color='default'}:ModalHeaderProps){

    return(
        <div className={`modal__header flex g-16 items-center content-space p-16 ${color === 'black' ? "black" : "def"}`}>
            <h3 className="h-md bold">{children}</h3>
            <IoCloseOutline onClick={close}/>
        </div>
    )
});