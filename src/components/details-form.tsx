'use client';

import { DetailsFormType, DetailsOptions, Region } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';

import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { SelectValue } from '@radix-ui/react-select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const defaultDetailsOptions: DetailsOptions = {
  showGuild: false,
  showProgress: false
};

const defaultDetailsForm: DetailsFormType = {
  region: 'us',
  realm: '',
  character: '',
  options: defaultDetailsOptions
};

export default function DetailsForm() {
  const [detailsForm, setDetailsForm] =
    useState<DetailsFormType>(defaultDetailsForm);
  const { toast } = useToast();

  async function generateUrl() {
    if (!detailsForm.realm || !detailsForm.character) {
      toast({
        description: 'Realm and character name are required',
        variant: 'destructive'
      });
      console.log('Realm and character name are required');

      return;
    }

    const baseUrl = window.location.origin;

    const encodedData = btoa(JSON.stringify(detailsForm));

    const url = `${baseUrl}/widget?data=${encodedData}`;

    await navigator.clipboard.writeText(url);

    toast({
      description: 'Widget URL copied to clipboard'
    });
  }

  return (
    <form className='space-y-4'>
      <div>
        <Label htmlFor='region'>Region</Label>
        <Select
          defaultValue='us'
          onValueChange={(value) =>
            setDetailsForm({ ...detailsForm, region: value as Region })
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
          value={detailsForm.realm}
          onChange={(e) =>
            setDetailsForm({ ...detailsForm, realm: e.target.value })
          }
        />
      </div>
      <div>
        <Label htmlFor='character'>Character</Label>
        <Input
          id='character'
          value={detailsForm.character}
          onChange={(e) =>
            setDetailsForm({ ...detailsForm, character: e.target.value })
          }
        />
      </div>
      <div>
        <Label>Options</Label>
        <div className='space-y-2 grid grid-cols-2'>
          {Object.entries(defaultDetailsOptions).map(([key, value]) => (
            <div key={key} className='flex items-center space-x-2'>
              <Checkbox
                defaultChecked={value}
                checked={detailsForm.options[key as keyof DetailsOptions]}
                onCheckedChange={(checked) => {
                  setDetailsForm({
                    ...detailsForm,
                    options: { ...detailsForm.options, [key]: checked }
                  });
                }}
              />
              <Label htmlFor={key}>{camelCaseToText(key)}</Label>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => generateUrl()} type='button'>
        Generate Widget URL
      </Button>
    </form>
  );
}

// function to convert camel case to normal text
function camelCaseToText(camelCase: string) {
  return camelCase
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
}
