'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import Image from 'next/image';
import Link from 'next/link';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {Card, CardContent} from '@/components/ui/card';
import Autoplay from 'embla-carousel-autoplay';
import { Footer } from '@/components/footer';
import { RsvpFormValues, submitRsvp } from '@/ai/flows/rsvp-flow';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { rsvpFormSchema } from '@/lib/schemas';
import { useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Your wedding music URL
  const musicUrl = "https://stale-indigo-cxingwaiyv.edgeone.app/Vachindamma-Vachindamma.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
      
      // Add error handling
      const handleError = () => {
        console.log('Audio failed to load');
        setAudioError(true);
        setIsPlaying(false);
      };

      const handleCanPlay = () => {
        setAudioError(false);
      };

      audioRef.current.addEventListener('error', handleError);
      audioRef.current.addEventListener('canplay', handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('error', handleError);
          audioRef.current.removeEventListener('canplay', handleCanPlay);
        }
      };
    }
  }, [volume]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset error state before trying to play
        setAudioError(false);
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio playback failed:', error);
      setAudioError(true);
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Volume Slider */}
      <div 
        className={`transition-all duration-300 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-2 ${
          showVolumeSlider ? 'opacity-100 transform translate-x-0' : 'opacity-0 transform translate-x-4 pointer-events-none'
        }`}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #ffffff ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%)`
          }}
        />
      </div>

      {/* Music Control Button */}
      <button
        onClick={toggleMusic}
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
        className={`group w-14 h-14 bg-gradient-to-br from-primary/80 to-primary backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl animate-float ${
          audioError ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        disabled={audioError}
      >
        {audioError ? (
          // Error Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        ) : isPlaying ? (
          // Pause Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white animate-pulse"
          >
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          // Play Icon
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white ml-1"
          >
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
        
        {/* Ripple effect when playing */}
        {isPlaying && !audioError && (
          <>
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </>
        )}
      </button>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        crossOrigin="anonymous"
      >
        <source src="./audio/Vachindamma-Vachindamma.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

const initialBlessings = [
  {
    name: 'Aunt Priya',
    message: 'Wishing you a lifetime of love and happiness. Congratulations!',
  },
  {
    name: 'Rohan & Anjali',
    message:
      'May your journey together be as beautiful as your wedding day. So happy for you both!',
  },
  {
    name: 'The Sharma Family',
    message:
      'Congratulations on finding your perfect match! Wishing you all the best for the future.',
  },
  {
    name: 'Vikram',
    message: "So excited to celebrate with you! Cheers to the happy couple!",
  },
];

export default function RsvpPage() {
  const [blessings, setBlessings] = useState(initialBlessings);
  const { toast } = useToast();
  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      guests: '0',
      blessing: '',
    },
  });

  const watchAttending = form.watch('attending');

  async function onSubmit(data: RsvpFormValues) {
    try {
      await submitRsvp(data);
      if (data.blessing) {
        setBlessings(prev => [...prev, {name: data.name, message: data.blessing}]);
      }
      toast({
        title: 'RSVP Submitted!',
        description: 'Thank you for your response.',
      });
      form.reset();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'There was an error submitting your RSVP. Please try again.',
      });
    }
  }

  return (
    <>
      <Toaster />
      <header className="absolute top-0 left-0 w-full p-8 z-20">
        <div className="container mx-auto">
          <Link href="/" passHref>
             <span className="text-2xl font-serif text-primary cursor-pointer">EternalEchoes</span>
          </Link>
        </div>
      </header>
      <div className="bg-background text-foreground min-h-screen pt-32 p-8 md:p-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold tracking-widest">RSVP</p>
            <h1 className="text-4xl md:text-6xl font-serif mt-2">
              Join The Celebration
            </h1>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="w-full h-full relative aspect-[4/5]">
              <Image
                src="https://i.ibb.co/nsnb9rQy/180A0850.jpg"
                alt="Bride and Groom"
                fill
                className="object-cover rounded-lg"
                data-ai-hint="indian bride groom"
              />
            </div>

            <div className="flex flex-col gap-8">
              <h2 className="text-5xl md:text-6xl font-serif">
                We can&apos;t wait to see you!
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>NAME</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>EMAIL</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>PHONE</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Phone Number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attending"
                    render={({field}) => (
                      <FormItem className="space-y-3">
                        <FormLabel>WILL YOU BE ATTENDING?</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex space-x-4"
                          >
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="yes" />
                              </FormControl>
                              <FormLabel className="font-normal">Yes</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <RadioGroupItem value="no" />
                              </FormControl>
                              <FormLabel className="font-normal">No</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {watchAttending === 'yes' && (
                    <FormField
                      control={form.control}
                      name="guests"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>HOW MANY GUESTS?</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="blessing"
                      render={({field}) => (
                        <FormItem>
                          <FormLabel>
                            LEAVE A BLESSING FOR THE BRIDE AND GROOM
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Your blessings and wishes..."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" className="w-full" variant="default" disabled={form.formState.isSubmitting}>
                      {form.formState.isSubmitting ? 'SUBMITTING...' : 'SUBMIT RSVP'}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="mt-24">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif">
                Words of Love
              </h2>
              <p className="text-muted-foreground mt-2">
                From our beloved friends and family
              </p>
            </div>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {blessings.map((blessing, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1 h-full">
                      <Card className="h-full">
                        <CardContent className="flex h-full flex-col justify-between p-6">
                          <p className="text-lg italic">&quot;{blessing.message}&quot;</p>
                          <p className="text-right font-semibold mt-4 text-primary">
                            - {blessing.name}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
      <div>
      <Footer />
      </div>
      <MusicPlayer/>
    </>
  );
}
