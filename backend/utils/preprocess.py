from nltk.stem import PorterStemmer
import re

def preprocess_input(symptoms: str) -> str:
    # Convert symptoms to lowercase
    symptoms = symptoms.lower()
    
    # Remove any unwanted characters (e.g., punctuation)
    symptoms = re.sub(r'[^\w\s]', '', symptoms)
    
    # Tokenize the symptoms
    tokens = symptoms.split()
    
    # Initialize a stemmer
    stemmer = PorterStemmer()
    
    # Apply stemming
    stemmed_tokens = [stemmer.stem(token) for token in tokens]
    
    # Join tokens back into a string
    return ' '.join(stemmed_tokens) 