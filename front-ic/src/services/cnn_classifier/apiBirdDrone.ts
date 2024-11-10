import { PredicaoGatoLeaoTigre } from "@/types/apiTypes";
import { httpClient } from "../client";

export const getPredicaoBirdDrone = async (
  imagem: Blob
): Promise<PredicaoGatoLeaoTigre> => {
  const formData = new FormData();
  formData.append("file", imagem);

  return httpClient<PredicaoGatoLeaoTigre>(
    "/cnn_classifier_bird_drone/prever",
    "json",
    {
      method: "POST",
      body: formData,
    }
  );
};
