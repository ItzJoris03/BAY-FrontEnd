import { Bolden, Highlight, Italic, Strikethrough, Underline } from '@/components/Texts/Text';
import React from 'react';

// Define the type for formatting rules
type FormatRule = {
  regex: RegExp;
  render: (content: string, key: number) => React.ReactNode;
};

// TextFormatter Component
const textFormatter = (text = "") => {
  // Define all formatting rules, including highlighting
  const formatRules: FormatRule[] = [
    {
      // Bold: **text**
      regex: /\*\*(.*?)\*\*/g,
      render: (content, key) => <Bolden content={content} key={key} />,
    },
    {
      // Underline: __text__
      regex: /__(.*?)__/g,
      render: (content, key) => <Underline content={content} key={key} />,
    },
    {
      // Strikethrough: ~~text~~
      regex: /~~(.*?)~~/g,
      render: (content, key) => <Strikethrough content={content} key={key} />,
    },
    {
      // Italic: *text*
      regex: /\*(.*?)\*/g,
      render: (content, key) => <Italic content={content} key={key} />,
    },
    {
      // Highlight: ==text==
      regex: /==(.*?)==/g,
      render: (content, key) => <Highlight content={content} key={key} />,
    },
  ];

  // Function to apply formatting rules
  const applyFormatting = (inputText: string): React.ReactNode[] => {
    let elements: React.ReactNode[] = [inputText];
    let key = 0;

    // Apply each formatting rule sequentially
    formatRules.forEach((rule) => {
      elements = elements.flatMap((element) => {
        if (typeof element !== 'string') {
          return element;
        }

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        // Reset the lastIndex for global regex
        rule.regex.lastIndex = 0;

        while ((match = rule.regex.exec(element)) !== null) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, content] = match;
          const index = match.index;

          // Push text before the match
          if (index > lastIndex) {
            parts.push(element.substring(lastIndex, index));
          }

          // Push the formatted content
          parts.push(rule.render(content, key++));
          lastIndex = rule.regex.lastIndex;
        }

        // Push remaining text after the last match
        if (lastIndex < element.length) {
          parts.push(element.substring(lastIndex));
        }

        return parts;
      });
    });

    return elements;
  };

  return applyFormatting(text);
};

export default textFormatter;
