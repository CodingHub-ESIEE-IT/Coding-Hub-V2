import React from 'react';
import './edit.css';
import '../profil.css';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import logo from '../../../../../public/images/logo.png';

import { User } from '@/types/user';

import EditProfileForm from '@/components/Profile/EditProfileForm/EditProfileForm';

import { getCurrentUser } from '@/lib/utils/auth';
import { getTopicsByUser } from '@/lib/utils/topic';
import {editAvatarAction, editUserAction} from '@/lib/actions/user.action';
import EditAvatar from "@/components/Profile/EditAvatar/EditAvatar";

type UserFormField = keyof User;

export type InputField = {
  id: UserFormField;
  label: string;
  placeholder: string;
  small: string;
  textarea?: boolean;
};

const inputs: InputField[] = [
  {
    id: 'firstName',
    label: 'Prénom',
    placeholder: 'Entrez votre prénom',
    small: 'Modifiez votre prénom',
  },
  {
    id: 'lastName',
    label: 'Nom',
    placeholder: 'Entrez votre nom',
    small: 'Modifiez votre nom de famille',
  },
  {
    id: 'username',
    label: 'Pseudo',
    placeholder: 'Entrez votre pseudo',
    small: 'Nom d’utilisateur affiché sur le profil',
  },
  {
    id: 'email',
    label: 'Adresse e-mail',
    placeholder: 'Entrez votre adresse e-mail',
    small: 'Utilisée pour la connexion et les notifications',
  },
  {
    id: 'bio',
    label: 'Description',
    placeholder: 'Parlez-nous de vous',
    small: 'Une courte biographie qui sera affichée sur votre profil',
    textarea: true,
  },
];

const EditProfile = async () => {
  const user = await getCurrentUser();
  if (!user) redirect('/connexion');
  const { data } = await getTopicsByUser(user?.id ?? 0);

  return (
    <div>
      <div className="profile-header">
        <div className="actions">
          <button className="actions-button">Modifier le profil</button>
          <button className="actions-button">Paramètres</button>
        </div>
        <div className="profile-info">
          <div className={'profile-overview'}>
            <Image
              className="profile-picture"
              src={logo}
              alt={'Photo de profil'}
            />
            <div>
              <h1 className="profile-username">
                {user.firstName} {user.lastName}
              </h1>
              <p className="profile-pseudo">@{user.username}</p>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-number">{data.length}</span>
              <span className="stat-label">Sujets</span>
            </div>
            <div className="stat">
              <span className="stat-number">128</span>
              <span className="stat-label">Abonnements</span>
            </div>
            <div className="stat">
              <span className="stat-number">256</span>
              <span className="stat-label">Abonnés</span>
            </div>
          </div>
        </div>
        <div className={'profile-bio'}>
          <h2>Biographie</h2>
          <p>{user.bio}</p>
        </div>
      </div>
      <div className="profile-list-topics">
        <h2>Éditer</h2>
        <div className={"edit-profile-container"}>
          <EditProfileForm
              userEditAction={editUserAction}
              inputs={inputs}
              user={user}
          />
          <EditAvatar avatarUrl={user.avatarUrl} avatarEditAction={editAvatarAction} />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
