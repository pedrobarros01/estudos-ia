import {
  PredicaoParams,
  PredicaoResultado,
  PyTorchDesempenhoTreino,
} from "@/types/apiTypes";
import { httpClient } from "../client";

export const getDesempenho = async (): Promise<PyTorchDesempenhoTreino> => {
  return httpClient<PyTorchDesempenhoTreino>(
    "/nvidia_pytorch_deep/get-desempenho-treino"
  );
};

export const getPrevisaoBase = async (): Promise<string> => {
  const blob = await httpClient<Blob>(
    "/nvidia_pytorch_deep/previsao-base",
    "blob"
  );

  // Cria uma URL de objeto para exibir a imagem
  return URL.createObjectURL(blob);
};

export const getPredicao = async (
  predicaoParams: Partial<PredicaoParams>
): Promise<PredicaoResultado> => {
  return httpClient<PredicaoResultado>("/nvidia_pytorch_deep/prever", "json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(predicaoParams),
  });
};
