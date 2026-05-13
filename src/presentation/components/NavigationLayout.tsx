import { ReactNode } from 'react';
import { useLocation } from 'wouter';
import { Home, Map as MapIcon, PlusSquare, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../data/auth';

export function NavigationLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  const tabs = [
    { id: 'home', path: '/home', icon: Home, label: 'Home' },
    { id: 'map', path: '/map', icon: MapIcon, label: 'Map' },
    { id: 'add', path: '/add', icon: PlusSquare, label: 'Add' },
    { id: 'profile', path: '/profile', icon: UserIcon, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <main className="flex-1 w-full max-w-lg mx-auto">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-surface/90 backdrop-blur-md border-t border-gray-800 z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = location.startsWith(tab.path);
            return (
              <button
                key={tab.id}
                onClick={() => setLocation(tab.path)}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                  isActive ? 'text-primary' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] sm:hidden">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
