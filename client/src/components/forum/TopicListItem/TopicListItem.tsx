'use client';

import React from 'react';
import './TopicListItem.css';
import { Topic } from "@/types/topic";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface TopicListItemProps {
    topic: Topic;
}

const TopicListItem = ({ topic }: TopicListItemProps) => {
    // Mocking comment count for now as it's not in the Topic interface yet
    const commentCount = Math.floor(Math.random() * 50) + 1;

    // Handle date formatting
    const timeAgo = formatDistanceToNow(new Date(topic.updatedAt), {
        addSuffix: true,
        locale: fr,
    });

    const category = topic.categories[0];
    const categoryName = category ? category.name : 'Général';

    // Simple logic to assign a class based on category name for coloring
    let badgeClass = 'community';
    if (['Help', 'Bug', 'Dev'].some(t => categoryName.includes(t))) badgeClass = 'tech';
    if (['Projet', 'Showcase'].some(t => categoryName.includes(t))) badgeClass = 'match';

    return (
        <Link href={`/forum/topics/${topic.id}`} style={{ textDecoration: 'none' }}>
            <div className="topic-list-item">
                <div className="topic-content-left">
                    <div className="topic-title-row">
                        <span className="topic-title">{topic.title}</span>
                    </div>
                    <div className="topic-meta-row">
                        <span className="meta-item">{timeAgo}</span>
                        <span className="meta-dot"></span>
                        <span className="meta-item">
                            <MessageSquare size={12} />
                            {commentCount} comments
                        </span>
                        <span className="meta-dot"></span>
                        <span className="meta-item">par {topic.user.username}</span>
                    </div>
                </div>
                <div className="topic-content-right">
                    <span className={`category-badge ${badgeClass}`}>
                        {categoryName}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default TopicListItem;
