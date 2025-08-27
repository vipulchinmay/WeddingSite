'use client';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Footer } from '@/components/footer';
import { useState, useEffect } from 'react';

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

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const galleryImages = [
  {
    src: 'https://i.ibb.co/PzCjZPdD/180A0766.jpg',
    alt: 'Couple holding hands',
    hint: 'couple hands',
    quote: 'To love and to be loved is to feel the sun from both sides.',
  },
  {
    src: 'https://i.ibb.co/JRJzyv1v/180A0782.jpg',
    alt: 'Couple laughing',
    hint: 'couple laughing',
    quote: 'You are my today and all of my tomorrows.',
  },
  {
    src: 'https://i.ibb.co/x81hJRGz/180A0861.jpg',
    alt: 'Wedding rings',
    hint: 'wedding rings',
    quote:
      'A successful marriage requires falling in love many times, always with the same person.',
  },
  {
    src: 'https://i.ibb.co/zW0ztdcN/180A0866.jpg',
    alt: 'Couple under a tree',
    hint: 'couple tree',
    quote:
      'Once in a while, right in the middle of an ordinary life, love gives us a fairy tale.',
  },
  {
    src: 'https://i.ibb.co/Z6xbJPZ1/180A0870.jpg',
    alt: 'Couple on a beach',
    hint: 'couple beach',
    quote: 'The best thing to hold onto in life is each other.',
  },
];

