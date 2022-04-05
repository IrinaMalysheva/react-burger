import profileStyles from './profile.module.css';
import ProfileSideMenu from "../components/profile-side-menu/profile-side-menu";

export function OrderHistoryPage() {
    return (
        <div className={profileStyles.profileContainer}>
            <ProfileSideMenu />
        </div>
    );
}