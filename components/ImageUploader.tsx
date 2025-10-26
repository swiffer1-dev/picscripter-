
import React from 'react';

interface ImageUploaderProps {
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: string | null;
  isLoading: boolean;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageChange, previewUrl, isLoading }) => {
  return (
    <div className="w-full h-full bg-gray-800/50 rounded-2xl p-4 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 relative overflow-hidden transition-all duration-300 ease-in-out aspect-square">
      <label htmlFor="image-upload" className="w-full h-full flex flex-col items-center justify-center cursor-pointer text-center">
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon />
            <p className="mt-2 text-sm font-semibold text-gray-300">Click to upload an image</p>
            <p className="text-xs text-gray-500">PNG, JPG, WEBP</p>
          </div>
        )}
        <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={onImageChange} disabled={isLoading} />
      </label>
      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center flex-col text-white">
          <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 font-semibold">Analyzing Image...</p>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
