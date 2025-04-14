import { useState } from 'react';

let globalZIndex = 100;

export const useZIndexManager = () => {
  const [zIndices, setZIndices] = useState({});

  const bringToFront = (key) => {
    setZIndices((prev) => {
      const newZIndices = { ...prev };
      globalZIndex++;
      newZIndices[key] = globalZIndex;
      return newZIndices;
    });
  };

  const getZIndex = (key) => {
    return zIndices[key] || 0;
  };

  return {
    bringToFront,
    getZIndex,
  };
};