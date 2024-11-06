import { PredicaoCluster, ResponseClusterPredict } from "@/types/apiTypes";
import { httpClient } from "../client";

type ParamsForm = {
  total_price: number,
  quantity: number
}

export const getPredicaoKmeans = async (): Promise<PredicaoCluster> => {

  return httpClient<PredicaoCluster>(
    "/k_means_country/get-desempenho-treino",
  );
};

export const getPredicaoCmeans = async (): Promise<PredicaoCluster> => {

  return httpClient<PredicaoCluster>(
    "/c_means_customer/get-desempenho-treino",
  );
};

export const creatNewPredict = async (params : Partial<ParamsForm>) : Promise<ResponseClusterPredict> => {
  return httpClient<ResponseClusterPredict>(
    "/c_means_customer/prever",
    "json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
}