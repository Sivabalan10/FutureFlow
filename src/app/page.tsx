import Header from '@/components/layout/header';
import Hero from '@/components/landing/hero';
import AboutSection from '@/components/landing/about-section';
import EventSection from '@/components/landing/event-section';
import TopicSuggesterSection from '@/components/landing/topic-suggester-section';
import Footer from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <EventSection />
        <TopicSuggesterSection />
      </main>
      <Footer />
    </div>
  );
}
