import { BodyFuzzySystem, ResponseFuzzySysten } from "@/types/apiTypes"
import { httpClient } from "../client"


export const PostPredictVelocity = async (form: Partial<BodyFuzzySystem>): Promise<ResponseFuzzySysten> => {
    const data = httpClient<ResponseFuzzySysten>('/fuzzy_system_challenge/prever', 'json', 
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