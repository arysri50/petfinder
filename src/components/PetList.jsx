import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePetContext } from '../context/PetContext';

const PetList = ({ currentPage, setCurrentPage }) => {
  const { pets, loading, error } = usePetContext();
  const petsPerPage = 12;

  if (loading) return <div className="text-center text-2xl">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-2xl">{error}</div>;

  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-zinc-800 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {currentPets.map((pet, index) => (
          <motion.div
            key={pet.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              to={`/pet/${pet.id}`}
              className="bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <motion.div 
                className="relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={pet.images[0]} 
                  alt={pet.name} 
                  className="w-full h-56 object-cover rounded-t-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h3 className="text-xl font-semibold text-gray-200">{pet.name}</h3>
                </div>
              </motion.div>
              <div className="p-4">
                <p className="text-gray-400 font-medium">{pet.breed}</p>
                <p className="text-gray-500">{pet.city}, {pet.state}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
      <Pagination
        petsPerPage={petsPerPage}
        totalPets={pets.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

const Pagination = ({ petsPerPage, totalPets, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPets / petsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center">
      <ul className="flex space-x-2 mb-4 mt-8">
        {pageNumbers.map((number) => (
          <motion.li key={number} whileHover={{ scale: 1.1 }}>
            <button
              onClick={() => paginate(number)}
              className={`px-4 py-2 rounded-full ${
                currentPage === number 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } transition-colors duration-200`}
            >
              {number}
            </button>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default PetList;