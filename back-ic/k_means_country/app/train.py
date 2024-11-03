import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import seaborn as sns
import json

def plot_elbow_and_silhouette(inertias, silhouette_scores, k_range=(2, 11), elbow_path="../images/images_treino/elbow_plot_kmeans.png", silhouette_path="../images/images_treino/silhouette_plot_kmeans.png"):
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

def train_kmeans_with_silhouette(data, k_range=(2, 10)):
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
        kmeans = KMeans(n_clusters=k, random_state=42)
        kmeans.fit(data_scaled)

        # Prever os clusters e calcular o índice de silhueta
        clusters = kmeans.predict(data_scaled)
        silhouette_avg = silhouette_score(data_scaled, clusters)

        # Armazenar os valores para os gráficos
        silhouette_scores.append(silhouette_avg)
        inertias.append(kmeans.inertia_)

        # Verificar se o modelo atual é o melhor
        if silhouette_avg > best_silhouette_score:
            best_silhouette_score = silhouette_avg
            best_model = kmeans
            best_k = k

    # Salvar o melhor modelo
    joblib.dump(best_model, "../modelo/best_kmeans_model.joblib")

    return silhouette_scores, inertias, best_k, best_silhouette_score, best_model


if __name__ == '__main__':

    # Carregar o dataset e preparar os dados
    df = pd.read_csv('Country-data.csv')
    df = df.dropna()
    data = df.drop(columns=['country'])

    # Executar a função para treinar o K-Means e obter as métricas
    silhouette_scores, inertias, best_k, best_silhouette_score, best_model = train_kmeans_with_silhouette(data[['gdpp', 'income']], k_range=(2, 10))
    plot_elbow_and_silhouette(inertias, silhouette_scores, k_range=(2, 11))
    # Salvar best_k e best_silhouette_score em um arquivo JSON
    metrics = {
        "best_k": best_k,
        "best_silhouette_score": best_silhouette_score
    }
    with open('../modelo/best_k_and_silhouette.json', 'w') as json_file:
        json.dump(metrics, json_file)

    data_scaled = StandardScaler().fit_transform(data[['gdpp', 'income']])
    clusters = best_model.predict(data_scaled)

    # Criar um DataFrame para plotagem
    plot_data = pd.DataFrame(data[['gdpp', 'income']])
    plot_data['Cluster'] = clusters

    # Plotar
    plt.figure(figsize=(10, 6))
    plt.scatter(plot_data['gdpp'], plot_data['income'], c=plot_data['Cluster'], cmap='viridis', marker='o')
    plt.title('Clusters K-Means')
    plt.xlabel('GDP per capita')
    plt.ylabel('Income per capita')
    plt.colorbar(label='Cluster')
    plt.grid(True)
    plt.savefig('../images/images_treino/clusters_kmeans.png')
    # Criar e salvar a matriz de correlação
    plt.figure(figsize=(10, 8))
    correlation_matrix = data.corr()
    sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', fmt=".2f")
    plt.title('Matriz de Correlação das Variáveis')
    plt.savefig('../images/images_treino/correlation_matrix.png')
    plt.close()
    print("Matriz de Correlação salva em images/images_treino/correlation_matrix.png")


