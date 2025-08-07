"use client";

import Link from "next/link";
import { Button } from "./ui/button";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-background text-foreground py-12">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h3 className="font-serif text-3xl">EternalEchoes</h3>
        <p className="text-muted-foreground mt-2">
          Celebrating Sarika & Arjun
        </p>
        <div className="flex space-x-6 mt-6">
          <Button variant="link" className="text-foreground" onClick={scrollToTop}>Home</Button>
          <Link href="/rsvp" passHref>
            <Button variant="link" className="text-foreground">RSVP</Button>
          </Link>
        </div>
        <div className="flex space-x-6 mt-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </a>
          <a href="mailto:info@eternalechoes.com">
            <MailIcon className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} EternalEchoes. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
