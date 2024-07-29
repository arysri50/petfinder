import React, { createContext, useState, useContext } from 'react';

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const value = {
    pets,
    setPets,
    loading,
    setLoading,
    error,
    setError,
  };

  return <PetContext.Provider value={value}>{children}</PetContext.Provider>;
};