import React from 'react';

const HomePage: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center md:justify-around min-h-full gap-8 py-10">
      <div className="md:w-1/2 text-center md:text-left order-2 md:order-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight animate-reveal delay-100">
          Hi, I'm <span className="text-[#F4F754] drop-shadow-lg">Pravin Raj</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-slate-700 mb-6 animate-reveal delay-200">
          Frontend Developer & UI/UX Enthusiast
        </h2>
        <p className="max-w-xl mx-auto md:mx-0 text-slate-600 leading-relaxed mb-8 animate-reveal delay-300">
          I build beautiful and interactive web experiences. Welcome to my digital playground where pixels and code come together to create magic.
        </p>
        <a 
          href="#/projects" 
          className="inline-block bg-[#F4F754] text-slate-900 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 animate-reveal delay-400"
        >
          View My Work
        </a>
      </div>
      <div className="md:w-1/3 order-1 md:order-2 flex justify-center items-center animate-scale-in">
        {/* 
          As requested, the profile image should be placed in an 'assets' folder.
          Create an 'assets' folder in your public/root directory and place the profile image there.
          The image should be named 'profile.png'.
        */}
        <div className="relative w-64 h-[500px] md:w-90 md:h-90 animate-wave">
  <img
    src="/assets/profile.png"
    alt="Pravin Raj"
    className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-white/50"
  />
  <div className="absolute inset-0 rounded-full border-4 border-[#F4F754]/50 animate-pulse"></div>
</div>

      </div>
    </section>
  );
};

export default HomePage;
