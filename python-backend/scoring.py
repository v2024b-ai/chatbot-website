from nltk.translate.bleu_score import sentence_bleu, SmoothingFunction
from nltk.translate.meteor_score import meteor_score
from rouge_score import rouge_scorer

# Functions to calculate BLEU, ROUGE, and METEOR scores
def calculate_bleu(reference, candidate):
    reference_tokens = [reference.split()]
    candidate_tokens = candidate.split()
    chencherry = SmoothingFunction()
    return sentence_bleu(reference_tokens, candidate_tokens, smoothing_function=chencherry.method1)

def calculate_rouge(reference, candidate):
    scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=True)
    return scorer.score(reference, candidate)

def calculate_meteor(reference, candidate):

    reference_tokens = [reference.split()]  
    candidate_tokens = candidate.split()      
    return meteor_score(reference_tokens, candidate_tokens)

#functions to return the scores
def grade_summary(reference, student_summary):
    bleu = calculate_bleu(reference, student_summary)
    rouge = calculate_rouge(reference, student_summary)
    meteor = calculate_meteor(reference, student_summary)
    return {
        "BLEU": bleu,
        "ROUGE": rouge["rougeL"].fmeasure,
        "METEOR": meteor
    }
