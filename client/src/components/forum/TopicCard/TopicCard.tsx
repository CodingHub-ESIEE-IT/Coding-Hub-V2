'use client'

import React, { useEffect, useState } from 'react';
import './TopicCard.css';
import {Topic} from "@/types/topic";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import {Category} from "@/types/category";
import Link from "next/link";
import Tag from "@/components/ui/Tag/Tag";

const TopicCard = ({ topic }: { topic: Topic }) => {
  const [resolvedDate, setResolvedDate] = useState<string | null>(null);
  const [updatedDistance, setUpdatedDistance] = useState<string>('');
  const [createdDate, setCreatedDate] = useState<string>('');

  useEffect(() => {
    if (topic.resolveAt) {
      setResolvedDate(new Date(topic.resolveAt).toLocaleDateString('fr-FR'));
    }
    setUpdatedDistance(
      formatDistanceToNow(new Date(topic.updatedAt), {
        addSuffix: true,
        locale: fr,
      })
    );
    setCreatedDate(new Date(topic.createdAt).toLocaleDateString('fr-FR'));
  }, [topic]);

  return (
      <Link href={`/forum/topics/${topic.id}`}>
        <div className={`card-container ${topic.resolveAt ? 'solved' : ''}`}>
          {topic.resolveAt !== null && (
              <div className="resolution-badge">
                Sujet résolu le{' '}
                {resolvedDate || ''}
              </div>
          )}
          <div className="header">
            <div className="left-header">
              <div className="card-logo-container"/>
              <div>
                <h3 className="title">{topic.title}</h3>
                <p className="text-date">
                  Dernière activité{' '}
                  {updatedDistance}
                </p>
              </div>
            </div>
            <div className="card-categories">
              {topic.categories.map((category: Category, index: React.Key | null | undefined) => (
                  <Tag key={index}>{category.name}</Tag>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="card-left-footer">
              <span className="author">{topic.user.username}</span>
              <p className="author-separator">-</p>
              <p className="created-date">
                Créé le {createdDate}
              </p>
            </div>
          </div>
        </div>
      </Link>
  );
};

export default TopicCard;
