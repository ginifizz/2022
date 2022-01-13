import { useMemo } from 'react';
import { getRelationById } from 'api';
import BigSelect from 'components/BigSelect';

interface MoodSelectProps {
  relation?: string;
  onChange: (value?: string) => void;
}

const MoodSelect = ({ relation, onChange }: MoodSelectProps): JSX.Element => {
  const moods = useMemo(() => {
    const fullRelation = getRelationById(relation);
    return fullRelation?.moods || [];
  }, [relation]);

  return (
    <BigSelect
      onChange={onChange}
      label="Quels sont vos sentiments vis à vis de cette personne ?"
      buttonLabel="Je ..."
      values={moods}
    />
  );
};

export default MoodSelect;
