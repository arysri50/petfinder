const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPets = async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${API_BASE_URL}/pets?${queryString}`);
    if (!response.ok) throw new Error('Failed to fetch pets');
    const data = await response.json();
    return { ...data, pets: data.pets || [] };
  };

export const fetchPetById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/pets?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch pet details');
  return response.json();
};

export const fetchBreeds = async (animal) => {
  const response = await fetch(`${API_BASE_URL}/breeds?animal=${animal}`);
  if (!response.ok) throw new Error('Failed to fetch breeds');
  return response.json();
};