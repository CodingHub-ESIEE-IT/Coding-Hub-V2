'use client';

import React, { useEffect, useState } from 'react';
import './TopicRow.css';
import { Topic } from "@/types/topic";
import { Category } from "@/types/category";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare, CheckCircle2, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface TopicRowProps {
    topic: Topic;
}

const TopicRow = ({ topic }: TopicRowProps) => {
    const router = useRouter();
    const [updatedDistance, setUpdatedDistance] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setUpdatedDistance(
            formatDistanceToNow(new Date(topic.updatedAt), {
                addSuffix: true,
                locale: fr,
            })
        );
    }, [topic]);

    const handleRowClick = () => {
        router.push(`/forum/topics/${topic.id}`);
    };

    // Placeholder stats since they might not be part of the Topic type yet
    const replyCount = 0;
    const viewCount = 0;

    return (
        <tr className="topic-row" onClick={handleRowClick}>
            {/* Status Icon */}
            <td className="topic-cell cell-status">
                <div className={`status-icon ${topic.resolveAt ? 'solved' : ''}`}>
                    {topic.resolveAt ? <CheckCircle2 size={18} /> : <MessageSquare size={18} />}
                </div>
            </td>

            {/* Main Info */}
            <td className="topic-cell cell-main">
                <span className="topic-title">{topic.title}</span>
                <div className="topic-tags">
                    {topic.categories.map((category: Category, idx) => (
                        <span key={idx} className="topic-tag">{category.name}</span>
                    ))}
                </div>
            </td>

            {/* Author */}
            <td className="topic-cell cell-author">
                <div className="author-wrapper">
                    <div className="author-avatar">
                        {topic.user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="author-name">{topic.user.username}</span>
                </div>
            </td>

            {/* Activity */}
            <td className="topic-cell cell-activity">
                {isClient ? (
                    <>
                        <span className="activity-date">{updatedDistance}</span>
                        <span className="activity-label">Dernière activité</span>
                    </>
                ) : (
                    <span className="activity-label">Calcul...</span>
                )}
            </td>
        </tr>
    );
};

export default TopicRow;
