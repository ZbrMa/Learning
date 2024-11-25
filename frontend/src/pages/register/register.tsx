import { Button } from "../../ui/components/button/button";
import { Layout } from "../layout";
import "../login/login.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store/userStore";
import { logout } from "../../api/authSlice";
import { useSelector } from "react-redux";
import { BodyBlock } from "../../ui/blocks/bodyBlock/bodyBlock";
import { NewUser } from "./ui/newUser";

export function Register(){
    const token = useSelector((root: RootState) => root.auth.token);
    const dispatch = useDispatch<AppDispatch>();

  if (token) {
    return(
      <Layout>
        <BodyBlock style={{paddingTop:'32px'}}>
              <p>Již je někdo přihlášen</p>
              <Button
                variant="secondary"
                className="xbold tx-sm"
                onClick={() => dispatch(logout())}
              >
                Odhlásit se
              </Button>
        </BodyBlock>
      </Layout>
    );
  }

  return <NewUser/>
  
};
  