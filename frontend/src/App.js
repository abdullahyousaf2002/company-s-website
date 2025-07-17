import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import axios from "axios";
import API from './api';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Navigation Component
const Navigation = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Consultancy', path: '/consultancy' },
    { name: 'Blog', path: '/blog' }
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://i0.wp.com/datxoc.com/wp-content/uploads/2022/06/Logo-Animation-1.2.gif?fit=200%2C50&ssl=1" 
                alt="Datxoc Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors font-roboto ${
                    location.pathname === item.path
                      ? 'text-cyan-600 bg-cyan-50'
                      : 'text-gray-700 hover:text-cyan-600 hover:bg-cyan-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-cyan-600 focus:outline-none focus:text-cyan-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

// Home Page Component
const Home = () => {
  useEffect(() => {
    const testConnection = async () => {
      try {
        const response = await axios.get(`${API}/`);
        console.log('Backend connected:', response.data.message);
      } catch (error) {
        console.error('Backend connection error:', error);
      }
    };
    testConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjQzMjk4MXww&ixlib=rb-4.1.0&q=85)'
          }}
        ></div>
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-roboto">
            Welcome to <span className="text-cyan-300">Datxoc</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-cyan-100 font-roboto">
            Transforming businesses through AI & Machine Learning solutions
          </p>
          <div className="space-x-4">
            <Link
              to="/consultancy"
              className="bg-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors font-roboto"
            >
              Get AI Consultation
            </Link>
            <Link
              to="/about"
              className="border-2 border-cyan-300 text-cyan-100 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 hover:text-blue-900 transition-colors font-roboto"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive AI/ML solutions for your business needs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-cyan-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">AI Strategy</h3>
              <p className="text-gray-600 font-roboto">Comprehensive AI strategy development tailored to your business objectives and industry requirements.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-cyan-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">ML Implementation</h3>
              <p className="text-gray-600 font-roboto">End-to-end machine learning implementation from data preparation to model deployment and monitoring.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-cyan-500 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">Business Intelligence</h3>
              <p className="text-gray-600 font-roboto">Transform your data into actionable insights with advanced analytics and business intelligence solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 font-roboto">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 font-roboto">Let's analyze your business needs and create a customized AI/ML solution</p>
          <Link
            to="/consultancy"
            className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors font-roboto"
          >
            Start Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

// About Us Page Component
const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About Datxoc</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are a leading software company specializing in AI and Machine Learning solutions, 
              helping businesses unlock their full potential through innovative technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                To be the leading provider of AI-powered tools that drive smarter decisions
                and sustainable growth across critical global sector.
              </p>
              <p className="text-gray-600">
                We work closely with our clients to understand their unique challenges and develop 
                tailored solutions that deliver measurable results and long-term value.
              </p>
            </div>
            <div className="bg-blue-600 h-64 rounded-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGNvbXBhbnl8ZW58MHx8fGJsdWV8MTc1MjQzMjk3NHww&ixlib=rb-4.1.0&q=85"
                alt="Innovation" 
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">Excellence</h3>
              <p className="text-gray-600 font-roboto">We strive for excellence in every project, delivering high-quality solutions that exceed expectations.</p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">Innovation</h3>
              <p className="text-gray-600 font-roboto">We embrace cutting-edge technologies and innovative approaches to solve complex business challenges.</p>
            </div>

            <div className="text-center">
              <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">Collaboration</h3>
              <p className="text-gray-600 font-roboto">We believe in the power of collaboration, working closely with our clients to achieve shared success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600">Areas where we excel in delivering AI/ML solutions</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Science</h3>
              <p className="text-gray-600">Advanced analytics and statistical modeling</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-gray-600">Predictive models and automated decision systems</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Natural Language Processing</h3>
              <p className="text-gray-600">Text analysis and language understanding</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Computer Vision</h3>
              <p className="text-gray-600">Image recognition and visual intelligence</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Consultancy Page Component
