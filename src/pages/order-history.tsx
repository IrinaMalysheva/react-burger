import { FC } from 'react';
import profileStyles from './profile.module.css';
import ProfileSideMenu from "../components/profile-side-menu/profile-side-menu";

export const OrderHistoryPage: FC = () => {
    return (
        <div className={profileStyles.profileContainer}>
            <ProfileSideMenu />
        </div>
    );
}