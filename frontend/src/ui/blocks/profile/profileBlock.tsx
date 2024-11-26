import { useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
import { loginSuccess } from "../../../api/authSlice";
import { formatDate } from "date-fns";
import "./profileBlock.css";
import { Button } from "../../components/button/button";
import { useState, useContext, useEffect } from "react";
import { EditProfileForm } from "./ui/editProfileForm";
import { Input } from "../../components/input/input";
import { InfoLine } from "../../components/infoLine/infoLine";
import { Alert } from "../../components/alert/alert";
import { IoIosInformationCircleOutline, IoIosLock } from "react-icons/io";
import { ModalContext } from "../../../context/modalContext";
import { ChnagePasswordForm } from "./ui/changePasswordForm";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { ImageInput } from "../../components/imageInput/imageInput";
import { useChangeImageMutation } from "../../../api/userApiSlice";
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { UserEvents } from "./ui/userEvents";
import { Spinner } from "../../components/spinner/spinner";
import { useAlert } from "../../../context/alertContext";
import { useDispatch } from "react-redux";

export function ProfileBlock() {
  const user = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();

  const { setModal } = useContext(ModalContext);
  const {showAlert} = useAlert();
  const [sendImage, { data, isLoading}] = useChangeImageMutation();

  const handleImageChange = async(file: File) => {
    if (file) {
      const response = await sendImage({ user: user.id, image: file });
      if(response.error) {
        showAlert(<Alert type="negative" title="Chyba serveru">Obrázek se napodařilo aktualizovat. Zkuste to později.</Alert>)
      } else if (response.data.success) {
        showAlert(<Alert type="positive" title="Úspěch">{response.data.message}</Alert>)
        response.data.imagePath && dispatch(loginSuccess({...user,image:response.data.imagePath}));
      } else {
        showAlert(<Alert type="negative" title="Nastala chyba">{response.data.message}</Alert>)
      }
    }
  };

  return (
    <>
    <BodyBlock style={{paddingTop:'32px'}}>
      <div className="profile__container">
        <div className="profile__grid">
          <div className="profile__left">
            {isLoading ? (
              <Spinner fixed={false}/>
            ):(
              <ImageInput
              img={user.image}
              returnFile={handleImageChange}
              className="profile--img"
            />
            )}
            
            {user.checked ? (
              <div className="profile__credentials mt-32">
                <InfoLine title="E-mail">{user.email}</InfoLine>
                <InfoLine title="Heslo">******</InfoLine>
                <div className="flex g-8 mt-16">
                  <Button
                    onClick={() => setModal("editPassModal")}
                    style={{ fontSize: "1rem", padding: "8px" }}
                    variant="ternary"
                  >
                    <IoIosLock />
                    Změnit heslo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="profile__check">
                <IoIosInformationCircleOutline style={{ fontSize: "1.2rem" }} />
                Profil čeká na ověření
              </div>
            )}
          </div>
          <div className="profile__center__left">
            <EditProfileForm user={user}/>
          </div>
        </div>

        <div className="profile"></div>
      </div>
      
      <ChnagePasswordForm />
    </BodyBlock>
    <BodyBlock title="Co mě čeká">
      <UserEvents userId={user.id}/>
    </BodyBlock>
    
    </>
  );
}
