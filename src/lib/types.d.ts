export type Region = 'us' | 'eu' | 'kr' | 'tw' | 'cn';

export type DetailsOptions = {
  showGuild: boolean;
  showProgress: boolean;
  saveLocalStorage: boolean;
};

export type DetailsFormType = {
  region: Region;
  realm: string;
  character: string;
  options: DetailsOptions;
};

export type CharacterProfile = {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  honorable_kills: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  mythic_plus_recent_runs?: MythicPlusRecentRun[];
  mythic_plus_scores_by_season?: MythicPlusScoresBySeason[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  raid_progression?: any;
  guild?: Guild;
};

export type MythicPlusRecentRun = {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  completed_at: string;
  clear_time_ms: number;
  par_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  score: number;
  affixes: Affix[];
  url: string;
};

export type Affix = {
  id: number;
  name: string;
  description: string;
  icon: string;
  wowhead_url: string;
};

export type MythicPlusScoresBySeason = {
  season: string;
  scores: Scores;
  segments: Segments;
};

export type Scores = {
  all: number;
  dps: number;
  healer: number;
  tank: number;
  spec_0: number;
  spec_1: number;
  spec_2: number;
  spec_3: number;
};

export type Segments = {
  all: SegmentDetail;
  dps: SegmentDetail;
  healer: SegmentDetail;
  tank: SegmentDetail;
  spec_0: SegmentDetail;
  spec_1: SegmentDetail;
  spec_2: SegmentDetail;
  spec_3: SegmentDetail;
};

export type SegmentDetail = {
  score: number;
  color: string;
};

export type Guild = {
  name: string;
  realm: string;
};
