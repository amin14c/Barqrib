import { useState } from 'react';
import { useLocation } from 'wouter';
import { useTranslation } from '../../core/i18n';
import { addPlace } from '../../data/db';
import { useAuth } from '../../data/auth';
import { MapPin, Upload } from 'lucide-react';

export function AddBarScreen() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    type: 'bar',
    address: '',
    services: '',
    openingHours: '',
    lat: 36.7538,
    lng: 3.0588,
    imageUrl: '',
  });

  const getLoc = () => {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setForm(f => ({ ...f, lat: pos.coords.latitude, lng: pos.coords.longitude }));
      });
    }
  }

  const handleSubmit = async () => {
    if(!user) return;
    setLoading(true);
    await addPlace({
      name: form.name,
      type: form.type as any,
      address: form.address,
      services: form.services.split(',').map(s => s.trim()).filter(s => s),
      openingHours: form.openingHours,
      lat: form.lat,
      lng: form.lng,
      imageUrl: form.imageUrl,
      createdBy: user.uid,
      createdAt: Date.now(),
      status: 'approved', // For MVP
      averageRating: 0,
      ratingCount: 0
    });
    setLoading(false);
    setLocation('/home');
  }

  return (
    <div className="p-4 pt-8">
      <h1 className="text-2xl font-bold mb-6">{t('add.title')}</h1>
      
      <div className="flex gap-2 mb-8">
        {[1,2,3].map(s => (
          <div key={s} className={`h-2 flex-1 rounded-full ${step >= s ? 'bg-primary' : 'bg-gray-800'}`} />
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-xl font-medium mb-4">{t('add.basic')}</h2>
          <div>
            <label className="block text-sm font-medium mb-2">{t('add.name')}</label>
            <input 
              value={form.name} onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('add.type')}</label>
            <select 
              value={form.type} onChange={e => setForm({...form, type: e.target.value})}
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none appearance-none"
            >
              <option value="bar">{t('filter.bar')}</option>
              <option value="cafe">{t('filter.cafe')}</option>
              <option value="lounge">{t('filter.lounge')}</option>
              <option value="store">{t('filter.store')}</option>
            </select>
          </div>
          <button 
            onClick={() => setStep(2)}
            disabled={!form.name}
            className="w-full bg-primary py-3 rounded-xl font-semibold disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-xl font-medium mb-4">{t('add.services')}</h2>
          <div>
            <label className="block text-sm font-medium mb-2">{t('detail.services')} (Comma separated)</label>
            <input 
              value={form.services} onChange={e => setForm({...form, services: e.target.value})}
              placeholder="e.g. WiFi, Parking, Food"
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('detail.hours')}</label>
            <input 
              value={form.openingHours} onChange={e => setForm({...form, openingHours: e.target.value})}
              placeholder="e.g. 18:00 - 02:00"
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="w-1/3 bg-surface border border-gray-800 py-3 rounded-xl">Back</button>
            <button onClick={() => setStep(3)} className="w-2/3 bg-primary py-3 rounded-xl font-semibold">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <h2 className="text-xl font-medium mb-4">{t('add.location')}</h2>
          
          <button 
            type="button" onClick={getLoc}
            className="w-full flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 py-4 rounded-xl border border-blue-500/20"
          >
            <MapPin size={20} />
            Get My Current Location (GPS)
          </button>
          
          <div className="flex gap-4">
            <input 
              type="number" step="any" value={form.lat} onChange={e => setForm({...form, lat: parseFloat(e.target.value)})}
              className="w-1/2 bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" placeholder="Lat"
            />
            <input 
              type="number" step="any" value={form.lng} onChange={e => setForm({...form, lng: parseFloat(e.target.value)})}
              className="w-1/2 bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none" placeholder="Lng"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input 
              value={form.imageUrl} onChange={e => setForm({...form, imageUrl: e.target.value})}
              placeholder="https://..."
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:border-primary focus:outline-none"
            />
            {form.imageUrl && <img src={form.imageUrl} alt="preview" className="mt-4 h-32 w-full object-cover rounded-xl" />}
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={() => setStep(2)} className="w-1/3 bg-surface border border-gray-800 py-3 rounded-xl">Back</button>
            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-2/3 bg-primary py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {loading ? 'Submitting...' : t('add.submit')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
