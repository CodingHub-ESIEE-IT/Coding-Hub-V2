'use client';
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { StylesConfig } from 'react-select';
import TipTap from '@/components/forum/TipTap/TipTap';

const ReactSelect = dynamic(() => import('react-select'), { ssr: false });

interface CategoryOption {
  value: string;
  label: string;
}

interface FormData {
  title: string;
  categories: CategoryOption[];
  content: string;
}

const categoryOptions: CategoryOption[] = [
  { value: 'frontend', label: 'Frontend' },
  { value: 'backend', label: 'Backend' },
  { value: 'devops', label: 'DevOps' },
  { value: 'mobile', label: 'Développement Mobile' },
  { value: 'database', label: 'Bases de données' },
  { value: 'other', label: 'Autre' },
];

const CreateTopic = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    categories: [],
    content: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCategoryChange = (newValue: unknown) => {
    const selectedCategories = newValue as CategoryOption[];

    setFormData((prevState) => ({
      ...prevState,
      categories: selectedCategories || [],
    }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prevState) => ({
      ...prevState,
      content: content,
    }));
  };

  const customSelectStyles: StylesConfig = {
    control: (
      provided: Record<string, unknown>,
      state: { isFocused: boolean },
    ) => ({
      ...provided,
      backgroundColor: '#22233a',
      borderWidth: '1px',
      borderColor: state.isFocused ? '#3f69ff' : '#1d1e35',
      boxShadow: state.isFocused ? '0 0 0 1px #3f69ff' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#3f69ff' : '#1d1e35',
      },
      borderRadius: '6px',
      padding: '0.2rem',
      outline: 'none',
    }),
    menu: (provided: Record<string, unknown>) => ({
      ...provided,
      backgroundColor: '#22233a',
      border: '1px solid #1d1e35',
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
          : '#22233a',
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

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log('Données du formulaire soumises :', formData);
    // Ici vous pourriez ajouter la logique pour envoyer les données à votre API
  };

  return (
    <Container>
      <FormTitle>
        Créer un <span>sujet</span>
      </FormTitle>
      <FormDescription>
        Assurez-vous de formuler votre question de manière concise et claire
        pour faciliter la compréhension des autres membres et obtenir des
        réponses pertinentes.
      </FormDescription>
      <Separator />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">Titre du sujet</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="categories">Catégorie</Label>
          <ReactSelect
            id="categories"
            name="categories"
            options={categoryOptions}
            value={formData.categories}
            onChange={handleCategoryChange}
            styles={customSelectStyles}
            isMulti
            placeholder="Sélectionnez une ou plusieurs catégories"
            noOptionsMessage={() => 'Aucune catégorie trouvée'}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="content">Contenu</Label>
          <TipTap
              content={formData.content}
              onChange={(newContent: string) => handleContentChange(newContent)}
          />
          {/*<TextArea
            id="content"
            name="content"
            placeholder="Décrivez votre problème ou votre question en détail..."
            rows={8}
            value={formData.content}
            onChange={handleChange}
            required
          />*/}
        </FormGroup>
        <ButtonContainer>
          <SubmitButton type="submit">Créer le sujet</SubmitButton>
          <CancelButton type="button">Annuler</CancelButton>
        </ButtonContainer>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 8rem;
`;

const FormTitle = styled.h1`
  font-size: 2.6rem;
  margin-bottom: 0.6rem;
  color: #e4e4e4;

  span {
    color: #3f69ff;
  }
`;

const FormDescription = styled.p`
  font-size: 1.1rem;
  color: #e4e4e4;
  line-height: 1.5;
  width: 75%;
  margin-bottom: 1.8rem;
`;

const Separator = styled.div`
  height: 1px;
  background-color: #e4e4e4;
  margin-bottom: 2rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1rem;
  color: #e4e4e4;
  font-weight: 500;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #1d1e35;
  background-color: #22233a;
  color: #e4e4e4;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3f69ff;
  }
`;
const TextArea = styled.textarea`
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid #1d1e35;
  background-color: #22233a;
  color: #e4e4e4;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #3f69ff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SubmitButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #3f69ff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #2a50d5;
  }
`;

const CancelButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: transparent;
  color: #e4e4e4;
  border: 1px solid #3f3f3f;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export default CreateTopic;
