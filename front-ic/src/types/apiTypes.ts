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
