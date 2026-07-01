import Link from "next/link";
import { Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-brand-cream border-t border-border/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Brand & Socials */}
        <div className="space-y-6">
          <Link href="/" className="font-extrabold text-2xl tracking-tight">
            Social<span className="text-brand-lime">ties</span>
          </Link>
          <p className="text-sm text-fg-muted dark:text-fg-muted max-w-xs">
            We pair data-driven strategy with authentic storytelling to take your brand from just online to absolutely unforgettable.
          </p>
          <div className="flex space-x-4">
            <a
              href="https://instagram.com/socialties"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-brand-ink-soft hover:bg-brand-lime hover:text-black rounded-lg transition-colors border border-border/10"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://linkedin.com/company/socialties"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-brand-ink-soft hover:bg-brand-lime hover:text-black rounded-lg transition-colors border border-border/10"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-lime mb-6">
            Quick Links
          </h4>
          <ul className="space-y-4 text-sm text-fg-muted">
            <li>
              <Link href="/" className="hover:text-brand-lime transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/campaigns" className="hover:text-brand-lime transition-colors">
                Campaigns
              </Link>
            </li>
            <li>
              <Link href="/team" className="hover:text-brand-lime transition-colors">
                Team
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-lime transition-colors">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-lime mb-6">
            Our Services
          </h4>
          <ul className="space-y-4 text-sm text-fg-muted">
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                Influencer Marketing
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                Digital Advertising
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                Content Creation
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                Product Photography
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                Website Development
              </Link>
            </li>
            <li>
              <Link href="/#services" className="hover:text-brand-lime transition-colors">
                App Development
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Info */}
        <div className="space-y-4 text-sm text-fg-muted">
          <h4 className="font-semibold text-sm uppercase tracking-wider text-brand-lime mb-2">
            Delhi Office
          </h4>
          <div className="flex items-start space-x-3">
            <MapPin size={18} className="text-brand-lime shrink-0 mt-0.5" />
            <p>Azadpur, New Delhi, India</p>
          </div>
          <div className="flex items-center space-x-3">
            <Phone size={18} className="text-brand-lime shrink-0" />
            <a href="tel:+919876543210" className="hover:text-brand-lime transition-colors">
              +91 98765 43210
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <Mail size={18} className="text-brand-lime shrink-0" />
            <a href="mailto:connect@socialties.in" className="hover:text-brand-lime transition-colors">
              connect@socialties.in
            </a>
          </div>
          <p className="text-xs text-fg-muted/60 pt-2">
            Pushpa Exim Private Limited
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 border-t border-border/10 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-fg-muted gap-4">
        <p>
          © {currentYear} Socialties. All Rights Reserved. Legal Entity: Pushpa Exim.
        </p>
        <div className="flex space-x-6">
          <Link href="/privacy-policy" className="hover:text-brand-lime transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-brand-lime transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
