'use client'
import { ArrowUp } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="p-3 rounded-full bg-[#2563EB] text-white shadow-lg hover:bg-blue-700 transition duration-300"
        >
          < ArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
