import { useEffect, useState } from 'react';
import { useAuth } from '../../data/auth';
import { useTranslation, Language } from '../../core/i18n';
import { useLocation } from 'wouter';
import { getMyPlacesCount } from '../../data/db';
import { LogOut, Globe, User, MapPin, FileText } from 'lucide-react';

export function ProfileScreen() {
  const { user, profile, logout } = useAuth();
  const { t, lang, changeLanguage } = useTranslation();
  const [, setLocation] = useLocation();
  const [placesCount, setPlacesCount] = useState(0);

  useEffect(() => {
    if (user) {
      getMyPlacesCount(user.uid)
        .then(setPlacesCount)
        .catch(err => setPlacesCount(0));
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-4 pt-8 h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-8">{t('profile.title')}</h1>

      <div className="bg-surface border border-gray-800 rounded-2xl p-6 flex flex-col items-center mb-8 relative overflow-hidden">
        <div className="absolute top-0 w-full h-16 bg-gradient-to-b from-primary/20 to-transparent"></div>
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4 relative z-10 border-4 border-background">
          <User size={32} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold">{profile?.displayName || user.email?.split('@')[0]}</h2>
        <p className="text-sm text-gray-500 mb-6">{user.email}</p>

        <div className="w-full flex justify-between gap-4 border-t border-gray-800 pt-6">
          <div className="flex-1 flex flex-col items-center">
            <span className="text-2xl font-bold text-primary mb-1">{placesCount}</span>
            <span className="text-xs text-gray-400 text-center">{t('profile.placesAdded')}</span>
          </div>
          {/* We can add more stats here */}
           <div className="flex-1 flex flex-col items-center">
            <span className="text-2xl font-bold text-yellow-400 mb-1">0</span>
            <span className="text-xs text-gray-400 text-center">{t('detail.reviews')}</span>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-gray-800 rounded-2xl overflow-hidden mb-6">
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Globe className="text-primary" />
            <span className="font-medium">{t('profile.language')}</span>
          </div>
          <select 
            value={lang} 
            onChange={e => changeLanguage(e.target.value as Language)}
            className="bg-background border border-gray-800 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="ar">العربية</option>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <button 
          onClick={() => setLocation('/terms')}
          className="w-full p-4 flex items-center gap-3 text-text hover:bg-background/50 transition-colors text-left border-b border-gray-800"
        >
          <FileText className="text-primary" />
          <span className="font-medium">شروط الاستخدام</span>
        </button>

        <button 
          onClick={() => setLocation('/privacy')}
          className="w-full p-4 flex items-center gap-3 text-text hover:bg-background/50 transition-colors text-left border-b border-gray-800"
        >
          <FileText className="text-primary" />
          <span className="font-medium">سياسة الخصوصية</span>
        </button>
        
        <button 
          onClick={logout}
          className="w-full p-4 flex items-center gap-3 text-red-400 hover:bg-background/50 transition-colors text-left"
        >
          <LogOut />
          <span className="font-medium">{t('profile.logout')}</span>
        </button>
      </div>

    </div>
  );
}
