import { useState, useEffect } from 'react';
import { Noto_Sans } from 'next/font/google';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "@/Components/footer";
import Header from "@/Components/header";
import { RouteSkeleton } from "@/Components/RouteSkeletons";
import SeoHead from "@/Components/seo/SeoHead";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";

// All SEO <head> tags are rendered here in _app, OUTSIDE PersistGate. PersistGate
// renders null on the server (it only rehydrates after mount on the client), so
// anything inside it is NOT in the server-rendered HTML. Keeping SEO out here is
// what makes titles/meta/JSON-LD reach crawlers, social scrapers and AI bots.

// Private / utility routes kept out of the search index.
const NOINDEX_PREFIXES = [
  "/cart",
  "/myaccount",
  "/myaddress",
  "/order", // also covers /orderdetail
  "/withdraw",
  "/thankyou",
  "/signup",
  "/search",
  "/teams",
  "/offers",
];

type PageSeo = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "product" | "article";
  noindex?: boolean;
  jsonLd?: any[];
};

// SEO for static pages that have no data fetcher. Data-driven pages (home,
// category, product) supply `pageProps.seo` instead. Keyed by router.pathname.
const PAGE_SEO: Record<string, PageSeo> = {
  "/": { path: "/" },
  "/aboutus": {
    title: "About Attri Industries",
    description:
      "Learn about Attri Industries — our mission for 100% natural, Ayurvedic personal care and the direct-selling opportunity we offer across India.",
    path: "/aboutus",
  },
  "/vision": {
    title: "Our Vision",
    description:
      "Attri Industries' vision: bring pure, affordable Ayurvedic wellness to every Indian home while creating a real earning opportunity for distributors.",
    path: "/vision",
  },
  "/privacypolicy": {
    title: "Privacy Policy",
    description: "How Attri Industries collects, uses and protects your personal information.",
    path: "/privacypolicy",
  },
};
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

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pageSeo: PageSeo = (pageProps && pageProps.seo) || PAGE_SEO[router.pathname] || {};
  const routeNoindex = NOINDEX_PREFIXES.some((p) => router.pathname.startsWith(p));
  const noindex = routeNoindex || !!pageSeo.noindex;
  const seoPath = pageSeo.path || (router.asPath || "/").split("?")[0];
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
      <SeoHead
        title={pageSeo.title}
        description={pageSeo.description}
        path={seoPath}
        image={pageSeo.image}
        type={pageSeo.type || "website"}
        noindex={noindex}
        jsonLd={[
          organizationSchema(),
          websiteSchema(),
          ...(noindex ? [] : pageSeo.jsonLd || []),
        ]}
      />
      <PersistGate loading={null} persistor={persistor}>
        <div className={notoSans.className}>
        {/* <HomeVideoPopup /> */}
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
        </div>
      </PersistGate>
    </Provider>
  );
}
