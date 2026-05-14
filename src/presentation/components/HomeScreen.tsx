import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../core/i18n';
import { getPlaces } from '../../data/db';
import { Place } from '../../data/models';

export function HomeScreen() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const p = await getPlaces();
        setPlaces(p);
      } catch (err) {
        console.warn('Could not load places:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const filteredPlaces = places.filter(p => {
    if (filter !== 'all' && filter !== 'open' && p.type !== filter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const filters = [
    { id: 'all', label: t('filter.all') },
    { id: 'bar', label: t('filter.bar') },
    { id: 'cafe', label: t('filter.cafe') },
    { id: 'lounge', label: t('filter.lounge') },
    { id: 'store', label: t('filter.store') },
  ];

  return (
    <div className="p-4 pt-8">
      <h1 className="text-2xl font-bold mb-6">{t('home.title')}</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder={t('home.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              filter === f.id ? 'bg-primary text-white' : 'bg-surface text-gray-400 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-10 text-gray-500">{t('splash.loading')}</div>
        ) : filteredPlaces.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No places found.</div>
        ) : (
          filteredPlaces.map(place => (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              key={place.id}
              onClick={() => setLocation(`/place/${place.id}`)}
              className="bg-surface rounded-xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform border border-gray-800/50"
            >
              <div className="h-40 bg-gray-800 relative">
                {place.imageUrl ? (
                  <img src={place.imageUrl} alt={place.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600">
                    <MapPin size={32} />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-sm font-medium text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span>{place.averageRating?.toFixed(1) || '0'} ({place.ratingCount || 0})</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{place.name}</h3>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded-md text-gray-300 capitalize">{place.type}</span>
                </div>
                {place.address && (
                  <p className="text-sm text-gray-400 mb-2 truncate">{place.address}</p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
