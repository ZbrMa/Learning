import { useState, useEffect,forwardRef, useImperativeHandle } from "react";
import { Input } from "../../../components/input/input";
import { MySelect } from "../../../components/select/select";
import { useEditUserMutation } from "../../../../api/userApiSlice";
import { useGetArtsQuery, useGetCountriesQuery } from "../../../../api/filtersApiSlice";
import { format } from "date-fns";
import { IoMailOutline, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io5";
import { MdPhone } from "react-icons/md";
import { PiCity, PiHouse } from "react-icons/pi";
import { LuBaby } from "react-icons/lu";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoFlag, IoMaleFemale } from "react-icons/io5";
import { ProfileInfoBlock,ProfileInfoLine } from "../../userPage/userPage";
import { useAlert } from "../../../../context/alertContext";
import { Alert } from "../../../components/alert/alert";
import { ExtendedUser } from "../../../../api/authSlice";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../../../api/authSlice";
import './editProfileForm.css';

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

  useEffect(() => {
    setFormUser(user);
  }, [user]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormUser((prev) => ({ ...prev, [field]: value }));
  };

  useImperativeHandle(ref, () => ({
    async handleSave() {
      const response = await triggerEdit(formUser);
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
      <ProfileInfoBlock title="Kontaktní údaje">
        <ProfileInfoLine title="E-mail" icon={<IoMailOutline />}>
          {user.email}
        </ProfileInfoLine>
        <ProfileInfoLine title="Telefon" icon={<MdPhone />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title="Město" icon={<PiCity />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title="Adresa" icon={<PiHouse />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          />
        </ProfileInfoLine>
      </ProfileInfoBlock>

      <ProfileInfoBlock title="Sociální sítě">
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
        <ProfileInfoLine title="Web" icon={<IoMailOutline />}>
          <Input
            disabled={!editable}
            defaultValue={formUser.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
          />
        </ProfileInfoLine>
      </ProfileInfoBlock>

      <ProfileInfoBlock title="Osobní údaje">
        <ProfileInfoLine title="Datum narození" icon={<LuBaby />}>
            {format(new Date(formUser.birth), "dd.MM.yyyy")}
        </ProfileInfoLine>
        <ProfileInfoLine title="Národnost" icon={<IoFlag />}>
          <MySelect
            isDisabled={!editable}
            defaultValue={formUser.country}
            options={countries?.map((c) => ({ value: c.id, label: c.name })) || []}
            returnSelected={(e) => handleInputChange("country", e)}
          />
        </ProfileInfoLine>
        <ProfileInfoLine title="Skupina" icon={<HiOutlineUserGroup />}>
          <MySelect
            isDisabled={!editable}
            defaultValue={formUser.band}
            options={[
              { value: "solitare", label: "Solitare" },
              { value: "skupina", label: "Skupina" },
            ]}
            returnSelected={(e) => handleInputChange("band", e)}
          />
        </ProfileInfoLine>
      </ProfileInfoBlock>
    </div>
  );
});

export default EditProfileForm;
