import React from 'react';
import './UserCard.css';

interface UserCardProps {
  name: string;
  pseudo: string;
  role: string
}

const UserCard = ({ name, pseudo, role }: UserCardProps) => {
  return (
      <div className="user-card-container">
        <div className="user-card-logo-container" />
        <h3 className="user-card-title">{name}</h3>
        <p className="user-card-pseudo">@{pseudo}</p>
        <div className="user-card-tag">{role}</div>
      </div>
  );
};

export default UserCard;
