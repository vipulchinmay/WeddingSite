'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

const GratitudeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary"
  >
    <path d="M12 5.34L12 5.33" />
    <path d="M16.33 6.4L16.34 6.39" />
    <path d="M18.8 9.22L18.79 9.23" />
    <path d="M19.92 12.66L19.93 12.65" />
    <path d="M19.42 16.03L19.42 16.02" />
    <path d="M17.43 18.73L17.44 18.72" />
    <path d="M14.28 20.47L14.29 20.46" />
    <path d="M9.72 20.47L9.71 20.46" />
    <path d="M6.57 18.73L6.56 18.72" />
    <path d="M4.58 16.03L4.58 16.02" />
    <path d="M4.07 12.66L4.07 12.65" />
    <path d="M5.21 9.22L5.2 9.23" />
    <path d="M7.67 6.4L7.66 6.39" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export default function Home() {
  return (
    <>
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
      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="md:pr-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                We Love
              </p>
              <h2 className="font-serif text-5xl md:text-7xl mt-4">
                Your Presence
              </h2>
            </div>
            <div className="border-t border-border pt-8">
              <div className="flex items-start gap-4">
                <GratitudeIcon />
                <div>
                  <h3 className="text-2xl font-serif">
                    A Celebration of Families
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    Your presence at our wedding is the greatest gift. We are
                    so excited to celebrate this special day with our dearest
                    family and friends.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <div className="flex items-start gap-4">
                <GratitudeIcon />
                <GratitudeIcon />
                <div>
                  <h3 className="text-2xl font-serif">A Token of Gratitude</h3>
                  <p className="text-muted-foreground mt-2">
                    We are filled with gratitude for the love and support we have
                    received. Thank you for being a part of our journey and for
                    showering us with your blessings.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-8">
              <div className="flex items-start gap-4">
                <GratitudeIcon />
                <GratitudeIcon />
                <GratitudeIcon />
                <div>
                  <h3 className="text-2xl font-serif">
                    Your Blessings Matter
                  </h3>
                  <p className="text-muted-foreground mt-2">
                    As we embark on this new chapter, we kindly request your
                    blessings. Your good wishes are the most cherished treasure
                    we can receive.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
               <Image
                  src="https://placehold.co/600x750.png"
                  alt="Wedding details"
                  fill
                  className="object-cover"
                  data-ai-hint="wedding decoration"
                />
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                Details of the Day
              </p>
              <h2 className="font-serif text-5xl md:text-7xl">
                Wedding Details
              </h2>
              <div className="space-y-8">
                <div className="border-b border-border pb-6">
                  <h3 className="text-2xl font-serif mb-2">The Date & Time</h3>
                  <p className="text-muted-foreground">
                    Saturday, 24th August 2024, 4:00 PM Onwards
                  </p>
                </div>
                <div className="border-b border-border pb-6">
                  <h3 className="text-2xl font-serif mb-2">The Dress Code</h3>
                  <p className="text-muted-foreground">
                    Traditional Indian Attire or Formal Western Wear
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-serif mb-2">The Location</h3>
                  <p className="text-muted-foreground">
                    The Grand Palace, Udaipur, Rajasthan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
              Gallery
            </p>
            <h2 className="font-serif text-5xl md:text-7xl mt-4">
              Sweet Memories
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 group">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src="https://placehold.co/800x600.png"
                  alt="Couple holding hands"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint="couple hands"
                />
                <div className="absolute bottom-4 left-4 bg-background/80 text-foreground text-xs uppercase px-2 py-1 rounded">
                  Latest News
                </div>
              </div>
              <h3 className="text-2xl font-serif flex justify-between items-center">
                <span>To love and to be loved is to feel the sun from both sides.</span>
                <ArrowRightIcon className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
              </h3>
              <div className="h-px bg-border"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3 group">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/500x500.png"
                    alt="Couple laughing"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="couple laughing"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs uppercase px-2 py-1 rounded">
                    Wedding
                  </div>
                </div>
                <h3 className="text-xl font-serif flex justify-between items-center">
                  <span>You are my today and all of my tomorrows.</span>
                  <ArrowRightIcon className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <div className="h-px bg-border"></div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/500x500.png"
                    alt="Wedding rings"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="wedding rings"
                  />
                   <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs uppercase px-2 py-1 rounded">
                    Wedding
                  </div>
                </div>
                <h3 className="text-xl font-serif flex justify-between items-center">
                  <span>A successful marriage requires falling in love many times, always with the same person.</span>
                  <ArrowRightIcon className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <div className="h-px bg-border"></div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/500x500.png"
                    alt="Couple under a tree"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="couple tree"
                  />
                   <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs uppercase px-2 py-1 rounded">
                    Blessings
                  </div>
                </div>
                <h3 className="text-xl font-serif flex justify-between items-center">
                  <span>Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.</span>
                  <ArrowRightIcon className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <div className="h-px bg-border"></div>
              </div>
              <div className="flex flex-col gap-3 group">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src="https://placehold.co/500x500.png"
                    alt="Couple on a beach"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="couple beach"
                  />
                   <div className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs uppercase px-2 py-1 rounded">
                    Memories
                  </div>
                </div>
                <h3 className="text-xl font-serif flex justify-between items-center">
                  <span>The best thing to hold onto in life is each other.</span>
                  <ArrowRightIcon className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                </h3>
                <div className="h-px bg-border"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
