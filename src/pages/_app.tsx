import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "@/Components/footer";
import Header from "@/Components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../store/store';
import toast, { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ToastContainer position="top-right" autoClose={3000} />
        <Header/>

        <Component {...pageProps} />
        <Footer/>
      </PersistGate>
    </Provider>
  );
}
