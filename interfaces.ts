export type MoodType = {
  id: string;
  label: string;
  sentences: string[];
  keyword: string;
};

export type RelationType = {
  id: string;
  label: string;
  moods: MoodType[];
};
