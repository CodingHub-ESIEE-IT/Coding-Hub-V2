'use client'

import React, {useRef, useState} from 'react';
import TipTap from '@/components/forum/TipTap/TipTap';
import Button from '@/components/ui/Button/Button';
import {Reply} from "@/types/reply";

interface CreateReplyFormProps {
  action: (formData: FormData) => Promise<Reply>;
  setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
  topicId: number;
}

const CreateReplyForm: React.FC<CreateReplyFormProps> = ({ action, setReplies, topicId }) => {
  const [resetKey, setResetKey] = useState(0);
  const [formData, setFormData] = React.useState({
    content: '',
  });

  const hiddenContentRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleContentChange = (content: string) => {
    setFormData((prevState) => ({
      ...prevState,
      content: content,
    }));

    if (hiddenContentRef.current) {
      hiddenContentRef.current.value = content;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append('content', formData.content);
      form.append('topicId', topicId.toString());

      const result = await action(form);

      setReplies(prevReplies => [...prevReplies, result]);
      setFormData({ content: '' });
      setResetKey(prev => prev + 1);

      if (hiddenContentRef.current) {
        hiddenContentRef.current.value = '';
      }

    } catch (error) {
      console.error('Erreur lors de la création de la réponse:', error);
      alert('Une erreur est survenue lors de la création de la réponse');
    }
  };

  return (
      <form className="topic-form-group" onSubmit={handleSubmit} ref={formRef}>
        <label className="topic-label" htmlFor="content">
          Votre réponse
        </label>
        <TipTap
            key={formData.content === '' ? resetKey : 'editor'}
            content={formData.content}
            onChange={(newContent: string) => handleContentChange(newContent)}
        />
        <input
            ref={hiddenContentRef}
            type="hidden"
            name="content"
            value={formData.content}
        />
        <input
            type="hidden"
            name="topicId"
            value={topicId}
        />
        <Button
            type={'submit'}
            margin={'1rem 0 0 0'}
            padding={'0.8rem 2rem'}
            text={'Envoyer'}
        />
      </form>
  );
};

export default CreateReplyForm;
