import React, { useState, useEffect } from 'react';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Quote,
  Undo,
  Redo,
  Code,
  Link,
} from 'lucide-react';
import styled from 'styled-components';

type Props = {
  editor: Editor | null;
  content: string;
};

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'python', label: 'Python' },
  { value: 'php', label: 'PHP' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'bash', label: 'Bash' },
  { value: 'json', label: 'JSON' },
  { value: 'sql', label: 'SQL' },
  { value: 'plaintext', label: 'Texte brut' },
];

const Toolbar = ({ editor }: Props) => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);

  if (!editor) {
    return null;
  }

  const addLink = () => {
    // Récupérer la sélection actuelle
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to, '');

    // Si un lien est déjà actif, on le supprime
    if (editor.isActive('link')) {
      editor.chain().focus().unsetLink().run();
      return;
    }

    // Demander l'URL
    const url = window.prompt('URL du lien:', 'https://');

    // Vérifier que l'URL est valide
    if (!url || url === 'https://') {
      return;
    }

    // Si du texte est sélectionné
    if (selectedText) {
      // Appliquer le lien au texte sélectionné
      editor.chain().focus().setLink({ href: url, target: '_blank' }).run();
    } else {
      // Insérer un nouveau lien avec l'URL comme texte
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank">${url}</a>`)
        .run();
    }
  };

  const addCodeBlock = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (editor.isActive('codeBlock')) {
      editor.chain().focus().exitCode().run();
      return;
    }

    setShowLanguageSelect(true);
  };

  const setCodeBlockLanguage = (language: string) => {
    editor.chain().focus().setCodeBlock().run();

    editor.commands.updateAttributes('codeBlock', { language });

    setShowLanguageSelect(false);
  };

  return (
    <ToolbarContainer>
      <ToolbarContent>
        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            $isActive={editor.isActive('bold')}
            title="Gras"
          >
            <Bold size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            $isActive={editor.isActive('italic')}
            title="Italique"
          >
            <Italic size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            $isActive={editor.isActive('heading', { level: 2 })}
            title="Titre"
          >
            <Heading2 size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            $isActive={editor.isActive('bulletList')}
            title="Liste à puces"
          >
            <List size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            $isActive={editor.isActive('orderedList')}
            title="Liste numérotée"
          >
            <ListOrdered size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            $isActive={editor.isActive('blockquote')}
            title="Citation"
          >
            <Quote size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <ToolbarButton
            type="button"
            onClick={(e) => addCodeBlock(e)}
            $isActive={editor.isActive('codeBlock')}
            title="Bloc de code"
          >
            <Code size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={addLink}
            $isActive={editor.isActive('link')}
            title="Lien"
          >
            <Link size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        <Divider />

        <ToolbarGroup>
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="Annuler"
          >
            <Undo size={18} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="Rétablir"
          >
            <Redo size={18} />
          </ToolbarButton>
        </ToolbarGroup>

        {showLanguageSelect && (
          <Overlay onClick={() => setShowLanguageSelect(false)}>
            <LanguageSelectContainer onClick={(e) => e.stopPropagation()}>
              <LanguageSelectTitle>Choisir un langage :</LanguageSelectTitle>
              <LanguageSelectGrid>
                {LANGUAGES.map((lang) => (
                  <LanguageOption
                    key={lang.value}
                    onClick={() => setCodeBlockLanguage(lang.value)}
                  >
                    {lang.label}
                  </LanguageOption>
                ))}
              </LanguageSelectGrid>
              <CloseButton onClick={() => setShowLanguageSelect(false)}>
                Annuler
              </CloseButton>
            </LanguageSelectContainer>
          </Overlay>
        )}
      </ToolbarContent>
      <ToolbarSeparator />
    </ToolbarContainer>
  );
};

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #22233a;
  border: 1px solid #1d1e35;
  border-bottom: none;
  border-radius: 6px 6px 0 0;
`;

const ToolbarContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.5rem;
  align-items: center;
  gap: 0.25rem;
`;

const ToolbarSeparator = styled.div`
  height: 1px;
  background-color: #1d1e35;
  width: 100%;
`;

const ToolbarGroup = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const ToolbarButton = styled.button<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.$isActive ? '#3f69ff' : 'transparent')};
  border: none;
  color: ${(props) => (props.$isActive ? '#ffffff' : '#e4e4e4')};
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  padding: 0.5rem;

  &:hover {
    background-color: ${(props) =>
      props.$isActive ? '#3f69ff' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 24px;
  background-color: #3f3f3f;
  margin: 0 0.5rem;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageSelectContainer = styled.div`
  background-color: #22233a;
  border: 1px solid #1d1e35;
  border-radius: 6px;
  padding: 1rem;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  max-width: 80%;
  width: 500px;
  max-height: 80vh;
  overflow-y: auto;
`;

const LanguageSelectTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  color: #e4e4e4;
  font-size: 1rem;
`;

const LanguageSelectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
`;

const LanguageOption = styled.button`
  background-color: #1a1b2e;
  color: #e4e4e4;
  border: 1px solid #3f3f3f;
  border-radius: 4px;
  padding: 0.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #3f69ff;
    color: white;
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: #e4e4e4;
  border: 1px solid #3f3f3f;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export default Toolbar;
