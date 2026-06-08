import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { REVIEWS } from '../data';
import { ReviewItem } from '../types';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, PenTool, Sparkles, User } from 'lucide-react';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  // Submit new review states
  const [showForm, setShowForm] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newRole, setNewRole] = useState<string>('');
  const [newQuote, setNewQuote] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [newBadge, setNewBadge] = useState<string>('Verified Customer');
  const [validationMsg, setValidationMsg] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState<string>('');

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviewsList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === reviewsList.length - 1 ? 0 : prev + 1));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newQuote.trim() || !newRole.trim()) {
      setValidationMsg('Please complete all fields to submit your experience.');
      return;
    }

    const newReview: ReviewItem = {
      id: `r-custom-${Date.now()}`,
      name: newAuthor,
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop', // default user headshot
      quote: newQuote,
      rating: newRating,
      date: 'Just now',
      badge: `${newBadge} • Certified`
    };

    setReviewsList([newReview, ...reviewsList]);
    setNewAuthor('');
    setNewRole('');
    setNewQuote('');
    setNewRating(5);
    setNewBadge('Verified Customer');
    setValidationMsg('');
    setSuccessMsg('Thank you! Your feedback has been verified and added successfully.');
    setCurrentIndex(0); // View the newly submitted review immediately

    setTimeout(() => {
      setSuccessMsg('');
      setShowForm(false);
    }, 5000);
  };

  const averageRating = (
    reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / reviewsList.length
  ).toFixed(1);

  return (
    <section className="py-24 bg-purple-50/45 relative" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl text-left" id="reviews-header">
            <span className="text-xs uppercase tracking-widest font-bold text-primary bg-purple-100 border border-purple-250/20 px-2.5 py-1 rounded-md">
              Client Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight font-display mt-3">
              REAL CLIENT REVIEWS
            </h2>
            <p className="text-slate-650 mt-2 text-sm sm:text-base font-normal">
              Read real property transformation stories from your local Franklin and Brentwood neighbors.
            </p>
          </div>

          {/* Average metrics rating summary card */}
          <div className="mt-6 md:mt-0 flex items-center bg-white border border-purple-150 rounded-2xl p-4 shadow-xs" id="reviews-summary-badge">
            <div className="text-center pr-4 border-r border-slate-100">
              <span className="text-3xl font-extrabold text-primary font-mono">{averageRating}</span>
              <span className="block text-[9px] uppercase tracking-wider text-slate-400 font-semibold mt-0.5">Average Rating</span>
            </div>
            <div className="pl-4">
              <div className="flex text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs text-slate-500 font-medium">Based on {reviewsList.length} local submissions</span>
            </div>
          </div>
        </div>

        {/* Carousel + Leave Review Box Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Column 1-2: Interactive Carousel Review Slider */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl border border-purple-50 p-6 sm:p-10 relative overflow-hidden" id="reviews-carousel-panel">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full flex items-center justify-center text-purple-150 animate-pulse">
              <Quote className="w-10 h-10 transform translate-x-2 -translate-y-2 opacity-50" />
            </div>

            <div className="min-h-[220px] flex flex-col justify-between">
              <div>
                {/* 5 Stars display */}
                <div className="flex text-amber-500 mb-4">
                  {[...Array(reviewsList[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-500" />
                  ))}
                  {[...Array(5 - reviewsList[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 text-slate-200" />
                  ))}
                </div>

                {/* Quote details */}
                <p className="text-slate-750 font-normal text-sm sm:text-base leading-relaxed italic pr-4 sm:pr-8 select-none">
                  "{reviewsList[currentIndex].quote}"
                </p>
              </div>

              {/* Author box info */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3.5">
                  <img
                    src={reviewsList[currentIndex].avatar}
                    alt={reviewsList[currentIndex].name}
                    className="w-12 h-12 rounded-full object-cover border border-purple-100 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <span className="block text-sm font-extrabold text-dark leading-none">
                      {reviewsList[currentIndex].name}
                    </span>
                    <span className="block text-[11px] text-slate-450 mt-1 font-medium">
                      {reviewsList[currentIndex].role} — <span className="font-mono text-[10px]">{reviewsList[currentIndex].date}</span>
                    </span>
                  </div>
                </div>

                {/* Badge Tag */}
                {reviewsList[currentIndex].badge && (
                  <span className="hidden sm:inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-100 rounded-full text-[10px] font-bold tracking-wide">
                    {reviewsList[currentIndex].badge}
                  </span>
                )}
              </div>
            </div>

            {/* Slider Actions buttons */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={handlePrev}
                id="reviews-prev-btn"
                className="p-2.5 bg-slate-100 hover:bg-purple-100/50 hover:text-primary text-slate-600 rounded-full transition-all cursor-pointer active:scale-90"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                id="reviews-next-btn"
                className="p-2.5 bg-slate-100 hover:bg-purple-100/50 hover:text-primary text-slate-600 rounded-full transition-all cursor-pointer active:scale-90"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Column 3: Leave Review Toggle Form */}
          <div className="lg:col-span-1 bg-white rounded-3xl border border-purple-100/80 p-6 flex flex-col justify-between" id="write-experience-panel">
            <AnimatePresence mode="wait">
              {!showForm ? (
                <motion.div
                  key="cta-box"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center py-6 h-full flex flex-col justify-center"
                >
                  <PenTool className="w-10 h-10 text-primary mx-auto mb-4 animate-bounce" />
                  <span className="text-lg font-bold text-dark block tracking-tight">Happy with Elite Solutions?</span>
                  <p className="text-slate-500 text-xs font-normal leading-relaxed mt-2.5 px-2">
                    Submit your personal roofing or energy conservation story card. Your testimonials help other local households make qualified plans.
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    id="trigger-review-form"
                    className="mt-6 mx-auto px-5 py-3 bg-purple-50 hover:bg-primary hover:text-white text-primary text-xs font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer shadow-xs active:scale-95"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-yellow-500 animate-pulse" />
                    <span>Share Your Elite Story</span>
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmitReview}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-center border-b border-purple-50 pb-2 mb-2">
                    <span className="text-sm font-bold text-dark flex items-center gap-1.5">
                      <PenTool className="w-4 h-4 text-primary" />
                      <span>Write Review Card</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="text-xs text-slate-400 hover:text-primary hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Rating selection stars */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1 leading-none">Rating Selection</label>
                    <div className="flex space-x-1.5">
                      {[1, 2, 3, 4, 5].map((starVal) => (
                        <button
                          key={starVal}
                          type="button"
                          onClick={() => setNewRating(starVal)}
                          className="focus:outline-hidden cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 transition-transform duration-100 active:scale-125 ${
                              starVal <= newRating ? 'text-amber-400 fill-amber-450' : 'text-slate-200'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name author */}
                  <div>
                    <label htmlFor="new-author" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Your Name</label>
                    <input
                      type="text"
                      id="new-author"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-primary/65 focus:outline-hidden"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label htmlFor="new-role" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Your Local Neighborhood</label>
                    <input
                      type="text"
                      id="new-role"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value)}
                      placeholder="e.g. Homeowner in Brentwood"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-primary/65 focus:outline-hidden"
                    />
                  </div>

                  {/* Project classification Badge selector */}
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Service Received</label>
                    <select
                      value={newBadge}
                      onChange={(e) => setNewBadge(e.target.value)}
                      id="new-review-badge-select"
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:border-primary/65 focus:outline-hidden"
                    >
                      <option value="Verified Roof Replacement">Roof Replacement</option>
                      <option value="Verified AC Installation">AC Installation</option>
                      <option value="Verified Heating System Repair">Heating Repair</option>
                      <option value="Verified Attic Insulation">Attic Insulation</option>
                      <option value="Verified Preventive Maintenance">HVAC Maintenance</option>
                    </select>
                  </div>

                  {/* Quote content */}
                  <div>
                    <label htmlFor="new-contents" className="block text-[10px] uppercase font-bold text-slate-400 mb-1.5">Your Feedback Story</label>
                    <textarea
                      id="new-contents"
                      rows={3}
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      placeholder="Describe the punctuality, cleanup level, of our crew members..."
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:border-primary/65 focus:outline-hidden resize-none"
                    />
                  </div>

                  {/* Message states */}
                  {validationMsg && (
                    <span className="text-[10px] text-red-600 block pl-1 font-semibold">{validationMsg}</span>
                  )}
                  {successMsg && (
                    <span className="text-[10px] text-emerald-700 font-semibold block bg-emerald-50 p-2.5 rounded-md border border-emerald-150">
                      {successMsg}
                    </span>
                  )}

                  <button
                    type="submit"
                    id="submit-review-btn"
                    className="w-full py-2.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-hover shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Publish Verification Experience</span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
