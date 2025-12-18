'use client';

import React, { useEffect, useState } from 'react';
import './ShareProjectModal.css';
import { createProjectAction } from '@/lib/actions/project.action';
import { Loader2 } from 'lucide-react';

interface ShareProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShareProjectModal: React.FC<ShareProjectModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await createProjectAction(formData);
            if (result.error) {
                alert(result.error);
            } else {
                onClose();
            }
        } catch (error) {
            console.error(error);
            alert('Une erreur est survenue');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="share-project-modal-overlay" onClick={onClose}>
            <div className="share-project-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="share-project-modal-header">
                    <h2>Partager un projet</h2>
                    <p>Partagez votre travail avec la communauté CodingHub.</p>
                </div>

                <form className="share-project-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Titre du projet *</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="form-input"
                            placeholder="Ex: Mon Portfolio V2"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className="form-textarea"
                            placeholder="Décrivez votre projet..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="repositoryUrl">URL du dépôt (GitHub, GitLab...)</label>
                        <input
                            type="url"
                            id="repositoryUrl"
                            name="repositoryUrl"
                            className="form-input"
                            placeholder="https://github.com/..."
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="demoUrl">URL de démo (Optionnel)</label>
                        <input
                            type="url"
                            id="demoUrl"
                            name="demoUrl"
                            className="form-input"
                            placeholder="https://mon-projet.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="thumbnailUrl">Image de couverture (URL)</label>
                        <input
                            type="url"
                            id="thumbnailUrl"
                            name="thumbnailUrl"
                            className="form-input"
                            placeholder="https://..."
                        />
                    </div>

                    <div className="modal-actions">
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Annuler
                        </button>
                        <button type="submit" className="submit-button" disabled={isLoading}>
                            {isLoading && <Loader2 className="animate-spin" size={18} />}
                            Publier le projet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ShareProjectModal;
