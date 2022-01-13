import relations from 'data/relations.json';

export const getRelationById = (id: string) => {
  return relations.find((relation) => relation.id === id);
};

export const getMoodByKeyWord = (keyword: string) => {
  for (const relation of relations) {
    for (const mood of relation.moods) {
       if (mood.keyword.toUpperCase() === keyword.toUpperCase()) return mood;
    }
  }
  return null;
};
