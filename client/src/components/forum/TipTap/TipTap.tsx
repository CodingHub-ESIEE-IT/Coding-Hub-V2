'use client';

import React from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Toolbar from '@/components/forum/Toolbar/Toolbar';
import 'highlight.js/styles/atom-one-dark.css';
import styled from 'styled-components';

// Importation des langages pour la coloration syntaxique
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import python from 'highlight.js/lib/languages/python';
import php from 'highlight.js/lib/languages/php';
import java from 'highlight.js/lib/languages/java';
import csharp from 'highlight.js/lib/languages/csharp';
import bash from 'highlight.js/lib/languages/bash';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';

const lowlight = createLowlight();

// Enregistrement des langages
lowlight.register('javascript', javascript);
lowlight.register('typescript', typescript);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('python', python);
lowlight.register('php', php);
lowlight.register('java', java);
lowlight.register('csharp', csharp);
lowlight.register('bash', bash);
lowlight.register('json', json);
lowlight.register('sql', sql);

interface CodeBlockNodeAttributes {
  language: string;
}

const TipTap = ({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) => {
  const handleChange = (newContent: string) => {
    onChange(newContent);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'tiptap-link',
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        defaultLanguage: 'javascript',
        HTMLAttributes: {
          class: 'code-block',
          renderHTML({ node }: { node: Node & { attrs: CodeBlockNodeAttributes } }) {
            return {
              'data-language': node.attrs.language || 'javascript'
            }
          }
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
  });

  return (
    <EditorContainer>
      <Toolbar editor={editor} content={content} />
      <StyledEditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
    </EditorContainer>
  );
};

const EditorContainer = styled.div`
  border-radius: 6px;
  overflow: hidden;
`;

const StyledEditorContent = styled(EditorContent)`
    .ProseMirror {
        padding: 0.8rem;
        border: 1px solid #1d1e35;
        border-top: none;
        background-color: #22233a;
        color: #e4e4e4;
        min-height: 150px;
        border-radius: 0 0 6px 6px;
        outline: none;
        font-size: 1rem;
        transition: border-color 0.3s;

        p {
            margin: 0.5em 0;
        }

        h2 {
            font-size: 1.5rem;
            margin: 1rem 0 0.5rem;
            color: #e4e4e4;
        }

        ul,
        ol {
            padding-left: 1.5rem;
            margin: 0.5em 0;
        }

        li {
            margin: 0.2em 0;
        }

        blockquote {
            border-left: 3px solid #3f69ff;
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            font-style: italic;
            color: #c4c4c4;
        }

        .code-block {
            background-color: #1a1b2e;
            border-radius: 8px;  // Bordures plus arrondies
            margin: 1rem 0;  
            padding: 1rem;// Plus d'espace vertical
            position: relative;
            border: 1px solid #2d2e4a;  // Bordure subtile
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);  // Ombre portée
        }
`;

export default TipTap;
