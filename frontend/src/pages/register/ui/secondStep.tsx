import { useContext, useEffect, useState } from "react";
import { NewUserContext } from "../../../context/registerContext";
import { INewUser } from "../../../types/users";
import { Input, MyPhoneInput } from "../../../ui/components/input/input";
import { addYears, differenceInYears, format } from "date-fns";
import { StepMove } from "../../../ui/components/steps/steps";
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-input-2'

export function RegisterSecondStep() {
  const { t } = useTranslation('logReg');
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

  useEffect(() => {
    console.log(user.phone);
  }, [user.phone]);

  return (
    <div className="register__step ">
      <p className="text-center tx-gray mb-32 tx-md">{t('registerSecondStep.infoText')}</p>
      <div className="grid-2 g-32">
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("name", e.target.value)}
          label={t('registerSecondStep.nameLabel')}
          type="text"
          placeholder={t('registerSecondStep.namePlaceholder')}
          required
          defaultValue={user.name}
        />
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("surname", e.target.value)}
          label={t('registerSecondStep.surnameLabel')}
          type="text"
          placeholder={t('registerSecondStep.surnamePlaceholder')}
          required
          defaultValue={user.surname}
        />
        <Input
          labelPosition="out"
          onChange={(e) =>
            handleInputChange("birth", e.target.value)
          }
          label={t('registerSecondStep.birthLabel')}
          type="date"
          placeholder={t('registerSecondStep.birthPlaceholder')}
          required
          defaultValue={format(user.birth, 'yyyy-MM-dd')}
          max={format(addYears(new Date, -18), 'yyyy-MM-dd')}
          onKeyDown={(e)=>e.preventDefault()}
        />
        <MyPhoneInput
          changeEvent={(formattedValue) =>
            handleInputChange("phone", formattedValue)
          }
          labelPosition="out"
          label={t('registerSecondStep.phoneLabel')}
          required
          defaultValue={user.phone}
        />
        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("city", e.target.value)}
          label={t('registerSecondStep.cityLabel')}
          type="text"
          placeholder={t('registerSecondStep.cityPlaceholder')}
          required
          defaultValue={user.city}
        />

        <Input
          labelPosition="out"
          onChange={(e) => handleInputChange("address", e.target.value)}
          label={t('registerSecondStep.addressLabel')}
          type="text"
          placeholder={t('registerSecondStep.addressPlaceholder')}
          required
          defaultValue={user.address}
        />
        
      </div>
      <div className="flex g-16 register__btns">
        <StepMove direction={-1} />
        <StepMove direction={1} disabled={!next} />
      </div>
    </div>
  );
}
