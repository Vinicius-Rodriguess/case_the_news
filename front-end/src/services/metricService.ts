export const getMetrics = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/metrics`);
  const data = await response.json();
  return data;
};
