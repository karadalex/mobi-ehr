from pdfminer.high_level import extract_text

def parse_pdf(file_path):
    text = extract_text(file_path)
    return text

def parse_text(file_path):
    with open(file_path, 'r') as file:
        return file.read()