import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import { AppStoreButton, FooterLinks, SocialIcon } from "../reuseable/FooterHelper";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-100 mt-5 lg:mt-10">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Top section - Logo + Social icons */}
        <div className="flex flex-col items-center justify-between border-b border-emerald-800/50 py-12 md:flex-row md:items-start">
          <div className="mb-8 md:mb-0">
            <Link href="/" className="flex items-center justify-center gap-2.5">
            {/*
            *
             To Do Add Logo
             *
              */}
              {/* <span className="text-3xl font-bold tracking-tight text-white">JH</span> */}
              <span className="text-2xl font-semibold text-emerald-400">GeekBuilders</span>
            </Link>
          </div>

          <div className="flex gap-1 justify-center items-center">
            <div className="text-sm flex flex-col mt-0">
                <p className="text-sm">F</p>
                <p className="text-sm">O</p>
                <p className="text-sm">L</p>
                <p className="text-sm">L</p>
                <p className="text-sm">O</p>
                <p className="text-sm">W</p>
                <p className="text-sm">U</p>
                <p className="text-sm">S</p>
            </div>
            <div className="flex gap-5 justify-center">
            <SocialIcon href="#" icon="facebook" />
            <SocialIcon href="#" icon="twitter" />
            <SocialIcon href="#" icon="instagram" />
            <SocialIcon href="#" icon="linkedin" />
          </div>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-7">
          {/* Newsletter - bigger column */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-md font-light text-gray-400">Subscribe</h3>
            <p className="mb-5 text-sm text-emerald-300">
              Subscribe to our newsletter to receive our weekly feed.
            </p>

            <div className="relative">
              <input
                type="email"
                placeholder="Your email"
                className="w-full rounded-lg bg-emerald-900/60 px-4 py-3 pr-28 text-sm text-white placeholder:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-500">
                Send →
              </button>
            </div>
          </div>

          {/* Discover */}
          <div>
            <h3 className="mb-5 text-md font-light text-gray-400">Discover</h3>
            <FooterLinks
              links={["Miami", "New York", "Chicago", "Florida", "Los Angeles", "San Diego"]}
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-md font-light text-gray-400">Quick Links</h3>
            <FooterLinks
              links={[
                "About",
                "Contact",
                "FAQ's",
                "Blog",
                "Pricing Plans",
                "Privacy Policy",
                "Terms & Conditions",
              ]}
            />
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-5 text-md font-light text-gray-400">Contact Us</h3>
            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-emerald-400" />
                <span>hr@geekssort.com</span>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-emerald-400" />
                <span>+8801914782366</span>
              </div>
            </div>
          </div>

          {/* Address + App buttons */}
         <div className="sm:col-span-1 lg:col-span-1">
  <h3 className="mb-5 text-md font-light text-gray-400">
    Our Address
  </h3>

  <div className="space-y-6">
    <div className="flex items-start gap-3">
      <MapPin className="mt-0.5 h-5 w-5 text-emerald-400" />
      <div className="text-sm text-white/70">
        <p>99 Fifth Avenue, 3rd Floor</p>
        <p>San Francisco, CA 1980</p>
      </div>
    </div>

    
  </div>
</div>

<div className="flex flex-col gap-3">
    <h3 className="mb-4 text-md font-light text-gray-400">Get Our App</h3>
      <AppStoreButton type="apple" />
      <AppStoreButton type="google" />
    </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-emerald-800/50 bg-emerald-950/70 py-6 text-center text-sm text-emerald-400">
        Copyright © {new Date().getFullYear()} GeekBuilder
      </div>
    </footer>
  );
}

