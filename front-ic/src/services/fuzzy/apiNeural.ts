import { BodyFuzzySystem, MetricasNeuralFuzzy, ResponseFuzzySysten } from "@/types/apiTypes";
import { httpClient } from "../client";


export const GetMetricas = async () : Promise<MetricasNeuralFuzzy> => {
    return httpClient<MetricasNeuralFuzzy>('/neuro_fuzzy_challenge/get-desempenho-treino', 'json');
}


export const PredictNeuralFuzzy = async (form: Partial<BodyFuzzySystem>): Promise<ResponseFuzzySysten> => {

    const data = httpClient<ResponseFuzzySysten>('/neuro_fuzzy_challenge/prever', 'json', 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form)
        }
    );
    return data
}