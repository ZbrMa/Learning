import { useState, useEffect,forwardRef, useImperativeHandle } from "react";
import { Input } from "../../../components/input/input";
import { Dropdown, MySelect } from "../../../components/select/select";
import { useEditUserMutation } from "../../../../api/userApiSlice";
import { useGetArtsQuery, useGetCountriesQuery } from "../../../../api/filtersApiSlice";
import { format } from "date-fns";
import { IoMailOutline, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io5";
import { MdPerson, MdPhone } from "react-icons/md";
import { PiCity, PiHouse } from "react-icons/pi";
import { LuBaby } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoFlag } from "react-icons/io5";
import { HTMLAttributes } from "react";
import { useAlert } from "../../../../context/alertContext";
import { ExtendedUser } from "../../../../api/authSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../api/authSlice";
import { LiaGuitarSolid } from "react-icons/lia";
import './editProfileForm.css';
import { IArt } from "../../../../types/filtersTypes";
import { useTranslation } from "react-i18next";

function matchArts(artsData:IArt[],userArts:string[]){
  return artsData.filter(artData=> userArts.includes(artData.name))
};

type EditProfileFormProps = {
  user: ExtendedUser,
  editable:boolean,
};

export const EditProfileForm = forwardRef(function EditProfileForm({ user,editable }: EditProfileFormProps,ref) {
  const { data: arts } = useGetArtsQuery();
  const { data: countries } = useGetCountriesQuery();
  const [formUser, setFormUser] = useState(user);
  const { showAlert } = useAlert();
  const [triggerEdit] = useEditUserMutation();
  const dispatch = useDispatch();
  const { t } = useTranslation('app');

  useEffect(() => {
    setFormUser(user);
  }, [user,arts]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleArtChange = (value:IArt[]) => {
    setFormUser((prev) => ({ ...prev, arts: value }));
  }

  useImperativeHandle(ref, () => ({
    async handleSave() {
      const response = await triggerEdit({user:formUser,arts:formUser.arts.map(art=>art.id)});
      response && dispatch(loginSuccess(formUser))
      return response;
    },
    updateField(key: string, value: string) {
      setFormUser((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    getUserData() {
      return formUser;
    },
  }));



  return (
    <div className="flex-col mt-16 profile__form">
      <ProfileInfoBlock title={t("profile.profileForm.contactInfo")}>
        {editable && 
          <>
            <ProfileInfoLine title={t("profile.profileForm.firstName")} icon={<MdPerson />}>
              <Input
                disabled={!editable}
                defaultValue={formUser.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </ProfileInfoLine>
            <ProfileInfoLine title={t("profile.profileForm.lastName")} icon={<MdPerson />}>
              <Input
                disabled={!editable}
                defaultValue={formUser.surname}
                onChange={(e) => handleInputChange("surname", e.target.value)}
              />
            </ProfileInfoLine>
          </>
        }
        <ProfileInfoLine title={t("profile.profileForm.email")} icon={<IoMailOutline />}>
          {user.email}
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.phone")} icon={<MdPhone />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.city")} icon={<PiCity />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.address")} icon={<PiHouse />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </ProfileInfoLine>
      </ProfileInfoBlock>

      <ProfileInfoBlock title={t("profile.profileForm.socialMedia")}>
        <ProfileInfoLine title="Facebook" icon={<IoLogoFacebook />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.facebook}
            onChange={(e) => handleInputChange("facebook", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title="Twitter" icon={<IoLogoTwitter />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.twitter}
            onChange={(e) => handleInputChange("twitter", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title="Instagram" icon={<IoLogoInstagram />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.instagram}
            onChange={(e) => handleInputChange("instagram", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.website")} icon={<IoMailOutline />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </ProfileInfoLine>
      </ProfileInfoBlock>

      <ProfileInfoBlock title={t("profile.profileForm.others")}>
        <ProfileInfoLine title={t("profile.profileForm.birthDate")} icon={<LuBaby />}>
            {format(new Date(formUser.birth), "dd.MM.yyyy")}
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.nationality")} icon={<IoFlag />}>
          <MySelect
            isDisabled={!editable}
            defaultValue={formUser.country}
            options={countries?.map((c) => ({ value: c.id, label: c.name })) || []}
            returnSelected={(e) => handleInputChange("country", e)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.group")} icon={<HiOutlineUserGroup />}>
          <MySelect
            isDisabled={!editable}
            defaultValue={formUser.band}
            options={[
              { value: "solitare", label: t("profile.profileForm.solo") },
              { value: "skupina", label: t("profile.profileForm.group") },
            ]}
            returnSelected={(e) => handleInputChange("band", e)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title={t("profile.profileForm.genre")} icon={<LiaGuitarSolid />}>
          {arts && <Dropdown
            placeholder={t("profile.profileForm.genre")}
            disabled={!editable}
            defaultValues={user.arts.map(art=>({value:art.id,label:art.name}))}
            options={arts.map((art)=>({value:art.id,label:art.name}))}
            returnSelected={(e) => handleArtChange(arts.filter(art=>e.includes(art.id)))}
          />}
        </ProfileInfoLine>
      </ProfileInfoBlock>
    </div>
  );
});

export default EditProfileForm;



interface ProfileInfoBlockProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title: string;
}

export function ProfileInfoBlock({
  children,
  title,
  className,
  ...props
}: ProfileInfoBlockProps) {
  return (
    <div className={`user__info__block ${className}`} {...props}>
      <h3 className="h-xs xbold mb-8">{title}</h3>
      {children}
    </div>
  );
}

type ProfileInfoLineProps = {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
};

export function ProfileInfoLine({
  children,
  title,
  icon,
}: ProfileInfoLineProps) {
  return (
    <div className="profile__infoline tx-gray tx-sm flex g-8 items-center py-8">
      <div className="flex g-8 items-center profile__infoline--title">
        {icon}
        <span>{title}:</span>
      </div>
      <span className="tx-black tx-sm xbold">{children}</span>
    </div>
  );
}
