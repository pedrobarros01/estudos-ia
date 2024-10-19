import torch
import torch.nn as nn
from torch.utils.data import DataLoader, TensorDataset
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error
from utils.pre_process import extract_datassets_train_test_pytorch
from .torch_model import PredictorModel




class Train:
    def __init__(self):
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        _, _, treino_feat, treino_tgt, teste_feat, teste_tgt = extract_datassets_train_test_pytorch()

        self.train_loader = self.__create_dataloader(treino_feat, treino_tgt)
        self.test_loader = self.__create_dataloader(teste_feat, teste_tgt, shuffle=False)
        self.model = PredictorModel().to(self.device)

    def __create_dataloader(self, features, target, batch_size=32, shuffle=True):
        features_tensor = torch.tensor(features, dtype=torch.float32)
        target_tensor = torch.tensor(target, dtype=torch.float32)  # Sem .values
        dataset = TensorDataset(features_tensor, target_tensor)
        return DataLoader(dataset, batch_size=batch_size, shuffle=shuffle)


    def train(self, epochs=50):
        criterion = nn.MSELoss()
        optimizer = torch.optim.Adam(self.model.parameters(), lr=0.001)

        history = {'loss': [], 'val_loss': [], 'mae': [], 'val_mae': [], 'mse': [], 'val_mse': []}
        
        for epoch in range(epochs):
            self.model.train()
            epoch_loss, epoch_mae, epoch_mse = 0, 0, 0
            
            for features, target in self.train_loader:
                features, target = features.to(self.device), target.to(self.device)

                optimizer.zero_grad()
                predictions = self.model(features)
                loss = criterion(predictions, target)
                loss.backward()
                optimizer.step()

                epoch_loss += loss.item()
                epoch_mae += mean_absolute_error(target.cpu().numpy(), predictions.cpu().detach().numpy())
                epoch_mse += mean_squared_error(target.cpu().numpy(), predictions.cpu().detach().numpy())

            history['loss'].append(epoch_loss / len(self.train_loader))
            history['mae'].append(epoch_mae / len(self.train_loader))
            history['mse'].append(epoch_mse / len(self.train_loader))

            val_loss, val_mae, val_mse = self.evaluate()
            history['val_loss'].append(val_loss)
            history['val_mae'].append(val_mae)
            history['val_mse'].append(val_mse)

            print(f'Epoch {epoch+1}/{epochs}, Loss: {epoch_loss:.4f}, Val Loss: {val_loss:.4f}')

        self.plot_metrics(history)
        torch.save(self.model.state_dict(), 'nvidia_pytorch_deep/modelo/modelo_torch.pth')

    def evaluate(self):
        self.model.eval()
        val_loss, val_mae, val_mse = 0, 0, 0

        with torch.no_grad():
            for features, target in self.test_loader:
                features, target = features.to(self.device), target.to(self.device)
                predictions = self.model(features)

                val_loss += nn.MSELoss()(predictions, target).item()
                val_mae += mean_absolute_error(target.cpu().numpy(), predictions.cpu().numpy())
                val_mse += mean_squared_error(target.cpu().numpy(), predictions.cpu().numpy())

        return val_loss / len(self.test_loader), val_mae / len(self.test_loader), val_mse / len(self.test_loader)

    def plot_metrics(self, history):
        for metric in ['loss', 'mae', 'mse']:
            df = pd.DataFrame({metric: history[metric], f'val_{metric}': history[f'val_{metric}']})
            self.__gerar_grafico(df, 'Epoch', metric.upper(), f'{metric.upper()} do modelo', f'{metric}_nvidia_pytorch')

    def __gerar_grafico(self, df, x_label, y_label, title, nome_arq):
        df.plot()
        plt.title(title)
        plt.xlabel(x_label)
        plt.ylabel(y_label)
        plt.savefig(f'nvidia_pytorch_deep/images/images_treino/{nome_arq}.png', format='png', dpi=300, bbox_inches='tight')
        plt.close()

if __name__ == '__main__':
    trainer = Train()
    trainer.train()
