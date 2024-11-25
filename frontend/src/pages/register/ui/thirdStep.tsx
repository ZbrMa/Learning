import { useContext, useEffect, useState } from "react";
import { NewUserContext } from "../../../context/registerContext";
import { INewUser } from "../../../types/users";
import { Input } from "../../../ui/components/input/input";
import { MySelect } from "../../../ui/components/select/select";
import { IOption } from "../../../types/form";
import { useGetArtsQuery } from "../../../api/filtersApiSlice";
import { useCheckNickMutation } from "../../../api/userApiSlice";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../../ui/components/alert/alert";
import { useGetCountriesQuery } from "../../../api/filtersApiSlice";
import { StepsContext } from "../../../ui/components/steps/stepsContext";
import { StepMove } from "../../../ui/components/steps/steps";

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

export function RegisterThirdStep() {
  const [next, setNext] = useState(false);

  const { user, setUser } = useContext(NewUserContext);
  const { data: arts } = useGetArtsQuery();
  const [checkNick] = useCheckNickMutation();
  const {data:countries} = useGetCountriesQuery();
  const {showAlert} = useAlert();
  const {setActive} = useContext(StepsContext);

  const handleInputChange = (key: keyof INewUser, value: string | number) => {
    const updatedUser: INewUser = {
      ...user,
      [key]: value,
    };
    setUser(updatedUser);
    validateInputs(updatedUser);
  };

  const validateInputs = (updatedUser: INewUser) => {
    console.log(updatedUser);
    const isBandValid = updatedUser.band.trim().length > 1;
    const isNickValid = updatedUser.nick.trim().length > 1;
    const isCountryValid = updatedUser.country !== 0;

    setNext(isBandValid && isNickValid && isCountryValid);
  };

  useEffect(()=>{
    validateInputs(user);
  },[]);

  const handleMoveForward = async() => {
    const response = await checkNick({nick:user.nick});
    if (response.error) {
      showAlert(<Alert type='negative'>Chyba serveru. Zkuste to později.</Alert>);
    } else if (response.data === false) {
      showAlert(<Alert type='negative'>Toto umělecké jméno již někdo používá.</Alert>);
    } else {
      setActive(prev=>prev+1);
    }
  };

  return (
    <div className="register__step">
      <p className="text-center tx-gray mb-32 tx-md">Bonusové údaje</p>
      <div className="grid-2 g-32">
      <MySelect
        placeholder="Jsi sám nebo je vás víc?"
        defaultValue={user.band}
        returnSelected={(e) => handleInputChange("band", e)}
        options={bandOptions}
        label="Skupina/jedinec"
        required
      />
         <MySelect
              options={
                countries?.map((country) => ({ value: country.id, label: country.name })) || []
              }
              placeholder="Národnost"
              hasSearchBar
              label="Národnost"
              returnSelected={(e) => handleInputChange("country", e)}
              required
            />
      <Input
        onChange={(e) => handleInputChange("nick", e.target.value)}
        label="Jak si říkáš/říkáte"
        type="text"
        required
        defaultValue={user.nick}
        placeholder="Zadej umělecké jméno..."
        labelPosition="out"
      />
      <MySelect
        placeholder="Vyber, co děláš/děláte"
        label="Druh buskingu"
        defaultValue={user.art}
        returnSelected={(e) => handleInputChange("art", e)}
        options={arts?.map((art) => ({ value: art.id, label: art.name })) || []}
        required
      />
      </div>
      <div className="flex g-16 register__btns">
        <StepMove direction={-1}/>
        <StepMove direction={1} disabled={!next}/>
      </div>
    </div>
  );
}
