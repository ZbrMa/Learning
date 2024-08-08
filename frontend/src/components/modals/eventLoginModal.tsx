import { AuthContext } from "../../context/authContext";
import { useModal } from "../../context/modalContext";
import { useContext, useState } from "react";
import { Modal } from "./modal";
import { Button } from "../common/button";
import './styles/eventLoginModal.css';

export function EventLoginModal(){

    const { user, loading} = useContext(AuthContext);
    const [opened,setOpened] = useState(false);
    const { openModal,closeModal } = useModal();

    const openLogin=()=>{
        openModal('loginModal');
        closeModal('eventLogin');
    }

    const openRegister=()=>{
        openModal('registerModal');
        closeModal('eventLogin');
    }

    if(user.authenticated && user.role !=1){
        return(
            <Modal header="Přihlášení na termín" modalId="eventLogin">
                <div className="event-login-variant">
                    Příhlášen jako: {user.name} 
                    <Button>
                        Registrovat se pomocí účtu
                    </Button>
                </div>
                <div className="event-login-variant">
                    Chci se přihlásit pouze jednorázově na tento termín
                    <Button>
                        Přihlásit jednorázově
                    </Button>
                </div>
            </Modal>
        );
    }

    else{
        return(
            <Modal header="Přihlášení na termín" modalId="eventLogin">
                <div className="event-login-variant">
                    Již mám existující účet a chci ho použít k přihlášení na termín
                    <Button click={openLogin}>
                        Přihlásit se k účtu
                    </Button>
                </div>
                <div className="event-login-variant">
                    Nemám účet a chtěl bych si ho založit
                    <Button click={openRegister}>
                        Založit nový účet
                    </Button>
                </div>
                <div className="event-login-variant">
                    Nemám účet a chci se na tento termín přihlásit jednorázově
                    <Button>
                        Přihlásit jednorázově
                    </Button>
                </div>
            </Modal>
        );
    }
    
}