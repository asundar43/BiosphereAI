"use client"

import React, { useState } from 'react';
import { Upload, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "./ui/alerts";

export default function Genomic() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setFile(file);
    // Mock analysis - replace with actual API call
    setAnalysis({
      risks: [
        { condition: "Type 2 Diabetes", risk: "Moderate" },
        { condition: "Hypertension", risk: "Low" }
      ]
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <div className="flex items-center mb-4">
        <FileText className="h-6 w-6 text-blue-500 mr-2" />
        <h2 className="text-2xl font-bold text-black">Genomic Analysis</h2>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          id="genomic-upload"
          className="hidden"
          onChange={handleFileUpload}
          accept=".vcf,.txt,.csv"
        />
        <label htmlFor="genomic-upload" className="cursor-pointer">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600">Upload genomic data file</p>
        </label>
      </div>

      {analysis && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Analysis Results</h3>
          {analysis.risks.map((risk: any, index: number) => (
            <Alert key={index} className="mb-2">
              <AlertTitle>{risk.condition}</AlertTitle>
              <AlertDescription>Risk Level: {risk.risk}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}