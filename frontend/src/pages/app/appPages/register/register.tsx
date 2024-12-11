import { Button } from "../../../../ui/components/button/button";
import { VisitorLayout } from "../../../visitor/visitorLayout";
import "../login/login.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../store/userStore";
import { logout } from "../../../../api/authSlice";
import { useSelector } from "react-redux";
import { BodyBlock } from "../../../../ui/blocks/common/bodyBlock/bodyBlock";
import { NewUser } from "./ui/newUser";

export function Register(){
    const token = useSelector((root: RootState) => root.auth.token);
    const dispatch = useDispatch<AppDispatch>();

  if (token) {
    return(
      <VisitorLayout>
        <BodyBlock style={{paddingTop:'32px',alignContent:'center', minHeight:'calc(100vh - 64px)'}}>
              <div className="m-auto w-fit h-full flex-col items-center content-center">
              <p className="mb-32">Již je někdo přihlášen</p>
              <Button
                variant="secondary"
                className="xbold tx-sm"
                onClick={() => dispatch(logout())}
              >
                Odhlásit se
              </Button>
              </div>
              
        </BodyBlock>
      </VisitorLayout>
    );
  }

  return <NewUser/>
  
};
  