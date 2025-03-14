'use client';
import React from 'react';
import styled from 'styled-components';
import Tag from '@/components/ui/Tag/Tag';
import timeIcon from '../../../../../public/images/time.svg';
import messageIcon from '../../../../../public/images/message.svg';
import Image from 'next/image';
import AnswerCard from '@/components/forum/AnswerCard/AnswerCard';

const Topic = () => {
  return (
    <div>
      <TopicHeader>
        <Tag>Javascript</Tag>
        <TopicTitle>Comment créer une variable en JavaScript ?</TopicTitle>
        <TopicContent>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id laborum.
        </TopicContent>
        <TopicFooter>
          <TopicDate>
            <Image src={timeIcon} alt="time" /> Publié il y a 3 jours par
            <span>Cyra</span>
          </TopicDate>
          <TopicAnswers>
            <Image src={messageIcon} alt="réponses" /> 2 réponses
          </TopicAnswers>
        </TopicFooter>
      </TopicHeader>
      <TopicList>
        <AnswerCard bestAnswer={'true'} />
        <AnswerCard />
        <AnswerCard />
        <AnswerCard />
      </TopicList>
    </div>
  );
};

const TopicHeader = styled.div`
  background-color: #22233a;
  border-bottom: 0.6px solid #8e8e8e;
  padding: 0.5rem 3rem 2rem 3rem;
  color: #e4e4e4;
`;

const TopicTitle = styled.h1`
  margin-bottom: 1.2rem;
  margin-top: 0.8rem;
`;

const TopicContent = styled.p`
  line-height: 1.5rem;
  font-size: 0.9rem;
`;

const TopicFooter = styled.div`
  margin-top: 2.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;

  img {
    margin-right: 0.5rem;
  }
`;

const TopicDate = styled.p`
  margin-right: 3rem;
  display: flex;
  align-items: center;
`;

const TopicAnswers = styled.p`
  display: flex;
  align-items: center;
`;

const TopicList = styled.div`
  padding: 2rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export default Topic;
