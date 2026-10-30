import { Link } from 'react-router-dom';
import BrandLogo from '../common/BrandLogo';
import SectionLink from '../common/SectionLink';
import SocialIcon from '../common/SocialIcon';

const socialLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icon: 'tiktok' },
  { label: 'YouTube', href: 'https://www.youtube.com/', icon: 'youtube' },
  { label: 'WhatsApp', href: 'https://www.whatsapp.com/', icon: 'whatsapp' }
];

export default function Footer() {
  return (
    <footer id="contact" className="relative overflow-hidden border-t-4 border-brand-500 bg-gradient-to-b from-brand-50/70 to-white px-5 py-14 text-ink sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-100/60 blur-3xl" />
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div id="about" className="relative">
          <BrandLogo />
          <p className="mt-5 max-w-xs text-sm leading-6 text-stone-500">Good food is better shared. We bring your feel-good favorites right to your door.</p>
        </div>
        <div className="relative">
          <h2 className="font-bold text-brand-700">Quick links</h2>
          <div className="mt-4 flex flex-col gap-3 text-sm font-semibold text-brand-700">
            <Link to="/" className="transition hover:text-brand-900">Home</Link>
            <SectionLink section="menu" className="transition hover:text-brand-900">Menu</SectionLink>
            <SectionLink section="about" className="transition hover:text-brand-900">About us</SectionLink>
            <Link to="/admin" className="transition hover:text-brand-900">Admin</Link>
          </div>
        </div>
        <div className="relative">
          <h2 className="font-bold text-brand-700">Say hello</h2>
          <div className="mt-4 space-y-3 text-sm text-stone-500">
            <a href="mailto:hello@foodtrial.example" className="block transition hover:text-brand-700">hello@foodtrial.example</a>
            <a href="tel:+923001234567" className="block transition hover:text-brand-700">+92 300 123 4567</a>
            <p>Every day, 11:00 AM – 11:00 PM</p>
          </div>
        </div>
        <div className="relative">
          <h2 className="font-bold text-brand-700">Follow the good stuff</h2>
          <p className="mt-2 text-sm text-stone-500">Fresh bites, happy moments. Find us online.</p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {socialLinks.map(({ label, href, icon }) => (
              <a key={label} href={href} aria-label={label} title={label} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-2xl border border-brand-100 bg-white text-brand-700 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-500 hover:bg-brand-500 hover:text-white hover:shadow-lg hover:shadow-brand-500/20">
                <SocialIcon name={icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-2 border-t border-brand-100 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} FoodTrial. Made with appetite.</span>
        <span className="font-semibold text-brand-700">Good food. Good mood. Always.</span>
      </div>
    </footer>
  );
}
