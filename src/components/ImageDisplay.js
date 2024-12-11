import React from 'react';

const ImageDisplay = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img 
        src="../assets/portfolio-preview.png" 
        alt="Portfolio Preview" 
        className="max-w-full h-auto"
      />
    </div>
  );
};

export default ImageDisplay; 