import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../core/i18n';
import { getPlace, getReviews, addReview } from '../../data/db';
import { Place, Review } from '../../data/models';
import { useAuth } from '../../data/auth';

export function DetailScreen({ id }: { id: string }) {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { user, profile } = useAuth();
  
  const [place, setPlace] = useState<Place | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewing, setReviewing] = useState(false);

  useEffect(() => {
    async function load() {
      const p = await getPlace(id);
      if (p) {
        setPlace(p);
        const r = await getReviews(id);
        setReviews(r);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile || !place) return;
    setReviewing(true);
    await addReview({
      placeId: place.id!,
      userId: user.uid,
      userName: profile.displayName || user.email || 'Anonymous',
      rating,
      comment,
      createdAt: Date.now(),
    });
    // refresh
    const r = await getReviews(id);
    setReviews(r);
    // update place average
    const p = await getPlace(id);
    if(p) setPlace(p);
    
    setComment('');
    setRating(5);
    setReviewing(false);
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen">{t('splash.loading')}</div>;
  if (!place) return <div className="p-4 pt-8">Place not found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      <div className="relative h-64 bg-gray-800">
        {place.imageUrl ? (
          <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <MapPin size={48} className="text-gray-600" />
          </div>
        )}
        <button 
          onClick={() => setLocation('/home')}
          className="absolute top-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      <div className="p-4 -mt-6 bg-background rounded-t-3xl relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">{place.name}</h1>
            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-lg text-sm font-medium capitalize">
              {place.type}
            </span>
          </div>
          <div className="flex items-center gap-1 bg-surface py-2 px-3 rounded-xl border border-gray-800">
            <Star className="text-yellow-400 fill-current" size={20} />
            <span className="font-bold text-lg">{place.averageRating?.toFixed(1) || '0'}</span>
            <span className="text-gray-400 text-sm">({place.ratingCount || 0})</span>
          </div>
        </div>

        {place.address && (
          <div className="flex items-center gap-3 text-gray-300 mb-4 bg-surface p-4 rounded-2xl border border-gray-800/50">
            <MapPin className="text-primary shrink-0" size={20} />
            <p className="text-sm">{place.address}</p>
          </div>
        )}

        {place.openingHours && (
          <div className="flex items-center gap-3 text-gray-300 mb-6 bg-surface p-4 rounded-2xl border border-gray-800/50">
            <Clock className="text-primary shrink-0" size={20} />
            <p className="text-sm">{place.openingHours}</p>
          </div>
        )}

        {place.services && place.services.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3">{t('detail.services')}</h2>
            <div className="flex flex-wrap gap-2">
              {place.services.map((s, i) => (
                <span key={i} className="bg-surface border border-gray-800 px-4 py-2 rounded-xl text-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-4">{t('detail.reviews')}</h2>
          
          <form onSubmit={submitReview} className="bg-surface border border-gray-800 p-4 rounded-2xl mb-6">
            <h3 className="font-medium mb-3">{t('detail.addReview')}</h3>
            <div className="flex gap-2 mb-3">
              {[1,2,3,4,5].map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setRating(v)}
                >
                  <Star size={28} className={v <= rating ? 'text-yellow-400 fill-current' : 'text-gray-600'} />
                </button>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full bg-background border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-primary mb-3 text-sm h-24 resize-none"
              placeholder="Your comment..."
            />
            <button 
              type="submit" 
              disabled={reviewing}
              className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-colors"
            >
              {t('add.submit')}
            </button>
          </form>

          <div className="space-y-4">
             {reviews.length === 0 ? (
               <p className="text-gray-500 text-center py-4">No reviews yet.</p>
             ) : (
               reviews.map(r => (
                 <div key={r.id} className="bg-surface border border-gray-800 p-4 rounded-2xl">
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-semibold">{r.userName}</span>
                     <div className="flex items-center gap-1 text-yellow-400 text-sm">
                       <Star size={14} fill="currentColor" /> {r.rating}
                     </div>
                   </div>
                   {r.comment && <p className="text-gray-300 text-sm">{r.comment}</p>}
                   <span className="text-xs text-gray-500 mt-2 block">
                     {new Date(r.createdAt).toLocaleDateString()}
                   </span>
                 </div>
               ))
             )}
          </div>
        </div>
      </div>
    </div>
  );
}
