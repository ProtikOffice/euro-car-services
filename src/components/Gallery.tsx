import React, { useState } from 'react';
import { 
  ExternalLink, 
  MapPin, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/businessData';
import { GalleryItem } from '../types';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Facility', 'Diagnostics', 'Mechanical', 'Maintenance', 'Climate', 'Inspection'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleNextLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % GALLERY_ITEMS.length;
    setLightboxItem(GALLERY_ITEMS[nextIndex]);
  };

  const handlePrevLightbox = () => {
    if (!lightboxItem) return;
    const currentIndex = GALLERY_ITEMS.findIndex(item => item.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setLightboxItem(GALLERY_ITEMS[prevIndex]);
  };

  return (
    <section id="gallery" className="py-20 bg-slate-50 text-slate-900 border-b border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold tracking-wider uppercase shadow-sm">
            <span>Verified Business Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Euro Car Services Workshop & Facility
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Explore our Tampa service bays, diagnostic equipment, and automotive workmanship. Each photo is linked directly to our verified Google Maps listing.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`gallery-filter-${cat.toLowerCase()}`}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid of All 10 Business Items */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: GalleryItem) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:border-orange-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={`${item.title} - Euro Car Services Tampa`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge: Photo Number & Tag */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-slate-900 border border-slate-200 shadow-sm">
                    Photo #{item.id}
                  </span>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900 text-white shadow-sm">
                    {item.tag}
                  </span>
                </div>

                {/* Center Hover Action */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={() => setLightboxItem(item)}
                    aria-label={`Preview ${item.title}`}
                    className="p-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </button>

                  <a
                    href={item.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open Photo #${item.id} on Google Maps`}
                    className="p-3 rounded-xl bg-orange-600 text-white hover:bg-orange-700 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-all flex items-center gap-1.5 text-xs font-bold"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Maps</span>
                  </a>
                </div>
              </div>

              {/* Bottom Information & Verified Link */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-orange-600 uppercase tracking-wider">
                    <MapPin className="w-3 h-3 text-orange-600" />
                    <span>Euro Car Services • Tampa, FL</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Critical Link: Live Working Google Maps URL */}
                <div className="pt-3 border-t border-slate-100">
                  <a
                    id={`gallery-link-${item.id}`}
                    href={item.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-900 text-xs font-bold flex items-center justify-between border border-slate-200 transition-colors"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      <span>View on Google Maps</span>
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          {/* Close Backdrop Click */}
          <div className="absolute inset-0" onClick={() => setLightboxItem(null)} />

          <div className="relative z-10 max-w-4xl w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xl space-y-0">
            {/* Top Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-orange-50 text-orange-600 border border-orange-200">
                  Photo #{lightboxItem.id}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                  {lightboxItem.title}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setLightboxItem(null)}
                aria-label="Close Lightbox"
                className="p-1.5 rounded-lg bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Media Canvas */}
            <div className="relative aspect-[16/9] sm:aspect-[16/10] bg-slate-950 flex items-center justify-center overflow-hidden">
              <img
                src={lightboxItem.imageUrl}
                alt={lightboxItem.title}
                className="max-h-full max-w-full object-contain"
              />

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={handlePrevLightbox}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNextLightbox}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Actions and Description */}
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <p className="text-sm text-slate-800 font-semibold">{lightboxItem.description}</p>
                <p className="text-xs text-slate-500">Euro Car Services • 14228 N Florida Ave #103, Tampa, FL 33613</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  id="lightbox-google-maps-link"
                  href={lightboxItem.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
