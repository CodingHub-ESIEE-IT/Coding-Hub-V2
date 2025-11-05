'use client';

import React from 'react';
import { StarterKit } from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
import Link from '@tiptap/extension-link';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import Toolbar from '@/components/forum/Toolbar/Toolbar';
import 'highlight.js/styles/atom-one-dark.css';
import './TipTap.css';

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
    immediatelyRender: false,
    autofocus: true,
    content: content,
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
          renderHTML({
            node,
          }: {
            node: Node & { attrs: CodeBlockNodeAttributes };
          }) {
            return {
              'data-language': node.attrs.language || 'javascript',
            };
          },
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      handleChange(editor.getHTML());
    },
    onFocus: ({ editor }) => {
      editor.commands.focus('end');
    },
  });

  return (
    <div className="tiptap-editor-container">
      <Toolbar editor={editor} content={content} />
      <div className="tiptap-editor-content" style={{ whiteSpace: 'pre-line' }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default TipTap;
