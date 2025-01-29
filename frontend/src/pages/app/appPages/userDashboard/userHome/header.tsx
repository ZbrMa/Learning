import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/reduxStore";
import { useTranslation } from "react-i18next";
import { Progress } from "../../../../../ui/components/progress/progress";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useGetCountriesQuery } from "../../../../../api/filtersApiSlice";
import { useEffect, useState } from "react";
import { ICountryInfo } from "../../../../../types/places";
import { ExtendedUser } from "../../../../../api/authSlice";
import { UserStatistics } from "./statistics";

function computeProgress(user:ExtendedUser){
  let count = 0;

  const clone = (({ id, token, authChecked,role, ...o }) => o)(user);

  for(const[key,val] of Object.entries(clone)){
    if(key === 'image' && typeof val === 'string' && !val.includes('default')) count++
    else if(key !== 'image' && val) count++;
  };
  const progressPercent = (count / Object.keys(user).length)*100;
  return Math.floor(progressPercent);
};


export function UserHomeHeader() {
    const { t } = useTranslation("app");
    const user  = useSelector((root: RootState) => root.auth);
    const [flag,setFlag] = useState<string>();
  
    const {data:countries} = useGetCountriesQuery();
  
    const getFlag = async (name: string): Promise<ICountryInfo | null> => {
      const response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
      if (response.ok) {
        const data = await response.json();
        return data[0];
      }
      return null;
    };
  
    useEffect(() => {
      if (countries && user.country !== null) {
        const countryString = countries.find((count) => count.id === user.country);
        if (countryString) {
          const fetchFlag = async () => {
            const countryInfo = await getFlag(countryString.name);
            if (countryInfo) {
              setFlag(countryInfo.flags.svg);
            }
          };
          fetchFlag();
        }
      }
    }, [countries,user.country]);
  
    return (
      <div className="user__home__header">
        <div className="user__home__header__inner">
          <div className="profile--img small">
            <img src={user.image} alt="userImage" />
          </div>
  
            <div className="mb-16 user__home__name">
              <div className="flex g-16 items-center">
                <span className="h-lg xbold mb-8">{user.nick}</span>
                {flag &&<img src={flag} alt="countryFlag" className="country-flag"/>}
                
              </div>
              {user.checked ? (
                  <span className="user-checked tx-xs ok flex g-8 items-center fit"><IoCheckmarkDoneOutline/>{t("home.checkedAcc")}</span>
                ):(
                  <span className="user-checked tx-xs nok flex g-8 items-center fit"><IoCloseOutline/>{t("home.checkPending")}</span>
                )}
            
            </div>
              <Progress progress={computeProgress(user)} direction='vertical' label={t("home.profileProgress")}/>
              <UserStatistics />
          </div>
      </div>
    );
  }