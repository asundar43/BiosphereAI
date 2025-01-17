"use client"

import React, { useState, useRef } from 'react';
import { Mic, MicOff, Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alerts";

// Add proper type definitions for window
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
  error?: string;
}

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<{
    diagnoses: Array<{
      condition: string;
      confidence: number;
    }>;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join(' ');
        
        setSymptoms(prev => prev + ' ' + transcript);
      };

      recognition.onerror = (event: { error: string }) => {
        if (event.error !== 'aborted') {
          console.error('Speech recognition error:', event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  const analyzeSymptoms = async () => {
    setIsLoading(true);
    // Mock API call - replace with actual backend call
    setTimeout(() => {
      setAnalysis({
        diagnoses: [
          { condition: "Upper Respiratory Infection", confidence: 0.85 },
          { condition: "Seasonal Allergies", confidence: 0.65 }
        ]
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-50 rounded-lg mr-4">
          <Activity className="h-6 w-6 text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold text-black">Symptom Analysis</h2>
      </div>
      
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="w-full p-4 border border-gray-200 rounded-xl mb-6 h-32 text-black resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
        placeholder="Describe your symptoms..."
      />
      
      <div className="flex space-x-4">
        <button
          onClick={analyzeSymptoms}
          disabled={isLoading}
          className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Analyzing...
            </div>
          ) : (
            'Analyze Symptoms'
          )}
        </button>
        <button 
          onClick={toggleListening}
          className={`p-3 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
          ${
            isListening 
              ? 'bg-red-100 text-red-500' 
              : 'bg-black text-white hover:bg-gray-800'
          }`}
          title={isListening ? 'Stop recording' : 'Start recording'}
        >
          {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </button>
      </div>

      {analysis && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3 text-black">Analysis Results</h3>
          {analysis.diagnoses.map((diagnosis: any, index: number) => (
            <Alert key={index} className="mb-2">
              <AlertTitle>{diagnosis.condition}</AlertTitle>
              <AlertDescription>
                Confidence: {(diagnosis.confidence * 100).toFixed(1)}%
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}