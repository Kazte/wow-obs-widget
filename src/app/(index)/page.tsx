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
    <Card className='rounded-sm max-w-[380px] backdrop-blur-sm bg-card/90'>
      <CardHeader>
        <CardTitle>
          WoW Progress Widget <span className='text-sm text-gray-500'></span>
        </CardTitle>
        <CardDescription>
          Enter your character details to generate a widget URL
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DetailsForm />
      </CardContent>
    </Card>
  );
}
