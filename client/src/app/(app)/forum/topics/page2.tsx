import React from 'react';
import './topics.css';
import Image from 'next/image';
import TopicRow from '@/components/forum/TopicRow/TopicRow';
import Section from '@/components/ui/Section/Section';
import Button from '@/components/ui/Button/Button';
import discordLogo from '../../../../../public/images/discord-logo.png';
import { getTopics } from '@/lib/utils/api/topic';
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
      <Section sectionWidth={'73%'}>
        <div className="topics-table-wrapper">
          <table className="topics-table">
            <thead>
              <tr>
                <th style={{ width: '50px' }}></th>
                <th>Sujet</th>
                <th>Auteur</th>
                <th style={{ textAlign: 'right' }}>Activité</th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic: Topic, index: React.Key | null | undefined) => (
                <TopicRow key={index} topic={topic} />
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <div className="side-panel">
        <Link href={'/forum/topics/create'} style={{ textDecoration: 'none' }}>
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
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 18.97H8C4 18.97 2 17.97 2 12.97V7.96997C2 3.96997 4 1.96997 8 1.96997H16C20 1.96997 22 3.96997 22 7.96997V12.97C22 16.97 20 18.97 16 18.97H15.5C15.19 18.97 14.89 19.12 14.7 19.37L13.2 21.37C12.54 22.25 11.46 22.25 10.8 21.37L9.29999 19.37C9.13999 19.15 8.78 18.97 8.5 18.97Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.69995L6 10.7L8 12.7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 8.69995L18 10.7L16 12.7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M13 8.37012L11 13.0302"
                  stroke="currentColor"
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
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="stats">
              <p className="stat-number">150</p>
              <div className="stat-label">Sujets résolus</div>
            </div>
          </div>
          <div className="stat-container">
            <div className="topic-stats-svg">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="stats">
              <p className="stat-number">20</p>
              <div className="stat-label">Utilisateurs actifs</div>
            </div>
          </div>
        </Section>

        {/* Discord Banner */}
        <div className="discord-banner">
          <div className="discord-content">
            <div className="discord-icon-wrapper">
              <Image
                src={discordLogo}
                alt="Discord"
                width={24}
                height={24}
              />
            </div>
            <div className="discord-text">
              <span className="discord-title">Rejoindre le Discord</span>
              <span className="discord-subtitle">Discute en direct !</span>
            </div>
          </div>
          <button className="discord-arrow-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>
    </div>
  );
};

export default TopicsList;