const Consultancy = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    businessSize: '',
    currentChallenges: '',
    dataAvailability: '',
    techStack: '',
    budget: '',
    timeline: '',
    contact: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [analysis, setAnalysis] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const generateAnalysis = (data) => {
    const recommendations = [];
    
    // Generate recommendations based on form data
    if (data.currentChallenges.toLowerCase().includes('customer') || data.currentChallenges.toLowerCase().includes('retention')) {
      recommendations.push({
        area: 'Customer Analytics',
        priority: 'High',
        description: 'Implement customer behavior analysis and churn prediction models to improve retention.',
        technologies: ['Machine Learning', 'Customer Segmentation', 'Predictive Analytics']
      });
    }
    
    if (data.currentChallenges.toLowerCase().includes('inventory') || data.currentChallenges.toLowerCase().includes('supply')) {
      recommendations.push({
        area: 'Supply Chain Optimization',
        priority: 'High',
        description: 'Deploy AI-powered demand forecasting and inventory optimization systems.',
        technologies: ['Forecasting Models', 'Optimization Algorithms', 'Real-time Analytics']
      });
    }
    
    if (data.currentChallenges.toLowerCase().includes('sales') || data.currentChallenges.toLowerCase().includes('marketing')) {
      recommendations.push({
        area: 'Sales & Marketing Intelligence',
        priority: 'Medium',
        description: 'Leverage AI for lead scoring, market analysis, and personalized marketing campaigns.',
        technologies: ['Lead Scoring', 'Market Analysis', 'Personalization Engine']
      });
    }
    
    if (data.currentChallenges.toLowerCase().includes('process') || data.currentChallenges.toLowerCase().includes('automation')) {
      recommendations.push({
        area: 'Process Automation',
        priority: 'Medium',
        description: 'Implement RPA and intelligent automation to streamline business processes.',
        technologies: ['RPA', 'Workflow Automation', 'Process Mining']
      });
    }
    
    // Default recommendations if no specific challenges match
    if (recommendations.length === 0) {
      recommendations.push({
        area: 'Data Foundation',
        priority: 'High',
        description: 'Establish a robust data infrastructure and analytics foundation for AI implementation.',
        technologies: ['Data Engineering', 'Business Intelligence', 'Data Quality Management']
      });
    }
    
    return {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
      recommendations: recommendations,
      timeline: data.timeline || '6-12 months',
      estimatedROI: '150-300%'
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Generate analysis
      const analysisResult = generateAnalysis(formData);
      setAnalysis(analysisResult);
      
      // Submit to backend
      await API.post(`${API}/consultations`, {
        ...formData,
        analysis: analysisResult,
        timestamp: new Date().toISOString()
      });
      
      setCurrentStep(3);
    } catch (error) {
      console.error('Error submitting consultation:', error);
      alert('There was an error submitting your consultation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">AI/ML Consultation</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Get personalized recommendations for implementing AI and Machine Learning in your business
          </p>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === 1 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Tell us about your business</h2>
                <p className="text-gray-600">We'll analyze your needs and provide customized AI/ML recommendations</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); nextStep(); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="finance">Finance</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Size</label>
                  <select
                    name="businessSize"
                    value={formData.businessSize}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Size</option>
                    <option value="startup">Startup (1-10 employees)</option>
                    <option value="small">Small (11-50 employees)</option>
                    <option value="medium">Medium (51-200 employees)</option>
                    <option value="large">Large (200+ employees)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Business Challenges</label>
                  <textarea
                    name="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Describe your main business challenges and areas where you think AI/ML could help..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Information</label>
                  <input
                    type="email"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@company.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Technical Details
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Requirements</h2>
                <p className="text-gray-600">Help us understand your technical landscape and project requirements</p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Data Availability</label>
                  <select
                    name="dataAvailability"
                    value={formData.dataAvailability}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select Data Status</option>
                    <option value="rich">Rich - Well-structured and abundant data</option>
                    <option value="moderate">Moderate - Some data available, needs cleanup</option>
                    <option value="limited">Limited - Minimal data, need to start collecting</option>
                    <option value="none">None - No structured data available</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Technology Stack</label>
                  <input
                    type="text"
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleInputChange}
                    placeholder="e.g., Python, AWS, PostgreSQL, React..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Budget</option>
                      <option value="10k-50k">$10,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-500k">$100,000 - $500,000</option>
                      <option value="500k+">$500,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Timeline</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2+ years">2+ years</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-400 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? 'Analyzing...' : 'Get AI Analysis'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 3 && analysis && (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your AI/ML Analysis Report</h2>
                <p className="text-gray-600">Based on your inputs, here are our personalized recommendations</p>
              </div>
              
              <div className="space-y-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">AI Readiness Score</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-blue-200 rounded-full h-4">
                      <div 
                        className="bg-blue-600 h-4 rounded-full transition-all duration-1000"
                        style={{ width: `${analysis.overallScore}%` }}
                      ></div>
                    </div>
                    <span className="ml-4 text-2xl font-bold text-blue-900">{analysis.overallScore}%</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended AI/ML Solutions</h3>
                  <div className="space-y-6">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-xl font-bold text-gray-900">{rec.area}</h4>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                            rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{rec.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {rec.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Estimated Timeline</h4>
                    <p className="text-gray-600">{analysis.timeline}</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Expected ROI</h4>
                    <p className="text-gray-600">{analysis.estimatedROI}</p>
                  </div>
                </div>

                <div className="bg-blue-600 text-white p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                  <p className="mb-4">
                    Our team will contact you within 24 hours to discuss these recommendations and create a detailed implementation plan.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      Return Home
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1);
                        setFormData({
                          companyName: '',
                          industry: '',
                          businessSize: '',
                          currentChallenges: '',
                          dataAvailability: '',
                          techStack: '',
                          budget: '',
                          timeline: '',
                          contact: ''
                        });
                        setAnalysis(null);
                      }}
                      className="border-2 border-white text-white px-6 py-2 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                    >
                      New Consultation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Blog Page Component
