import { useDispatch, useSelector } from "react-redux";
import { IOption } from "../../../../types/form";
import { RootState } from "../../../../store/userStore";
import "./editProfileForm.css";
import { useEffect, useState } from "react";
import { Input } from "../../../components/input/input";
import { InfoLine } from "../../../components/infoLine/infoLine";
import { formatDate } from "date-fns";
import { MySelect } from "../../../components/select/select";
import { Textarea } from "../../../components/textarea/textarea";
import { IEditableUser, IUser } from "../../../../types/users";
import { useEditUserMutation } from "../../../../api/userApiSlice";
import { Button } from "../../../components/button/button";
import { Alert } from "../../../components/alert/alert";
import { IoPencilOutline, IoCheckmarkDoneOutline } from "react-icons/io5";
import { useGetArtsQuery, useGetCountriesQuery } from "../../../../api/filtersApiSlice";
import { useAlert } from "../../../../context/alertContext";

const bandOptions: IOption[] = [
  {
    label: "Solitare",
    value: "solitare",
  },
  {
    label: "Skupina",
    value: "skupina",
  },
];

type EditProfileFormProps = {
  user:Omit<IUser,'inserted'>,
}

export function EditProfileForm({user}:EditProfileFormProps) {
  const { data: arts } = useGetArtsQuery();
  const {data:countries} = useGetCountriesQuery();
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const { showAlert } = useAlert();
  const {
    id,
    nick,
    phone,
    country,
    city,
    address,
    facebook,
    instagram,
    twitter,
    website,
    band,
    art,
    description,
  } = user;

  useEffect(()=>{
    const {
      id,
      nick,
      phone,
      country,
      city,
      address,
      facebook,
      instagram,
      twitter,
      website,
      band,
      art,
      description,
    } = user;
    setFormUser({
      id,
      nick,
      phone,
      country,
      city,
      address,
      facebook,
      instagram,
      twitter,
      website,
      band,
      art,
      description,
    })
  },[user]);
  const [triggerEdit, { data: editResponse }] = useEditUserMutation();
  const [formUser, setFormUser] = useState<Omit<IEditableUser, "image">>({
    id,
    phone,
    nick,
    country,
    city,
    address,
    facebook,
    instagram,
    twitter,
    website,
    band,
    art,
    description,
  });

  const handleInputChange = (
    param: keyof IEditableUser,
    selected: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormUser((prev) => ({
      ...prev,
      [param]: selected.target.value,
    }));
  };

  const handleSelectChange = (
    param: keyof Omit<IEditableUser, "image">,
    selected: string | number
  ) => {
    setFormUser((prev) => {
      if (prev[param] === selected) return prev;
      return {
        ...prev,
        [param]: selected,
      };
    });
  };

  const handleSave = async () => {
    try {
      await triggerEdit(formUser);
    } catch (err) {
      console.error("Error while editing:", err);
    }
  };

  const handleEdit = async () => {
    const response = await triggerEdit(formUser);
    if (response.error) {
      showAlert(
        <Alert type="negative">
          Úpravy se nepodařilo uložit. Zkuste to později.
        </Alert>
      );
    } else {
      showAlert(<Alert type="positive">Úpravy byly úspěšně uloženy</Alert>);
    }
  };

  return (
    <div className="profile__details">
      <div className="profile__header flex pb-16 mb-16 g-32 items-center">
        <h1 className="h-xl xbold">{user.nick}</h1>
        {editable ? (
          <Button
            onClick={handleSave}
            style={{ fontSize: "1rem", padding: "8px", height: "fit-content" }}
            variant="ternary"
          >
            <IoCheckmarkDoneOutline />
            Uložit
          </Button>
        ) : (
          <Button
            onClick={() => setEditable(true)}
            style={{ fontSize: "1rem", padding: "8px", height: "fit-content" }}
            variant="ternary"
          >
            <IoPencilOutline />
            Upravit
          </Button>
        )}
      </div>

      <form className="profile__form">
        <div className="profile__form__left">
          <h3 className="h-md pb-16">Kontaktní údaje</h3>
          <InfoLine title="Jméno">
            {user.name} {user.surname}
          </InfoLine>
          <Input
            disabled={!editable}
            defaultValue={formUser.city}
            labelPosition="out"
            label="Město"
            type="text"
            onChange={(e) => handleInputChange("city", e)}
          ></Input>
          <Input
            disabled={!editable}
            defaultValue={formUser.address}
            labelPosition="out"
            label="Adresa"
            type="text"
            onChange={(e) => handleInputChange("address", e)}
          ></Input>
          <Input
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.phone}
            label="Telefon"
            type="tel"
            onChange={(e) => handleInputChange("phone", e)}
          ></Input>
        </div>
        <div className="profile__form__center">
          <h3 className="h-md pb-16">Sociální sítě</h3>
          <Input
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.facebook}
            label="Facebook"
            type="text"
            onChange={(e) => handleInputChange("facebook", e)}
          ></Input>
          <Input
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.instagram}
            label="Instagram"
            type="text"
            onChange={(e) => handleInputChange("instagram", e)}
          ></Input>
          <Input
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.twitter}
            label="Twitter"
            type="text"
            onChange={(e) => handleInputChange("twitter", e)}
          ></Input>
          <Input
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.website}
            label="Web"
            type="text"
            onChange={(e) => handleInputChange("website", e)}
          ></Input>
        </div>
        <div className="profile__form__right">
          <h3 className="h-md pb-16">O mně/nás</h3>
          <InfoLine title="Narození">
            {user.birth && formatDate(user.birth, "dd.MM.yyy")}
          </InfoLine>
          <InfoLine title="Pohlaví">
            <MySelect
              isDisabled={!editable}
              defaultValue={formUser.band}
              options={bandOptions}
              placeholder="Skupina"
              returnSelected={(e) => handleSelectChange("band", e)}
            />
          </InfoLine>
          <InfoLine title="Co dělám/e">
            <MySelect
              isDisabled={!editable}
              defaultValue={formUser.art}
              placeholder="Co dělám/e"
              options={
                arts?.map((art) => ({ value: art.id, label: art.name })) || []
              }
              returnSelected={(e) => handleSelectChange("art", e)}
            />
          </InfoLine>
          <InfoLine title="Národnost">
            <MySelect
              isDisabled={!editable}
              defaultValue={formUser.country}
              options={
                countries?.map((country) => ({ value: country.id, label: country.name })) || []
              }
              placeholder="Národnost"
              hasSearchBar
              returnSelected={(e) => handleSelectChange("country", e)}
            />
          </InfoLine>
        </div>
        <div style={{ gridColumn: "span 3", marginTop: "32px" }}>
          <Textarea
            disabled={!editable}
            labelPosition="out"
            defaultValue={formUser.description}
            label="O mně"
            onChange={(e) => handleInputChange("description", e)}
          ></Textarea>
        </div>
      </form>
    </div>
  );
}
