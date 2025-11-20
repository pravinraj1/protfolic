
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#BFABD4] border-t border-slate-500/30">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-slate-800">
        <p>&copy; {new Date().getFullYear()} Pravin Raj. All Rights Reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="https://github.com/pravinraj1" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F754] transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/m/in/pravinraj1/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F4F754] transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
