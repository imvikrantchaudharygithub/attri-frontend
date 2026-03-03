import { useState, useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "@/Components/footer";
import Header from "@/Components/header";
import { RouteSkeleton } from "@/Components/RouteSkeletons";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import '../styles/about.css';
import '../styles/account.css';
import '../styles/cart.css';
import '../styles/faq.css';
import '../styles/header.css';
import '../styles/newproduct.css';
import '../styles/plp.css';
import '../styles/popup.css';
import '../styles/product.css';
import '../styles/review.css';
import '../styles/thankyou.css';
import "../styles/teams.css";
import '../styles/orderdetails.css';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [routeSkeleton, setRouteSkeleton] = useState<'home' | 'category' | null>(null);

  useEffect(() => {
    const handleStart = (url: string) => {
      const path = url.split('?')[0];
      if (path === '/') setRouteSkeleton('home');
      else if (path.startsWith('/category')) setRouteSkeleton('category');
    };
    const handleComplete = () => setRouteSkeleton(null);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              border: '1px solid #E5E7EB',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#10B981', secondary: '#FFFFFF' } },
            error: { iconTheme: { primary: '#EF4444', secondary: '#FFFFFF' } },
          }}
        />
        <Header />
        <main className="has-bottom-nav min-h-screen bg-[#FAF9FF]">
          <AnimatePresence mode="wait" initial={false}>
            {routeSkeleton ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <RouteSkeleton type={routeSkeleton} />
              </motion.div>
            ) : (
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <Component {...pageProps} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
        <Footer />
      </PersistGate>
    </Provider>
  );
}
