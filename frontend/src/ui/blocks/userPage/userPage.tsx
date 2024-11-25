import { useGetUserQuery } from "../../../api/userApiSlice";
import { Spinner } from "../../components/spinner/spinner";
import { BodyBlock } from "../bodyBlock/bodyBlock";
import { UserEvents } from "../profile/ui/userEvents";
import { Badge } from "../../components/badge/badge";
import {
  IoCalendarOutline,
  IoFlagOutline,
  IoLocationOutline,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoWebComponent,
  IoPersonOutline,
} from "react-icons/io5";
import { PiCity } from "react-icons/pi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { format } from "date-fns";
import "./userPage.css";
import { HTMLAttributes } from "react";

type UserPageProps = {
  userId: number;
};

export function UserProfile({ userId }: UserPageProps) {
  const {
    data: user,
    isFetching,
    isLoading,
  } = useGetUserQuery({ userId: userId });

  return (
    <>
      <BodyBlock className="relative">
        {isLoading || isFetching ? (
          <Spinner fixed={false} />
        ) : (
          user && (
            <div className="user__page">
              <div className="user__left">
                <div className="user__left__inner  flex-col g-32">
                  <div className="user__head flex g-16">
                    <img
                      src={user.image}
                      alt={user.nick}
                      className="user--img"
                    />
                    <div className="user__name flex-col g-8">
                      <h3 className="h-lg xbold">{user.nick}</h3>
                      <Badge>{user.art}</Badge>
                      <div className="user__socials tx-black tx-md flex g-16 items-center">
                        {user.website && (
                          <a href={user.website} target="_blank">
                            <IoLogoWebComponent />
                          </a>
                        )}
                        {user.facebook && (
                          <a href={user.facebook} target="_blank">
                            <IoLogoFacebook />
                          </a>
                        )}
                        {user.instagram && (
                          <a href={user.instagram} target="_blank">
                            <IoLogoInstagram />
                          </a>
                        )}
                        {user.twitter && (
                          <a href={user.twitter} target="_blank">
                            <IoLogoTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="user__info">
                    <ProfileInfoBock title="Adresa">
                      <ProfileInfoLine
                        title="Národnost"
                        icon={<IoFlagOutline />}
                      >
                        {user.countryName}
                      </ProfileInfoLine>
                      <ProfileInfoLine title="Město" icon={<PiCity />}>
                        {user.city}
                      </ProfileInfoLine>
                    </ProfileInfoBock>
                    <ProfileInfoBock title="Kontakt">
                      <ProfileInfoLine
                        title="Email"
                        icon={<MdOutlineAttachEmail />}
                      >
                        {user.email}
                      </ProfileInfoLine>
                      <ProfileInfoLine title="Telefon" icon={<BsTelephone />}>
                        {user.phone}
                      </ProfileInfoLine>
                    </ProfileInfoBock>
                    <ProfileInfoBock title="Ostatní">
                      <ProfileInfoLine
                        title="Skupina"
                        icon={<IoPersonOutline />}
                      >
                        {user.band}
                      </ProfileInfoLine>
                      <ProfileInfoLine
                        title="Aktivní od"
                        icon={<IoCalendarOutline />}
                      >
                        {format(user.inserted, "dd.MM.yyy")}
                      </ProfileInfoLine>
                    </ProfileInfoBock>
                  </div>
                </div>
              </div>
              <div className="user__right">
                <ProfileInfoBock title="Něco o mě/nás">
                  <p className="tx-sm user--desc pt-16 pb-8">
                    {user.description}
                  </p>
                </ProfileInfoBock>
                <ProfileInfoBock
                  title="Kde se uvidíme?"
                  className="flex-col g-16"
                >
                  <UserEvents userId={userId} action="no action" />
                </ProfileInfoBock>
              </div>
            </div>
          )
        )}
      </BodyBlock>
    </>
  );
}

interface ProfileInfoBlockProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  title: string;
}

function ProfileInfoBock({
  children,
  title,
  className,
  ...props
}: ProfileInfoBlockProps) {
  return (
    <div className={`user__info__block ${className}`} {...props}>
      <h3 className="h-xs xbold">{title}</h3>
      {children}
    </div>
  );
}

type ProfileInfoLineProps = {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
};

function ProfileInfoLine({ children, title, icon }: ProfileInfoLineProps) {
  return (
    <div className="profile__infoline tx-gray tx-sm flex g-8 items-center py-8">
      {icon}
      <span>{title}:</span>
      <span className="tx-black tx-sm xbold">{children}</span>
    </div>
  );
}
