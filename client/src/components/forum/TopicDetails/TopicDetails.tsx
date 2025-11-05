'use client'

import React, {useEffect, useState} from 'react';
import './TopicDetails.css';
import Tag from '@/components/ui/Tag/Tag';
import timeIcon from '../../../../public/images/time.svg';
import messageIcon from '../../../../public/images/message.svg';
import Image from 'next/image';
import AnswerCard from '@/components/forum/AnswerCard/AnswerCard';
import CreateReplyForm from "@/components/forum/CreateReplyForm/CreateReplyForm";
import { createReplyAction } from "@/lib/actions/reply.action";
import { Topic } from '@/types/topic';
import {Category} from "@/types/category";
import {Reply} from "@/types/reply";
import ContentHighLight from "@/components/forum/ContentHighLight/ContentHighLight";
import {User} from "@/types/user";

interface TopicClientProps {
  topic: Topic;
  user: User | null;
}

const TopicClient: React.FC<TopicClientProps> = ({ topic, user}) => {
  const [replies, setReplies] = useState<Reply[]>([]);

  useEffect(() => {
    setReplies(topic.replies);
  }, [topic.replies]);

  return (
      <div>
        <div className="topic-header">
          {topic.categories.map((category: Category, index: React.Key | null | undefined) => (
              <div key={index} style={{ marginRight: '0.5rem', display: 'inline-block' }}>
                <Tag>{category.name}</Tag>
              </div>
          ))}
          <h1 className="topic-title">{topic.title}</h1>
          <ContentHighLight htmlContent={topic.content} />
          <div className="topic-footer">
            <p className="topic-date">
              <Image src={timeIcon} alt="time" />
              Publié il y a 3 jours par <span style={{ marginLeft: '0.3rem' }}>{topic.user.username}</span>
            </p>
            <p className="topic-answers">
              <Image src={messageIcon} alt="réponses" />
              {replies.length} réponses
            </p>
          </div>
        </div>
        <div className="topic-list">
          {replies.map((reply: Reply, index: React.Key | null | undefined) => (
              <AnswerCard key={index} reply={reply} setReplies={setReplies} user={user} bestAnswer={reply.bestAnswer} />
          ))}
          <CreateReplyForm action={createReplyAction} setReplies={setReplies} topicId={topic.id} />
        </div>
      </div>
  );
};

export default TopicClient;
