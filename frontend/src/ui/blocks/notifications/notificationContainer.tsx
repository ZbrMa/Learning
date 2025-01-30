import "./notificationContainer.css";
import {
  INewNotification,
  INotification,
} from "../../../types/notifications";
import { format, parse } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../context/notificationContext";
import {
  IoAddOutline,
  IoArrowForwardOutline,
  IoMailOutline,
} from "react-icons/io5";
import { usePostNewNotificationMutation, useReadNotificationMutation } from "../../../api/notificationApiSlice";
import {
  useLazyGetUsersQuery,
} from "../../../api/userApiSlice";
import { Input } from "../../components/input/input";
import { MySelect } from "../../components/select/select";
import { Textarea } from "../../components/textarea/textarea";
import { useAlert } from "../../../context/alertContext";
import { Alert } from "../../components/alert/alert";
import { Button } from "../../components/button/button";
import { TabsHeader,TabsHeaderItem } from "../../components/tabs/tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { ModalContext } from "../../../context/modalContext";
import { NewMessageModal, ReadMessageModal } from "../../modals/messageModal";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { TabsContext } from "../../components/tabs/tabsContext";

type NotificationContainerProps = {
  notifications: INotification[] | undefined;
  flow: "from" | "to";
};

export function NotificationContainer({
  notifications,
  flow,
}: NotificationContainerProps) {
  const { t } = useTranslation('app');
  return (
    <>
    <div className="notification__container">
      <NotificationsHeader />
      <div className="notifications__body">
        <div className="notification__left">
          <div className="notification__list flex-col">
            {!notifications ||notifications.length === 0 ? (
              <p>{t("notif.noMess")}</p>
            ) : (
              notifications.map((notif, index) => (
                <NotificationItem
                  notificationInput={notif}
                  flow={flow}
                  key={format(notif.day, "ddMMyy") + index}
                />
              ))
            )}
          </div>
        </div>
        <div className="notification__right">
          <NotificationDetail flow={flow} />
        </div>
      </div>
    </div>
    <NewMessageModal/>
    </>
  );
}


function NotificationsHeader() {
  const { setModal } = useContext(ModalContext);
  const { t } = useTranslation('app');

  return (
    <div className="notifications__header flex content-space mb-16 pb-16 items-center">
        <TabsHeader>
            <TabsHeaderItem value="in">{t("notif.recieved")}</TabsHeaderItem>
            <TabsHeaderItem value="out">{t("notif.send")}</TabsHeaderItem>
          </TabsHeader>
        <Button variant="ternary" style={{fontSize:'1rem', padding:'0.6rem 0.8rem',height:"fit-content"}} onClick={() => setModal('msg-modal')}>
          <IoAddOutline />
          {t("notif.newMess")}
        </Button>
    </div>
  );
}

type NotificationItemProps = {
  notificationInput: INotification;
  flow: "from" | "to";
  isExternal?:boolean;
};

export function NotificationItem({
  notificationInput,
  flow,
  isExternal = false
}: NotificationItemProps) {
  const { notification, setNotification } = useContext(NotificationContext);
    const [readMessage] = useReadNotificationMutation();
    const [mobile,setMobile] = useState(false);
    const {setModal} = useContext(ModalContext);

    const checkMobile = () => {
      window.innerWidth < 992 ? setMobile(true) : setMobile(false);
    };
  
    useEffect(()=>{
      checkMobile();
      window.addEventListener('resize',checkMobile);
  
      return ()=> window.removeEventListener('resize',checkMobile);
    },[])

    const navigate = useNavigate();

    const handleReadNotification = async() => {
      if(isExternal){
        navigate('/app/mail');
      };

      if (!notification || notification.id !== notificationInput.id) {
        if(notificationInput.readAt){
          setNotification(notificationInput);
        }
        else {
          await readMessage({id:notificationInput.id});
          setNotification({...notificationInput,readAt:new Date})
        }
      }
    };

    useEffect(() => {
      if (notification && mobile && notification.id === notificationInput.id) {
        setModal("read-msg-modal");
      }
    }, [notification])

  return (
    <div
      className={`notification__list__item p-16 flex g-16 ${
        notification?.id === notificationInput.id ? "active" : ""
      } ${!notificationInput.readAt && flow === 'from' ? "new" : ""}`}
      onClick={handleReadNotification}
    >
       <img src={flow === 'from' ? notificationInput.fromImage ?? '/app-logo.png' : notificationInput.toImage ?? '/app-logo.png'} className="small--message--img" alt="user-image"/>
      <div className="flex-col g-8 w-full">
       
      <div className="flex g-32 items-base content-space">
        <h3 className="xbold relative">{notificationInput.subject}</h3>
        <p className="tx-sm mess--time flex g-8 items-center">{format(notificationInput.day, "dd.MM")}</p>
      </div>

      {flow === "from" ? (
        <p className="tx-xs">{notificationInput.from_user}</p>
      ) : (
        <p className="tx-xs">{notificationInput.to_user}</p>
      )}
      {mobile && notification?.id === notificationInput.id && (
        <ReadMessageModal flow={flow} />
      )}
      </div>
    </div>
  );
}

