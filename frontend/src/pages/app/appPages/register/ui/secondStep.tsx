import { useContext, useEffect, useState } from "react";
import { NewUserContext } from "../../../../../context/registerContext";
import { INewUser } from "../../../../../types/users";
import { Input } from "../../../../../ui/components/input/input";
import { addYears, differenceInYears, format } from "date-fns";
import { StepMove } from "../../../../../ui/components/steps/steps";

export function RegisterSecondStep() {
  const [next, setNext] = useState(false);

  const { user, setUser } = useContext(NewUserContext);

  const handleInputChange = (key: keyof INewUser, value: string | number) => {
    const updatedUser: INewUser = {
    ...user,
      [key]: value,
    };
    setUser(updatedUser);
    validateInputs(updatedUser);
  };

  const validateInputs = (updatedUser: INewUser) => {
    const isNameValid = updatedUser.name.trim().length > 1;
    const isSurnameValid = updatedUser.surname.trim().length > 1;
    const isPhoneValid = updatedUser.phone.trim().length > 1;
    const isDateValid = differenceInYears(new Date(), updatedUser.birth) >= 18;
    const isTownValid = updatedUser.city.trim().length > 1;
    const isAddressValid = updatedUser.address.trim().length > 1;

    setNext(isNameValid && isSurnameValid && isPhoneValid && isDateValid && isTownValid && isAddressValid);
  };

  useEffect(() => {
    validateInputs(user);
  }, []);

  return (
    <div className="register__step ">
      <p className="text-center tx-gray mb-32 tx-md">Tvé kontaktní údaje nebo kontakní osoby.</p>
      <div className="grid-2 g-32">
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("name", e.target.value)}
          label="Jméno"
          type="text"
          placeholder="Zadej jméno..."
          required
          defaultValue={user.name}
        />
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("surname", e.target.value)}
          label="Příjmení"
          type="text"
          placeholder="Zadej příjmení..."
          required
          defaultValue={user.surname}
        />
        <Input
          labelPosition="out"
          onChange={(e) =>
            handleInputChange("birth", format(e.target.value, "yyyy-MM-dd"))
          }
          label="Datum narození"
          type="date"
          placeholder="Zadej datum narození..."
          required
          defaultValue={format(addYears(new Date,-18),'yyyy-MM-dd')}
          max={format(addYears(new Date,-18),'yyyy-MM-dd')}
        />
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("phone", e.target.value)}
          label="Telefon"
          type="phone"
          placeholder="Zadej telefonní číslo..."
          required
          defaultValue={user.phone}
        />
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("city", e.target.value)}
          label="Město"
          type="text"
          placeholder="Zadej město..."
          required
          defaultValue={user.city}
        />

        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("address", e.target.value)}
          label="Adresa"
          type="text"
          placeholder="Zadej adresu..."
          required
          defaultValue={user.address}
        />
      </div>
      <div className="flex g-16 register__btns">
        <StepMove direction={-1}/>
        <StepMove direction={1} disabled={!next}/>
      </div>
    </div>
  );
}
