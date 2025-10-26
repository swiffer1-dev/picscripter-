
import React, { useState, useEffect, useCallback } from 'react';
import { Category } from './types';
import { CATEGORY_PROMPTS } from './constants';
import { generateDescription } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import CategorySelector from './components/CategorySelector';
import ContentDisplay from './components/ContentDisplay';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<Category>(Category.Travel);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Clean up previous content and error when a new image is selected
      setGeneratedContent('');
      setError(null);
      setImageFile(file);
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };
  
  const handleCategoryChange = (newCategory: Category) => {
    if(newCategory !== category) {
        setCategory(newCategory);
        // If an image is already present, changing category should trigger re-generation
        // so we clear the old content
        if(imageFile) {
            setGeneratedContent('');
        }
    }
  };

  const generateContentForImage = useCallback(async (file: File, cat: Category) => {
    setIsLoading(true);
    setError(null);

    const prompt = CATEGORY_PROMPTS[cat];
    try {
      const description = await generateDescription(file, prompt);
      setGeneratedContent(description);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setGeneratedContent(`Failed to generate content: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (imageFile) {
      generateContentForImage(imageFile, category);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile, category, generateContentForImage]);

  useEffect(() => {
    // Cleanup object URL on component unmount
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              PicScripter
            </span>
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Upload an image, select a context, and let AI craft the perfect description for you.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-8">
            <ImageUploader 
              onImageChange={handleImageChange}
              previewUrl={previewUrl}
              isLoading={isLoading}
            />
            <CategorySelector
              selectedCategory={category}
              onCategoryChange={handleCategoryChange}
              isDisabled={isLoading}
            />
          </div>
          <div className="min-h-[400px] lg:min-h-0">
             <ContentDisplay content={generatedContent} isLoading={isLoading} />
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini API</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
