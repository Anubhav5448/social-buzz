import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import PageTransition from "@/components/PageTransition";
import FloatingContactButtons from "@/components/FloatingContactButtons";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <Nav />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      <FloatingContactButtons />
    </SmoothScroll>
  );
}