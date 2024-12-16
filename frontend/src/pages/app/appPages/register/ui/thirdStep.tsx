import { useContext, useEffect, useState } from "react";
import { NewUserContext } from "../../../../../context/registerContext";
import { INewUser } from "../../../../../types/users";
import { Input } from "../../../../../ui/components/input/input";
import { MySelect } from "../../../../../ui/components/select/select";
import { IOption } from "../../../../../types/form";
import { useCheckNickMutation } from "../../../../../api/userApiSlice";
import { useAlert } from "../../../../../context/alertContext";
import { Alert } from "../../../../../ui/components/alert/alert";
import { StepsContext } from "../../../../../ui/components/steps/stepsContext";
import { StepMove } from "../../../../../ui/components/steps/steps";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation('logReg');
  const [next, setNext] = useState(false);

  const { user, setUser, arts, countries, country, art } = useContext(NewUserContext);
  const [checkNick] = useCheckNickMutation();
  const { showAlert } = useAlert();
  const { setActive } = useContext(StepsContext);

  const handleInputChange = (key: keyof INewUser, value: string | number) => {
    const updatedUser: INewUser = {
      ...user,
      [key]: value,
    };
    setUser(updatedUser);
    validateInputs(updatedUser);
  };

  const validateInputs = (updatedUser: INewUser) => {
    const isBandValid = updatedUser.band.trim().length > 1;
    const isNickValid = updatedUser.nick.trim().length > 1;
    const isCountryValid = !!country;
    const isArtValid = !!art;

    setNext(isBandValid && isNickValid && isCountryValid && isArtValid);
  };

  useEffect(() => {
    validateInputs(user);
  }, []);

  const handleMoveForward = async () => {
    const response = await checkNick({ nick: user.nick });
    if (response.error) {
      showAlert(<Alert type="negative">{t('registerThirdStep.serverError')}</Alert>);
    } else if (response.data === false) {
      showAlert(<Alert type="negative">{t('registerThirdStep.nickTaken')}</Alert>);
    } else {
      setActive(prev => prev + 1);
    }
  };

  return (
    <div className="register__step">
      <p className="text-center tx-gray mb-32 tx-md">{t('registerThirdStep.infoText')}</p>
      <div className="grid-2 g-32">
        <MySelect
          placeholder={t('registerThirdStep.bandPlaceholder')}
          defaultValue={user.band}
          returnSelected={(e) => handleInputChange("band", e)}
          options={bandOptions}
          label={t('registerThirdStep.bandLabel')}
          required
        />
        <MySelect
          options={
            countries?.map((country) => ({ value: country.id, label: country.name })) || []
          }
          placeholder={t('registerThirdStep.countryPlaceholder')}
          hasSearchBar
          label={t('registerThirdStep.countryLabel')}
          returnSelected={(e) => handleInputChange("country", e)}
          defaultValue={user.country}
          required
        />
        <Input
          onChange={(e) => handleInputChange("nick", e.target.value)}
          label={t('registerThirdStep.nickLabel')}
          type="text"
          required
          defaultValue={user.nick}
          placeholder={t('registerThirdStep.nickPlaceholder')}
          labelPosition="out"
        />
        <MySelect
          placeholder={t('registerThirdStep.artPlaceholder')}
          label={t('registerThirdStep.artLabel')}
          defaultValue={user.art}
          returnSelected={(e) => handleInputChange("art", e)}
          options={arts?.map((art) => ({ value: art.id, label: art.name })) || []}
          required
        />
      </div>
      <div className="flex g-16 register__btns">
        <StepMove direction={-1} />
        <StepMove direction={1} disabled={!next} onMove={handleMoveForward} />
      </div>
    </div>
  );
}