const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading blog posts
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API}/blog-posts`);
        setBlogPosts(response.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Fallback to sample data
        setBlogPosts([
          {
            id: '1',
            title: 'The Future of AI in Business Automation',
            excerpt: 'Exploring how artificial intelligence is revolutionizing business processes and driving efficiency across industries.',
            author: 'Datxoc Team',
            date: '2024-01-15',
            readTime: '8 min read',
            category: 'AI Strategy'
          },
          {
            id: '2',
            title: 'Machine Learning Implementation Best Practices',
            excerpt: 'A comprehensive guide to successfully implementing machine learning solutions in your organization.',
            author: 'Datxoc Team',
            date: '2024-01-10',
            readTime: '12 min read',
            category: 'Machine Learning'
          },
          {
            id: '3',
            title: 'Data Quality: The Foundation of Successful AI Projects',
            excerpt: 'Why data quality is crucial for AI success and how to ensure your data is ready for machine learning.',
            author: 'Datxoc Team',
            date: '2024-01-05',
            readTime: '6 min read',
            category: 'Data Science'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Datxoc Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Insights, trends, and best practices in AI, Machine Learning, and Data Science
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Load More Posts
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Subscribe to our newsletter for the latest AI and ML insights
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Datxoc</h3>
            <p className="text-gray-400">
              Transforming businesses through AI and Machine Learning solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">AI Strategy</a></li>
              <li><a href="#" className="hover:text-white">ML Implementation</a></li>
              <li><a href="#" className="hover:text-white">Data Analytics</a></li>
              <li><a href="#" className="hover:text-white">Consulting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">GitHub</a></li>
              <li><a href="#" className="hover:text-white">Medium</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Datxoc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

