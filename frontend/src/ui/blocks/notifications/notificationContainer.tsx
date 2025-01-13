import "./notificationContainer.css";
import {
  INewNotification,
  INotification,
} from "../../../types/notifications";
import { format, parse } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../../context/notificationContext";
import {
  IoAddOutline,
  IoArrowForwardOutline,
  IoCloseOutline,
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
import { Button, IconButton } from "../../components/button/button";
import { TabsHeader,TabsHeaderItem } from "../../components/tabs/tabs";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { ModalContext } from "../../../context/modalContext";
import { NewMessageModal, ReadMessageModal } from "../../modals/messageModal";
import { useNavigate } from "react-router";

type NotificationContainerProps = {
  notifications: INotification[] | undefined;
  flow: "from" | "to";
};

export function NotificationContainer({
  notifications,
  flow,
}: NotificationContainerProps) {
  return (
    <>
    <div className="notification__container">
      <NotificationsHeader />
      <div className="notifications__body">
        <div className="notification__left">
          <div className="notification__list flex-col">
            {!notifications ||notifications.length === 0 ? (
              <p>Žádné zprávy</p>
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

  return (
    <div className="notifications__header flex content-space mb-16">
        <TabsHeader>
            <TabsHeaderItem value="in">Přijaté</TabsHeaderItem>
            <TabsHeaderItem value="out">Odeslané</TabsHeaderItem>
          </TabsHeader>
        <Button variant="ternary" onClick={() => setModal('msg-modal')}>
          <IoAddOutline />
          Nová zpráva
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

   /* useEffect(()=>{
      console.log(notification);
      if(notification && !notification.readAt){
        
        
    }
    },[notification]);*/

  return (
    <div
      className={`notification__list__item p-16 flex-col g-8 ${
        notification?.id === notificationInput.id ? "active" : ""
      } ${!notificationInput.readAt && flow === 'from' ? "new" : ""}`}
      onClick={handleReadNotification}
    >
      <div className="flex g-32 items-base content-space">
        <h3 className="xbold flex g-8 items-center">{notificationInput.subject}</h3>
        <p className="tx-sm">{format(notificationInput.day, "dd.MM")}</p>
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
  );
}

export function NotificationDetail({
  flow,
}: Omit<NotificationItemProps, "notificationInput">) {
  const { notification } = useContext(NotificationContext);
  const [mobile,setMobile] = useState(false);

  const checkMobile = () => {
    window.innerWidth < 992 ? setMobile(true) : setMobile(false);
  };

  useEffect(()=>{
    checkMobile();
    window.addEventListener('resize',checkMobile);

    return ()=> window.removeEventListener('resize',checkMobile);
  },[])

  if (mobile){
    return null; 

  } else {
  if (notification) {
    return (
      <div className="notification__detail px-64 pt-16">
        <div className="notification__header mb-32 pb-16">
          <div className="flex content-space items-base mb-16">
            <h3 className="h-xl xbold">{notification.subject}</h3>
            <p className="tx-md bold notification--time">
              {format(notification.day, "dd.MM.yyyy")}, {format(parse(notification.time, "HH:mm:ss", new Date()), "HH:mm")}
            </p>
          </div>
          <div className="flex-col g-8 pb-8">
            <p className="tx-md bold">
              <span className="tx-gray tx-sm">Od: </span>
              {notification.from_user}
            </p>
            {/*<span className='tx-lg tx-lightGray'>&#x2022; &#x2022; &#x2022;</span>*/}
            <p className="tx-md bold">
              <span className="tx-gray tx-sm">Pro: </span>
              {notification.to_user}
            </p>
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
  
  const {id} = useSelector((root:RootState)=>root.auth)

  const [sendMessage] = usePostNewNotificationMutation();
  const [getUsers, { data: users, isLoading, isFetching }] =
    useLazyGetUsersQuery();

  const { showAlert } = useAlert();

  useEffect(() => {
    getUsers();
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.to)
      return showAlert(<Alert type="alert">Zadej přijemnce zprávy</Alert>);

    const response = await sendMessage({notification:newMessage,userId:id});
    if (response.error) {
      showAlert(
        <Alert type="negative" title="Chyba serveru">
          Zprávu se nepodařilo odeslat. Zkus to později.
        </Alert>
      );
    } else if (response.data.success) {
      showAlert(
        <Alert type="positive" title="Zpráva odeslána">
          {response.data.message}
        </Alert>
      );
    } else {
      showAlert(
        <Alert type="negative" title="Chyba při odesílání">
          {response.data.message}
        </Alert>
      );
    }
  };

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
              label="Komu"
              placeholder="Příjemce..."
              options={users.map((user) => ({
                value: user.id,
                label: user.nick,
              }))}
              returnSelected={(e) => handleChangeReciever(e as number)}
            />
          )}
          <Input
            labelPosition="out"
            label="Předmět"
            onChange={(e) => handleChangeMessage(e.target.value, "subject")}
          />
        </div>
        {/*<IconButton onClick={() => setMode("read")} variant="ternary">
          <IoCloseOutline />
        </IconButton>*/}
      </div>
      <Textarea
        placeholder="Obsah zprávy..."
        label="Obsah zprávy..."
        labelPosition="in"
        onChange={(e) => handleChangeMessage(e.target.value, "content")}
      />
      <Button onClick={handleSendMessage} size="small" style={{ marginTop: "auto", marginLeft:'auto', fontSize:'1rem' }}>
        Odeslat
        <IoArrowForwardOutline />
      </Button>
    </div>
  );
}
