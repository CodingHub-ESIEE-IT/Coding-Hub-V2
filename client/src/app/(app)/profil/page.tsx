import React from 'react';
import './profil.css';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import commentIcon from '../../../../public/images/message.svg';
import Tag from '@/components/ui/Tag/Tag';
import { getTopicsByUser } from '@/lib/utils/topic';
import { getCurrentUser } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';
import { Topic } from '@/types/topic';
import Link from 'next/link';

const Profile = async () => {
  const user = await getCurrentUser();
  if (!user) redirect('/connexion');
  const { data } = await getTopicsByUser(user?.id ?? 0);

  return (
    <div>
      <div className="profile-header">
        <div className="actions">
          <Link className="actions-button" href={'/profil/edit'}>Modifier le profil</Link>
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
        <h2>Sujets</h2>
        <ul className="topics-list">
          {data.length === 0 && <p>Aucun sujet créé pour le moment.</p>}
          {data.map((topic: Topic) => (
            <Link
              href={`/forum/topics/${topic.id}`}
              key={topic.id}
              style={{textDecoration: 'none', width: '45%'}}
            >
              <li key={topic.id} className="pl__topic-item">
                <Image className="profile-avatar" src={logo} alt="Avatar" />
                <div className={'pl__topic-main'}>
                  <div className={'pl__topic-content'}>
                    <h3 className="pl__topic-title">{topic.title}</h3>
                    <span className="pl__topic-date">
                      Dernière activité il y a 3 jours
                    </span>
                  </div>
                  <div className="pl__topic-stats">
                    <div>
                      <Tag>{topic.categories[0].name}</Tag>
                    </div>
                    <span className="pl__topic-stat">
                      <Image
                        src={commentIcon}
                        className={'topic-comment-icon'}
                        alt={'Icone commentaire'}
                      />
                      {topic.replies.length}
                    </span>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
