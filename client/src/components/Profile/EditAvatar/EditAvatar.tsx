'use client'
import React, { useActionState, useState } from 'react';
import { createPortal } from 'react-dom';
import { ActionResponse } from "@/types/action";
import './EditAvatar.css';
import Image from "next/image";
import { AVAILABLE_AVATARS } from '../../../../config/avatar';

type EditAvatarProps = {
  avatarUrl: string | null;
  avatarEditAction: (
    prevState: ActionResponse | null,
    formData: FormData,
  ) => Promise<ActionResponse>;
};

const initialState: ActionResponse = {
  success: false,
  message: '',
};

const EditAvatar: React.FC<EditAvatarProps> = ({ avatarUrl, avatarEditAction }) => {
  const [state, action, pending] = useActionState(avatarEditAction, initialState)
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  React.useEffect(() => {
    if (state.success) {
      const newPath = `/images/avatars/${selectedAvatar}.png`;
      setCurrentAvatar(newPath);
      setIsPopupOpen(false);
    }
  }, [state.success]);

  return (
    <>
      <div
        className="edit-avatar-trigger-container"
        onClick={() => setIsPopupOpen(true)}
        title="Modifier la photo de profil"
      >
        <Image
          className="profile-picture"
          src={currentAvatar || `/images/avatars/avatar_1.png`}
          width={100}
          height={100}
          alt="Avatar"
        />
        <div className="edit-avatar-overlay">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
      </div>

      {isPopupOpen && createPortal(
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="popup-header">
              <h2>Choisir un avatar</h2>
              <button
                onClick={() => setIsPopupOpen(false)}
                className="popup-close"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="popup-body">
              <div className="avatar-grid">
                {AVAILABLE_AVATARS.map((image) => (
                  <div
                    key={image.id}
                    className={`avatar-option ${selectedAvatar === image.name ? 'selected' : ''}`}
                    onClick={() => setSelectedAvatar(image.name)}
                  >
                    <Image
                      src={image.url}
                      width={80}
                      height={80}
                      alt={`Avatar ${image.name}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="popup-footer">
              <button
                onClick={() => setIsPopupOpen(false)}
                className="button-secondary"
              >
                Annuler
              </button>
              <form action={action}>
                <input type="hidden" name="avatarUrl" value={`/images/avatars/${selectedAvatar}.png`} />
                <button
                  type="submit"
                  className="button-primary"
                  disabled={!selectedAvatar}
                >
                  {pending ? 'Enregistrement...' : 'Valider'}
                </button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default EditAvatar;
