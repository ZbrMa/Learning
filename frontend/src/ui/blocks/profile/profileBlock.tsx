import { useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
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

export function ProfileBlock() {
  const user = useSelector((root: RootState) => root.auth);

  const { setModal } = useContext(ModalContext);
  const [sendImage, { data, isLoading }] = useChangeImageMutation();

  return (
    <>
    <BodyBlock style={{paddingTop:'32px'}}>
      <div className="profile__container">
        <div className="profile__grid">
          <div className="profile__left">
            <ImageInput
              img={user.image}
              returnFile={(e) => sendImage({ user: user.id, image: e })}
              className="profile--img"
            />

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
                  <Button
                    onClick={() => setModal("editEmailModal")}
                    style={{ fontSize: "1rem", padding: "8px" }}
                    variant="ternary"
                  >
                    <MdOutlineAlternateEmail />
                    Změnit e-mail
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
    <UserEvents userId={user.id}/>
    </>
  );
}
