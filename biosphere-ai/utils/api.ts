const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function analyzeSymptoms(symptoms: string) {
  const response = await fetch(`${API_BASE_URL}/api/symptoms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ symptoms })
  });
  return response.json();
}

export async function uploadGenomicData(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch(`${API_BASE_URL}/api/genomics`, {
    method: 'POST',
    body: formData
  });
  return response.json();
}