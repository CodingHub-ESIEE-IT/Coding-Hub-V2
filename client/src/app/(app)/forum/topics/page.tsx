import React from 'react';
import './topics.css';
import Image from 'next/image';
import TopicCard from '@/components/forum/TopicCard/TopicCard';
import Section from '@/components/ui/Section/Section';
import Button from '@/components/ui/Button/Button';
import discordLogo from '../../../../../public/images/discord-logo.png';
import { getTopics } from '@/lib/utils/topic';
import { Topic } from '@/types/topic';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface TopicsListProps {
  searchParams: Promise<{ category?: string }>;
}

const TopicsList = async ({ searchParams }: TopicsListProps) => {
  const category = (await searchParams).category;

  if (!category) {
    redirect('/forum');
  }

  const topics = await getTopics(category);

  return (
    <div className="topics-container">
      <Section title={'Liste des sujets'} sectionWidth={'73%'}>
        <div className="topics-list">
          {topics.map((topic: Topic, index: React.Key | null | undefined) => (
            <TopicCard key={index} topic={topic} />
          ))}
        </div>
      </Section>
      <div className="side-panel">
        <Link href={'/forum/topics/create'}>
          <Button
            text={'Créer un sujet'}
            buttonWidth={'100%'}
            margin={'0 0 1.5rem 0'}
          />
        </Link>
        <Section
          title={'Statistiques'}
          sectionWidth={'100%'}
          margin={'0 0 1.5rem 0'}
        >
          <div className="stat-container">
            <div className="topic-stats-svg">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="stats">
              <p className="stat-number">150</p>
              <div className="stat-label">Sujets</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="topic-stats-svg">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="stats">
              <p className="stat-number">150</p>
              <div className="stat-label">Sujets résolus</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="topic-stats-svg">
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="#E4E4E4"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="#E4E4E4"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="#2f314f"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="stats">
              <p className="stat-number">20</p>
              <div className="stat-label">Utilisateurs actifs</div>
            </div>
          </div>
        </Section>
        <Section title={'Utilisateurs actifs'} sectionWidth={'100%'}>
          <div className="stat-container">
            <div className="active-user-avatar"></div>
            <div className="stats">
              <p className="stat-number">
                John Doe (<span className="user-mention">@johndoe</span>)
              </p>
              <div className="stat-label">15 messages</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="active-user-avatar"></div>
            <div className="stats">
              <p className="stat-number">
                John Doe (<span className="user-mention">@johndoe</span>)
              </p>
              <div className="stat-label">15 messages</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="active-user-avatar"></div>
            <div className="stats">
              <p className="stat-number">
                John Doe (<span className="user-mention">@johndoe</span>)
              </p>
              <div className="stat-label">15 messages</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="active-user-avatar"></div>
            <div className="stats">
              <p className="stat-number">
                John Doe (<span className="user-mention">@johndoe</span>)
              </p>
              <div className="stat-label">15 messages</div>
            </div>
          </div>
        </Section>
        <div className="discord-section">
          <Image
            src={discordLogo}
            alt={'Discord'}
            className="custom-discord-logo"
          />
          <button className="discord-button">Rejoindre le serveur</button>
        </div>
      </div>
    </div>
  );
};

export default TopicsList;
