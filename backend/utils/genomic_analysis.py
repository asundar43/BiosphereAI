from Bio import SeqIO

def process_genomic_data(file_path: str) -> dict:
    # Parse genomic data
    genomic_data = SeqIO.read(file_path, "fasta")
    
    # Calculate nucleotide frequencies
    sequence = str(genomic_data.seq)
    nucleotide_count = {
        'A': sequence.count('A'),
        'T': sequence.count('T'),
        'C': sequence.count('C'),
        'G': sequence.count('G')
    }
    
    # Calculate GC content
    gc_content = (nucleotide_count['G'] + nucleotide_count['C']) / len(sequence) * 100
    
    # Identify simple motifs
    motifs = {
        'ATG': sequence.count('ATG'),
        'TATA': sequence.count('TATA'),
        'GCGC': sequence.count('GCGC')
    }
    
    # Return analysis results
    risk_factors = {
        "nucleotide_count": nucleotide_count,
        "gc_content": gc_content,
        "motifs": motifs
    }
    
    return risk_factors 