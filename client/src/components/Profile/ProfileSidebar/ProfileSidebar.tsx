'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import { User } from '@/types/user';

import { ActionResponse } from "@/types/action";
import EditAvatar from '../EditAvatar/EditAvatar';

interface ProfileSidebarProps {
    user: User;
    topicCount: number;
    avatarEditAction?: (prevState: ActionResponse | null, formData: FormData) => Promise<ActionResponse>;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ user, topicCount, avatarEditAction }) => {
    return (
        <div className="profile-sidebar">
            <div className="profile-card">
                <div className="profile-header-image"></div>

                <div className="profile-avatar-container">
                    {avatarEditAction ? (
                        <EditAvatar
                            avatarUrl={user.avatarUrl}
                            avatarEditAction={avatarEditAction}
                        />
                    ) : (
                        <Image
                            className="profile-picture"
                            src={user.avatarUrl || logo}
                            alt={'Photo de profil'}
                            width={100}
                            height={100}
                        />
                    )}
                </div>

                <div className="profile-identity">
                    <h1 className="profile-username">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="profile-pseudo">@{user.username}</p>
                </div>

                <div className="profile-bio">
                    <p>{user.bio || "Aucune biographie."}</p>
                </div>

                <div className="profile-actions">
                    <Link className="edit-profile-btn" href={'/profil/edit'}>Modifier le profil</Link>
                </div>

                <div className="profile-stats">
                    <div className="stat">
                        <span className="stat-number">{topicCount}</span>
                        <span className="stat-label">Sujets</span>
                    </div>
                    <div className="stat">
                        <span className="stat-number">128</span>
                        <span className="stat-label">Abonnés</span>
                    </div>
                    <div className="stat">
                        <span className="stat-number">256</span>
                        <span className="stat-label">Suivis</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileSidebar;
