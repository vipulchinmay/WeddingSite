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
                src="https://i.ibb.co/9mXMkDbP/Whats-App-Image-2025-08-06-at-15-24-45-1.jpg"
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
      <Footer />
    </>
  );
}
