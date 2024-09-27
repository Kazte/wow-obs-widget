'use client';

import { DetailsFormType, DetailsOptions, Region } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import { useEffect, useState } from 'react';

import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SelectValue } from '@radix-ui/react-select';
import { useToast } from '@/hooks/use-toast';

const defaultDetailsOptions: DetailsOptions = {
  showGuild: true,
  showProgress: true,
  saveLocalStorage: true
};

const defaultDetailsForm: DetailsFormType = {
  region: 'us',
  realm: '',
  character: '',
  options: defaultDetailsOptions
};

export default function DetailsForm() {
  const [detailsForm, setDetailsForm] = useState<DetailsFormType | null>(null);
  const [widgetUrl, setWidgetUrl] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (localStorage.getItem('detailsForm')) {
      const savedDetailsForm = JSON.parse(
        localStorage.getItem('detailsForm') as string
      );
      setDetailsForm(savedDetailsForm);
    } else {
      setDetailsForm(defaultDetailsForm);
    }
  }, []);

  async function generateUrl() {
    setWidgetUrl(null);

    if (!detailsForm?.realm || !detailsForm.character) {
      toast({
        description: 'Realm and character name are required',
        variant: 'destructive'
      });
      return;
    }

    const baseUrl = window.location.origin;

    const encodedData = btoa(JSON.stringify(detailsForm));

    const url = `${baseUrl}/widget?data=${encodedData}`;

    setWidgetUrl(url);

    if (detailsForm.options.saveLocalStorage)
      localStorage.setItem('detailsForm', JSON.stringify(detailsForm));
  }

  async function copyToClipboard() {
    if (!widgetUrl) return;

    await navigator.clipboard.writeText(widgetUrl);

    toast({
      description: 'Widget URL copied to clipboard'
    });
  }

  return (
    <form className='space-y-4'>
      <div>
        <Label htmlFor='region'>Region</Label>
        <Select
          disabled={!detailsForm}
          defaultValue='us'
          onValueChange={(value) =>
            setDetailsForm({ ...detailsForm!, region: value as Region })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder='Select a region' />
          </SelectTrigger>
          <SelectContent>
            {['us', 'eu', 'kr', 'tw', 'cn'].map((region) => (
              <SelectItem key={region} value={region}>
                {region.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor='realm'>Realm</Label>
        <Input
          id='realm'
          disabled={!detailsForm}
          value={detailsForm?.realm}
          onChange={(e) =>
            setDetailsForm({ ...detailsForm!, realm: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor='character'>Character</Label>
        <Input
          id='character'
          disabled={!detailsForm}
          value={detailsForm?.character}
          onChange={(e) =>
            setDetailsForm({ ...detailsForm!, character: e.target.value })
          }
        />
      </div>
      <div>
        <Label>Options</Label>
        <div className='space-y-2 grid grid-cols-2'>
          {Object.entries(defaultDetailsOptions).map(([key, value]) => (
            <div key={key} className='flex items-center space-x-2'>
              <Checkbox
                id={key}
                disabled={!detailsForm}
                defaultChecked={value}
                checked={detailsForm?.options[key as keyof DetailsOptions]}
                onCheckedChange={(checked) => {
                  setDetailsForm({
                    ...detailsForm!,
                    options: { ...detailsForm!.options, [key]: checked }
                  });
                }}
              />
              <Label htmlFor={key}>{camelCaseToText(key)}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className='w-full grid place-items-end'>
        <Button
          onClick={() => generateUrl()}
          disabled={!detailsForm}
          type='button'
        >
          Generate URL
        </Button>
      </div>

      {widgetUrl && (
        <div className='flex flex-col gap-2'>
          <Label>Widget URL</Label>
          <div className='flex gap-2'>
            <Input value={widgetUrl} readOnly />
            <Button onClick={() => copyToClipboard()} type='button'>
              Copy URL
            </Button>
          </div>
        </div>
      )}
    </form>
  );
}

// function to convert camel case to normal text
function camelCaseToText(camelCase: string) {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}
