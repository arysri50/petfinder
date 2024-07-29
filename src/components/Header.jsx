import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-zinc-900 text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold">Pet Finder</Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="hover:text-blue-200 transition-colors duration-200">Home</Link></li>
              <li>
                <button 
                  onClick={() => setIsOpen(!isOpen)} 
                  className="hover:text-blue-200 transition-colors duration-200"
                >
                  All About Pets
                </button>
              </li>
              <li><Link to="/contact" className="hover:text-blue-200 transition-colors duration-200">Contact</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white text-gray-800 p-6 shadow-lg"
        >
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Dogs</h2>
              <p>Dogs are loyal companions known for their affectionate nature and varied breeds. They require regular exercise, training, and grooming. Dogs can live 10-15 years on average, depending on the breed.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Cats</h2>
              <p>Cats are independent pets that make great companions for various living situations. They are generally low-maintenance, requiring less space and attention than dogs. Cats can live 12-18 years on average.</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Birds</h2>
              <p>Birds can be colorful and entertaining pets. They require specialized diets and habitats. Some species can be quite vocal and social, while others are more reserved. Lifespans vary greatly by species, from a few years to several decades.</p>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;