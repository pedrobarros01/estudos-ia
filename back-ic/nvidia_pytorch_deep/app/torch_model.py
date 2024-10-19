import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
class PredictorModel(nn.Module):
    def __init__(self):
        super(PredictorModel, self).__init__()
        self.lstm = nn.LSTM(input_size=6, hidden_size=50, num_layers=2, batch_first=True)
        self.fc = nn.Linear(50, 1)

    def forward(self, x):
        batch_size = x.size(0)  # Calcula o batch dinamicamente
        h_0 = torch.zeros(2, batch_size, 50).to(x.device)  # (num_layers, batch_size, hidden_size)
        c_0 = torch.zeros(2, batch_size, 50).to(x.device)

        out, _ = self.lstm(x, (h_0, c_0))
        out = self.fc(out[:, -1, :])  # Usa apenas o último estado da sequência
        return out
