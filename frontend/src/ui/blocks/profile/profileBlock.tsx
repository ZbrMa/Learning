import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { ExtendedUser, loginSuccess } from "../../../api/authSlice";
import "./profileBlock.css";
import { Button } from "../../components/button/button";
import { useState, useContext, useRef } from "react";
import { EditProfileForm } from "./ui/editProfileForm";
import { Alert } from "../../components/alert/alert";
import { IoIosLock } from "react-icons/io";
import { IoPencilOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { ModalContext } from "../../../context/modalContext";
import { ChnagePasswordForm } from "./ui/changePasswordForm";
import { ImageInput } from "../../components/imageInput/imageInput";
import { useChangeImageMutation } from "../../../api/userApiSlice";
import { Spinner } from "../../components/spinner/spinner";
import { useAlert } from "../../../context/alertContext";
import { Textarea } from "../../components/textarea/textarea";
import { InfoCard } from "../../components/infoCard/infoCard";
import { useTranslation } from "react-i18next";

export function ProfileBlock() {
  const { t } = useTranslation("app");
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const formRef = useRef<{
    handleSave: () => Promise<boolean>;
    updateField: (key: keyof ExtendedUser, value: string) => void;
  }>(null);
  const user = useSelector((root: RootState) => root.auth);

  const { setModal } = useContext(ModalContext);
  const { showAlert } = useAlert();
  const [sendImage, { data, isLoading }] = useChangeImageMutation();

  const handleImageChange = async (file: File) => {
    if (file) {
      const response = await sendImage({ user: user.id, image: file });
      if (response.error) {
        showAlert(
          <Alert type="negative" title={t("profile.serverError")}>
            {t("profile.updateImageError")}
          </Alert>
        );
      } else if (response.data.success) {
        showAlert(
          <Alert type="positive" title={t("profile.success")}>
            {t("profile.updateImageSuccess")}
          </Alert>
        );
        response.data.imagePath &&
          dispatch(loginSuccess({ ...user, image: response.data.imagePath }));
      } else {
        showAlert(
          <Alert type="negative" title={t("profile.error")}>
            {response.data.message}
          </Alert>
        );
      }
    }
  };

  const handleSaveUser = async () => {
    if (formRef.current) {
      const response = await formRef.current.handleSave();
      if (response) {
        showAlert(
          <Alert type="positive" title={t("profile.success")}>
            {t("profile.saved")}
          </Alert>
        );
        setEditable(false);
      } else {
        showAlert(
          <Alert type="negative" title={t("profile.serverError")}>
            {t("profile.saveError")}
          </Alert>
        );
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = e.target.value;

    if (formRef.current) {
      formRef.current.updateField("description", description);
    }
  };

  return (
    <>
      <div className="profile__container">
        <div className="profile__grid">
          <div className="profile__left">
            <div className="profile__header pb-16 flex g-16">
              {isLoading ? (
                <Spinner fixed={false} />
              ) : (
                <ImageInput
                  img={user.image}
                  returnFile={handleImageChange}
                  className="profile--img"
                />
              )}
              <div className="flex-col">
                <span className="h-xl xbold mb-8">{user.nick}</span>
                <p className="tx-md">
                  {user.name} {user.surname}
                </p>
                <div className="flex g-16 profile__btns">
                  {editable ? (
                    <Button onClick={handleSaveUser}>
                      <IoCheckmarkDoneOutline />
                      {t("profile.save")}
                    </Button>
                  ) : (
                    <Button onClick={() => setEditable(true)} variant="ternary">
                      <IoPencilOutline />
                      {t("profile.edit")}
                    </Button>
                  )}

                  <Button
                    onClick={() => setModal("editPassModal")}
                    variant="ternary"
                  >
                    <IoIosLock />
                    {t("profile.changePassword")}
                  </Button>
                </div>
              </div>
            </div>
            <EditProfileForm user={user} editable={editable} ref={formRef} />
          </div>
          <div className="profile__right">
            <div>
              <p className="tx-md xbold mb-16">{t("profile.about")}</p>
              <Textarea
                disabled={!editable}
                onChange={handleTextareaChange}
                defaultValue={user.description}
              />
            </div>
            <ProfileStatistics />
          </div>
        </div>
      </div>

      <ChnagePasswordForm />
    </>
  );
}

function ProfileStatistics() {
  const { t } = useTranslation("app");

  return (
    <div className="flex g-32 profile__statistics py-16">
      <InfoCard name={t("profile.played")}>{75}</InfoCard>
      <InfoCard name={t("profile.playedHours")}>{150}</InfoCard>
      <InfoCard name={t("profile.visitedPlaces")}>{5}</InfoCard>
    </div>
  );
}
