import { AppleIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

export type SocialIconProps = {
  href: string;
  icon: "facebook" | "twitter" | "instagram" | "linkedin";
};

export function SocialIcon({ href, icon }: SocialIconProps) {
  const icons = {
    facebook: "f",
    twitter: "x",
    instagram: "in",
    linkedin: "in",
  };

  return (
    <Link
      href={href}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-900/60 text-emerald-300 transition hover:bg-emerald-800 hover:text-white"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icons[icon]}
    </Link>
  );
}

export type FooterLinksProps = {
  links: string[];
};

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="space-y-3 text-sm">
      {links.map((link) => (
        <li key={link}>
          <Link
            href="#"
            className="text-emerald-300 transition hover:text-emerald-100 hover:underline underline-offset-4"
          >
            {link}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export type AppStoreButtonProps = {
  type: "apple" | "google";
};

export function AppStoreButton({ type }: AppStoreButtonProps) {
  const content =
    type === "apple" ? (
      <>
        <span className="text-xs">Download on the</span>
        <span className="text-lg font-semibold leading-none">App Store</span>
      </>
    ) : (
      <>
        <span className="text-xs">GET IT ON</span>
        <span className="text-lg font-semibold leading-none">Google Play</span>
      </>
    );

  return (
    <button className="flex min-w-[140px] items-center justify-center gap-2.5 rounded-lg border border-emerald-700/70 bg-emerald-900/40 px-4 py-2.5 text-white transition hover:bg-emerald-800/60">
      {type === "apple" ? <AppleIcon/> : <PlayIcon/>}
      <div className="flex flex-col items-start leading-tight">{content}</div>
    </button>
  );
}