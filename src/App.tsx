import { Route, Switch, useLocation } from 'wouter';
import { AuthProvider } from './data/auth';
import { NavigationLayout } from './presentation/components/NavigationLayout';
import { SplashScreen } from './presentation/components/SplashScreen';
import { LoginScreen } from './presentation/components/LoginScreen';
import { RegisterScreen } from './presentation/components/RegisterScreen';
import { HomeScreen } from './presentation/components/HomeScreen';
import { MapScreen } from './presentation/components/MapScreen';
import { AddBarScreen } from './presentation/components/AddBarScreen';
import { ProfileScreen } from './presentation/components/ProfileScreen';
import { DetailScreen } from './presentation/components/DetailScreen';
import { PrivacyPolicyScreen } from './presentation/components/PrivacyPolicyScreen';
import { TermsOfServiceScreen } from './presentation/components/TermsOfServiceScreen';
import { useAuth } from './data/auth';
import { useEffect } from 'react';

function ProtectedRoute({ component: Component, path }: { component: any, path: string }) {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      setLocation('/login');
    }
  }, [user, loading, setLocation]);

  if (loading || !user) return <div className="h-screen bg-background" />;

  return <Component />;
}

function Routes() {
  return (
    <NavigationLayout>
      <Switch>
        <Route path="/" component={SplashScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/privacy" component={PrivacyPolicyScreen} />
        <Route path="/terms" component={TermsOfServiceScreen} />
        <Route path="/home">
           <ProtectedRoute component={HomeScreen} path="/home" />
        </Route>
        <Route path="/map">
           <ProtectedRoute component={MapScreen} path="/map" />
        </Route>
        <Route path="/add">
           <ProtectedRoute component={AddBarScreen} path="/add" />
        </Route>
        <Route path="/profile">
           <ProtectedRoute component={ProfileScreen} path="/profile" />
        </Route>
        <Route path="/place/:id">
          {(params) => <DetailScreen id={params.id} />}
        </Route>
      </Switch>
    </NavigationLayout>
  );
}

export default function App() {
  // Initialize dir attribute for RTL support before renders
  useEffect(() => {
    const saved = localStorage.getItem('barqrib_lang') || 'ar';
    document.documentElement.dir = saved === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = saved;
  }, []);

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
