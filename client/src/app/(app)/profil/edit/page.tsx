import React from 'react';
import './edit.css';
import '../profil.css';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import logo from '../../../../../public/images/logo.png';

import { User } from '@/types/user';

import EditProfileForm from '@/components/Profile/EditProfileForm/EditProfileForm';

import { getCurrentUser } from '@/lib/utils/api/auth';
import { getTopicsByUser } from '@/lib/utils/api/topic';
import { editAvatarAction, editUserAction } from '@/lib/actions/user.action';
import ProfileSidebar from '@/components/Profile/ProfileSidebar/ProfileSidebar';

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
    <div className="profile-container">
      <ProfileSidebar
        user={user}
        topicCount={data.length}
        avatarEditAction={editAvatarAction}
      />

      <div className="profile-main-content">
        <h2 className="section-title">Éditer mon profil</h2>
        <div className="edit-profile-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

          <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Informations personnelles</h3>
            <EditProfileForm
              userEditAction={editUserAction}
              inputs={inputs}
              user={user}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditProfile;