const Countdown = () => {
  const weddingDate = '2025-11-23T16:00:00';
  
  const calculateTimeLeft = () => {
    const difference = +new Date(weddingDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isClient) {
    return null;
  }

  const timerComponents: JSX.Element[] = [];
  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval as keyof typeof timeLeft] && timeLeft[interval as keyof typeof timeLeft] !== 0) {
      return;
    }
    timerComponents.push(
      <div 
        key={interval} 
        className="text-center p-2 sm:p-3 md:p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 flex-1 min-w-0 animate-fade-in-up transform transition-all duration-700 hover:scale-105 hover:bg-white/20"
        style={{ animationDelay: `${Object.keys(timeLeft).indexOf(interval) * 0.2}s` }}
      >
        <p className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight transition-all duration-300">
          {(timeLeft[interval as keyof typeof timeLeft] || 0).toString().padStart(2, '0')}
        </p>
        <p className="text-xs sm:text-sm md:text-base uppercase tracking-wide sm:tracking-widest mt-1 transition-all duration-300">
          {interval}
        </p>
      </div>
    );
  });

  return (
    <div className="mt-6 sm:mt-8 md:mt-12 w-full max-w-4xl mx-auto px-4 animate-fade-in-up" style={{ animationDelay: '2s' }}>
      <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8">
        {timerComponents.length ? timerComponents : (
          <div className="text-center p-4 sm:p-6 md:p-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 animate-pulse">
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">Time's up!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes typewriter {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scale-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .hover-lift:hover {
          transform: translateY(-10px) scale(1.02);
        }

        .parallax-element {
          will-change: transform;
        }

        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
        .stagger-7 { animation-delay: 0.7s; }
        .stagger-8 { animation-delay: 0.8s; }
      `}</style>

      <header className={`absolute top-0 left-0 w-full p-8 z-20 ${loaded ? 'animate-fade-in-down' : 'opacity-0'}`}>
        <div className="container mx-auto">
          <Link href="/" passHref>
             <span className="text-2xl font-serif text-white cursor-pointer hover:text-primary transition-colors duration-300 animate-shimmer">EternalEchoes</span>
          </Link>
        </div>
      </header>

      <main className="relative min-h-screen overflow-hidden">
        <div className={`absolute inset-0 transition-all duration-2000 ease-out ${loaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}>
          <Image
            src="https://i.ibb.co/x81hJRGz/180A0861.jpg"
            alt="Wedding background"
            fill
            className="object-cover parallax-element"
            data-ai-hint="indian wedding"
          />
        </div>
        <div className={`absolute inset-0 bg-black/40 transition-opacity duration-1500 ${loaded ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="relative z-10 flex h-screen flex-col justify-center p-8 text-white md:p-16">
          <div className="max-w-2xl">
            <p className={`text-sm uppercase tracking-[0.2em] animate-fade-in-up stagger-1`}>
              Let&apos;s Celebrate,
            </p>
            <h1 className="mt-4 font-serif text-6xl md:text-8xl overflow-hidden">
              <span className={`inline-block animate-fade-in-up stagger-2 hover-lift`}>Tejaswini</span>
              <span className={`inline-block animate-fade-in-up stagger-3 ml-4`}>&</span>
              <br />
              <span className={`inline-block animate-fade-in-up stagger-4 hover-lift`}>Hrishi&apos;s Love</span>
            </h1>
            <Link href="/rsvp" passHref>
              <Button
                variant="link"
                className={`mt-8 p-0 text-sm uppercase tracking-[0.2em] text-white animate-fade-in-up stagger-5 hover:scale-110 transition-all duration-300`}
              >
                <div className="flex flex-col items-start">
                  <span>RSVP</span>
                  <div className="mt-1 h-px w-full bg-white transition-all duration-300 hover:bg-primary" />
                </div>
              </Button>
            </Link>
            <Countdown />
          </div>
        </div>
      </main>

      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="md:pr-12 animate-fade-in-left">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold">
                We Love
              </p>
              <h2 className="font-serif text-5xl md:text-7xl mt-4">
                Your Presence
              </h2>
            </div>
            <div className="space-y-8">
              <div className="border-t border-border pt-8 animate-fade-in-right stagger-1 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="animate-float">
                    <GratitudeIcon />
                  </div>
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
              <div className="border-t border-border pt-8 animate-fade-in-right stagger-2 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="animate-float" style={{ animationDelay: '0.5s' }}>
                    <GratitudeIcon />
                    <GratitudeIcon />
                  </div>
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
              <div className="border-t border-border pt-8 animate-fade-in-right stagger-3 hover-lift">
                <div className="flex items-start gap-4">
                  <div className="animate-float" style={{ animationDelay: '1s' }}>
                    <GratitudeIcon />
                    <GratitudeIcon />
                    <GratitudeIcon />
                  </div>
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
        </div>
      </section>

      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden animate-scale-in stagger-1 hover-lift">
               <Image
                  src="https://i.ibb.co/DPTHwpZ3/180A0858.jpg"
                  alt="Wedding details"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  data-ai-hint="wedding decoration"
                />
            </div>
            <div className="flex flex-col gap-8">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold animate-fade-in-up stagger-2">
                Details of the Day
              </p>
              <h2 className="font-serif text-5xl md:text-7xl animate-fade-in-up stagger-3">
                Wedding Details
              </h2>
              <div className="space-y-8">
                <div className="border-b border-border pb-6 animate-fade-in-up stagger-4 hover-lift">
                  <h3 className="text-2xl font-serif mb-2">The Date & Time</h3>
                  <p className="text-muted-foreground">
                    Sunday, 23rd November 2025, 10:00 AM Onwards
                  </p>
                </div>
                <div className="border-b border-border pb-6 animate-fade-in-up stagger-5 hover-lift">
                  <h3 className="text-2xl font-serif mb-2">The Dress Code</h3>
                  <p className="text-muted-foreground">
                    Traditional Indian Attire or Formal Western Wear
                  </p>
                </div>
                <div className="animate-fade-in-up stagger-6 hover-lift">
                  <h3 className="text-2xl font-serif mb-2">The Location</h3>
                  <p className="text-muted-foreground">
                    The Ravi Mahal Conventions, Suryapet, Telangana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Bride's Message */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative h-[500px] md:h-[600px] animate-fade-in-left stagger-1">
              <div className="absolute top-0 left-0 w-3/4 h-full bg-secondary/30 rounded-t-full rounded-b-full transform -translate-x-1/4 transition-transform duration-1000 hover:scale-105"></div>
              <div className="absolute bottom-0 left-1/4 w-3/4 h-3/4 overflow-hidden rounded-t-full rounded-b-full hover-lift">
                <Image
                  src="https://i.ibb.co/pvrsNcww/180A9898.jpg"
                  alt="Tejaswini"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  data-ai-hint="indian bride"
                />
              </div>
            </div>
            <div className="flex flex-col gap-6 animate-fade-in-right stagger-2">
              <HeartIcon className="w-12 h-12 text-primary animate-float" />
              <h3 className="font-serif text-4xl md:text-5xl">A word from Tejaswini</h3>
              <p className="text-muted-foreground text-lg hover-lift">
                "Finding Hrishi has been like discovering a song I didn't know my soul was singing. With every passing day, my love for him grows deeper, and I cannot wait to start our forever symphony. He is my anchor, my confidant, and my greatest adventure."
              </p>
            </div>
          </div>

          {/* Groom's Message */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-6 md:order-1 animate-fade-in-left stagger-3">
              <HeartIcon className="w-12 h-12 text-primary animate-float" style={{ animationDelay: '1s' }} />
              <h3 className="font-serif text-4xl md:text-5xl">A word from Hrishi</h3>
              <p className="text-muted-foreground text-lg hover-lift">
                "Tejaswini is the calm to my storm and the laughter that fills my days. She is more than I ever dreamed of, and I am endlessly grateful for her love. I promise to cherish her, to support her, and to love her unconditionally for all of my days."
              </p>
            </div>
            <div className="relative h-[500px] md:h-[600px] md:order-2 animate-fade-in-right stagger-4">
               <div className="absolute top-0 right-0 w-3/4 h-full bg-secondary/30 rounded-t-full rounded-b-full transform translate-x-1/4 transition-transform duration-1000 hover:scale-105"></div>
              <div className="absolute bottom-0 right-1/4 w-3/4 h-3/4 overflow-hidden rounded-t-full rounded-b-full hover-lift">
                <Image
                  src="https://i.ibb.co/qYJfzjSZ/180A9920.jpg"
                  alt="Hrishi"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  data-ai-hint="indian groom"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold animate-fade-in-up stagger-1">
            Gallery
          </p>
          <h2 className="font-serif text-5xl md:text-7xl mt-4 animate-fade-in-up stagger-2">
            Sweet Memories
          </h2>
          <div className="mt-16 animate-fade-in-up stagger-3">
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2">
                      <div className="relative aspect-square overflow-hidden rounded-lg hover-lift">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-700 hover:scale-110"
                          data-ai-hint={image.hint}
                        />
                      </div>
                      <p className="mt-4 font-serif text-lg italic text-muted-foreground transition-all duration-300 hover:text-primary">
                        &quot;{image.quote}&quot;
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </section>
      
      <section className="bg-secondary/30 text-foreground py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-primary font-semibold animate-fade-in-up stagger-1">
            Venue
          </p>
          <h2 className="font-serif text-5xl md:text-7xl mt-4 animate-fade-in-up stagger-2">
            Ravi Mahal Conventions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto animate-fade-in-up stagger-3">
            Join us at the stunning Grand Palace in Suryapet, a venue that mirrors the grandeur of our celebration.
          </p>
          <div className="mt-12 aspect-video w-full rounded-lg overflow-hidden border animate-scale-in stagger-4 hover-lift">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3812.682473057627!2d79.613981!3d17.1369812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a34db5c24037ef3%3A0xf2aa81ef62d755ef!2sRavi%20Mahal%20Conventions!5e0!3m2!1sen!2sin!4v1754634110803!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
           <a
            href="https://www.google.com/maps/dir/?api=1&destination=Ravi+Mahal+Conventions,Suryapet,Telangana"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-8 animate-fade-in-up stagger-5 hover:scale-105 transition-transform duration-300">
              Get Directions
            </Button>
          </a>
        </div>
      </section>
      
      <div className="animate-fade-in-up stagger-8">
        <Footer />
      </div>
    </>
  );
}