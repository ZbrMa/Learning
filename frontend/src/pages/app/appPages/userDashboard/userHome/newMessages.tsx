import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/reduxStore";
import { useGetIncommingNotificationsQuery } from "../../../../../api/notificationApiSlice";
import { Spinner } from "../../../../../ui/components/spinner/spinner";
import { NotificationItem } from "../../../../../ui/blocks/notifications/notificationContainer";
import { useTranslation } from "react-i18next";

export function UserNewNotifications() {
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
          <div className="tx-gray tx-sm pt-16">{tApp("home.noNewMess")}</div>
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
  