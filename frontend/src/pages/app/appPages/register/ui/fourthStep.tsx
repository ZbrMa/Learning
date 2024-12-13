import { useContext, useState } from "react";
import { Button } from "../../../../../ui/components/button/button";
import { Input } from "../../../../../ui/components/input/input";
import { useCreateUserMutation } from "../../../../../api/userApiSlice";
import { NewUserContext } from "../../../../../context/registerContext";
import { InfoLine } from "../../../../../ui/components/infoLine/infoLine";
import { format } from "date-fns";
import { Alert } from "../../../../../ui/components/alert/alert";
import { useNavigate } from "react-router";
import { useAlert } from "../../../../../context/alertContext";
import { StepMove } from "../../../../../ui/components/steps/steps";

export function RegisterFourthStep() {
  const [canSumbit, setCanSubmit] = useState(false);
  const { user,art,country } = useContext(NewUserContext);
  const navigate = useNavigate();
  const {showAlert} = useAlert();

  const [createUser] = useCreateUserMutation();

  const handleCreateUser = async() => {
    const response = await(createUser(user));
    if(response.error){
      showAlert(<Alert type="negative">Registrace se nezdařila. Zkuste to později.</Alert>);
    } else if (typeof response.data === 'string'){
      showAlert(<Alert type="negative">{response.data}</Alert>);
    } else {
      showAlert(<Alert type="positive">Učet byl vytvořen. Nyní se můžeš přihlásit.</Alert>);
      navigate("/app/login");
    }
  };

  return (
    <div className="register__step">
      <p className="text-center tx-grey mb-32 tx-sm">Vše ještě jednou zkontroluj</p>
      <div className="grid-2 g-32">
        <div>
          <InfoLine title="E-mail">{user.email}</InfoLine>
          <InfoLine title="Jméno">{user.name}</InfoLine>
          <InfoLine title="Příjmení">{user.surname}</InfoLine>
          <InfoLine title="Telefon">{user.phone}</InfoLine>
          <InfoLine title="Datum narození">
            {format(user.birth, "dd.MM.yyyy")}
          </InfoLine>
        </div>
        <div>
          <InfoLine title="Národnost">{country?.name}</InfoLine>
          <InfoLine title="Město">{user.city}</InfoLine>
          <InfoLine title="Adresa">{user.address}</InfoLine>
          <InfoLine title="Skupina/ jednotlivec">{user.band}</InfoLine>
          <InfoLine title="Oblast zájmu">{art?.name}</InfoLine>
          <InfoLine title="Umělecké jméno">{user.nick}</InfoLine>
        </div>
        <div className="agreement">
          <Input
            type="checkbox"
            labelPosition="out"
            label="Souhlasím s prodejem své duše"
            className="flex g-16"
            onChange={(e) => setCanSubmit(e.target.checked)}
          />
        </div>
      </div>

      <div className="flex g-16 register__btns">
        <StepMove direction={-1}/>
        <Button disabled={!canSumbit} onClick={handleCreateUser}>Dokončit</Button>
      </div>
    </div>
  );
}
