"use client"

import React, { useState, useRef } from 'react';
import { Mic, MicOff, Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alerts";

export default function Symptoms() {
  const [symptoms, setSymptoms] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
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

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join(' ');
        
        setSymptoms(prev => prev + ' ' + transcript);
      };

      recognition.onerror = (event) => {
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
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center mb-4">
        <Activity className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-black">Symptom Analysis</h2>
      </div>
      
      <textarea
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 h-32 text-black"
        placeholder="Describe your symptoms..."
      />
      
      <div className="flex space-x-4">
        <button
          onClick={analyzeSymptoms}
          disabled={isLoading}
          className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
        </button>
        <button 
          onClick={toggleListening}
          className={`p-2 rounded-full ${
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