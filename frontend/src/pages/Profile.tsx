import { BodyBlock } from "../components/common/bodyBlock";
import { ProfileCard } from "../components/common/profileCard";

export function Profile(){

    return (
        <BodyBlock color="secondary">
            <div className="profile-container">
                <ProfileCard></ProfileCard>
            </div>
        </BodyBlock>
    );
}