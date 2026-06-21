import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell } from 'lucide-react';
import { defaultMetrics } from '../config/metrics';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenBMI: () => void;
}

export default function Navbar({ onOpenQuiz, onOpenBMI }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Programs', href: '#programs' },
    { name: 'Results', href: '#succeed' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Calculator', href: '#bmi-calculator' },
    { name: 'Quiz', href: '#fitness-quiz' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-black/85 backdrop-blur-md border-b border-brand-orange/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={(e) => handleLinkClick(e, '#')}
            title="Double tap to open Pitch Control Panel"
          >
            <Dumbbell className="w-8 h-8 text-brand-orange transition-transform duration-500 group-hover:rotate-45" />
            <span className="font-bebas text-2xl tracking-wider text-white">
              {defaultMetrics.gymName.split(' ')[0]}
              <span className="text-brand-orange"> {defaultMetrics.gymName.split(' ')[1]}</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium text-gray-300 hover:text-brand-orange transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={onOpenQuiz}
              className="text-xs font-semibold text-gray-300 hover:text-brand-orange transition-colors"
            >
              Take Quiz
            </button>
            <span className="text-gray-700">|</span>
            <button
              onClick={onOpenBMI}
              className="text-xs font-semibold text-gray-300 hover:text-brand-orange transition-colors"
            >
              Check BMI
            </button>
            <a
              href="#trial-form"
              onClick={(e) => handleLinkClick(e, '#trial-form')}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full hover:bg-brand-orange/95 transition-all duration-300 transform hover:scale-105 shadow-md shadow-brand-orange/20"
            >
              Book Free Trial
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            <a
              href="#trial-form"
              onClick={(e) => handleLinkClick(e, '#trial-form')}
              className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full shadow-md"
            >
              Trial
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-brand-charcoal border-l border-brand-orange/10 p-6 shadow-2xl transition-transform duration-300 transform md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="font-bebas text-xl text-white">Navigation</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-lg font-bebas tracking-wide text-gray-200 hover:text-brand-orange py-2 border-b border-gray-800"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col space-y-3 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="w-full py-2.5 text-sm text-center text-gray-300 bg-brand-black border border-brand-orange/20 rounded-lg"
            >
              Take Fitness Quiz
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBMI();
              }}
              className="w-full py-2.5 text-sm text-center text-gray-300 bg-brand-black border border-brand-orange/20 rounded-lg"
            >
              Check BMI Calculator
            </button>
            <a
              href="#trial-form"
              onClick={(e) => handleLinkClick(e, '#trial-form')}
              className="w-full py-3 text-sm text-center font-bold uppercase tracking-wider text-black bg-brand-orange rounded-full shadow-lg"
            >
              Book Free Trial
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
