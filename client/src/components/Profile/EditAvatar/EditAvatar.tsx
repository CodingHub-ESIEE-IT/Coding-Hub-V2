'use client'
import React, {useActionState, useState} from 'react';
import {ActionResponse} from "@/types/action";
import './EditAvatar.css';
import Image from "next/image";

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
  const [selectedAvatar, setSelectedAvatar] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
      <>
        <div className={"edit-avatar-container"}>
          <h3 className={'edit-profile-title'}>Avatar</h3>
          <div className={"edit-avatar-content"}>
            <Image
                src={currentAvatar || `/images/avatars/boruto.jpeg`}
                width={150}
                height={150}
                alt="Avatar"
                className="avatar-preview"
            />
            <div style={{display: 'flex', justifyContent: 'space-between', gap: '10px'}}>
              <button
                  onClick={() => setIsPopupOpen(true)}
                  className="actions-button"
              >
                Charger une image
              </button>
              <button className={"delete-button"}>D</button>
            </div>
          </div>
        </div>

        {isPopupOpen && (
            <div className="popup-overlay" onClick={() => {}}>
              <div className="popup-content">
                {/* Header */}
                <div className="popup-header">
                  <h2>Choisir un avatar</h2>
                  <button
                      onClick={() => {}}
                      className="popup-close"
                      aria-label="Fermer"
                  >
                    ✕
                  </button>
                </div>

                <div className="popup-body">
                  <div className="avatar-grid">
                    {/* Exemple d'avatars - à remplacer par tes vrais avatars */}
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                        <div
                            key={num}
                            className={`avatar-option ${selectedAvatar === num ? 'selected' : ''}`}
                            onClick={() => setSelectedAvatar(num)}
                        >
                          <Image
                              src={`/images/avatars/avatar-${num}.png`}
                              width={80}
                              height={80}
                              alt={`Avatar ${num}`}
                          />
                        </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="popup-footer">
                  <button
                      onClick={() => {}}
                      className="button-secondary"
                  >
                    Annuler
                  </button>
                  <button
                      onClick={() => {
                        if (selectedAvatar) {
                          setCurrentAvatar(`/images/avatars/avatar-${selectedAvatar}.png`);
                        }
                      }}
                      className="button-primary"
                      disabled={!selectedAvatar}
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>
        )}
      </>
  );
};

export default EditAvatar;
