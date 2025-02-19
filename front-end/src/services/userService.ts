export const getUserOpenings = async () => {
  const response = await fetch(
    "http://localhost:4000/user/mmmmmmm@exemplo.com"
  );
  const data = await response.json()
  return data;
};
