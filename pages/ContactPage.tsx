
import React from 'react';

const ContactPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission here.
    alert('Thank you for your message!');
  };

  return (
    <div className="py-12 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="w-full md:w-2/3 mx-auto text-slate-700 text-lg">
            Have a project in mind or just want to say hello? Feel free to send me a message. I'd love to hear from you!
          </p>
        </div>
        
        <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-800">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="mt-1 block w-full px-3 py-2 bg-white/50 border border-slate-300/50 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-[#F4F754] focus:border-[#F4F754] sm:text-sm" 
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-800">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                className="mt-1 block w-full px-3 py-2 bg-white/50 border border-slate-300/50 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-[#F4F754] focus:border-[#F4F754] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-800">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                required 
                className="mt-1 block w-full px-3 py-2 bg-white/50 border border-slate-300/50 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-[#F4F754] focus:border-[#F4F754] sm:text-sm"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="text-center">
              <button 
                type="submit" 
                className="inline-block bg-[#F4F754] text-slate-900 font-bold py-3 px-12 rounded-lg shadow-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
