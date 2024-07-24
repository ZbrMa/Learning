import { Button } from "../common/button";
import React from 'react';
import { useModal } from "../../context/modalContext";
import './styles/modal.css';

type ModalProps = {
    header:string,
    modalId: string;
    children: React.ReactNode;
};

export function Modal({header,children, modalId}:ModalProps) {
    const { modalState, closeModal } = useModal();
    const isModalOpen = modalState[modalId];
    if (!isModalOpen) return null;

    return(
        <div className="modal-background">
            <div className="modal">
                <div className="modal-header-container">
                    <div className="modal-header">{header}</div>
                    <Button variant="close" click={() => closeModal(modalId)}></Button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}