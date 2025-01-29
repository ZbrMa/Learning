import { useContext, useState } from "react";
import { Button } from "../../../ui/components/button/button";
import { Input } from "../../../ui/components/input/input";
import { useCreateUserMutation } from "../../../api/userApiSlice";
import { NewUserContext } from "../../../context/registerContext";
import { InfoLine } from "../../../ui/components/infoLine/infoLine";
import { format } from "date-fns";
import { Alert } from "../../../ui/components/alert/alert";
import { useNavigate } from "react-router";
import { useAlert } from "../../../context/alertContext";
import { StepMove } from "../../../ui/components/steps/steps";
import { useTranslation } from "react-i18next";
import { Spinner } from "../../../ui/components/spinner/spinner";

export function RegisterFourthStep() {
  const { t } = useTranslation('logReg');
  const [canSumbit, setCanSubmit] = useState(false);
  const { user, art, country } = useContext(NewUserContext);
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [createUser,{isLoading}] = useCreateUserMutation();

  const handleCreateUser = async () => {
    const response = await createUser(user);
    if (response.error) {
      showAlert(<Alert type="negative">{t('registerFourthStep.registrationFailed')}</Alert>);
    } else if (typeof response.data === 'string') {
      showAlert(<Alert type="negative">{response.data}</Alert>);
    } else {
      showAlert(<Alert type="positive">{t('registerFourthStep.registrationSuccess')}</Alert>);
      navigate("/app/login");
    }
  };

  return (
    <div className="register__step">
      {isLoading && <Spinner/>}
      <p className="text-center tx-grey mb-32 tx-sm">{t('registerFourthStep.checkInfo')}</p>
      <div className="grid-2 g-32">
        <div>
          <InfoLine title={t('registerFourthStep.email')}>{user.email}</InfoLine>
          <InfoLine title={t('registerFourthStep.firstName')}>{user.name}</InfoLine>
          <InfoLine title={t('registerFourthStep.lastName')}>{user.surname}</InfoLine>
          <InfoLine title={t('registerFourthStep.phone')}>{user.phone}</InfoLine>
          <InfoLine title={t('registerFourthStep.birthDate')}>
            {format(user.birth, "dd.MM.yyyy")}
          </InfoLine>
        </div>
        <div>
          <InfoLine title={t('registerFourthStep.nationality')}>{country?.name}</InfoLine>
          <InfoLine title={t('registerFourthStep.city')}>{user.city}</InfoLine>
          <InfoLine title={t('registerFourthStep.address')}>{user.address}</InfoLine>
          <InfoLine title={t('registerFourthStep.groupOrIndividual')}>{user.band}</InfoLine>
          <InfoLine title={t('registerFourthStep.stageName')}>{user.nick}</InfoLine>
        </div>
        <div className="agreement">
          <Input
            type="checkbox"
            labelPosition="out"
            label={t('registerFourthStep.agreement')}
            className="flex g-16"
            onChange={(e) => setCanSubmit(e.target.checked)}
          />
        </div>
      </div>

      <div className="flex g-16 register__btns">
        <StepMove direction={-1} />
        <Button disabled={!canSumbit} onClick={handleCreateUser}>{t('registerFourthStep.finish')}</Button>
      </div>
    </div>
  );
}
