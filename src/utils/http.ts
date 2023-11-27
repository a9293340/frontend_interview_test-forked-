export const httpReq = async <T>(req: string): Promise<T> => {
  const response = await fetch(req);
  const body = await response.json();
  return body;
};
