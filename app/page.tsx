"use client";

import { useState } from "react";
import Image from 'next/image';
import ImageGenerator from "./components/ImageGenerator";
import LoadingBar from "./components/LoadingBar";

export default function Home() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <div className="px-8 py-12">
          <h1 className="text-5xl font-bold text-center mb-8 text-gray-800 font-poppins">Abiel&apos;s AI Image Generator</h1>
          <ImageGenerator setGeneratedImage={setGeneratedImage} setIsLoading={setIsLoading} />
          {isLoading && <LoadingBar />}
          {generatedImage && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 font-poppins">Generated Image:</h2>
              <Image 
                src={generatedImage} 
                alt="Generated" 
                width={512} 
                height={512} 
                className="w-full rounded-lg shadow-lg"
              />
              <a 
                href={generatedImage}
                download="generated_image.png"
                className="mt-4 inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out font-poppins"
              >
                Download Image
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}