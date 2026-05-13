import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { Wine } from 'lucide-react';
import { useTranslation } from '../../core/i18n';
import { motion } from 'framer-motion';

export function SplashScreen() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocation('/login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLocation]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="w-24 h-24 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg mb-6">
          <Wine size={48} />
        </div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          {t('app.name')}
        </h1>
        <div className="mt-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </motion.div>
    </div>
  );
}
