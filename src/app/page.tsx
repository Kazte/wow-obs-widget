import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import DetailsForm from '@/components/details-form';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Card className='rounded-sm max-w-[380px]'>
          <CardHeader>
            <CardTitle>
              WoW Progress Widget{' '}
              <span className='text-sm text-gray-500'></span>
            </CardTitle>
            <CardDescription>
              Enter your character details to generate a widget URL
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DetailsForm />
          </CardContent>
        </Card>
      </main>
      <footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
    </div>
  );
}
