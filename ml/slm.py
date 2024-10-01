import pytorch_lightning as pl
import torch
from torch import nn
from transformers import AutoConfig, AutoModel

class SmallLanguageModel(pl.LightningModule):
    def __init__(self, vocab_size, hidden_size=256, num_layers=2, nhead=4):
        super(SmallLanguageModel, self).__init__()
        self.embedding = nn.Embedding(vocab_size, hidden_size)
        encoder_layer = nn.TransformerEncoderLayer(
            d_model=hidden_size, nhead=nhead
        )
        self.transformer = nn.TransformerEncoder(
            encoder_layer, num_layers=num_layers
        )
        self.fc_out = nn.Linear(hidden_size, vocab_size)

    def forward(self, src):
        embedded = self.embedding(src)
        output = self.transformer(embedded)
        logits = self.fc_out(output)
        return logits

    def training_step(self, batch, batch_idx):
        src, tgt = batch
        logits = self(src)
        loss = nn.CrossEntropyLoss()(logits.view(-1, logits.size(-1)), tgt.view(-1))
        self.log("train_loss", loss)
        return loss

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=1e-3)