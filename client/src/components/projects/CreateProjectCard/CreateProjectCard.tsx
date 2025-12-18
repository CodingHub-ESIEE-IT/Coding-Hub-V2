'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ShareProjectModal from '../ShareProjectModal/ShareProjectModal';
import '@/app/(app)/projects/projects.css'; // Ensure creating-project-card styles are available or import specific styles if moved

const CreateProjectCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="create-project-card" onClick={() => setIsModalOpen(true)} style={{ cursor: 'pointer' }}>
                <div className="create-icon-wrapper">
                    <Plus size={32} />
                </div>
                <div className="create-text">
                    <h3>Partage ton projet !</h3>
                    <p>Montre à la communauté sur quoi tu travailles et reçois des feedbacks.</p>
                </div>
            </div>

            <ShareProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default CreateProjectCard;
