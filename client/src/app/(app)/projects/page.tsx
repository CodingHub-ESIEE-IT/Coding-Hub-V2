import React from 'react';
import './projects.css';
import { getCurrentUser } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Heart, MessageCircle, MoreHorizontal, Share2, Bookmark } from 'lucide-react';

const MOCK_PROJECTS = [
    {
        id: 1,
        author: {
            name: 'Pan Feng Shui',
            avatar: 'https://placehold.co/40x40/png',
            date: '12 April at 09.28 PM'
        },
        content: {
            text: 'One of the perks of working in an international company is sharing knowledge with your colleagues.',
            image: 'https://placehold.co/600x400/png'
        },
        stats: {
            likes: '120k',
            comments: '25'
        }
    },
    {
        id: 2,
        author: {
            name: 'Clara Kim',
            avatar: 'https://placehold.co/40x40/png',
            date: '12 April at 09.28 PM'
        },
        content: {
            text: 'A Great Way To Generate All The Motivation You Need To Get Fit',
            image: 'https://placehold.co/600x400/png'
        },
        stats: {
            likes: '12',
            comments: '7'
        }
    },
    {
        id: 3,
        author: {
            name: 'Thomas Anderson',
            avatar: 'https://placehold.co/40x40/png',
            date: '11 April at 10.00 AM'
        },
        content: {
            text: 'Just finished my new portfolio website using Next.js and Tailwind CSS! Check it out.',
            image: 'https://placehold.co/600x400/png'
        },
        stats: {
            likes: '342',
            comments: '45'
        }
    }
];

const Projects = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/connexion');

    return (
        <div className="projects-page">
            <div className="projects-feed">
                {MOCK_PROJECTS.map((project) => (
                    <div key={project.id} className="project-card">
                        <div className="card-header">
                            <div className="author-info">
                                <Image
                                    src={project.author.avatar}
                                    alt={project.author.name}
                                    width={40}
                                    height={40}
                                    className="author-avatar"
                                />
                                <div className="author-details">
                                    <span className="author-name">{project.author.name}</span>
                                    <span className="post-date">{project.author.date}</span>
                                </div>
                            </div>
                            <button className="more-options">
                                <MoreHorizontal size={20} color="#fff" />
                            </button>
                        </div>

                        <div className="card-body">
                            <p className="post-text">{project.content.text}</p>
                            <div className="post-image-container">
                                <Image
                                    src={project.content.image}
                                    alt="Project"
                                    width={600}
                                    height={400}
                                    className="post-image"
                                    unoptimized
                                />
                            </div>
                        </div>

                        <div className="card-footer">
                            <div className="interaction-item">
                                <MessageCircle size={20} />
                                <span>{project.stats.comments} Comments</span>
                            </div>
                            <div className="interaction-item">
                                <Heart size={20} />
                                <span>{project.stats.likes} Likes</span>
                            </div>
                            <div className="interaction-item">
                                <Share2 size={20} />
                                <span>Share</span>
                            </div>
                            <div className="interaction-item">
                                <Bookmark size={20} />
                                <span>Saved</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default Projects;
