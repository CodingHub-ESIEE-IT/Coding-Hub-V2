'use client';

import React, { useState, useRef, useActionState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import './CreateTopicForm.css';
import { StylesConfig } from 'react-select';
import TipTap from '@/components/forum/TipTap/TipTap';
import { CategoryOption } from "@/types/category";
import { ActionResponse } from "@/types/action";

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface CreateTopicFormProps {
  categories: CategoryOption[];
  topicAction: (
    prevState: ActionResponse | null,
    formData: FormData
  ) => Promise<ActionResponse>;
}

const initialState: ActionResponse = {
  success: false,
  message: '',
}

const CreateTopicForm: React.FC<CreateTopicFormProps> = ({
  categories,
  topicAction,
}) => {
  const [state, action, isPending] = useActionState(topicAction, initialState);
  const [formData, setFormData] = useState({
    title: '',
    categories: [] as CategoryOption[],
    content: '',
  });

  const hiddenContentRef = useRef<HTMLInputElement>(null);
  const hiddenCategoriesRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleCategoryChange = (newValue: unknown) => {
    const selectedCategories = newValue as CategoryOption[];

    setFormData((prev) => ({
      ...prev,
      categories: selectedCategories || [],
    }));

    /*if (hiddenCategoriesRef.current) {
      const categoryIds = selectedCategories?.map(cat => cat.value) || []
      hiddenCategoriesRef.current.value = JSON.stringify(categoryIds)
    }*/
  };

  const handleContentChange = useCallback((content: string) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));

    if (hiddenContentRef.current) {
      hiddenContentRef.current.value = content;
    }
  }, []);

  const customSelectStyles: StylesConfig = {
    control: (
      provided: Record<string, unknown>,
      state: { isFocused: boolean },
    ) => ({
      ...provided,
      backgroundColor: '#161824',
      borderWidth: '1px',
      borderColor: state.isFocused ? '#3f69ff' : 'rgba(255, 255, 255, 0.08)',
      boxShadow: state.isFocused ? '0 0 0 1px #3f69ff' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#3f69ff' : 'rgba(255, 255, 255, 0.08)',
      },
      borderRadius: '6px',
      padding: '0.2rem',
      outline: 'none',
    }),
    menu: (provided: Record<string, unknown>) => ({
      ...provided,
      backgroundColor: '#161824',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '6px',
      overflow: 'hidden',
    }),
    option: (
      provided: Record<string, unknown>,
      state: { isSelected: boolean; isFocused: boolean },
    ) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3f69ff'
        : state.isFocused
          ? 'rgba(63, 105, 255, 0.2)'
          : '#161824',
      color: '#e4e4e4',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: 'rgba(63, 105, 255, 0.4)',
      },
    }),
    multiValue: (provided: Record<string, unknown>) => ({
      ...provided,
      backgroundColor: 'rgba(63, 105, 255, 0.2)',
      borderRadius: '4px',
    }),
    multiValueLabel: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#e4e4e4',
    }),
    multiValueRemove: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#e4e4e4',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#fff',
      },
    }),
    input: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#e4e4e4',
    }),
    placeholder: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#a0a0a0',
    }),
    singleValue: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#e4e4e4',
    }),
    dropdownIndicator: (provided: Record<string, unknown>) => ({
      ...provided,
      color: '#e4e4e4',
      '&:hover': {
        color: '#fff',
      },
    }),
    indicatorSeparator: (provided: Record<string, unknown>) => ({
      ...provided,
      backgroundColor: '#3f3f3f',
    }),
  };

  return (
    <form className="create-topic-form" action={action}>
      <div className="create-topic-form-group">
        {
          state && state.message && (
            <div
              className={`create-topic-feedback ${state.success ? 'success' : 'error'
                }`}
            >
              {state.message}
            </div>
          )
        }
        <label className="create-topic-label" htmlFor="title">
          Titre du sujet
        </label>
        <input
          className="create-topic-input"
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className="create-topic-form-group">
        <label className="create-topic-label" htmlFor="categories">
          Catégorie
        </label>

        <ReactSelect
          id="categories"
          options={categories}
          value={formData.categories}
          onChange={handleCategoryChange}
          styles={customSelectStyles}
          isMulti
          placeholder="Sélectionnez une ou plusieurs catégories"
          noOptionsMessage={() => 'Aucune catégorie trouvée'}
        />

        <input
          ref={hiddenCategoriesRef}
          type="hidden"
          name="categories"
          value={JSON.stringify(formData.categories.map((cat) => cat.value))}
        />
      </div>

      <div className="create-topic-form-group">
        <label className="create-topic-label" htmlFor="content">
          Contenu
        </label>

        <TipTap content={formData.content} onChange={handleContentChange} />

        <input
          ref={hiddenContentRef}
          type="hidden"
          name="content"
          value={formData.content}
        />
      </div>

      <div className="create-topic-button-container">
        <button className="create-topic-submit-button" type="submit">
          {isPending ? 'Création...' : 'Créer le sujet'}
        </button>
        <button
          className="create-topic-cancel-button"
          type="button"
          onClick={() => {
            setFormData({
              title: '',
              categories: [],
              content: '',
            });
          }}
        >
          Annuler
        </button>
      </div>
    </form>
  );
};

export default CreateTopicForm;
