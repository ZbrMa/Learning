import { Button } from "../../../ui/components/button/button";
import "./newUser.css";
import { Link } from "react-router-dom";
import { RiNumber1, RiNumber2, RiNumber3, RiNumber4 } from "react-icons/ri";
import { StepsContextProvider } from "../../../ui/components/steps/stepsContext";
import {
  StepItem,
  StepsBody,
  StepsHeader,
  StepsHeaderItem,
} from "../../../ui/components/steps/steps";
import { RegisterFirstStep } from "./firstStep";
import { NewUserContextProvider } from "../../../context/registerContext";
import { RegisterSecondStep } from "./secondStep";
import { RegisterThirdStep } from "./thirdStep";
import { RegisterFourthStep } from "./fourthStep";
import { useTranslation } from "react-i18next";
import { Layout } from "../../../ui/blocks/common/layout/layout";
import { LuPlus } from "react-icons/lu";

export function NewUser() {
  const { t } = useTranslation("logReg");

  return (
    <NewUserContextProvider>
      <StepsContextProvider>
        <Layout
        id="register"
          button={
            <Link to="/login" className="xbold">
              <Button>
                <LuPlus />
                Přihlásit se
              </Button>
            </Link>
          }
          left={
            <div className="register__left flex-col content-space items-center tx-white">
              <h1 className="tx-white h-lg bold">{t("register.header")}</h1>
              <StepsHeader direction="vertical">
                <StepsHeaderItem value={0}>
                  <RiNumber1 /> {t("register.step1")}
                </StepsHeaderItem>
                <StepsHeaderItem value={1}>
                  <RiNumber2 /> {t("register.step2")}
                </StepsHeaderItem>
                <StepsHeaderItem value={2}>
                  <RiNumber3 /> {t("register.step3")}
                </StepsHeaderItem>
                <StepsHeaderItem value={3}>
                  <RiNumber4 /> {t("register.step4")}
                </StepsHeaderItem>
              </StepsHeader>
              <div className="flex g-32 pt-16 items-center register__bottom">
                <span className="tx-gray">
                  {t("register.alreadyHaveAccount")}
                </span>
                <Link to={"/login"}>
                  <Button
                    variant="link"
                    className="xbold"
                    style={{ color: "var(--white)", padding: "0" }}
                  >
                    {t("register.login")}
                  </Button>
                </Link>
              </div>
            </div>
          }
          right={
            <div className="register__right">
              <StepsBody>
                <StepItem value={0} id="register-first">
                  <RegisterFirstStep />
                </StepItem>
                <StepItem value={1} id="register-second">
                  <RegisterSecondStep />
                </StepItem>
                <StepItem value={2} id="register-third">
                  <RegisterThirdStep />
                </StepItem>
                <StepItem value={3} id="register-fourth">
                  <RegisterFourthStep />
                </StepItem>
              </StepsBody>
            </div>
          }
        />
      </StepsContextProvider>
    </NewUserContextProvider>
  );
}
