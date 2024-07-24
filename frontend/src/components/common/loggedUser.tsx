import { useContext } from "react"
import { AuthContext } from "../../context/authContext"

export function LoggedUser(){

    const {user} = useContext(AuthContext);

    return(
        <div className="logged-info" style={{marginLeft: '8px'}}>
            <div style={{fontSize:'14px'}}>Přihlášen</div>
            <div style={{fontSize:'18px'}}>{user.username}</div>
        </div>
    )
}