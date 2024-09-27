export const classColor = {
  'Death Knight': '#C41E3A',
  'Demon Hunter': '#A330C9',
  Druid: '#FF7C0A',
  Evoker: '#33937F',
  Hunter: '#AAD372',
  Mage: '#3FC7EB',
  Monk: '#00FF98',
  Paladin: '#F48CBA',
  Priest: '#FFFFFF',
  Rogue: '#FFF468',
  Shaman: '#0070DD',
  Warlock: '#8788EE',
  Warrior: '#C69B6D'
} as const;

export type EnumValues<T> = T[keyof T];

export type ClassColor = EnumValues<typeof classColor>;

export const getClassColor = (className: string): ClassColor => {
  return classColor[className as keyof typeof classColor];
};

export const raidColor = {
  N: '#f4f4f4',
  H: '#0070DD',
  M: '#FF8000'
} as const;

export type RaidColor = EnumValues<typeof raidColor>;

export const getRaidColor = (difficulty: string): RaidColor => {
  return raidColor[difficulty as keyof typeof raidColor];
};
