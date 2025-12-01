import React from 'react';
import './projects.css';
import { getCurrentUser } from '@/lib/utils/auth';
import { redirect } from 'next/navigation';

const Projects = async () => {
    const user = await getCurrentUser();
    if (!user) redirect('/connexion');

    return (
        <div>
            {/* Contenu à venir */}
        </div>
    );
};
export default Projects;
