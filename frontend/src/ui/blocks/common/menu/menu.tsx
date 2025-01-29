import {
  IoHomeOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { IconButton } from "../../../components/button/button";
import { DropdownMenu } from "../../../components/dropdownMenu/dropdownMenu";
import "./menu.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reduxStore";
import { logout } from "../../../../api/authSlice";
import { IoCalendarOutline } from "react-icons/io5";
import { setLang } from "../../../../redux/languageSlice";
import { useTranslation } from 'react-i18next';
import { ILang } from "../../../../types/filtersTypes";
import { HiOutlineMicrophone } from "react-icons/hi2";

type MenuProps = {
  button:React.ReactNode,
};

export function Menu({ button }: MenuProps) {
  const { t } = useTranslation('common');
  const { token, role, id } = useSelector((root: RootState) => root.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang } = useSelector((root: RootState) => root.lang);

  const handleLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("tokenExpiry");
    navigate("/");
  };

  const handleLangChange = (e: ILang) => {
    dispatch(setLang(e.lang));
  };

  return (
    <header>
      <div className="nav__right">
        <DropdownMenu
          options={[
            { label: "cs", onClick: () => handleLangChange({lang:'cs'}) },
            { label: "en", onClick: () => handleLangChange({lang:'en'}) },
            { label: "de", onClick: () => handleLangChange({lang:'de'}) }
          ]}
        >
          <IconButton
          
            style={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {lang}
          </IconButton>
        </DropdownMenu>

        
      </div>
      {!token && button}
    </header>
  );
}
