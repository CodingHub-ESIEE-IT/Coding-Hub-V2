import React from 'react';
import './topics.css';
import { getTopics } from '@/lib/utils/api/topic';
import { redirect } from 'next/navigation';
import { Topic } from '@/types/topic';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button/Button';
import TopicListItem from '@/components/forum/TopicListItem/TopicListItem';
import ActiveUsersWidget from '@/components/forum/Sidebar/ActiveUsersWidget';
import discordLogo from '../../../../../public/images/discord-logo.png';

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
        <div className="topics-page-layout">
            <div className="main-topics-content">
                <div className="topics-list-container">
                    {topics.map((topic: Topic, index: React.Key | null | undefined) => (
                        <TopicListItem key={index} topic={topic} />
                    ))}
                </div>
            </div>

            <div className="sidebar-content">
                <Link href={'/forum/topics/create'} style={{ textDecoration: 'none' }}>
                    <Button
                        text={'Créer un sujet'}
                        buttonWidth={'100%'}
                        margin={'0 0 1.5rem 0'}
                    />
                </Link>

                <ActiveUsersWidget />

                <div className="discord-banner-simple">
                    <div className="discord-logo-s">
                        <Image src={discordLogo} alt="Discord" width={30} height={30} />
                    </div>
                    <div className="discord-info-s">
                        <span className="d-title">Discord Community</span>
                        <span className="d-sub">Join 150+ members</span>
                    </div>
                    <button className="d-join-btn">Join</button>
                </div>
            </div>
        </div>
    );
};

export default TopicsList;
