import { useState } from 'react';
import { useLocation } from 'wouter';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { useTranslation } from '../../core/i18n';
import { motion } from 'framer-motion';

export function RegisterScreen() {
  const [, setLocation] = useLocation();
  const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      setLocation('/home');
    } catch (err: any) {
      if (err.code === 'auth/operation-not-allowed') {
        setError('Email/Password authentication is not enabled. Please enable it in the Firebase Console -> Authentication -> Sign-in methods.');
      } else {
        setError(err.message || t('auth.error'));
      }
    }
  };

  return (
    <div 
      className="flex flex-col min-h-screen p-6 justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")' }}
    >
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm"></div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md mx-auto relative z-10 bg-surface/80 p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-3xl font-bold text-center mb-8">{t('auth.register')}</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && <div className="text-red-500 bg-red-500/10 p-3 rounded-xl text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
            <input 
              {...register('email')} 
              type="email" 
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
            <input 
              {...register('password')} 
              type="password" 
              className="w-full bg-surface border border-gray-800 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
              required 
            />
          </div>

          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl py-3 font-semibold transition-colors">
            {t('auth.submit')}
          </button>

          <p className="text-center text-sm text-gray-400 mt-6">
            {t('auth.hasAccount')} <button type="button" onClick={() => setLocation('/login')} className="text-primary hover:underline">{t('auth.login')}</button>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
