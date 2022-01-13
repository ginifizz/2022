import { GetStaticProps } from 'next';
import base from 'data/tilleuls.json';
import CardPage from 'components/CardPage';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      mood: base,
      name: 'Les-Tilleuls.coop',
    },
  };
};

export default CardPage;
