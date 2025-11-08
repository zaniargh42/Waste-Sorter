
import React, { useState, useCallback } from 'react';
import { analyzeWasteImage } from './services/geminiService';
import { AppStatus, AnalysisResult } from './types';
import { FileUploader } from './components/FileUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Header } from './components/Header';
import { ResetButton } from './components/ResetButton';

const App: React.FC = () => {
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const resultStr = reader.result as string;
        // remove data:image/jpeg;base64,
        resolve(resultStr.split(',')[1]);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setStatus(AppStatus.IMAGE_SELECTED);
    setError(null);
    setResult(null);
  };

  const handleAnalyze = useCallback(async () => {
    if (!selectedFile) return;

    setStatus(AppStatus.ANALYZING);
    setError(null);

    try {
      const base64Data = await fileToBase64(selectedFile);
      const analysisResult = await analyzeWasteImage(base64Data, selectedFile.type);
      setResult(analysisResult);
      setStatus(AppStatus.SUCCESS);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to analyze image. ${errorMessage}`);
      setStatus(AppStatus.ERROR);
    }
  }, [selectedFile]);

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setStatus(AppStatus.IDLE);
    // Revoke the object URL to free up memory
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-2xl mx-auto">
        <Header />
        <main className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300">
          <div className="p-6 sm:p-8">
            {status === AppStatus.IDLE && (
              <FileUploader onFileSelect={handleFileSelect} />
            )}
            
            {(status === AppStatus.IMAGE_SELECTED || status === AppStatus.ANALYZING) && previewUrl && (
              <div className="flex flex-col items-center space-y-6">
                <img src={previewUrl} alt="Waste preview" className="max-h-80 w-auto rounded-lg shadow-lg object-contain" />
                <button
                  onClick={handleAnalyze}
                  disabled={status === AppStatus.ANALYZING}
                  className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {status === AppStatus.ANALYZING ? (
                    <>
                      <LoadingSpinner />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    'Analyze Waste'
                  )}
                </button>
              </div>
            )}
            
            {status === AppStatus.SUCCESS && result && (
              <ResultDisplay result={result} />
            )}

            {status === AppStatus.ERROR && error && (
              <ErrorMessage message={error} />
            )}
          </div>
        </main>
        
        {status !== AppStatus.IDLE && (
            <div className="mt-6 flex justify-center">
              <ResetButton onReset={handleReset} />
            </div>
        )}

      </div>
       <footer className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm">
          <p>Powered by Gemini API. Sorting information is for guidance purposes.</p>
        </footer>
    </div>
  );
};

export default App;
