
import React, { useState, useCallback } from 'react';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
}

const ClipboardIcon = ({ copied }: { copied: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-all duration-200 ${copied ? 'text-green-400' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {copied ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      )}
    </svg>
);

const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 10.01l2.293 2.293a1 1 0 01-1.414 1.414L12 18.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 17" />
    </svg>
);


const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isLoading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (content) {
      navigator.clipboard.writeText(content).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  }, [content]);

  const renderContent = () => {
    if (isLoading && !content) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
           <div role="status" className="w-full animate-pulse">
                <div className="h-4 bg-gray-600 rounded-full w-48 mb-4"></div>
                <div className="h-3 bg-gray-700 rounded-full max-w-[90%] mb-2.5"></div>
                <div className="h-3 bg-gray-700 rounded-full mb-2.5"></div>
                <div className="h-3 bg-gray-700 rounded-full max-w-[85%] mb-2.5"></div>
                <div className="h-3 bg-gray-700 rounded-full max-w-[95%] mb-2.5"></div>
                <div className="h-3 bg-gray-700 rounded-full max-w-[80%]"></div>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
      );
    }

    if (!content) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
          <SparklesIcon />
          <p className="mt-4 font-semibold">Your AI-generated content will appear here.</p>
          <p className="mt-1 text-sm">Upload an image to get started.</p>
        </div>
      );
    }
    
    return (
        <div className="whitespace-pre-wrap text-gray-300 text-sm md:text-base leading-relaxed break-words">{content}</div>
    );
  };

  return (
    <div className="w-full h-full bg-gray-800/50 rounded-2xl p-4 sm:p-6 flex flex-col relative border border-gray-700">
      <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-gray-200">Generated Content</h2>
        {content && !isLoading && (
            <button
                onClick={handleCopy}
                className="flex items-center space-x-2 px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-md text-xs font-medium text-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                <ClipboardIcon copied={copied} />
                <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
        )}
      </div>
      <div className="flex-grow overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentDisplay;
