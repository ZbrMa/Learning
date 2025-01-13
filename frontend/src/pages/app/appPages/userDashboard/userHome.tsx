import { useSelector } from "react-redux";
import { UserDashboard } from "./userDashboard";
import { RootState } from "../../../../store/reduxStore";
import { format, startOfISOWeek } from "date-fns";
import { cs } from "date-fns/locale";
import { useGetIncommingNotificationsQuery } from "../../../../api/notificationApiSlice";
import { Spinner } from "../../../../ui/components/spinner/spinner";
import { NotificationItem } from "../../../../ui/blocks/notifications/notificationContainer";
import {
  useGetUserCalendarEventsQuery,
  useSignOutEventMutation,
} from "../../../../api/eventApiSlice";
import { Schedule } from "../../../../ui/components/schedule/schedule";
import { Alert } from "../../../../ui/components/alert/alert";
import { useAlert } from "../../../../context/alertContext";
import { useGetUserStatisticsQuery } from "../../../../api/userApiSlice";
import { useTranslation } from "react-i18next";
import { convertToHourString } from "../../../../utils/dateUtils";
import { InfoCard } from "../../../../ui/components/infoCard/infoCard";
import { Tooltip } from "../../../../ui/components/tooltip/tooltip";
import { Progress } from "../../../../ui/components/progress/progress";
import { IoCheckmarkDoneOutline, IoCloseOutline, IoInformationCircle } from "react-icons/io5";
import { useGetCountriesQuery } from "../../../../api/filtersApiSlice";
import { useEffect, useState } from "react";
import { ICountryInfo } from "../../../../types/places";
import { ExtendedUser } from "../../../../api/authSlice";

const TODAY = format(new Date(), "dd.MM.yyyy", { locale: cs });


function computeProgress(user:ExtendedUser){
  let count = 0;

  const clone = (({ id, token, authChecked,role, ...o }) => o)(user);

  for(const[key,val] of Object.entries(clone)){
    if(val) count++;
  };
  const progressPercent = (count / Object.keys(user).length)*100;
  return Math.floor(progressPercent);
};

export function UserHome() {
  return (
    <UserDashboard>
      <div className="app__home">
        <UserHomeHeader />
        <UserNewNotifications />
        <UserHomeCalendar />
      </div>
    </UserDashboard>
  );
}

function UserHomeHeader() {
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
  }, [countries]);

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

function UserNewNotifications() {
  const { id } = useSelector((root: RootState) => root.auth);
  const { t:tApp } = useTranslation("app");
  const { t:tComm } = useTranslation("common");

  const {
    data: messages,
    isLoading,
    isFetching,
    isError,
  } = useGetIncommingNotificationsQuery({ userId: id });

  return (
    <div className="new__messages flex-col g-8">
      <h3 className="h-sm xbold">{tApp('home.newMess')}</h3>
      {isLoading || (isFetching && <Spinner fixed={false} />)}
      {messages?.filter(mes=>mes.readAt === null).length === 0 ? (
        <div className="tx-gray tx-sm pt-16">{tApp("noNewMess")}</div>
      ) : (
        messages?.map(
          (mes, index) =>
            !mes.readAt && (
              <NotificationItem notificationInput={mes} flow="from" isExternal key={mes.day+mes.from_user+mes.subject}/>
            )
        )
      )}
      {isError && <div>{tComm("errors.server")}</div>}
    </div>
  );
}

function UserHomeCalendar() {
  const { id } = useSelector((root: RootState) => root.auth);
  const { t:tComm } = useTranslation("common");
  const { t:tApp } = useTranslation("app");
  const {
    data: events,
    isLoading: eventsLoading,
    isFetching:eventsFetching,
  } = useGetUserCalendarEventsQuery({
    startDate: startOfISOWeek(new Date),
    userId:id
  });
  const [signOutEvent] = useSignOutEventMutation();
  const { showAlert } = useAlert();

  const handleSignOut = async (id: number) => {
    const response = await signOutEvent({ id: id });

    if (response.data) {
      if (response.data.success) {
        showAlert(<Alert type="positive">{response.data.message}</Alert>);
      } else {
        showAlert(<Alert type="negative">{response.data.message}</Alert>);
      }
    } else if (response.error) {
      showAlert(
        <Alert type="negative">{tComm("errors.server")}</Alert>
      );
    }
  };

  return (
    <div className="app__home__calendar">
      <h3 className="h-sm xbold mb-16">{tApp("home.thisWkEv")}</h3>
      {eventsLoading ||eventsFetching ? (
        <Spinner fixed={false} />
      ) : (
        <Schedule
          events={events}
          hasFilter={false}
          buttonText={tComm("button.cancel")}
          eventClick={handleSignOut}
          isLoading = {eventsLoading || eventsFetching}
          variant='daysOnTop'
        />
      )}
    </div>
  );
}

function UserStatistics() {
  const { id } = useSelector((root: RootState) => root.auth);

  const { data: statistics } = useGetUserStatisticsQuery({ userId: id });

  const { t } = useTranslation("app");

  return (
    <div className="user__statistics flex content-space g-64">
      <InfoCard name={t("profile.played")}>{statistics?.eventCount}</InfoCard>
      <InfoCard name={t("profile.playedHours")}>
        {statistics?.hourCount && convertToHourString(statistics.hourCount)}
      </InfoCard>
      <InfoCard name={t("profile.visitedPlaces")}>
        {statistics?.placeCount}
      </InfoCard>
      <Tooltip
        text={t("home.tooltip")}
          position="left"
      >
        <InfoCard name={t("profile.sixMonths")}>
          {statistics?.sixMonthsCount}
         <IoInformationCircle style={{color:'var(--orange)',width:'20px'}}/>
        </InfoCard>
      </Tooltip>
    </div>
  );
}
