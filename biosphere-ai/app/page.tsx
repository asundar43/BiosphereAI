import Genomic from '@/components/Genomic';
import Symptoms from '@/components/Symptoms';
import Vitals from '@/components/Vitals';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">BioSphere AI</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Symptoms />
          <Genomic />
          <Vitals />
        </div>
      </div>
    </main>
  );
}