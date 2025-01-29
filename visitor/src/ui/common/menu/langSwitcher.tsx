import { DropdownMenu } from "../../components/dropdownMenu/dropdownMenu";
import { IconButton } from "../../components/button/button";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { setLang } from "../../../redux/languageSlice";

export function LangSwitcher() {
  const { lang } = useSelector((root: RootState) => root.lang);
  const dispatch = useDispatch();

  const handleLangChange = (lang:'cs'|'en'|'de') => {
    dispatch(setLang(lang));
  };

  return (  
    <DropdownMenu
          options={[
            { label: "cs", onClick: () => handleLangChange('cs') },
            { label: "en", onClick: () => handleLangChange('en') },
            { label: "de", onClick: () => handleLangChange('de') }
          ]}
        >
          <IconButton
            variant="secondary"
            style={{ fontSize: "1.2rem", fontWeight: "500" }}
          >
            {lang}
          </IconButton>
        </DropdownMenu>
  );

}
