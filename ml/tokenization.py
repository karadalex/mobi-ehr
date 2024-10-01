from transformers import AutoTokenizer

tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")

def tokenize_text(text):
    return tokenizer.encode(text, add_special_tokens=True, truncation=True, max_length=512)