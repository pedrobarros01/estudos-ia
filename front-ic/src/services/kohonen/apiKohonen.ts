import { BodyIris } from "@/types/apiTypes";
import { httpClient } from "../client";



export const PostPredict = async (body: BodyIris): Promise<string> => {
    const blob = await httpClient<Blob>("/router_kohonen_iris/prever", "blob", 
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(body)
        
        });
    return URL.createObjectURL(blob);
}