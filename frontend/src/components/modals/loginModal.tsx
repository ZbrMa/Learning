import { Modal } from "./modal";
import { Button } from "../common/button";
import { useState, useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useModal } from "../../context/modalContext";
import { api } from "../../useApi/useApi";
import Cookies from "js-cookie";
import { IUser } from "../../types/types";
import { Input } from "../common/input";
import { NewUserModal } from "./newUserModal";
import './styles/loginModal.css';
import { InfoPrompt } from "../common/infoPrompt";

export function LoginModal(){

    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { closeModal, openModal} = useModal();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await api.get('/login',
                {params:{   
                    username,
                    password,
                }}
            );
            const userData = response.data;
            if (userData.token) {
                Cookies.set('token', userData.token, { expires: 0.16 / 24 , secure: true });
                const loggedUser:IUser = userData.user;
                setUser({
                    id: loggedUser.id,
                    username: loggedUser.username,
                    password: loggedUser.password,
                    role: loggedUser.role,
                    name: loggedUser.name,
                    email:loggedUser.email,
                    phone:loggedUser.phone,
                    about:loggedUser.about,
                    image:loggedUser.image,
                    birth_date:loggedUser.birth_date,
                    nationality: loggedUser.nationality,
                    confirmed: loggedUser.confirmed,
                    authenticated: true,
                    website:loggedUser.website,
                    instagram: loggedUser.instagram,
                    twitter: loggedUser.twitter,
                  });
                //navigate('/');
                closeModal('loginModal');
            }
            else {setError(true)};
        } catch (err) {
            setError(true);
        }
    };

    const openRegister = () => {
        closeModal('loginModal');
        openModal('registerModal');
    }

    useEffect(()=> {
        setError(false);
    },[openModal])

    /*useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [error]);*/

    return (
        <Modal modalId="loginModal" header="Přihlášení uživatele">
            <div className="login-container">
                {error &&<InfoPrompt variant="negative" text="Neúspěšné přihlášení"></InfoPrompt>}
                <Input type="text" placeholder="Uživatelské jméno" variant="outbox" onChange={(ev) => setUsername(ev.target.value)}></Input>
                <Input type="password" placeholder="Heslo" variant="outbox" onChange={(ev) => setPassword(ev.target.value)}></Input>
                <Button click={handleLogin}>Přihlásit se</Button>
                
                <div className="login-bottom">
                    <Button variant="link">Zapomenuté heslo</Button>
                    <Button variant="link" click={openRegister}>Vytvořit účet</Button>
                </div>
            </div>
        </Modal>
    );
}