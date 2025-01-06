import { useGetUserQuery } from "../../../api/userApiSlice";
import { Spinner } from "../../components/spinner/spinner";
import { BodyBlock } from "../common/bodyBlock/bodyBlock";
import { UserEvents } from "../profile/ui/userEvents";
import { Badge } from "../../components/badge/badge";
import {
  IoCalendarOutline,
  IoFlagOutline,
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
import { useTranslation } from "react-i18next";

type UserPageProps = {
  userId: number;
};

export function UserProfile({ userId }: UserPageProps) {
  const {
    data: user,
    isFetching,
    isLoading,
  } = useGetUserQuery({ userId: userId });

  const { t } = useTranslation("common");

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
                      <div className="flex g-8">
                      {user.arts.map((art) => 
                        <Badge>{art.name}</Badge>
                      )}
                      </div>
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
                    <ProfileInfoBlock title={t("label.address")}>
                      <ProfileInfoLine
                        title={t("label.nationality")}
                        icon={<IoFlagOutline />}
                      >
                        {user.countryName}
                      </ProfileInfoLine>
                      <ProfileInfoLine
                        title={t("label.city")}
                        icon={<PiCity />}
                      >
                        {user.city}
                      </ProfileInfoLine>
                    </ProfileInfoBlock>
                    <ProfileInfoBlock title={t("label.contact")}>
                      <ProfileInfoLine
                        title={t("label.email")}
                        icon={<MdOutlineAttachEmail />}
                      >
                        {user.email}
                      </ProfileInfoLine>
                      <ProfileInfoLine
                        title={t("label.phone")}
                        icon={<BsTelephone />}
                      >
                        {user.phone}
                      </ProfileInfoLine>
                    </ProfileInfoBlock>
                    <ProfileInfoBlock title={t("label.other")}>
                      <ProfileInfoLine
                        title={t("label.group")}
                        icon={<IoPersonOutline />}
                      >
                        {user.band}
                      </ProfileInfoLine>
                      <ProfileInfoLine
                        title={t("label.activeSince")}
                        icon={<IoCalendarOutline />}
                      >
                        {format(user.inserted, "dd.MM.yyyy")}
                      </ProfileInfoLine>
                    </ProfileInfoBlock>
                  </div>
                </div>
              </div>
              <div className="user__right">
                <ProfileInfoBlock title={t("label.about")}>
                  <p className="tx-sm user--desc pt-16 pb-8">
                    {user.description}
                  </p>
                </ProfileInfoBlock>
                <ProfileInfoBlock
                  title={t("label.whereToFindMe")}
                  className="flex-col g-16"
                >
                  <UserEvents action="no action" />
                </ProfileInfoBlock>
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

export function ProfileInfoBlock({
  children,
  title,
  className,
  ...props
}: ProfileInfoBlockProps) {
  return (
    <div className={`user__info__block ${className}`} {...props}>
      <h3 className="h-xs xbold mb-8">{title}</h3>
      {children}
    </div>
  );
}

type ProfileInfoLineProps = {
  children: React.ReactNode;
  title: string;
  icon: React.ReactNode;
};

export function ProfileInfoLine({
  children,
  title,
  icon,
}: ProfileInfoLineProps) {
  return (
    <div className="profile__infoline tx-gray tx-sm flex g-8 items-center py-8">
      <div className="flex g-8 items-center profile__infoline--title">
        {icon}
        <span>{title}:</span>
      </div>
      <span className="tx-black tx-sm xbold">{children}</span>
    </div>
  );
}
