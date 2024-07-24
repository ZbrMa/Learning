import { InfoLine } from "../../components/common/infoLine";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { Input } from "./input";
import { IoImageOutline } from "react-icons/io5";
import { api } from "../../useApi/useApi";
import './styles/profileCard.css';
import { Button } from "./button";
import { InfoPrompt } from "./infoPrompt";

type File = {
    urlParam:string,
    fileName:string,
    file:any,
}

export function ProfileCard(){
    const {user,setUser} = useContext(AuthContext);
    //const [change,setChange] = useState(false);
    const [error,setError] = useState(false);
    const [newUser,setNewUser] = useState(user);
    const [file, setFile] = useState<File>();
    const [editable, setEditable] = useState(true);
    const [textAreaValue, setTextAreaValue] = useState(user.about);

    const handleFileUpload = (event:any) => {
        setFile({
            urlParam: URL.createObjectURL(event.target.files[0]),
            fileName: event.target.files[0].name,
            file: event.target.files[0],
        });
        //setChange(true);
    };
    
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            name: e.target.value,
        });
        //setChange(true);
    }
    
    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            phone: e.target.value,
        });
        //setChange(true);
    }
    
    const handleNationalityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            nationality: e.target.value,
        });
        //setChange(true);
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({
            ...newUser,
            birth_date: new Date(e.target.value),
        });
        //setChange(true);
    }

    const handleAboutChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value);
        setNewUser({
            ...newUser,
            about: e.target.value,
        });
        //setChange(true);
    }

    const saveUser = async () => {
        const formData = new FormData();
        formData.append('username', newUser.username);
        formData.append('email', newUser.email);
        formData.append('name', newUser.name);
        formData.append('phone', newUser.phone);
        formData.append('nationality', newUser.nationality);
        formData.append('about', newUser.about);
        formData.append('birthDate', `${newUser.birth_date.getFullYear()}-${newUser.birth_date.getMonth()}-${newUser.birth_date.getDay()}`);
        formData.append('file', file?.file);
        try {
            const response = await api.post('/changeUser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, 
                params: {
                    userId: newUser.id,
                }
            });
            setError(false);
            setUser({
                ...user,
                ...newUser,
                image: response.data.imageDir
            });
            //setChange(false);
            setEditable(false);
        } catch {
            setError(true);
        }
    }

    const formatDate = (date:Date) => {
        let d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
    
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return(
        <>
        <div className="profile-card">
            <div className="profile-left">
                <div className="profile-left-title">Profil uživatele</div>
                <div className="profile-img">
                    {editable ? (
                        <>
                        <label htmlFor="file-input">
                        {user.image || file ? (
                            <img src={file?.urlParam || user.image} alt="Profilový obrázek" />
                        ) : (
                            <IoImageOutline />
                        )}
                        </label>
                        <input id="file-input" type="file" style={{ display: "none" }} onChange={handleFileUpload}></input>
                        </>
                    ):(
                        <img src={user.image} alt="Profilový obrázek" />
                    )}
                    
                </div>
                <div className="login-data">
                    <InfoLine name="Uživatelské jméno" data={<Input variant="edit" type='text' initialValue={user.username ? user.username : ''} size="small"></Input>}></InfoLine>
                    <InfoLine name="E-mail" data={<Input variant="edit" type='text' initialValue={user.email ? user.email : ''} size="small"></Input>}></InfoLine>
                    <InfoLine name="Heslo" data={user.password ? user.password : ''}></InfoLine>
                </div>
            </div>
            <div className="profile-right">
                <div className="profile-right-title">O mně/nás</div>
                <div className="profile-info">
                    <InfoLine name="Jméno" variant="tooltip" data={<Input variant="edit" type='text' initialValue={user.name ? user.name : ''} size="small" onChange={(e) => handleNameChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Datum narození" data={<Input variant="edit" type="date" initialValue={formatDate(user.birth_date)} size="small" onChange={(e)=>handleDateChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Telefon" data={<Input variant="edit" type='text' initialValue={user.phone ? user.phone : ''} size="small" onChange={(e) => handlePhoneChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Národnost" data={<Input variant="edit" type='text' initialValue={user.nationality ? user.nationality : ''} size="small" onChange={(e) =>handleNationalityChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Webová stránka" data={<Input variant="edit" type='text' initialValue={user.website ? user.website : ''} size="small" onChange={(e) =>handleNationalityChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Instagram" data={<Input variant="edit" type='text' initialValue={user.instagram ? user.instagram : ''} size="small" onChange={(e) =>handleNationalityChange(e)}></Input>}></InfoLine>
                    <InfoLine name="Twitter" data={<Input variant="edit" type='text' initialValue={user.twitter ? user.twitter : ''} size="small" onChange={(e) =>handleNationalityChange(e)}></Input>}></InfoLine>
                </div>
                {editable ? (
                        <textarea className="about-text" placeholder={user.about === 'null'? 'Napiš něco o sobě' : ''} value={textAreaValue === 'null'? '':textAreaValue} onChange={(e)=>handleAboutChange(e)}></textarea>
                    ) :(
                        user.about
                    )}
                </div>
            </div>
        <div className="profile-save">
        {editable ? (
            <Button click={saveUser}>Uložit změny</Button>
        ):(
            <Button click={setEditable(true)}>Upravit</Button>
        )} 
        {error &&<InfoPrompt variant="negative" text="Chyba při ukládání"></InfoPrompt>}
    </div>
    </>
    );
}