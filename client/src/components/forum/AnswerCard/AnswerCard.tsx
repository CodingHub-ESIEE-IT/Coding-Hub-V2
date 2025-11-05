'use client';
import React, { useEffect } from 'react';
import timeIcon from '../../../../public/images/time.svg';
import likeIcon from '../../../../public/images/like.svg';
import likeFilledIcon from '../../../../public/images/like-filled.svg';
import starIcon from '../../../../public/images/star.svg';
import Image from 'next/image';
import './AnswerCard.css';
import { Reply } from '@/types/reply';
import ContentHighLight from '@/components/forum/ContentHighLight/ContentHighLight';
import { createLikeAction, deleteLikeAction } from '@/lib/actions/like.action';
import { User } from '@/types/user';
import { toggleBestAnswerAction } from '@/lib/actions/reply.action';

const AnswerCard = ({
  bestAnswer = false,
  reply,
  setReplies,
  user,
}: {
  bestAnswer?: boolean;
  reply: Reply;
  setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
  user: User | null;
}) => {
  const [likes, setLikes] = React.useState<number>(0);

  useEffect(() => {
    setLikes(reply.likes?.length || 0);
  }, [reply.likes]);

  const toggleLike = async () => {
    const isLiked = reply.likes?.some((like) => like.userId === user?.id);

    const updateLikes = (increment: number) => {
      setLikes((prevLikes) => Math.max(prevLikes + increment, 0));
    };

    const handleLikeAction = async (action: string) => {
      try {
        const data =
          action === 'create'
            ? await createLikeAction(reply.id)
            : await deleteLikeAction(reply.id);
        if (isLiked) {
          reply.likes = reply.likes?.filter((like) => like.userId !== user?.id);
        } else {
          reply.likes = [...(reply.likes || []), data];
        }
        updateLikes(isLiked ? -1 : 1);
      } catch (error) {
        console.error(`Erreur lors du ${isLiked ? 'unlike' : 'like'}:`, error);
        updateLikes(isLiked ? -1 : 1);
      }
    };

    if (isLiked) {
      await handleLikeAction('delete');
    } else {
      await handleLikeAction('create');
    }
  };

  const toggleBestAnswer = async () => {
    try {
      await toggleBestAnswerAction(reply.id);
      reply.bestAnswer = !reply.bestAnswer;
      setReplies((prevReplies) =>
        prevReplies.map((r) =>
          r.id === reply.id
            ? { ...r, bestAnswer: reply.bestAnswer }
            : { ...r, bestAnswer: false },
        ),
      );
    } catch (error) {
      console.error('Erreur lors du unlike:', error);
    }
  };

  return (
    <div className="answer-card-wrapper">
      {reply.userId === user?.id && (
        <button
          className="answer-card-star-button"
          onClick={() => toggleBestAnswer()}
        >
          <Image src={starIcon} alt="Résolu" />
        </button>
      )}
      <div className={`answer-card ${bestAnswer ? 'answer-card--solved' : ''}`}>
        {bestAnswer ? (
          <div className="answer-card-resolution-badge">Meilleure réponse</div>
        ) : null}
        <div
          className="answer-card-container"
          style={{ paddingLeft: reply.userId === user?.id ? '1rem' : '0' }}
        >
          <div className="answer-card-main-head">
            <div style={{ display: 'flex' }}>
              <div className="answer-card-user-avatar"></div>
              <div>
                <p className="answer-card-pseudo">{reply.user?.username}</p>
                <p className="answer-card-role">Élève</p>
              </div>
            </div>
            <div className="answer-card-header">
              <div className="answer-card-infos">
                <p className="answer-card-date">
                  <Image src={timeIcon} alt="time" /> Il y a 2 jours
                </p>
                <button
                  className="answer-card-likes"
                  onClick={() => toggleLike()}
                >
                  <Image
                    style={{ marginRight: '0.3rem' }}
                    src={
                      reply.likes?.some((like) => like.userId === user?.id)
                        ? likeFilledIcon
                        : likeIcon
                    }
                    alt="likes"
                  />
                  {likes}
                </button>
              </div>
            </div>
          </div>
          <ContentHighLight htmlContent={reply.content} />
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
