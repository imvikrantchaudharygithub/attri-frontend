// import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "../Components/header";
import Footer from "../Components/footer";

// export const metadata: Metadata = {
//   title: "Next.js App",
//   description: "Next.js 14 with React 19",
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
<>
        <Header />
        <main className="flex-1 container mx-auto p-4">{children}</main>
        <Footer />
        </>
  );
}