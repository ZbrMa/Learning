import { IoHomeOutline } from "react-icons/io5";
import { Button, IconButton } from "../../../../../ui/components/button/button";
import "./newUser.css";
import { Link } from "react-router-dom";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { StepsContextProvider } from "../../../../../ui/components/steps/stepsContext";
import {
  StepItem,
  StepsBody,
  StepsHeader,
  StepsHeaderItem,
} from "../../../../../ui/components/steps/steps";
import { RegisterFirstStep } from "./firstStep";
import { NewUserContextProvider } from "../../../../../context/registerContext";
import { RegisterSecondStep } from "./secondStep";
import { RegisterThirdStep } from "./thirdStep";
import { RegisterFourthStep } from "./fourthStep";

export function NewUser() {
  return (
    <NewUserContextProvider>
      <div className="register__page">
        <div className="register__background">
          <span className="register__background--left"></span>
          <span className="register__background--right"></span>
        </div>
        <div className="register__nav flex content-space">
          <img src="/images/logo.png" className="register--logo" />
          <Link to="/">
            <IconButton variant="ternary">
              <IoHomeOutline />
            </IconButton>
          </Link>
        </div>
        <div className="register__layout py-64 box">
          <div className="register__inner box">
            <StepsContextProvider>
              <div className="register__left flex-col content-space items-center tx-white">
                <h1 className="tx-white h-lg bold">Nový uživatel</h1>
                <StepsHeader direction="vertical">
                  <StepsHeaderItem value={0}>
                    <RiNumber1 /> Přihlašovací údaje
                  </StepsHeaderItem>
                  <StepsHeaderItem value={1}>
                    <RiNumber2 /> Kontaktní údaje
                  </StepsHeaderItem>
                  <StepsHeaderItem value={2}>
                    <RiNumber3 /> Detaily
                  </StepsHeaderItem>
                  <StepsHeaderItem value={3}>
                    <RiNumber4 /> Obchodní podmínky
                  </StepsHeaderItem>
                </StepsHeader>
                <div className="flex g-32 pt-16 items-center register__bottom">
                  <span className="tx-gray">Už máš účet?</span>
                  <Link to={"/login"}>
                    <Button
                      variant="link"
                      className="xbold"
                      style={{ color: "var(--white)", padding:'0' }}
                    >
                      Přihlásit se
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="register__right">
                <StepsBody>
                  <StepItem value={0} id="register-first">
                    <RegisterFirstStep/>
                  </StepItem>
                  <StepItem value={1}  id="register-second">
                    <RegisterSecondStep />
                  </StepItem>
                  <StepItem value={2}  id="register-third">
                    <RegisterThirdStep />
                  </StepItem>
                  <StepItem value={3}  id="register-fourth">
                    <RegisterFourthStep/>
                  </StepItem>
                </StepsBody>
              </div>
            </StepsContextProvider>
          </div>
        </div>
      </div>
    </NewUserContextProvider>
  );
}
