import { useContext, useEffect, useState } from "react";
import { NewUserContext } from "../../../context/registerContext";
import { INewUser } from "../../../types/users";
import { Input } from "../../../ui/components/input/input";
import { useCheckEmailMutation } from "../../../api/userApiSlice";
import { Alert } from "../../../ui/components/alert/alert";
import { useAlert } from "../../../context/alertContext";
import { StepMove } from "../../../ui/components/steps/steps";
import { StepsContext } from "../../../ui/components/steps/stepsContext";

type Props = {
  moveForward: () => void;
};

export function RegisterFirstStep() {
  const [next, setNext] = useState(false);

  const { user, setUser } = useContext(NewUserContext);
  const {setActive} = useContext(StepsContext);
  const [checkEmail] = useCheckEmailMutation();
  const {showAlert} = useAlert();

  const handleInputChange = (key: keyof INewUser, value: string) => {
    const updatedUser: INewUser = {
      ...user,
      [key]: value,
    };
    setUser(updatedUser);
    validateInputs(updatedUser);
  };

  const validateInputs = (updatedUser: INewUser) => {
    const isEmailValid =
      updatedUser.email.trim() !== "" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedUser.email);
    const isPasswordValid =
      updatedUser.password.trim().length >= 8 &&
      /[!@#$%^&*(),.?":{}|<>]/.test(updatedUser.password);

    setNext(isEmailValid && isPasswordValid);
  };

  useEffect(()=>{
    validateInputs(user);
  },[]);

  const handleMoveForward = async() => {
    const response = await checkEmail({email:user.email});
    if (response.error) {
      showAlert(<Alert type='negative'>Chyba serveru. Zkuste to později.</Alert>);
    } else if (response.data === false) {
      showAlert(<Alert type='negative'>Tento e-mail již někdo používá.</Alert>);
    } else {
      setActive(prevActive => prevActive + 1);
    }
  };

  return (
    <div className="register__step flex-col g-16">
      <p className="text-center tx-gray mb-32 tx-md">Tyto údaje budeš používat k přihlašování.</p>
      <Input
        onChange={(e) => handleInputChange("email", e.target.value)}
        label="E-mail"
        labelPosition="out"
        placeholder="Zadej e-mail..."
        type="email"
        required
        defaultValue={user.email}
        autoComplete="new-password"
      />
      <Input
        onChange={(e) => handleInputChange("password", e.target.value)}
        label="Heslo"
        labelPosition="out"
        placeholder="Zadej heslo..."
        type="password"
        required
        defaultValue={user.password}
        autoComplete="new-password"
      />
      <div className="register__btns flex g-16">
        <StepMove direction={1} disabled={!next} onMove={handleMoveForward}/>
      </div>
    </div>
  );
}
