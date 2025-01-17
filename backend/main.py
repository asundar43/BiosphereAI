from fastapi import FastAPI, UploadFile, File
from transformers import AutoModelForCausalLM, AutoTokenizer
from utils.preprocess import preprocess_input
from utils.genomic_analysis import process_genomic_data

app = FastAPI()

# Load the Nemotron-70B model
model_path = "~/models/nemotron-70b/"
tokenizer = AutoTokenizer.from_pretrained(model_path)
model = AutoModelForCausalLM.from_pretrained(model_path, device_map="auto")

def analyze_symptoms(symptoms: str) -> str:
    input_text = preprocess_input(symptoms)
    # Simulate a simple analysis by checking for common symptoms
    common_symptoms = {
        "fever": "Possible infection",
        "cough": "Possible respiratory issue",
        "headache": "Possible tension or migraine"
    }
    diagnosis = []
    for symptom, diag in common_symptoms.items():
        if symptom in input_text:
            diagnosis.append(diag)
    return " and ".join(diagnosis) if diagnosis else "No common symptoms detected"

@app.post("/analyze_symptoms/")
async def analyze_symptoms_endpoint(symptoms: str):
    diagnosis = analyze_symptoms(symptoms)
    return {"diagnosis": diagnosis}

@app.post("/genomic_insights/")
async def genomic_insights_endpoint(file: UploadFile = File(...)):
    file_path = f"/tmp/{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())
    risk_factors = process_genomic_data(file_path)
    return {"risk_factors": risk_factors} 