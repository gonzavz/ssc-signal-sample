export const normalizeUrl = (baseUrl:string, path:string): string => {
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return normalizedBaseUrl.concat(normalizedPath);
};