export const httpClient = async <T>(
  url: string,
  responseType: "json" | "blob" = "json",
  options: RequestInit = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
  const response = await fetch(`${baseUrl}${url}`, options);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro na API");
  }

  if (responseType === "blob") {
    return (await response.blob()) as T;
  }

  return response.json() as Promise<T>;
};
