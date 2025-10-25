export const searchCompare = (text: string, search: string): boolean => {
  const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(normalizedSearch, "i");
  return regex.test(normalizedText);
};
