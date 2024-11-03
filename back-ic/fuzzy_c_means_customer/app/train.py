import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from fcmeans import FCM
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score
import joblib
import seaborn as sns
import json

def plot_elbow_and_silhouette(inertias, silhouette_scores, k_range=(2, 11), elbow_path="../images/images_treino/elbow_plot_fcm.png", silhouette_path="../images/images_treino/silhouette_plot_fcm.png"):
    # Plotar o Elbow Plot e salvar
    plt.figure(figsize=(7, 6))
    plt.plot(range(k_range[0], k_range[1]), inertias, marker='o')
    plt.xlabel("Número de Clusters (K)")
    plt.ylabel("Inertia")
    plt.title("Elbow Plot")
    plt.savefig(elbow_path)
    plt.close()

    print(f"Elbow Plot salvo como {elbow_path}")

    # Plotar o Silhouette Score e salvar
    plt.figure(figsize=(7, 6))
    plt.plot(range(k_range[0], k_range[1]), silhouette_scores, marker='o', color='orange')
    plt.xlabel("Número de Clusters (K)")
    plt.ylabel("Silhouette Score")
    plt.title("Silhouette Score por K")
    plt.savefig(silhouette_path)
    plt.close()

    print(f"Silhouette Score Plot salvo como {silhouette_path}")

def train_fcm_with_silhouette(data, k_range=(2, 10)):
    # Escalar os dados
    scaler = StandardScaler()
    data_scaled = scaler.fit_transform(data)

    silhouette_scores = []
    inertias = []
    best_silhouette_score = -1
    best_model = None
    best_k = None

    # Iterar sobre o range de K
    for k in range(k_range[0], k_range[1] + 1):
        fcm = FCM(n_clusters=k)
        fcm.fit(data_scaled)

        # Prever os clusters e calcular o índice de silhueta
        clusters = fcm.predict(data_scaled)
        silhouette_avg = silhouette_score(data_scaled, clusters)

        # Armazenar os valores para os gráficos
        silhouette_scores.append(silhouette_avg)
        inertias.append(fcm.u.max(axis=0).sum())  # Inércia como a soma das máximas pertinências por cluster

        # Verificar se o modelo atual é o melhor
        if silhouette_avg > best_silhouette_score:
            best_silhouette_score = silhouette_avg
            best_model = fcm
            best_k = k

    # Salvar o melhor modelo
    joblib.dump(best_model, "../modelo/best_fcm_model.joblib")
    joblib.dump(scaler, "../modelo/scaler.joblib")
    
    return silhouette_scores, inertias, best_k, best_silhouette_score, best_model


if __name__ == '__main__':

    # Carregar o dataset e preparar os dados
    df = pd.read_excel('Online Retail.xlsx')
    df = df[['CustomerID', 'Quantity', 'UnitPrice']].dropna()
    df['TotalPrice'] = df['Quantity'] * df['UnitPrice']
    customer_data = df.groupby('CustomerID').agg({'TotalPrice': 'sum', 'Quantity': 'sum'}).reset_index()
    customer_data.drop('CustomerID', axis=1, inplace=True)

    # Executar a função para treinar o FCM e obter as métricas
    silhouette_scores, inertias, best_k, best_silhouette_score, best_model = train_fcm_with_silhouette(customer_data, k_range=(2, 10))
    plot_elbow_and_silhouette(inertias, silhouette_scores, k_range=(2, 11))

    # Salvar best_k e best_silhouette_score em um arquivo JSON
    metrics = {
        "best_k": best_k,
        "best_silhouette_score": best_silhouette_score
    }
    with open('../modelo/best_k_and_silhouette_fcm.json', 'w') as json_file:
        json.dump(metrics, json_file)

    # Visualizar os clusters
    scaler = StandardScaler()
    customer_data_scaled = scaler.fit_transform(customer_data)
    labels = best_model.predict(customer_data_scaled)
    centers = best_model.centers

    customer_data['Cluster'] = labels
    plt.figure(figsize=(10, 6))
    plt.scatter(customer_data['TotalPrice'], customer_data['Quantity'], c=labels, cmap='viridis')
    plt.scatter(centers[:, 0], centers[:, 1], c='red', marker='X', s=200)  # Centros dos clusters
    plt.xlabel('Total Price')
    plt.ylabel('Quantity')
    plt.title('Segmentação de Clientes usando Fuzzy C-Means')
    plt.savefig('../images/images_treino/clusters_fcm.png')

    # Criar e salvar a matriz de correlação
    plt.figure(figsize=(10, 8))
    correlation_matrix = customer_data.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
    plt.title('Matriz de Correlação das Variáveis')
    plt.savefig('../images/images_treino/correlation_matrix_fcm.png')
    plt.close()
    print("Matriz de Correlação salva em images/images_treino/correlation_matrix_fcm.png")
