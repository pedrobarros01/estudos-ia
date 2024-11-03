import { PredicaoGatoLeaoTigre } from "@/types/apiTypes";
import { httpClient } from "../client";

export const getPredicao = async (
  imagem: Blob
): Promise<PredicaoGatoLeaoTigre> => {
  const formData = new FormData();
  formData.append("file", imagem);

  return httpClient<PredicaoGatoLeaoTigre>(
    "/cnn_classifier_cat_lion_tiger/prever",
    "json",
    {
      method: "POST",
      body: formData,
    }
  );
};