export function NotificationDetail({
  flow,
}: Omit<NotificationItemProps, "notificationInput">) {
  const { active } = useContext(TabsContext);
  const { notification, setNotification } = useContext(NotificationContext);
  const [mobile,setMobile] = useState(false);
  const { t } = useTranslation('app');

  const checkMobile = () => {
    window.innerWidth < 992 ? setMobile(true) : setMobile(false);
  };

  useEffect(()=>{
    checkMobile();
    window.addEventListener('resize',checkMobile);

    return ()=> window.removeEventListener('resize',checkMobile);
  },[]);

  useEffect(()=>{
    setNotification(null);
  },[active]);

  if (mobile){
    return null; 

  } else {
  if (notification) {
    return (
      <div className="notification__detail pt-16">
        <div className="notification__header mb-32 pb-16">
          <div className="flex content-space items-base mb-16">
            <h3 className="h-xl xbold">{notification.subject}</h3>
            <p className="tx-md bold notification--time">
              {format(notification.day, "dd.MM.yyyy")}, {format(parse(notification.time, "HH:mm:ss", new Date()), "HH:mm")}
            </p>
          </div>
          <div className="flex g-16">
            <img src={flow === 'from' ? notification.fromImage : notification.toImage} className="message--img" alt="user-image"/>
          <div className="flex-col g-8 pb-8">
            {flow === 'from' ? (<>
              <p className="tx-md xbold">
              <span className="tx-gray tx-xs">{t("notif.from")}: </span>
              {notification.from_user}
            </p>
            <p className="tx-xs bold">
              <span className="tx-gray">{t("notif.to")}: </span>
              {notification.to_user}
            </p>
            </>
            ): (
              <>
            <p className="tx-md xbold">
              <span className="tx-gray tx-xs">{t("notif.to")}: </span>
              {notification.to_user}
            </p>
            <p className="tx-xs bold">
            <span className="tx-gray">{t("notif.from")}: </span>
            {notification.from_user}
          </p>
          </>
            )}
            
          </div>
          </div>
        </div>
        <p>{notification.content}</p>
      </div>
    );
  }

  return (
    <div className="notification--idle">
      <IoMailOutline />
    </div>
  );
  }
}

export function NewMessage() {
  const [newMessage, setNewMessage] = useState<INewNotification>({
    subject: "",
    content: "",
  });
  const { setModal } = useContext(ModalContext);
  const {id} = useSelector((root:RootState)=>root.auth)

  const [sendMessage] = usePostNewNotificationMutation();
  const [getUsers, { data: users }] =
    useLazyGetUsersQuery();

  const { showAlert } = useAlert();
  const { t:tCom } = useTranslation('common');
  const { t:tApp } = useTranslation('app');

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSendMessage = useCallback(
    async () => {
      if (!newMessage.to || !newMessage.subject) return showAlert(<Alert type="alert">{tCom("alert.newMess")}</Alert>);

      const {error,data} = await sendMessage({notification:newMessage,userId:id});
      if (error) {
        showAlert(
          <Alert type="negative" title={tCom("errors.title.server")}>
            {tCom("errors.server")}
          </Alert>
        );
      } else if (data.success) {
        showAlert(
          <Alert type="positive" title={tCom("success.header")}>
            {tCom("success.send")}
          </Alert>
        );
        setModal(null);
      } else {
        showAlert(
          <Alert type="negative" title={tCom("errors.title.send")}>
            {tCom("errors.send")}
          </Alert>
        );
      }
  },[showAlert,tCom, sendMessage,newMessage,setModal,id]);

  const handleChangeMessage = (e: string, param: keyof INewNotification) => {
    setNewMessage((prev) => ({
      ...prev,
      [param]: e,
    }));
  };

  const handleChangeReciever = (e: number) => {
    setNewMessage((prev) => ({
      ...prev,
      to: e,
    }));
  };

  return (
    <div className="notification__new flex-col">
      <div className="notification__header mb-32 flex content-space">
        <div className="flex-col g-16">
          {users && (
            <MySelect
              label={tApp("notif.to")}
              placeholder={tApp("notif.to")}
              options={users.map((user) => ({
                value: user.id,
                label: user.nick,
              }))}
              returnSelected={(e) => handleChangeReciever(e as number)}
              hasSearchBar
            />
          )}
          <Input
            labelPosition="out"
            label={tApp("notif.subject")}
            onChange={(e) => handleChangeMessage(e.target.value, "subject")}
          />
        </div>
        {/*<IconButton onClick={() => setMode("read")} variant="ternary">
          <IoCloseOutline />
        </IconButton>*/}
      </div>
      <Textarea
        placeholder={tApp("notif.messContent")+"..."}
        label={tApp("notif.messContent")+"..."}
        labelPosition="in"
        onChange={(e) => handleChangeMessage(e.target.value, "content")}
      />
      <Button onClick={handleSendMessage} size="small" style={{ marginTop: "auto", marginLeft:'auto', fontSize:'1rem' }}>
        {tCom("button.send")}
        <IoArrowForwardOutline />
      </Button>
    </div>
  );
}
