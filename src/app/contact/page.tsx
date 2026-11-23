'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Instagram, Send, CheckCircle2, MessageCircle, HelpCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Artwork Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  const faqs = [
    {
      q: 'How are the artworks packaged for shipping?',
      a: 'Every painting is encased in archival acid-free glassine, cushioned with custom corner guards, and secured inside heavy-duty double-walled wooden crates to guarantee zero transit damage.',
    },
    {
      q: 'Do texture artworks require special care?',
      a: 'All our 3D plaster works are sealed with museum-grade UV-resistant sealant. A gentle dusting with a soft dry brush or microfibre cloth is all that is ever required.',
    },
    {
      q: 'How long does a custom commission take?',
      a: 'Custom bespoke pieces typically take 2 to 3 weeks to sculpt, cure, inspect, and crate. You will receive progress photos and a video before sealing.',
    },
    {
      q: 'Do the pieces come ready to hang?',
      a: 'Yes, each artwork is fitted with pre-installed heavy-duty solid brass D-rings and hanging wire, accompanied by wall anchors and hanging guidelines.',
    },
  ];

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              Get in Touch
            </span>
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Connect with the TINTOZA Atelier
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed">
            Whether you have questions about artwork dimensions, custom palettes, or international shipping, we are delighted to assist you.
          </p>
        </div>

        {/* Contact Methods Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* WhatsApp Direct */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#DEC49E] shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6D5C1] flex items-center justify-center text-[#4B2E1E] mb-4">
                <MessageCircle className="w-6 h-6 text-[#4B2E1E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4B2E1E] mb-1">
                WhatsApp Studio Chat
              </h3>
              <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
                Connect directly with our artisan team for quick sizing advice and custom photos.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#382216] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF7A]" />
                <span>Open WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Instagram */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#DEC49E] shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6D5C1] flex items-center justify-center text-[#4B2E1E] mb-4">
                <Instagram className="w-6 h-6 text-[#4B2E1E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4B2E1E] mb-1">
                Instagram Direct
              </h3>
              <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
                Follow behind the scenes and message us on Instagram @tintoza.art.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#4B2E1E] text-xs font-semibold uppercase tracking-wider text-[#4B2E1E] hover:bg-[#4B2E1E] hover:text-[#F8F1E6] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C9A67A]" />
                <span>@TINTOZA.ART</span>
              </a>
            </div>
          </div>

          {/* Email Atelier */}
          <div className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#DEC49E] shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#E6D5C1] flex items-center justify-center text-[#4B2E1E] mb-4">
                <Mail className="w-6 h-6 text-[#4B2E1E]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#4B2E1E] mb-1">
                Collector Concierge
              </h3>
              <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
                For corporate orders, gallery exhibitions, and private commissions.
              </p>
            </div>
            <div className="mt-6">
              <a
                href="mailto:contact@tintoza.com"
                className="text-xs font-semibold text-[#4B2E1E] underline hover:text-[#C9A67A] transition-colors block"
              >
                contact@tintoza.com
              </a>
              <span className="text-[11px] text-[#8C6F54]">Response within 12 hours</span>
            </div>
          </div>

        </div>

        {/* Contact Form & Studio Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF6F0] p-8 sm:p-10 border border-[#DEC49E] shadow-luxury">
              <h3 className="font-serif text-2xl font-bold text-[#4B2E1E] mb-2">
                Send an Atelier Message
              </h3>
              <p className="text-xs text-[#8C6F54] font-light mb-6">
                Fill out the form below and we will respond thoughtfully to your inquiry.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-[#F8F1E6] border border-[#DEC49E] text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-green-700 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#4B2E1E]">Message Dispatched</h4>
                  <p className="text-xs text-[#8C6F54] max-w-sm mx-auto">
                    Thank you, {name}. Your inquiry has reached our atelier inbox. We will be in touch shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="text-xs font-semibold text-[#4B2E1E] underline"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Your Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Marcus Sterling"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="marcus@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                    >
                      <option value="General Artwork Inquiry">General Artwork Inquiry</option>
                      <option value="Custom Size & Commission Request">Custom Size & Commission Request</option>
                      <option value="Interior Designer & Trade Program">Interior Designer & Trade Program</option>
                      <option value="Order Tracking / Delivery Status">Order Tracking / Delivery Status</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Message</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      placeholder="How can we assist you with your art collection?"
                      className="w-full p-3 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#382216] transition-colors flex items-center justify-center gap-2 shadow-luxury"
                  >
                    <Send className="w-4 h-4 text-[#D4AF7A]" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: FAQ Accordion */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#DEC49E]">
              <h3 className="font-serif text-lg font-bold text-[#4B2E1E] mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#C9A67A]" />
                <span>Frequently Asked Questions</span>
              </h3>

              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="pb-3 border-b border-[#DEC49E]/40 last:border-b-0">
                    <h4 className="text-xs font-bold text-[#4B2E1E] mb-1">
                      {faq.q}
                    </h4>
                    <p className="text-xs text-[#8C6F54] font-light leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
