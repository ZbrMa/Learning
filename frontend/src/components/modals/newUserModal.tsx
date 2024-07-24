import { Button } from "../common/button";
import { Input } from "../common/input";
import { Modal } from "./modal";
import { InfoPrompt } from "../common/infoPrompt";
import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { api } from "../../useApi/useApi";
import Cookies from "js-cookie";
import { useModal } from "../../context/modalContext";
import { IUser } from "../../types/types";
import './styles/newUserModal.css';

export function NewUserModal(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [error,setError] = useState(false);

    const {closeModal} = useModal();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await api.post('/register', null,
                {params: {
                    username,
                    password,
                    email,
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
                closeModal('registerModal');
                navigate('/profile');
            }
        } catch (err) {
            setError(true);
        }
    }
        
    const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };
    
    const handleConfirmPasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    return(
            <Modal header="Registrace" modalId="registerModal">
                <div className="register-container">
                    <div className="register-info">
                        {!passwordsMatch && (<InfoPrompt variant="negative" text="Hesla se neshodují"></InfoPrompt>)}
                        {error && (<InfoPrompt variant="negative" text="Chyba při registraci"></InfoPrompt>)}
                        <Input type="text" placeholder="Uživatelské jméno" variant="outbox" onChange={(ev) => setUsername(ev.target.value)}></Input>
                        <Input type="email" placeholder="E-mailová adresa" variant="outbox" onChange={(ev) => setEmail(ev.target.value)}></Input>
                        <Input type="password" placeholder="Heslo" variant="outbox" onChange={handlePasswordChange}></Input>
                        <Input type="password" placeholder="Potvzení hesla" variant="outbox" onChange={handleConfirmPasswordChange}></Input>
                    </div>
                    <Button click={handleRegister}>Registrovat</Button>
                </div>
            </Modal>
    );
}