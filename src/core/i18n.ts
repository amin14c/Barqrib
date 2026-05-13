import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ar' | 'fr' | 'en';

type Translations = Record<Language, Record<string, string>>;

const translations: Translations = {
  ar: {
    'app.name': 'BarQrib',
    'splash.loading': 'جاري التحميل...',
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'إنشاء حساب جديد',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.submit': 'دخول',
    'auth.noAccount': 'ليس لديك حساب؟',
    'auth.hasAccount': 'لديك حساب؟',
    'auth.error': 'حدث خطأ في المصادقة',
    'home.title': 'الأقرب إليك',
    'home.search': 'ابحث عن مكان...',
    'filter.all': 'الكل',
    'filter.bar': 'بار',
    'filter.cafe': 'كاف',
    'filter.lounge': 'لاونج',
    'filter.store': 'متجر',
    'filter.open': 'مفتوح الآن',
    'map.title': 'الخريطة',
    'map.myLocation': 'موقعي',
    'detail.reviews': 'التقييمات',
    'detail.addReview': 'أضف تقييماً',
    'detail.services': 'الخدمات',
    'detail.hours': 'أوقات العمل',
    'add.title': 'إضافة مكان جديد',
    'add.basic': 'معلومات أساسية',
    'add.services': 'الخدمات والأوقات',
    'add.location': 'الموقع والصورة',
    'add.name': 'اسم المكان',
    'add.type': 'النوع',
    'add.submit': 'إضافة',
    'profile.title': 'حسابي',
    'profile.stats': 'إحصائياتي',
    'profile.placesAdded': 'أماكن مضافة',
    'profile.language': 'اللغة',
    'profile.logout': 'تسجيل الخروج',
  },
  fr: {
    'app.name': 'BarQrib',
    'splash.loading': 'Chargement...',
    'auth.login': 'Connexion',
    'auth.register': 'Créer un compte',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.submit': 'Valider',
    'auth.noAccount': 'Pas de compte ?',
    'auth.hasAccount': 'Déjà un compte ?',
    'auth.error': 'Erreur d\'authentification',
    'home.title': 'Les plus proches',
    'home.search': 'Rechercher un lieu...',
    'filter.all': 'Tous',
    'filter.bar': 'Bar',
    'filter.cafe': 'Café',
    'filter.lounge': 'Lounge',
    'filter.store': 'Magasin',
    'filter.open': 'Ouvert',
    'map.title': 'Carte',
    'map.myLocation': 'Ma position',
    'detail.reviews': 'Avis',
    'detail.addReview': 'Ajouter un avis',
    'detail.services': 'Services',
    'detail.hours': 'Horaires',
    'add.title': 'Ajouter un lieu',
    'add.basic': 'Informations base',
    'add.services': 'Services & Horaires',
    'add.location': 'Localisation & Photo',
    'add.name': 'Nom du lieu',
    'add.type': 'Type',
    'add.submit': 'Ajouter',
    'profile.title': 'Mon Profil',
    'profile.stats': 'Mes Statistiques',
    'profile.placesAdded': 'Lieux ajoutés',
    'profile.language': 'Langue',
    'profile.logout': 'Se déconnecter',
  },
  en: {
    'app.name': 'BarQrib',
    'splash.loading': 'Loading...',
    'auth.login': 'Login',
    'auth.register': 'Create Account',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.submit': 'Submit',
    'auth.noAccount': 'No account?',
    'auth.hasAccount': 'Already have an account?',
    'auth.error': 'Authentication error',
    'home.title': 'Nearest to you',
    'home.search': 'Search for a place...',
    'filter.all': 'All',
    'filter.bar': 'Bar',
    'filter.cafe': 'Café',
    'filter.lounge': 'Lounge',
    'filter.store': 'Store',
    'filter.open': 'Open now',
    'map.title': 'Map',
    'map.myLocation': 'My Location',
    'detail.reviews': 'Reviews',
    'detail.addReview': 'Add Review',
    'detail.services': 'Services',
    'detail.hours': 'Hours',
    'add.title': 'Add Place',
    'add.basic': 'Basic Info',
    'add.services': 'Services & Hours',
    'add.location': 'Location & Photo',
    'add.name': 'Place Name',
    'add.type': 'Type',
    'add.submit': 'Submit',
    'profile.title': 'My Profile',
    'profile.stats': 'My Stats',
    'profile.placesAdded': 'Places added',
    'profile.language': 'Language',
    'profile.logout': 'Logout',
  }
};

export function useTranslation() {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    const saved = localStorage.getItem('barqrib_lang') as Language;
    if (saved && ['ar', 'fr', 'en'].includes(saved)) {
      setLang(saved);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('barqrib_lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string) => {
    return translations[lang][key] || key;
  };

  return { t, lang, changeLanguage };
}
