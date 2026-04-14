import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Mail } from 'lucide-react';

import posterImg from '../../assets/events/espionage-poster.png';
import img1 from '../../assets/events/espionage-1.jpeg';
import img2 from '../../assets/events/espionage-2.jpeg';
import img3 from '../../assets/events/espionage-3.jpeg';
import img4 from '../../assets/events/espionage-4.jpeg';
import img5 from '../../assets/events/espionage-5.jpeg';
import img6 from '../../assets/events/espionage-6.jpeg';

const galleryImages = [img1, img2, img3, img4, img5, img6];

const Events = () => {
  return (
    <section className="section bg-black relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      <div className="container mx-auto px-6 relative z-10">
        {/* dBug Labs Event Journey Box */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="relative">
            {/* Glowing Border Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl blur opacity-30 animate-pulse" />

            {/* Main Text Box */}
            <div className="relative bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20 border border-purple-500/30 rounded-2xl p-12 md:p-20 text-center">
              {/* Decorative Elements */}
              <div className="absolute top-6 left-6 w-16 h-16 border-l-4 border-t-4 border-purple-500/30 rounded-tl-lg" />
              <div className="absolute top-6 right-6 w-16 h-16 border-r-4 border-t-4 border-purple-500/30 rounded-tr-lg" />
              <div className="absolute bottom-6 left-6 w-16 h-16 border-l-4 border-b-4 border-purple-500/30 rounded-bl-lg" />
              <div className="absolute bottom-6 right-6 w-16 h-16 border-r-4 border-b-4 border-purple-500/30 rounded-br-lg" />

              {/* Calendar Icon */}
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                <Calendar className="w-10 h-10 text-white" />
              </div>

              {/* Main Text */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ fontFamily: "'Orbitron', 'Inter', sans-serif" }}>
                <span className="gradient-text">dBug Labs</span>
              </h2>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                Event Journey
              </h3>

              {/* Divider */}
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-500 mx-auto mb-8 rounded-full" />

              {/* Coming Soon */}
              <p className="text-2xl md:text-3xl font-semibold text-purple-400 mb-4">
                Coming Soon
              </p>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                We're preparing something amazing for you. Stay tuned for our upcoming events,
                workshops, and hackathons that will elevate your tech journey!
              </p>
            </div>
          </div>
        </div>

        {/* Recent Event — Espionage */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="text-center mb-12">
            <span className="text-pink-400 text-sm font-semibold tracking-wider uppercase">Recent Event</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">
              <span className="text-red-500">Espionage</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A thrilling coding contest inspired by the world of espionage and mystery
            </p>
          </div>

          {/* Event Details Card */}
          <div className="relative mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-2xl blur-lg" />
            <div className="relative card p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Event Info */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">April 9, 2026</p>
                      <p className="text-gray-400 text-sm">Event Date</p>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Coding Contest — <span className="text-red-500">Dhurandhar</span> Theme
                  </h3>
                  <p className="text-gray-300 mb-4">
                    Espionage was a high-stakes coding competition that challenged participants to think like
                    detectives and solve intricate problems. Inspired by the theme of <span className="text-red-500 font-medium">Dhurandhar</span>,
                    contestants navigated through layers of logic puzzles, algorithmic challenges, and code-breaking
                    missions to prove their mettle.
                  </p>
                  <p className="text-gray-400 text-sm">
                    Participants put their problem-solving skills to the test in a competitive yet collaborative
                    environment, showcasing the best of dBug Labs' coding community.
                  </p>

                  {/* Event Tags */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {['Coding Contest', 'Dhurandhar', 'Problem Solving', 'Competitive Programming'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Event Highlight Visual */}
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-br from-purple-600/20 to-pink-500/20 rounded-2xl blur-xl" />
                  <div className="relative rounded-2xl border border-purple-500/20 overflow-hidden bg-black/80" style={{ height: '420px' }}>
                    <img
                      src={posterImg}
                      alt="Espionage — Dhurandhar Theme"
                      className="w-full h-full object-contain"
                    />
                    {/* Gradient overlay for blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* Tagline */}
                    <div className="absolute bottom-5 left-0 right-0 text-center z-10">
                      <p className="text-red-500 text-sm font-semibold tracking-widest uppercase">Decrypt &nbsp;•&nbsp; Deploy &nbsp;•&nbsp; Dominate</p>
                    </div>
                    {/* Decorative corners */}
                    <div className="absolute top-4 left-4 w-10 h-10 border-l-2 border-t-2 border-purple-500/40 rounded-tl-md" />
                    <div className="absolute top-4 right-4 w-10 h-10 border-r-2 border-t-2 border-pink-500/40 rounded-tr-md" />
                    <div className="absolute bottom-4 left-4 w-10 h-10 border-l-2 border-b-2 border-pink-500/40 rounded-bl-md" />
                    <div className="absolute bottom-4 right-4 w-10 h-10 border-r-2 border-b-2 border-purple-500/40 rounded-br-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Event Gallery */}
          <div className="mb-8">
            <div className="text-center mb-10">
              <span className="text-purple-400 text-sm font-semibold tracking-wider uppercase">Moments Captured</span>
              <h3 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
                Event <span className="gradient-text">Gallery</span>
              </h3>
              <p className="text-gray-400 max-w-xl mx-auto">
                Highlights from Espionage — the energy, the competition, and the community
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((imgSrc, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative rounded-xl overflow-hidden border border-purple-500/10 group-hover:border-purple-500/30 transition-colors">
                    <img
                      src={imgSrc}
                      alt={`Espionage Event Photo ${index + 1}`}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    {/* Placeholder when image not available */}
                    <div
                      className="items-center justify-center bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 h-56"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center">
                        <Calendar className="w-8 h-8 text-purple-500/40 mx-auto mb-2" />
                        <p className="text-gray-600 text-xs">Photo {index + 1}</p>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-500 text-sm mt-6 italic">
              Moments captured from Espionage — where code met courage.
            </p>
          </div>
        </div>

        {/* Get in Touch Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20" />
            <div className="relative p-8 md:p-12 text-center">
              <Mail className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-6">
                Have questions about our events or want to collaborate? We'd love to hear from you.
                Reach out to us and let's create something amazing together!
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all hover:-translate-y-1"
              >
                Contact Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
