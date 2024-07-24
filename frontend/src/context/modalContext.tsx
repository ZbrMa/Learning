import React, { createContext, useState, useContext, ReactNode } from 'react';

type ModalState = {
    [key: string]: boolean;
};

type ModalContextType = {
    modalState: ModalState;
    openModal: (modalId: string) => void;
    closeModal: (modalId: string) => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [modalState, setModalState] = useState<ModalState>({});

    const openModal = (modalId: string) => {
        setModalState((prevState) => ({ ...prevState, [modalId]: true }));
    };

    const closeModal = (modalId: string) => {
        setModalState((prevState) => {
            const newState = { ...prevState };
            delete newState[modalId];
            return newState;
        });
    };

    return (
        <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};
