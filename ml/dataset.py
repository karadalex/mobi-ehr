from torch.utils.data import Dataset, DataLoader

class MedicalDataset(Dataset):
    def __init__(self, file_paths):
        self.examples = []
        for path in file_paths:
            if path.endswith(".xml"):
                text = parse_xml(path)
            elif path.endswith(".pdf"):
                text = parse_pdf(path)
            elif path.endswith(".txt"):
                text = parse_text(path)
            else:
                continue
            token_ids = tokenize_text(text)
            self.examples.append(token_ids)

    def __len__(self):
        return len(self.examples)

    def __getitem__(self, idx):
        token_ids = self.examples[idx]
        input_ids = torch.tensor(token_ids[:-1])
        target_ids = torch.tensor(token_ids[1:])
        return input_ids, target_ids