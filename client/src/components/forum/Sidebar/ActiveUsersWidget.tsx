import React from 'react';
import './ActiveUsersWidget.css';

interface ActiveUser {
    username: string;
    messageCount: number;
    rank: number;
}

// Mock data
const MOCK_USERS: ActiveUser[] = [
    { username: 'S1mple', messageCount: 1542, rank: 1 },
    { username: 'ZywOo', messageCount: 1203, rank: 2 },
    { username: 'NiKo', messageCount: 980, rank: 3 },
    { username: 'm0NESY', messageCount: 856, rank: 4 },
    { username: 'sh1ro', messageCount: 742, rank: 5 },
];

const ActiveUsersWidget = () => {
    return (
        <div className="active-users-widget">
            <div className="widget-header">
                <h3 className="widget-title">Top Contributeurs</h3>
            </div>
            <ul className="widget-list">
                {MOCK_USERS.map((user) => (
                    <li key={user.rank} className="widget-item">
                        <span className={`user-rank top-${user.rank}`}>{user.rank}</span>
                        <div className="user-avatar-small">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <div className="user-details">
                            <span className="user-name-w">{user.username}</span>
                            <span className="user-score">{user.messageCount} messages</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveUsersWidget;
