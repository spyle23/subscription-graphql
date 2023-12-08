export const usePhotoUrl = (url?: string) => {
  const urlWithBase = url ? import.meta.env.VITE_BASE_IMAGE + url : undefined;
  return urlWithBase;
};
