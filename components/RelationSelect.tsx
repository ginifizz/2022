import relations from 'data/relations.json';
import BigSelect from 'components/BigSelect';

interface RelationSelectProps {
  onChange: (value?: string) => void;
}

const RelationSelect = ({ onChange }: RelationSelectProps): JSX.Element => {
  return (
    <BigSelect
      onChange={onChange}
      label="Quel est votre lien avec cette personne ?"
      buttonLabel="C'est ..."
      values={relations}
    />
  );
};

export default RelationSelect;
