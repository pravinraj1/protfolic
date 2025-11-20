import React from 'react';
import { Skill } from '../types';
import { TypeAnimation } from 'react-type-animation';

const skills: Skill[] = [
  { id: 1, name: 'React.js', imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 2, name: 'Java', imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 3, name: 'Python', imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 4, name: 'SpringBoot', imageUrl: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 5, name: 'SQL', imageUrl: 'https://images.unsplash.com/photo-1576595580361-90a855b84b20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 6, name: 'JavaScript', imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 7, name: 'HTML/CSS', imageUrl: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
  { id: 8, name: 'Git & GitHub', imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60' },
];

const AboutPage: React.FC = () => {
  return (
    <div className="py-12 space-y-16">
      {/* Objective Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 animate-reveal delay-100">About Me</h1>
        <div className="w-full md:w-3/4 mx-auto text-slate-700 text-lg leading-relaxed animate-reveal delay-200 bg-white/30 backdrop-blur-sm p-6 rounded-xl shadow-sm">
          <TypeAnimation
            sequence={[
              "Enthusiastic and driven software developer with a solid foundation in computer science engineering and practical experience in web development. Eager to apply my skills in Java, Python, and modern web technologies to contribute to dynamic projects, collaborate with forward-thinking teams, and drive impactful results in a tech-driven environment.",
            ]}
            wrapper="p"
            speed={70}
            cursor={true}
            style={{ 'whiteSpace': 'pre-line' }}
          />
        </div>
      </div>

      {/* Experience Section */}
      <div className="max-w-4xl mx-auto px-4 animate-reveal delay-300">
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Full Stack Web Development Intern</h3>
                <p className="text-slate-700 font-medium">Innovate</p>
              </div>
              <span className="text-sm bg-[#F4F754] px-3 py-1 rounded-full font-semibold mt-2 md:mt-0">07/2024 - 08/2024</span>
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Successfully completed a 4-week internship, delivering a project titled <strong>MemberHub</strong>: A Web Application for Efficient Membership Management and Certificate Generation.</li>
            </ul>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50 hover:shadow-xl transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Web Developer Intern</h3>
                <p className="text-slate-700 font-medium">Exposys Data Labs</p>
              </div>
              <span className="text-sm bg-[#F4F754] px-3 py-1 rounded-full font-semibold mt-2 md:mt-0">06/2023 - 07/2023</span>
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-2">
              <li>Completed a comprehensive internship program focused on web development.</li>
              <li>Actively engaged in tasks, demonstrating punctuality, a strong work ethic, and curiosity throughout.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="max-w-4xl mx-auto px-4 animate-reveal delay-400">
        <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-2">B.E. in Computer Science Engineering</h3>
            <p className="text-slate-700 mb-4 flex-grow">KGISL Institute of Technology, Coimbatore</p>
            <span className="text-sm text-slate-500 font-semibold">04/2025</span>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Diploma in Computer Engineering</h3>
            <p className="text-slate-700 mb-4 flex-grow">Sri Ramakrishna Polytechnic College, Coimbatore</p>
            <span className="text-sm text-slate-500 font-semibold">04/2022</span>
          </div>
          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/50 flex flex-col h-full">
            <h3 className="text-lg font-bold text-slate-900 mb-2">High School Leaving Certificate</h3>
            <p className="text-slate-700 mb-4 flex-grow">SKS Government Higher Secondary School, Nagapattinam</p>
            <span className="text-sm text-slate-500 font-semibold">04/2020</span>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="max-w-4xl mx-auto px-4 animate-reveal delay-500">
        <h2 className="text-3xl font-bold mb-8 text-center">Certifications</h2>
        <div className="bg-white/40 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/50">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-[#F4F754] rounded-full"></span>
              <span className="text-slate-800 font-medium">Object Oriented Programming in Java (Coursera)</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-[#F4F754] rounded-full"></span>
              <span className="text-slate-800 font-medium">Unit Testing in Java (Coursera)</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="w-2 h-2 bg-[#F4F754] rounded-full"></span>
              <span className="text-slate-800 font-medium">Networking Fundamentals (Coursera)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Skills Section */}
      <div className="text-center px-4 animate-reveal delay-500">
        <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 bg-white"
              style={{ "--delay": `${(index * 100) + 500}ms` } as React.CSSProperties}
            >
              <div className="h-40 overflow-hidden">
                <img src={skill.imageUrl} alt={skill.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-bold text-white text-center">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
