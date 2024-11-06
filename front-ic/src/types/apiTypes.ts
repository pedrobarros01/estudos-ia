export interface TensorFlowDesempenhoTreino {
  mse: number;
  mae: number;
  r2: number;
  mape: number;
}

export interface PyTorchDesempenhoTreino {
  mse: number;
  mae: number;
  r2: number;
  mape: number;
}

export type PredicaoParams = {
  date: Date;
  open: number;
  high: number;
  low: number;
  adj_close: number;
  volume: number;
};

export type PredicaoResultado = {
  predict: number;
};

export type PredicaoGatoLeaoTigre = {
  filename: string;
  predict: string;
  percent_predict: number;
};


export type PredicaoCluster = {

  best_k: number,
  best_silhouette_score: number

}

export type ResponseClusterPredict = {
  cluster: number,
  tipo: string
}

export type BodyIris = {
  sepal_length: number,
  sepal_width: number,
  petal_length: number,
  petal_width: number,

}