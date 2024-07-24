import { IoLogOutOutline,IoPersonOutline, IoLogInOutline, IoPersonAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import './styles/profileNav.css';
import Cookies from 'js-cookie';
import { AuthContext, UserInitialValue } from "../../context/authContext";
import { api } from "../../useApi/useApi";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/modalContext";
import { LoginModal } from "../modals/loginModal";
import { NewUserModal } from "../modals/newUserModal";

type Props = {
    isHidden:boolean,
    openMenu:any,
}

export function ProfileNav({isHidden,openMenu}:Props){
    const { user,setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const { openModal } = useModal();

    const logout = () => {
        setUser(UserInitialValue.user);
        Cookies.remove('token');
    };

    const logoutClick = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                await api.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
                });
                logout();
                navigate('/');
            } catch (error) {
                console.error('Logout failed', error);
            };
        };
    };

    return (
        <>
        <div className={`profile-nav ${isHidden? "opened":''}`} onClick={openMenu}>
            {user.authenticated ? (
                <>
                    <div className="profile-nav-item">
                        
                        <NavLink to="/profile" className="nav-link">
                            <IoPersonOutline></IoPersonOutline>
                            Můj profil
                        </NavLink>
                    </div>
                    <div className="profile-nav-item" onClick={logoutClick}>
                        <IoLogOutOutline></IoLogOutOutline>
                        Odhlásit se
                    </div>
                </>
            ) : (
                <>
                    <div className="profile-nav-item" onClick={()=>openModal('loginModal')}>
                        <IoLogInOutline></IoLogInOutline>
                        Přihlásit se
                    </div>
                    <div className="profile-nav-item" onClick={()=>openModal('registerModal')}>
                        <IoPersonAddOutline></IoPersonAddOutline>
                        Registrace
                    </div>
                </>
            )}
        </div>
        
            <LoginModal></LoginModal>
            <NewUserModal></NewUserModal>
        </>
    );
}