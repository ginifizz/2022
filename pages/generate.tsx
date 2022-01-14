import type { NextPage } from 'next';
import { useState, useCallback, useMemo } from 'react';
import { MoodType, RelationType } from 'interfaces';
import RelationSelect from 'components/RelationSelect';
import MoodSelect from 'components/MoodSelect';
import BigInput from 'components/BigInput';
import { getRelationById } from '../api';
import Background from 'components/Background';

interface FadingFormProps {
  current: boolean;
  children: React.ReactNode;
}

const FadingForm = ({ current, children }: FadingFormProps): JSX.Element => {
  return (
    <div
      className={`absolute w-full h-full transition-opacity ${
        current ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {children}
    </div>
  );
};

interface RecapLinkProps {
  onClick: () => void;
  children: React.ReactNode;
}

const RecapLink = ({ onClick, children }: RecapLinkProps): JSX.Element => (
  <span className="font-bold text-cyan-300 cursor-pointer border-b-cyan-400 border-b-2 border-dotted" onClick={onClick}>
    {children}
  </span>
);

const GeneratePage: NextPage = () => {
  const [relation, setRelation] = useState<RelationType>();
  const [mood, setMood] = useState<MoodType>();
  const [name, setName] = useState<string>();

  const currentQuestion = useMemo(() => {
    if (mood) return null;
    if (relation) return 'mood';
    else if (name) return 'relation';
    else return 'name';
  }, [mood, relation, name]);

  const onNameChange = useCallback(
    (newName: string) => {
      setName(newName);
    },
    [setName]
  );

  const onRelationChange = useCallback(
    (newRelationId: string) => {
      setRelation(getRelationById(newRelationId));
    },
    [setRelation]
  );

  const onMoodChange = useCallback(
    (newMoodId: string) => {
      setMood(relation.moods.find((m) => m.id === newMoodId));
    },
    [setMood, relation]
  );

  const resetName = useCallback(() => {
    setMood(null);
    setRelation(null);
    setName(null);
  }, [setName, setMood, setRelation]);

  const resetRelation = useCallback(() => {
    setMood(null);
    setRelation(null);
  }, [setMood, setRelation]);

  const resetMood = useCallback(() => {
    setMood(null);
  }, [setMood]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_BASE_URL}${mood?.keyword.toUpperCase()}/${name?.replace(' ', '--').toUpperCase()}`
    );
  }, [name, mood]);
  console.log(process.env.NEXT_PUBLIC_BASE_URL);
  return (
    <Background>
      <div className="text-white text-xs md:text-sm text-center absolute w-full top-0 font-light z-10 p-4">
        {name ? (
          <>
            <span>Je veux envoyer mes voeux à&nbsp;</span>
            <RecapLink onClick={resetName}>{name}</RecapLink>
          </>
        ) : null}
        {relation ? (
          <>
            <span>&nbsp;qui est&nbsp;</span>
            <RecapLink onClick={resetRelation}>{relation.label.toLowerCase()}</RecapLink>, et&nbsp;
          </>
        ) : null}
        {mood ? (
          <>
            <RecapLink onClick={resetMood}>{mood.label.toLowerCase()}.</RecapLink>
          </>
        ) : null}
      </div>
      <FadingForm current={currentQuestion === 'name'}>
        <BigInput
          question="A qui souhaitez-vous envoyer vos voeux&nbsp;?"
          placeholder="Prénom"
          value={name}
          onChange={onNameChange}
        />
      </FadingForm>
      <FadingForm current={currentQuestion === 'relation'}>
        <RelationSelect onChange={onRelationChange} />
      </FadingForm>
      <FadingForm current={currentQuestion === 'mood'}>
        <MoodSelect relation={relation?.id} onChange={onMoodChange} />
      </FadingForm>
      <FadingForm current={currentQuestion === null}>
        <div className="text-sm absolute w-full px-4 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center | md:text-md">
          <div className="mb-4">Voici l&apos;URL de votre carte : (cliquer pour copier)</div>
          <div className="text-lg text-uppercase | md:text-3xl" onClick={copyToClipboard}>{`${
            process.env.NEXT_PUBLIC_BASE_URL
          }${mood?.keyword.toUpperCase()}/${name?.replace(' ', '--').toUpperCase()}`}</div>
        </div>
      </FadingForm>
    </Background>
  );
};

export default GeneratePage;
