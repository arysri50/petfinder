import React, { useState, useEffect } from 'react';
import SearchForm from '../components/SearchForm';
import PetList from '../components/PetList';
import { fetchPets } from '../services/api';
import { usePetContext } from '../context/PetContext';
import { motion } from 'framer-motion';

const HomePage = () => {
  const { setPets, setLoading, setError } = usePetContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchPets()
      .then((data) => {
        setPets(data.pets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [setPets, setLoading, setError]);

  const handleSearch = (searchParams) => {
    setLoading(true);
    fetchPets(searchParams)
      .then((data) => {
        setPets(data.pets);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="container mx-auto px-4 bg-zinc-800 text-zinc-200"
    >
      <motion.h1 
        className="text-5xl font-bold text-center bg-zinc-100 bg-clip-text py-9"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Find Your Perfect Pet
      </motion.h1>
      <SearchForm onSearch={handleSearch} />
      <PetList currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </motion.div>
  );
};

export default HomePage;