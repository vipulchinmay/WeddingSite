'use client';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {Textarea} from '@/components/ui/textarea';
import {cn} from '@/lib/utils';
import {format} from 'date-fns';
import {Calendar as CalendarIcon} from 'lucide-react';
import Image from 'next/image';
import React from 'react';

export default function RsvpPage() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className="bg-background text-foreground min-h-screen p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary font-semibold tracking-widest">CONTACT</p>
          <h1 className="text-4xl md:text-6xl font-serif mt-2">
            Do you need a unique flower design?
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="w-full h-full relative aspect-[4/5]">
            <Image
              src="https://placehold.co/600x750.png"
              alt="Woman with flowers"
              fill
              className="object-cover"
              data-ai-hint="woman flowers"
            />
          </div>

          <div className="flex flex-col gap-8">
            <h2
              className="text-5xl md:text-6xl"
              style={{fontFamily: "'Playfair Display', serif"}}
            >
              Get in touch now!
            </h2>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  NAME
                </label>
                <Input id="name" placeholder="Jane Smith" />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  EMAIL
                </label>
                <Input id="email" type="email" placeholder="jane@framer.com" />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  PHONE
                </label>
                <Input id="phone" placeholder="+49" />
              </div>
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  SERVICE
                </label>
                <Select>
                  <SelectTrigger id="service">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="funeral">Funeral</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  DATE OF THE EVENT
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-full justify-start text-left font-normal',
                        !date && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ESTIMATED BUDGET
                </label>
                <Input id="budget" placeholder="Starting at 250€" />
              </div>
              <div>
                <label
                  htmlFor="occasion"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  EVENT OCCASION (WEDDING, FUNERAL ETC.)
                </label>
                <Input id="occasion" placeholder="Wedding" />
              </div>
              <div>
                <label
                  htmlFor="referral"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  HOW DID YOU HEAR ABOUT ME?
                </label>
                <Input id="referral" placeholder="Instagram" />
              </div>
              <div className="md:col-span-2">
                <label
                  htmlFor="details"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  ANY OTHER DETAILS YOU'D LIKE TO SHARE?
                </label>
                <Textarea id="details" placeholder="Type" />
              </div>
              <div className="md:col-span-2">
                <Button type="submit" className="w-full" variant="default">
                  SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
