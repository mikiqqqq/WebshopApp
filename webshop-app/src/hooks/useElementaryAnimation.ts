// useElementaryAnimation.ts
import { useEffect } from 'react';
import { theme } from '../components/MainContainerData';
import ElementaryAnimation from '../scripts/ElementaryAnimation';

const useElementaryAnimation = () => {
  useEffect(() => {
    if (theme.enableAnimations) {
      const elements = document.querySelectorAll('[data-animation]') as NodeListOf<HTMLElement>;
      elements.forEach(element => new ElementaryAnimation(element));
    }
  }, []); // Empty dependency array to run once on mount
};

export default useElementaryAnimation;