import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { useGetUserStatisticsQuery } from "../../../api/userApiSlice";
import { useTranslation } from "react-i18next";
import { convertToHourString } from "../../../utils/dateUtils";
import { InfoCard } from "../../../ui/components/infoCard/infoCard";
import { Tooltip } from "../../../ui/components/tooltip/tooltip";
import { IoInformationCircle } from "react-icons/io5";

export function UserStatistics() {
    const { id } = useSelector((root: RootState) => root.auth);
  
    const { data: statistics } = useGetUserStatisticsQuery({ userId: id });
  
    const { t } = useTranslation("app");
  
    return (
      <div className="user__statistics flex content-space g-64">
        <InfoCard name={t("profile.played")}>{statistics?.eventCount ?? 0}</InfoCard>
        <InfoCard name={t("profile.playedHours")}>
          {statistics ? statistics.hourCount && convertToHourString(statistics.hourCount) : 0}
        </InfoCard>
        <InfoCard name={t("profile.visitedPlaces")}>
          {statistics?.placeCount ?? 0}
        </InfoCard>
        <Tooltip
          text={t("home.tooltip")}
            position="left"
        >
          <InfoCard name={t("profile.sixMonths")}>
            {statistics?.sixMonthsCount ?? 0}
           <IoInformationCircle className="orange-icon"/>
          </InfoCard>
        </Tooltip>
      </div>
    );
  }