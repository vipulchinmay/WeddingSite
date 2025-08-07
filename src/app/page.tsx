import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Image
        src="https://placehold.co/1920x1080.png"
        alt="Wedding background"
        fill
        className="object-cover"
        data-ai-hint="indian wedding"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex h-screen flex-col justify-center p-8 text-white md:p-16">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em]">
            Let&apos;s Celebrate,
          </p>
          <h1 className="mt-4 font-serif text-6xl md:text-8xl">
            Sarika &
            <br />
            Arjun&apos;s Love
          </h1>
          <Link href="/rsvp" passHref>
            <Button
              variant="link"
              className="mt-8 p-0 text-sm uppercase tracking-[0.2em] text-white"
            >
              <div className="flex flex-col items-start">
                <span>RSVP</span>
                <div className="mt-1 h-px w-full bg-white" />
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
