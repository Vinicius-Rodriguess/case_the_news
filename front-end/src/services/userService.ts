export const getUserOpenings = async (email: string) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${email}`);
  const data = await response.json();
  return data;
};
