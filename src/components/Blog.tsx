import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOGS } from '../data';
import { BlogPostItem } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, X, Heart, MessageSquare, Share2 } from 'lucide-react';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPostItem | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((item) => item !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
    }
  };

  const getFullArticleText = (id: string) => {
    switch (id) {
      case 'b1':
        return `
          Drywall patches are trailing signs. Roof deck wood rot or ceiling system failure can sit undetected for months before moisture bleeds through the plaster layer. Here are the 5 immediate, undetected elements to audit:
          
          1. Gutter Gravel Silt
             As asphalt shingles decay from intensive hail strikes or draft heat, they shed their outer protective stone granules. If you see thick, slate-gray sand accumulating in your downspouts, your protection layer has failed.
             
          2. Chimney Valley Flashing Blisters
             Where roof angles join at heavy brick chimneys, standard tar sealants dry out and shrink. Water gathers in these micro gap folds, funneling straight into your master bedroom ceiling.
             
          3. Broken Ridge Vents
             High gust winds can slip plastic ridge caps right off their nail beds. Water slips underneath, soaking your fiberglass insulation instantly.
             
          4. Rusted Attic Collar Ties
             When inspecting your attic with a flashlight, look for rusted fasteners along the roof rafters. Clear rust means high attic moisture and hidden underlayment penetrations.
             
          5. Shingle Lifting/Cupping
             Shingle edges that curve slightly upwards (cupping) are highly vulnerable to being torn away during subsequent storms, directly exposing the deck.
             
          Elite recommends scheduling a physical thermal inspection bi-annually.
        `;
      case 'b2':
        return `
          Most homeowners freeze or turn on their central AC for the entire house, throwing hundreds of dollars down the drain. Multi-zone variable-speed cooling allows your equipment to run on low power with consistent results:
          
          1. Leverage Variable Compressors
             Unlike traditional single-stage AC compressors which only run at 100% full capacity or 0% off, variable-speed units scale continuously between 20% and 100% output. This prevents frequent power-cycling spikes.
             
          2. Install Smart Damper Controls
             By placing motorized dampers inside your ductwork channels, you can seal airflow to empty guest suites automatically, redirecting cool currents directly to high-occupancy living rooms.
             
          3. Program 3-Degree Shifts
             Allowing your thermostat setting to drift 3 degrees warmer when you are at the office, and cooling it down 15 minutes before your return, maximizes energy efficiency without sacrificing comfort.
             
          4. Seal Your Box Attic Hatch
             Air bypasses and dry hot air draft leaks from ceiling pull-down stairs account for up to 15% of summer heat infiltration. Always use insulated sealing hoods.
        `;
      case 'b3':
        return `
          Storm declarations and insurance adjusters can be complicated. Follow this blueprint to protect your claim:
          
          1. Act Within 30 Days of Major Wind Storms
             Insurance regulations usually maintain strict notification deadlines. Early claims secure faster processing prior to regional booking bottlenecks.
             
          2. Document the Weather Conditions
             Take screenshots of local weather station reports or storm tracker maps displaying the exact hail size or gust speed registered in your neighborhood.
             
          3. Take Comprehensive Ground Imagery
             Document any immediate damage using simple high-definition photos: search for cracked roof overhang shingles, dented air conditioner grills, and downspout leaks.
             
          4. File Through a GAF Certified Roofing Inspector
             Adjusters respect detailed professional quotes over general sketches. We provide comprehensive safety diagrams to streamline claims processing.
        `;
      default:
        return 'Detailed guide article is currently loading...';
    }
  };

  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-bold text-primary bg-purple-50 px-2.5 py-1 rounded-md">
            Maintenance Masterclass
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight font-display mt-3">
            HOME MAINTENANCE BLOGS
          </h2>
          <p className="text-slate-650 mt-4 text-sm sm:text-base font-normal">
            Certified tips, energy calculators, and roofing safety tutorials directly from our field technicians.
          </p>
        </div>

        {/* Blogs grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="blogs-grid">
          {BLOGS.map((post) => {
            const isLiked = likedPosts.includes(post.id);
            return (
              <motion.div
                key={post.id}
                whileHover={{ y: -6 }}
                onClick={() => setSelectedPost(post)}
                className="bg-slate-50 rounded-2xl overflow-hidden border border-purple-100 hover:border-primary/30 flex flex-col justify-between cursor-pointer group shadow-xs transition-all duration-300"
                id={`blog-card-${post.id}`}
              >
                <div>
                  {/* Thumbnail */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transform duration-500 group-hover:scale-104"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-4 left-4 text-[9px] uppercase font-bold tracking-wider bg-dark/80 text-white px-3 py-1 rounded-md backdrop-blur-xs">
                      {post.category}
                    </span>
                  </div>

                  {/* Body details */}
                  <div className="p-6 text-left">
                    <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono mb-3">
                      <span className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1" />
                        {post.date}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-dark leading-snug group-hover:text-primary transition-colors duration-250">
                      {post.title}
                    </h3>

                    <p className="text-slate-500 text-xs mt-3 leading-relaxed font-normal line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer and dynamic likes block */}
                <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center text-xs font-bold text-primary group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>

                  <div className="flex space-x-3 text-slate-400">
                    <button
                      onClick={(e) => handleLike(post.id, e)}
                      className={`hover:text-red-500 transition-colors duration-200 cursor-pointer p-0.5 ${isLiked ? 'text-red-500' : ''}`}
                    >
                      <Heart className={`w-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                    </button>
                    <span className="text-[10px] self-center text-slate-400 font-medium">Like</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full-article reading Modal overlay */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-slate-900/60 backdrop-blur-xs" id="blog-details-modal">
              {/* Back Drop wrapper */}
              <div className="fixed inset-0" onClick={() => setSelectedPost(null)} />

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative bg-white w-full max-w-2xl rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden max-h-[85vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="mt-8 text-left">
                  <span className="inline-block px-2.5 py-0.5 bg-primary/10 text-primary uppercase text-[10px] font-extrabold rounded-md tracking-wider mb-3">
                    {selectedPost.category} Article
                  </span>
                  
                  <h3 className="text-xl sm:text-2xl font-extrabold text-dark leading-tight">
                    {selectedPost.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono mt-4 pb-6 border-b border-slate-100">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1.5" />
                      {selectedPost.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5" />
                      {selectedPost.readTime}
                    </span>
                  </div>

                  {/* Thumbnail in modal */}
                  <div className="my-6 aspect-video rounded-xl overflow-hidden shadow-xs border border-slate-150">
                    <img
                      src={selectedPost.image}
                      alt="Full Article banner"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Article content block */}
                  <div className="text-left text-slate-700 text-sm sm:text-base leading-relaxed space-y-4 font-normal whitespace-pre-line bg-purple-50/20 p-4 sm:p-6 rounded-2xl border border-purple-50/50">
                    {getFullArticleText(selectedPost.id)}
                  </div>

                  {/* End feedback social mockup */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100 text-xs font-semibold text-slate-400">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>Elite Field Specialist Manual</span>
                    </span>
                    <button
                      onClick={() => {
                        alert('Article link mock-copied to clipboard!');
                      }}
                      className="flex items-center gap-1 bg-slate-50 hover:bg-purple-50 hover:text-primary px-3 py-1.5 rounded-lg border border-slate-200 border-dashed cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Story</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
