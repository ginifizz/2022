import { GetServerSideProps } from 'next';
import base from 'data/tilleuls.json';
import { getMoodByKeyWord } from 'api';
import CardPage from 'components/CardPage';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { relation, name } = params;

  const mood = getMoodByKeyWord(relation as string);

  return {
    props: {
      mood: mood || base,
      name: mood ? name : 'Les-Tilleuls.coop',
    },
  };
};

export default CardPage;
