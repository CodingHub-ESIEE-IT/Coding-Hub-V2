'use client'

import React, { useEffect, useLayoutEffect, useRef } from "react";
import hljs from "highlight.js";
import './ContentHighLight.css'
import "highlight.js/styles/atom-one-dark.css";

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

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('html', html);
hljs.registerLanguage('css', css);
hljs.registerLanguage('python', python);
hljs.registerLanguage('php', php);
hljs.registerLanguage('java', java);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);

interface IProps {
  htmlContent: string;
}

const ContentHighLight = ({ htmlContent }: IProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (contentRef.current) {
        contentRef.current.querySelectorAll('pre code').forEach((block) => {
          if (!block.classList.contains('hljs')) {
            hljs.highlightElement(block as HTMLElement);
          }
        });
      }
    });
  });

  return (
    <div
      ref={contentRef}
      className="topic-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ContentHighLight;
