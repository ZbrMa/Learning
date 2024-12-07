import { INotification } from "../../../types/notifications";
import { NotificationContainer } from "./notificationContainer";
import { NotificationContextProvider } from "../../../context/notificationContext";
import {
  useGetIncommingNotificationsQuery,
  useGetSentNotificationsQuery,
} from "../../../api/notificationApiSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/userStore";
import {
  TabBody,
  TabItem,
  Tabs,
} from "../../../ui/components/tabs/tabs";
import { Spinner } from "../../../ui/components/spinner/spinner";

export function Notifications() {
  const { id } = useSelector((root: RootState) => root.auth);
  const {
    data: incomingMessage,
    isLoading: incommingLoading,
    isFetching: incommingFetching,
  } = useGetIncommingNotificationsQuery({ userId: id });
  const {
    data: sentMessage,
    isLoading: sentLoading,
    isFetching: sentFetching,
  } = useGetSentNotificationsQuery({ userId: id });

  return (
      <NotificationContextProvider>
        <Tabs defaultTab="in">
          <TabBody>
            <TabItem value="in">
              {incommingLoading || incommingFetching ? (
                <Spinner />
              ) : (
                <NotificationContainer
                  flow="from"
                  notifications={incomingMessage}
                />
              )}
            </TabItem>
            <TabItem value="out">
              {sentLoading || sentFetching ? (
                <Spinner />
              ) : (
                <NotificationContainer
                  flow="to"
                  notifications={sentMessage}
                />
              )}
            </TabItem>
          </TabBody>
        </Tabs>
      </NotificationContextProvider>
  );
}
