import React, { useState } from 'react';
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
import './Toolbar.css';

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
      <div className="toolbar-container">
        <div className="toolbar-content">
          <div className="toolbar-group">
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('bold') ? 'toolbar-button--active' : ''}`}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Gras"
            >
              <Bold size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('italic') ? 'toolbar-button--active' : ''}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Italique"
            >
              <Italic size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('heading', { level: 2 }) ? 'toolbar-button--active' : ''}`}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Titre"
            >
              <Heading2 size={18} />
            </button>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('bulletList') ? 'toolbar-button--active' : ''}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Liste à puces"
            >
              <List size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('orderedList') ? 'toolbar-button--active' : ''}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Liste numérotée"
            >
              <ListOrdered size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('blockquote') ? 'toolbar-button--active' : ''}`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Citation"
            >
              <Quote size={18} />
            </button>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('codeBlock') ? 'toolbar-button--active' : ''}`}
                onClick={(e) => addCodeBlock(e)}
                title="Bloc de code"
            >
              <Code size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${editor.isActive('link') ? 'toolbar-button--active' : ''}`}
                onClick={addLink}
                title="Lien"
            >
              <Link size={18} />
            </button>
          </div>

          <div className="toolbar-divider" />

          <div className="toolbar-group">
            <button
                type="button"
                className={`toolbar-button ${!editor.can().undo() ? 'toolbar-button--disabled' : ''}`}
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                title="Annuler"
            >
              <Undo size={18} />
            </button>
            <button
                type="button"
                className={`toolbar-button ${!editor.can().redo() ? 'toolbar-button--disabled' : ''}`}
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                title="Rétablir"
            >
              <Redo size={18} />
            </button>
          </div>

          {showLanguageSelect && (
              <div className="toolbar-overlay" onClick={() => setShowLanguageSelect(false)}>
                <div className="toolbar-language-select-container" onClick={(e) => e.stopPropagation()}>
                  <h3 className="toolbar-language-select-title">Choisir un langage :</h3>
                  <div className="toolbar-language-select-grid">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang.value}
                            className="toolbar-language-option"
                            onClick={() => setCodeBlockLanguage(lang.value)}
                        >
                          {lang.label}
                        </button>
                    ))}
                  </div>
                  <button
                      type="button"
                      className="toolbar-close-button"
                      onClick={() => setShowLanguageSelect(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
          )}
        </div>
        <div className="toolbar-separator" />
      </div>
  );
};

export default Toolbar;
