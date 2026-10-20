'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/data/services';
import Button from '@/components/ui/Button';
import { CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: services[0].title,
    budget: '$5,000 – $15,000',
    message: '',
    honeypot: '',
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and project message.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('A network error occurred. Please try again or email us directly.');
    }
  };

  return (
    <div className="bg-[#FBFAF2] border border-[#146375]/15 rounded-3xl p-6 sm:p-10 shadow-xl text-left">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-[#3C8D70]/20 rounded-full flex items-center justify-center mx-auto text-[#146375]">
              <CheckCircle2 className="w-10 h-10 text-[#3C8D70]" />
            </div>
            <h3 className="text-2xl font-bold text-[#0B2A33] tracking-tight">
              Inquiry Received!
            </h3>
            <p className="text-sm sm:text-base text-[#0B2A33]/80 max-w-md mx-auto leading-relaxed">
              Thank you for reaching out to Rootline Lab. An engineering lead will review your requirements and reach out within 24 hours.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                setStatus('idle');
                setFormData({
                  name: '',
                  email: '',
                  phone: '',
                  company: '',
                  service: services[0].title,
                  budget: '$5,000 – $15,000',
                  message: '',
                  honeypot: '',
                });
              }}
              className="mt-4"
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot field for bot spam */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="form-honeypot">Leave blank</label>
              <input
                id="form-honeypot"
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            {/* Row 1: Name and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Your Name <span className="text-[#146375]">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] placeholder-[#0B2A33]/40 text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Work Email <span className="text-[#146375]">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  placeholder="sarah@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] placeholder-[#0B2A33]/40 text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 2: Phone & Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-phone"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Phone Number <span className="text-neutral-400 font-normal">(Optional)</span>
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  name="phone"
                  placeholder="+880 1..."
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] placeholder-[#0B2A33]/40 text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-company"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Company / Organization
                </label>
                <input
                  id="contact-company"
                  type="text"
                  name="company"
                  placeholder="Acme Corp"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] placeholder-[#0B2A33]/40 text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* Row 3: Service Selection & Budget Range */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label
                  htmlFor="contact-service"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Service Interested In
                </label>
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-budget"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
                >
                  Target Budget Range
                </label>
                <select
                  id="contact-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200"
                >
                  <option value="Under $5,000">Under $5,000 (Discovery / MVP Audit)</option>
                  <option value="$5,000 – $15,000">$5,000 – $15,000 (Standard Web App / Store)</option>
                  <option value="$15,000 – $35,000">$15,000 – $35,000 (Comprehensive Platform)</option>
                  <option value="$35,000+">$35,000+ (Enterprise Multi-Branch ERP)</option>
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label
                htmlFor="contact-message"
                className="block text-xs font-semibold uppercase tracking-wider text-[#0B2A33] mb-2"
              >
                Project Overview & Requirements <span className="text-[#146375]">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows="5"
                required
                placeholder="Tell us about what you want to build, current challenges, timeline expectations, or desired technology stack..."
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-white border border-[#146375]/20 text-[#0B2A33] placeholder-[#0B2A33]/40 text-sm focus:outline-none focus:border-[#146375] focus:ring-2 focus:ring-[#146375]/20 transition-all duration-200 resize-none"
              />
            </div>

            {/* Error Message banner */}
            {status === 'error' && (
              <div
                role="alert"
                className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={status === 'loading'}
                className="w-full sm:w-auto"
                iconRight={
                  status === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 ml-1" />
                  )
                }
              >
                {status === 'loading' ? 'Submitting...' : 'Send Project Inquiry'}
              </Button>
            </div>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}
