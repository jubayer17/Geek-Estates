"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import ContactInfo from "./ContactInfo";
import { ArrowRight, Check } from "lucide-react";

export default function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 2000));
    setLoading(false);
    toast.success("Message sent successfully", {
      description: "We will get back to you shortly.",
      icon: <Check className="text-[#E7C873]" />,
      duration: 4000,
    });
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  const formFields = [
    { id: "name", label: "01 / NAME", placeholder: "What's your name?", type: "input" },
    { id: "email", label: "02 / EMAIL", placeholder: "your@email.com", type: "email" },
    { id: "subject", label: "03 / SUBJECT", placeholder: "Project inquiry", type: "input" },
    { id: "message", label: "04 / MESSAGE", placeholder: "Tell us about your project...", type: "textarea" },
  ];

  return (
    <div className="w-full bg-white">
      {/* MAIN HEADLINE SECTION */}
      <div className="w-full py-16 md:py-32 bg-white text-center px-4 relative overflow-hidden">
        {/* Decorative Background Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-gray-50 rounded-full blur-[120px] pointer-events-none opacity-60" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-8 md:w-16 bg-[#E7C873]" />
            <span className="text-[#E7C873] font-bold tracking-[0.3em] text-xs uppercase">Get in Touch</span>
            <div className="h-px w-8 md:w-16 bg-[#E7C873]" />
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-[#1A1A1A] leading-none tracking-tight">
            Contact Us
          </h1>
        </motion.div>
      </div>

      <section className="relative w-full flex flex-col lg:flex-row">

        {/* LEFT COLUMN: Contact Info (White Background) - 50% Width */}
        <div className="w-full lg:w-1/2 bg-white text-[#1A1A1A] px-6 md:px-16 lg:px-24 py-16 lg:py-32 flex flex-col justify-center relative overflow-hidden border-r border-gray-100">
          {/* Subtle Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]">
            <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-[#E7C873] rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-0.5 w-12 bg-[#E7C873]" />
                <span className="text-[#E7C873] font-bold tracking-[0.25em] text-xs uppercase">Get in Touch</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#1A1A1A] leading-[1.1] mb-8">
                Let&apos;s discuss <br />
                <span className="italic text-gray-400 font-light">your future.</span>
              </h2>

              <p className="text-gray-500 text-lg leading-relaxed max-w-md mb-16">
                Whether you&apos;re looking to buy, sell, or just want to explore the market, our team is ready to assist you with premium service.
              </p>

              <ContactInfo theme="light" />
            </motion.div>
          </div>

          {/* Bottom Copyright */}
          <div className="absolute bottom-8 left-8 md:left-16 lg:left-24 hidden lg:block">
            <p className="text-gray-300 text-xs tracking-widest uppercase">© 2025 Geek Estate</p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Form (Dark Background) - 50% Width */}
        <div className="w-full lg:w-1/2 bg-[#0F1115] text-white px-6 md:px-16 lg:px-24 py-16 lg:py-32 flex flex-col justify-center relative">
          {/* Background Texture */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(231,200,115,0.08),transparent_50%)]"></div>
          </div>

          <motion.div
            className="relative z-10 max-w-xl mx-auto lg:mx-0 w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {/* Form Heading */}
            <div className="mb-16">
              <span className="text-[#E7C873]/80 font-mono text-xs tracking-[0.2em] uppercase block mb-4">Inquiry Form</span>
              <h3 className="text-3xl md:text-4xl font-serif text-white">Send us a message</h3>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="group relative py-8 hover:bg-white/2 transition-colors duration-500"
                >
                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor={field.id}
                      className="text-[#E7C873] font-mono text-xs tracking-[0.2em] font-medium"
                    >
                      {field.label}
                    </label>

                    {field.type === 'textarea' ? (
                      <Textarea
                        id={field.id}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent border-none p-0 text-xl md:text-2xl font-light text-white placeholder-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 resize-none min-h-15"
                      />
                    ) : (
                      <Input
                        id={field.id}
                        type={field.type === 'email' ? 'email' : 'text'}
                        value={formState[field.id as keyof typeof formState]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-transparent border-none p-0 text-xl md:text-2xl font-light text-white placeholder-white/20 focus:ring-0 focus:outline-none focus-visible:ring-0 transition-all duration-300 h-auto"
                      />
                    )}
                  </div>

                  {/* Animated Bottom Border */}
                  <div className="absolute bottom-0 left-0 w-full h-px bg-white/10 group-hover:bg-white/20 transition-colors duration-300" />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-[#E7C873] group-hover:w-full transition-all duration-700 ease-out" />
                </motion.div>
              ))}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="pt-12"
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-6 px-10 py-7 overflow-hidden rounded-full bg-white/5 hover:bg-[#E7C873] transition-all duration-500 border border-white/10 hover:border-[#E7C873] w-full md:w-auto"
                >
                  <span className="relative z-10 text-xs uppercase tracking-[0.3em] text-white group-hover:text-[#1A1A1A] transition-colors duration-500 font-bold">
                    {loading ? "Initializing..." : "Initialize Request"}
                  </span>
                  <div className="relative z-10 w-8 h-8 rounded-full border border-white/20 group-hover:border-[#1A1A1A]/20 flex items-center justify-center transition-colors duration-500 ml-auto md:ml-0">
                    <ArrowRight className="w-4 h-4 text-white group-hover:text-[#1A1A1A] -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
