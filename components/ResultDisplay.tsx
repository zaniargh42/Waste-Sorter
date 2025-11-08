
import React from 'react';
import { AnalysisResult } from '../types';

interface ResultDisplayProps {
  result: AnalysisResult;
}

// A simple markdown to HTML converter for basic formatting.
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const html = text
    .split('\n')
    .map(line => {
      if (line.startsWith('### **')) {
        return `<h3 class="text-xl font-bold mt-4 mb-2 text-blue-500 dark:text-blue-400">${line.replace(/### \*\*/g, '').replace(/\*\*/g, '')}</h3>`;
      }
      if (line.startsWith('**')) {
        return `<p class="font-semibold">${line.replace(/\*\*/g, '')}</p>`;
      }
      if (line.trim() === '') {
        return '<br />';
      }
      return `<p>${line}</p>`;
    })
    .join('');

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-700/50 p-6 rounded-lg">
         <MarkdownRenderer text={result.text} />
      </div>
      
      {result.sources.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Sources</h4>
          <ul className="space-y-2 list-disc list-inside">
            {result.sources.map((source, index) => (
              <li key={index}>
                <a
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline break-words"
                >
                  {source.title || source.uri}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
