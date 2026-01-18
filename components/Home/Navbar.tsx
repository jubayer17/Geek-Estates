"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, User, Menu, X } from "lucide-react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="absolute top-4 left-4 right-4 z-50">
      <div className="bg-white rounded-[40px] px-6 py-4 shadow-md">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold">
            Geekbilders
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition">Home</Link>
            <Link href="/about" className="hover:text-primary transition">About</Link>
            <Link href="/services" className="hover:text-primary transition">Services</Link>
            <Link href="/contact" className="hover:text-primary transition">Contact</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Phone size={18} />
            <p className="text-sm">+8801914782366</p>
            <User className="border rounded-lg p-1" size={28} />
            <Button className="rounded-3xl" variant="ghost">
              Add Property
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile / Tablet Menu */}
        {open && (
          <div className="lg:hidden mt-6 flex flex-col gap-5 text-sm font-medium">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/about" onClick={() => setOpen(false)}>About</Link>
            <Link href="/services" onClick={() => setOpen(false)}>Services</Link>
            <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>

            <div className="flex items-center gap-3 pt-4 border-t">
              <Phone size={18} />
              <p>+8801914782366</p>
            </div>

            <Button className="rounded-3xl w-full" variant="ghost">
              Add Property
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
