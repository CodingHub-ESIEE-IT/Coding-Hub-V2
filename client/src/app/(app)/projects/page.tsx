import React from 'react';
import './projects.css';
import { getCurrentUser } from '@/lib/utils/api/auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Heart, MessageCircle, MoreHorizontal, Share2, Bookmark, Plus } from 'lucide-react';
import { getProjects } from '@/lib/utils/api/project';
import { Project } from '@/types/project';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import CreateProjectCard from '@/components/projects/CreateProjectCard/CreateProjectCard';

const MOCK_CLASSES = [
    { id: 1, name: 'Dev Web', count: '12 Projects' },
    { id: 2, name: 'Data Science', count: '8 Projects' },
    { id: 3, name: 'Mobile Apps', count: '5 Projects' },
];

const MOCK_PROFESSORS = [
    { id: 1, name: 'Mr. Smith', avatar: 'https://placehold.co/30x30/png' },
    { id: 2, name: 'Mme. Dupont', avatar: 'https://placehold.co/30x30/png' },
    { id: 3, name: 'Dr. House', avatar: 'https://placehold.co/30x30/png' },
];

const Projects = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/connexion');

    const projectsData = await getProjects();
    const projects: Project[] = projectsData.data;

    return (
        <div className="projects-page">
            <div className="projects-container">
                {/* Main Feed Column */}
                <div className="projects-feed-container">
                    <div className="projects-feed">
                        {/* Call to Action: Create Project */}
                        <CreateProjectCard />

                        {projects && projects.length > 0 ? (
                            projects.map((project) => (
                                <div key={project.id} className="project-card">
                                    <div className="card-header">
                                        <div className="author-info">
                                            <Image
                                                src={project.user?.avatarUrl || 'https://placehold.co/40x40/png'}
                                                alt={project.user?.username || 'Utilisateur'}
                                                width={40}
                                                height={40}
                                                className="author-avatar"
                                                unoptimized={!project.user?.avatarUrl}
                                            />
                                            <div className="author-details">
                                                <span className="author-name">{project.user?.username || 'Anonyme'}</span>
                                                <span className="post-date">
                                                    {formatDistanceToNow(new Date(project.createdAt), { addSuffix: true, locale: fr })}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="more-options">
                                            <MoreHorizontal size={20} color="#fff" />
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <h3 className="post-title" style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.2rem', fontWeight: 'bold' }}>{project.title}</h3>
                                        <p className="post-text">{project.description}</p>

                                        {project.thumbnailUrl && (
                                            <div className="post-image-container">
                                                <Image
                                                    src={project.thumbnailUrl}
                                                    alt={project.title}
                                                    width={600}
                                                    height={400}
                                                    className="post-image"
                                                    unoptimized
                                                />
                                            </div>
                                        )}
                                        {/* Fallback image if no thumbnail, optional, or remove if cleaner */}
                                        {!project.thumbnailUrl && (
                                            <div className="post-image-container">
                                                <Image
                                                    src={'https://placehold.co/600x400/png?text=Projet'}
                                                    alt="Project Placeholder"
                                                    width={600}
                                                    height={400}
                                                    className="post-image"
                                                    unoptimized
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="card-footer">
                                        <div className="interaction-item">
                                            <Heart size={20} />
                                            <span>0</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: 'white', textAlign: 'center', padding: '2rem' }}>
                                Aucun projet trouvé.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Projects;
