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
    <section className='flex flex-col items-center justify-center flex-grow h-full p-4 space-y-4'>
      <Card className='rounded-sm max-w-[380px] backdrop-blur-sm bg-card/90'>
        <CardHeader>
          <CardTitle>WoW Progress Widget</CardTitle>
          <CardDescription>
            Generate a widget to display your World of Warcraft character
            progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DetailsForm />
        </CardContent>
      </Card>
    </section>
  );
}
