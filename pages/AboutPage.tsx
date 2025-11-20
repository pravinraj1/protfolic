import React from 'react';
import { Skill } from '../types';
import { TypeAnimation } from 'react-type-animation';

const skills: Skill[] = [
  { id: 1, name: 'React', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'TypeScript', imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Tailwind CSS', imageUrl: 'https://images.unsplash.com/photo-1644261352531-16353d368a9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 animate-reveal delay-100">About Me</h1>
        <div className="w-full md:w-2/3 mx-auto text-slate-700 text-lg animate-reveal delay-200" style={{minHeight: '150px'}}>
            <TypeAnimation
                sequence={[
                    "I'm a passionate frontend developer with a love for creating intuitive, dynamic, and beautiful user interfaces. My journey in web development started with a simple \"Hello World\" and has since grown into a full-fledged passion for building scalable and efficient web applications.",
                ]}
                wrapper="p"
                speed={70}
                cursor={true}
                style={{'whiteSpace': 'pre-line'}}
            />
        </div>
      </div>
      
      <div className="bg-white/20 backdrop-blur-md rounded-lg p-8 shadow-lg mb-12 animate-reveal delay-300">
        <h2 className="text-2xl font-semibold mb-4 text-center">My Philosophy</h2>
        <p className="text-slate-600 leading-relaxed">
          I believe that the best web experiences are born from a blend of strong technical implementation and a deep understanding of user needs. Creativity in problem-solving and a commitment to clean, maintainable code are the cornerstones of my work. I thrive in collaborative environments where I can learn from my peers and contribute to a shared vision.
        </p>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8 animate-reveal delay-400">My Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 animate-zoom-in"
              style={{ "--delay": `${(index * 100) + 500}ms` } as React.CSSProperties}
            >
              <img src={skill.imageUrl} alt={skill.name} className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">{skill.name}</h3>
              </div>
               <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
               <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
