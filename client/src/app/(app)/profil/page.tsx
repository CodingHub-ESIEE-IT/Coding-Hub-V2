import React from 'react';
import './profil.css';
import Image from 'next/image';
import logo from '../../../../public/images/logo.png';
import commentIcon from '../../../../public/images/message.svg';
import Tag from '@/components/ui/Tag/Tag';
import { getTopicsByUser } from '@/lib/utils/api/topic';
import { getCurrentUser } from '@/lib/utils/api/auth';
import { redirect } from 'next/navigation';
import { Topic } from '@/types/topic';
import Link from 'next/link';
import { truncate } from '@/lib/utils/string';

import ProfileSidebar from '@/components/Profile/ProfileSidebar/ProfileSidebar';

const Profile = async () => {
  const user = await getCurrentUser();
  if (!user) redirect('/connexion');
  const { data } = await getTopicsByUser(user?.id ?? 0);

  return (
    <div className="profile-container">
      <ProfileSidebar user={user} topicCount={data.length} />

      <div className="profile-main-content">
        <h2 className="section-title">Mes Sujets</h2>
        <ul className="topics-list">
          {data.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Aucun sujet créé pour le moment.</p>}
          {data.map((topic: Topic) => (
            <Link
              href={`/forum/topics/${topic.id}`}
              key={topic.id}
              style={{ textDecoration: 'none', width: '100%' }}
            >
              <li key={topic.id} className="pl__topic-item">
                <Image className="profile-avatar" src={logo} alt="Avatar" />
                <div className={'pl__topic-main'}>
                  <div className={'pl__topic-content'}>
                    <h3 className="pl__topic-title">{truncate(topic.title)}</h3>
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
