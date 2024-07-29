import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchPetById } from '../services/api';

const PetDetailsPage = () => {
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    fetchPetById(id)
      .then((data) => {
        setPet(data.pets[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!pet) return <div>Pet not found</div>;

  return (
    <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-zinc-800">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start text-zinc-200">
        <div>
          <motion.img
            src={pet.images[currentImageIndex]}
            alt={pet.name}
            className="w-full h-full object-center object-cover rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight ">{pet.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Pet information</h2>
            <p className="text-3xl text-zinc-300">{pet.breed}</p>
          </div>
          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-zinc-400 space-y-6">{pet.description}</div>
          </div>
          <div className="mt-8">
            <div className="flex items-center">
              <h4 className="text-sm  font-medium">Location:</h4>
              <p className="ml-2 text-sm text-gray-500">{pet.city}, {pet.state}</p>
            </div>
          </div>
          <div className="mt-8">
            <h4 className="text-sm  font-medium mb-2">More Images:</h4>
            <div className="flex flex-wrap">
              {pet.images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${pet.name} - Image ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-md mr-2 mb-2 cursor-pointer ${
                    index === currentImageIndex ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsPage;