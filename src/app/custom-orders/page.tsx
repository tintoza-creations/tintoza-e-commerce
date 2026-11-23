'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Sparkles, CheckCircle2, Phone, Send, Calculator, Layers, Palette } from 'lucide-react';
import { formatINR } from '@/lib/utils';

function CustomOrdersContent() {
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('artType') as any) || 'texture';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [artType, setArtType] = useState<string>(initialType);
  const [dimensions, setDimensions] = useState('24" x 36" (Classic Medium)');
  const [palettePreferences, setPalettePreferences] = useState('Warm Ivory, Sand Beige, Taupe & Chocolate');
  const [roomType, setRoomType] = useState('Living Room Focal Wall');
  const [budgetRange, setBudgetRange] = useState('₹10,000 - ₹20,000');
  const [notes, setNotes] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<any>(null);

  // Dynamic estimate based on selections
  const calculateEstimate = () => {
    let base = 12000;
    if (artType === 'texture') base = 14500;
    if (artType === 'thread') base = 11500;
    if (artType === 'canvas') base = 10000;

    if (dimensions.includes('30" x 40"')) base += 4500;
    if (dimensions.includes('36" x 48"')) base += 8500;
    if (dimensions.includes('48" x 60"')) base += 16000;
    return base;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/custom-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          artType,
          dimensions,
          palettePreferences,
          roomType,
          budgetRange,
          notes,
          referenceUrl,
        }),
      });
      const data = await res.json();
      if (data.inquiry) {
        setSubmittedInquiry(data.inquiry);
      }
    } catch (err) {
      console.error('Error submitting inquiry', err);
    } finally {
      setSubmitting(false);
    }
  };

  const getWhatsAppMessage = () => {
    const text = `Hi TINTOZA Atelier! I would like to inquire about a custom commission:
Name: ${name || 'Art Patron'}
Art Medium: ${artType.toUpperCase()}
Dimensions: ${dimensions}
Palette: ${palettePreferences}
Room: ${roomType}
Notes: ${notes || 'Looking for something tailored to my space.'}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="bg-[#F8F1E6] min-h-screen py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-3 mb-2">
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
            <span className="text-xs uppercase tracking-[0.28em] text-[#C9A67A] font-semibold">
              Bespoke Atelier Commissions
            </span>
            <span className="w-8 h-[1px] bg-[#C9A67A]"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif text-[#4B2E1E] tracking-tight">
            Personalised Artwork Enquiry
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#8C6F54] font-light leading-relaxed">
            Every home possesses unique light, architecture, and proportions. Share your vision and our artisans will craft a one-of-a-kind original designed exclusively for your space.
          </p>
        </div>

        {/* Main Grid: Form + Calculator Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-[#FAF6F0] p-8 sm:p-12 border border-[#DEC49E] shadow-luxury">
              
              {submittedInquiry ? (
                <div className="text-center py-10 space-y-5">
                  <div className="w-16 h-16 rounded-full bg-[#E6D5C1] text-[#4B2E1E] mx-auto flex items-center justify-center border-2 border-[#D4AF7A]">
                    <CheckCircle2 className="w-8 h-8 text-[#4B2E1E]" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-[#4B2E1E]">
                    Commission Inquiry Received
                  </h3>
                  <p className="text-sm text-[#4B2E1E]/80 max-w-md mx-auto font-light leading-relaxed">
                    Thank you, <strong>{submittedInquiry.name}</strong>. Our head artisan will review your dimensions and color preferences and send a tailored sketch &amp; quotation to <strong>{submittedInquiry.email}</strong> within 24 to 48 hours.
                  </p>

                  <div className="p-5 rounded-2xl bg-[#F8F1E6] border border-[#DEC49E] max-w-md mx-auto text-left text-xs space-y-2 text-[#8C6F54]">
                    <div><strong>Inquiry Reference:</strong> #{submittedInquiry.id}</div>
                    <div><strong>Selected Medium:</strong> {submittedInquiry.artType.toUpperCase()} ART</div>
                    <div><strong>Dimensions:</strong> {submittedInquiry.dimensions}</div>
                    <div><strong>Estimated Atelier Review:</strong> Within 24-48 Hours</div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => setSubmittedInquiry(null)}
                      className="px-6 py-3 rounded-full bg-[#4B2E1E] text-[#F8F1E6] text-xs font-semibold uppercase tracking-wider hover:bg-[#382216]"
                    >
                      Submit Another Inquiry
                    </button>
                    <a
                      href={`https://wa.me/?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full border border-[#4B2E1E] text-xs font-semibold uppercase tracking-wider text-[#4B2E1E] hover:bg-[#E6D5C1] flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#C9A67A]" />
                      <span>Chat Directly on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step 1: Medium */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] mb-2">
                      1. Choose Artwork Medium
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { id: 'texture', label: '3D Texture Art', desc: 'Sculpted plaster' },
                        { id: 'thread', label: 'Thread Art', desc: 'Intricate string geometry' },
                        { id: 'canvas', label: 'Modern Canvas', desc: 'Earth tone acrylics' },
                        { id: 'mixed', label: 'Mixed Media', desc: 'Plaster & gold foil' },
                      ].map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setArtType(item.id)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            artType === item.id
                              ? 'border-[#4B2E1E] bg-[#E6D5C1]/70 ring-1 ring-[#4B2E1E]'
                              : 'border-[#DEC49E] bg-[#F8F1E6] hover:bg-[#E6D5C1]/30'
                          }`}
                        >
                          <span className="block text-xs font-bold text-[#4B2E1E]">{item.label}</span>
                          <span className="block text-[10px] text-[#8C6F54] mt-0.5">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 2: Dimensions */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] mb-2">
                      2. Desired Dimensions
                    </label>
                    <select
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                    >
                      <option value='20" x 30" (Compact Accent)'>20" x 30" (50 x 75 cm) — Compact Accent</option>
                      <option value='24" x 36" (Classic Medium)'>24" x 36" (60 x 90 cm) — Classic Medium (Signature Hero)</option>
                      <option value='30" x 40" (Statement Piece)'>30" x 40" (75 x 100 cm) — Statement Piece</option>
                      <option value='36" x 48" (Grand Living Room)'>36" x 48" (90 x 120 cm) — Grand Living Room</option>
                      <option value='48" x 60" (Oversized Architectural)'>48" x 60" (120 x 150 cm) — Oversized Architectural</option>
                      <option value='Two Panels (Diptych Set)'>Two Panels Diptych Set (Pair of 2)</option>
                      <option value='Custom Sizing'>Custom Sizing (Specify in notes below)</option>
                    </select>
                  </div>

                  {/* Step 3: Palette & Room Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] mb-2">
                        3. Palette Preferences
                      </label>
                      <select
                        value={palettePreferences}
                        onChange={(e) => setPalettePreferences(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      >
                        <option value="Warm Ivory, Sand Beige, Taupe & Chocolate">TINTOZA Signature (Ivory, Sand, Taupe & Chocolate)</option>
                        <option value="Warm Ivory & Sand Beige Minimalist">Monochrome Calm (Warm Ivory & Sand Beige)</option>
                        <option value="Deep Chocolate Brown with Gold Foil">Opulent Contrast (Deep Chocolate & Gold Foil)</option>
                        <option value="Custom Palette from My Room Photos">Custom Match to My Room Décor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-[#4B2E1E] mb-2">
                        4. Room Sanctuary
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      >
                        <option value="Living Room Focal Wall">Living Room Console / Sofa Wall</option>
                        <option value="Master Bedroom Headboard">Master Bedroom Sanctuary</option>
                        <option value="Foyer & Entryway Gallery">Foyer & Entryway</option>
                        <option value="Dining Room Statement">Dining Space</option>
                        <option value="Executive Office / Studio">Executive Office</option>
                      </select>
                    </div>
                  </div>

                  {/* Step 4: Contact Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="e.g. Priya Sundaram"
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
                        placeholder="priya.sundaram@gmail.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4B2E1E] mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                      />
                    </div>
                  </div>

                  {/* Step 5: Notes & Reference */}
                  <div>
                    <label className="block text-xs font-medium text-[#4B2E1E] mb-1">
                      Artwork Vision, Wall Notes or Monogram Initials
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your desired arch curve curvature, wall colors, lighting setup, or initials for thread art..."
                      className="w-full p-3 rounded-xl border border-[#DEC49E] bg-[#F8F1E6] text-xs text-[#4B2E1E] focus:outline-none focus:border-[#4B2E1E]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 py-4 bg-[#4B2E1E] text-[#F8F1E6] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#382216] transition-colors flex items-center justify-center gap-2 shadow-luxury"
                    >
                      <Send className="w-4 h-4 text-[#D4AF7A]" />
                      <span>{submitting ? 'Submitting to Atelier...' : 'Submit Bespoke Commission Inquiry'}</span>
                    </button>

                    <a
                      href={`https://wa.me/?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-4 rounded-full border border-[#4B2E1E] text-xs font-bold uppercase tracking-wider text-[#4B2E1E] hover:bg-[#E6D5C1] flex items-center justify-center gap-2"
                    >
                      <Phone className="w-4 h-4 text-[#C9A67A]" />
                      <span>Inquire via WhatsApp</span>
                    </a>
                  </div>

                </form>
              )}

            </div>
          </div>

          {/* Right Column: Dynamic Price Estimator & Craft Process */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Instant Estimator Box */}
            <div className="rounded-2xl bg-[#E6D5C1]/50 p-6 border border-[#DEC49E] text-left">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C9A67A] font-semibold mb-2">
                <Calculator className="w-4 h-4" />
                <span>Estimated Atelier Quote</span>
              </div>
              <div className="font-serif text-3xl font-bold text-[#4B2E1E]">
                ~ {formatINR(calculateEstimate())}
              </div>
              <p className="text-[11px] text-[#8C6F54] mt-1 font-light">
                *Estimated guide based on {dimensions.split('(')[0]} in {artType} art. Final price confirmed upon design approval.
              </p>

              <div className="mt-4 pt-4 border-t border-[#DEC49E]/60 space-y-2 text-xs text-[#4B2E1E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A67A]" />
                  <span>3D Digital Mockup on your wall</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A67A]" />
                  <span>Kiln-dried solid wood frame</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A67A]" />
                  <span>Wooden crate insured courier</span>
                </div>
              </div>
            </div>

            {/* Atelier Timeline */}
            <div className="rounded-2xl bg-[#FAF6F0] p-6 border border-[#DEC49E] text-left space-y-4">
              <h4 className="font-serif text-base font-bold text-[#4B2E1E]">
                Our Commission Journey
              </h4>
              <ol className="space-y-3 text-xs text-[#8C6F54]">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E6D5C1] text-[#4B2E1E] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">1</span>
                  <span><strong>Design Consultation:</strong> We review your space photos and confirm texture sketches.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E6D5C1] text-[#4B2E1E] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">2</span>
                  <span><strong>Hand Sculpting:</strong> 7 to 14 days of artisan plaster layering, curing, and pigment blending.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E6D5C1] text-[#4B2E1E] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">3</span>
                  <span><strong>Artisan Approval:</strong> High-res photo &amp; video preview sent to you before sealing.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#E6D5C1] text-[#4B2E1E] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">4</span>
                  <span><strong>Archival Delivery:</strong> Hand-packed in insured crates with certificate of authenticity.</span>
                </li>
              </ol>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function CustomOrdersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F1E6] flex items-center justify-center font-serif text-[#4B2E1E]">Loading Commission Studio...</div>}>
      <CustomOrdersContent />
    </Suspense>
  );
}
