import { IconButton } from "../../../components/button/button";
import { DropdownMenu } from "../../../components/dropdownMenu/dropdownMenu";
import "./menu.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/reduxStore";
import { setLang } from "../../../../redux/languageSlice";
import { TLang } from "../../../../types/filtersTypes";

type MenuProps = {
  button: React.ReactNode;
};

export function Menu({ button }: MenuProps) {
  const dispatch = useDispatch();
  const { lang } = useSelector((root: RootState) => root.lang);

  const handleLangChange = (e: TLang) => {
    dispatch(setLang(e));
  };

  return (
    <header>
      <div className="nav__right">
        <DropdownMenu
          id="lang-switcher-home"
          options={["cs", "en", "de"]
            .filter((item) => item !== lang)
            .map((mapped) => ({
              label: mapped,
              onClick: () => handleLangChange(mapped as TLang),
            }))}
        >
          <IconButton style={{ fontSize: "1.2rem", fontWeight: "500" }}>
            {lang}
          </IconButton>
        </DropdownMenu>
      </div>
      {button}
    </header>
  );
}
