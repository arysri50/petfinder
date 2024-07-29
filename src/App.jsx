import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PetDetailsPage from './pages/PetDetailsPage';

function App() {
  return (
    <Router>
      <PetProvider>
        <ErrorBoundary>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pet/:id" element={<PetDetailsPage />} />
              </Routes>
            </main>
            <footer className="bg-gray-700 py-4 text-center text-gray-300">
              <p>&copy; 2024 Pet Finder. All rights reserved.</p>
            </footer>
          </div>
        </ErrorBoundary>
      </PetProvider>
    </Router>
  );
}

export default App;