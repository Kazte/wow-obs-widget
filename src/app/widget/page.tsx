'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CharacterProfile,
  DetailsFormType,
  MythicPlusRecentRun
} from '@/lib/types';
import React, { useEffect, useState } from 'react';
import { classColor, getClassColor, getRaidColor } from '@/lib/class.utilities';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { fecho } from 'fecho';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();
  const encodedData = searchParams.get('data');
  const [data, setData] = useState<CharacterProfile | null>(null);
  const [decodedData, setDecodedData] = useState<DetailsFormType | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = async (decodedData: DetailsFormType) => {
    try {
      const url = new URL('https://raider.io/api/v1/characters/profile');
      url.searchParams.append('region', decodedData.region);
      url.searchParams.append('realm', decodedData.realm);
      url.searchParams.append('name', decodedData.character);

      const fields = ['mythic_plus_scores_by_season:current'];

      if (decodedData.options.showGuild) {
        fields.push('guild');
      }

      if (decodedData.options.showProgress) {
        fields.push('raid_progression');
      }

      url.searchParams.append('fields', fields.join(','));

      const response = await fecho(url);
      if (!response.ok) {
        throw new Error('Failed to fetch character data');
      }

      const data = await response.json();

      setData(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    setLoading(true);
    const initFetch = () => {
      if (!encodedData) {
        setLoading(false);
        return;
      }

      try {
        const decodedData: DetailsFormType = JSON.parse(atob(encodedData));

        setDecodedData(decodedData);

        fetchData(decodedData);

        // Set up interval for fetching data every 5 minutes
        intervalId = setInterval(() => fetchData(decodedData), 5 * 60 * 1000);
      } catch (err) {
        console.log('err', err);
      } finally {
        setLoading(false);
      }
    };

    initFetch();

    // Clean up interval on component unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [encodedData]);

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;

  //   const initFetch = () => {
  //     if (!encodedData) {
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const data: DetailsFormType = JSON.parse(atob(encodedData));
  //       setDecodedData(data);
  //       const url = `https://raider.io/api/v1/characters/profile?region=${data.region}&realm=${data.realm}&name=${data.character}&fields=mythic_plus_recent_runs`;
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  // }, [encodedData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Card className='w-64 rounded-none'>
      <CardHeader>
        <CardTitle className='text-lg flex flex-row gap-2 items-center'>
          <div>
            {/* image adjust to fit */}
            <Image
              src={data.thumbnail_url}
              alt={data.name}
              width={64}
              height={64}
            />
          </div>
          <div className='flex flex-col'>
            <div
              className={cn(`text-lg font-semibold`)}
              style={{ color: getClassColor(data.class) }}
            >
              {data.name}
            </div>
            <div className='text-sm text-muted-foreground'>
              {decodedData?.realm}
            </div>
            {decodedData?.options.showGuild && data.guild && (
              <div className='text-sm text-muted-foreground'>
                {data.guild.name}
              </div>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 flex flex-col'>
        <div className='flex flex-col'>
          <p className='text-sm font-semibold'>Current M+ Rating</p>
          <p
            className={cn('text-xl font-semibold')}
            style={{
              color: data?.mythic_plus_scores_by_season?.[0].segments.all.color
            }}
          >
            {data?.mythic_plus_scores_by_season?.[0].scores.all.toFixed(1)}
          </p>
        </div>

        {decodedData?.options.showProgress && data.raid_progression && (
          <div>
            <p className='text-sm font-semibold'>Raid Progress</p>
            <p
              className={cn('text-xl font-semibold')}
              style={{
                color: getRaidColor(
                  getRaidDifficulty(
                    data.raid_progression['nerubar-palace'].summary
                  )
                )
              }}
            >
              {data.raid_progression['nerubar-palace'].summary}
            </p>
          </div>
        )}

        {/* {lastUpdated && (
          <p className='text-xs text-muted-foreground mt-2'>
            Last updated: {formatTime(lastUpdated)}
          </p>
        )} */}
      </CardContent>
    </Card>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getRaidDifficulty(summary: string): string {
  return summary.split(' ')[1];
}
