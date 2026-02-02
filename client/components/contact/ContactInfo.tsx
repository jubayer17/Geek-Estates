"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    subValue: "Mon-Fri 9am-6pm",
    href: "tel:+15551234567",
  },
  {
    icon: Mail,
    label: "Email",
    value: "hello@geekestate.com",
    subValue: "Online Support 24/7",
    href: "mailto:hello@geekestate.com",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "123 Luxury Lane, Beverly Hills",
    subValue: "CA 90210, United States",
    href: "https://maps.google.com",
  },
];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Linkedin, href: "#" },
];

export default function ContactInfo({ theme = "light", alignment = "left" }: { theme?: "light" | "dark", alignment?: "left" | "center" }) {
  const isDark = theme === "dark";
  const isCenter = alignment === "center";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-400" : "text-gray-500";
  const cardBg = isDark ? "bg-[#1A1A1A]" : "bg-gray-50";
  const cardHoverBg = isDark ? "hover:bg-[#222]" : "hover:bg-[#FFF8F6]";
  const iconBg = isDark ? "bg-[#222]" : "bg-white";
  const borderColor = isDark ? "border-white/5 hover:border-[#E7C873]/20" : "border-transparent hover:border-[#E7C873]/20";

  return (
    <div className={`space-y-8 ${isCenter ? 'text-center' : 'text-left'}`}>
      <div>
        <h3 className={`text-2xl font-serif ${textColor} mb-2`}>Contact Information</h3>
        <p className={subTextColor}>
          Reach out to us directly or visit our office for a cup of coffee.
        </p>
      </div>

      <div className={`grid gap-6 ${isCenter ? 'justify-center' : ''}`}>
        {contactDetails.map((item, index) => (
          <motion.a
            key={item.label}
            href={item.href}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`group flex ${isCenter ? 'flex-col items-center p-6' : 'flex-row items-start p-4'} gap-4 rounded-2xl ${cardBg} ${cardHoverBg} transition-colors border ${borderColor}`}
          >
            <div className={`p-3 ${iconBg} rounded-xl shadow-sm group-hover:shadow-md transition-shadow ${isDark ? 'text-white' : 'text-gray-900'} group-hover:text-[#C5A059]`}>
              <item.icon size={20} strokeWidth={1.5} />
            </div>
            <div>
              <p className={`font-medium ${textColor} group-hover:text-[#C5A059] transition-colors`}>
                {item.label}
              </p>
              <p className={`text-lg font-semibold ${textColor} mt-0.5`}>{item.value}</p>
              <p className={`text-sm ${subTextColor} mt-1`}>{item.subValue}</p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-100'} ${isCenter ? 'flex flex-col items-center' : ''}`}>
        <h4 className={`text-sm font-semibold uppercase tracking-widest ${subTextColor} mb-4`}>
          Follow Us
        </h4>
        <div className="flex gap-4">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ y: -3 }}
              className={`p-3 rounded-full ${isDark ? 'bg-[#1A1A1A] text-gray-400' : 'bg-gray-50 text-gray-600'} hover:bg-[#C5A059] hover:text-white transition-all duration-300`}
            >
              <social.icon size={20} strokeWidth={1.5} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
