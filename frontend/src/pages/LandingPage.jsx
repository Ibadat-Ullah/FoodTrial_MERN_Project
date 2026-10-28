import Footer from '../components/landing/Footer';
import ChatbotLauncher from '../components/landing/ChatbotLauncher';
import Hero from '../components/landing/Hero';
import Highlights from '../components/landing/Highlights';
import Menu from '../components/landing/Menu';
import Navbar from '../components/landing/Navbar';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Menu />
      </main>
      <Footer />
      <ChatbotLauncher />
    </>
  );
}
