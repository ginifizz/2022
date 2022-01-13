import { useCallback, useState, ChangeEvent } from 'react';
import Button from 'components/Button';

interface BigInputProps {
  question: string;
  placeholder: string;
  value?: string;
  onChange: (value?: string) => void;
}

const BigInput = ({ question, placeholder, value, onChange }: BigInputProps): JSX.Element => {
  const [currentValue, setCurrentValue] = useState<string>(value || '');

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentValue(event.target.value);
    },
    [setCurrentValue]
  );

  const submit = useCallback(() => {
    onChange(currentValue);
  }, [onChange, currentValue]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-white font-sans text-center p-8">
      <p className="text-xl mb-4 uppercase font-light | md:text-2xl">{question}</p>
      <input
        className={`${
          currentValue ? 'opacity-100' : 'opacity:50'
        } appearance-none bg-transparent border-none w-full focus:outline-none text-3xl text-center uppercase font-extrabold | md:text-8xl`}
        placeholder={placeholder}
        type="text"
        value={currentValue}
        onChange={onInputChange}
      />
      {
        <Button onClick={submit} className={`mt-8 ${currentValue ? '' : 'opacity-0 pointer-events-none'}`}>
          Valider
        </Button>
      }
    </div>
  );
};

export default BigInput;
