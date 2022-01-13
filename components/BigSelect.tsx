import { useState, useCallback } from 'react';
import Button from 'components/Button';

interface BigSelectProps {
  values: {
    id: string;
    label: string;
  }[];
  label: string;
  buttonLabel: string;
  onChange: (value?: string) => void;
}

const BigSelect = ({ values, onChange, label, buttonLabel }: BigSelectProps): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);

  const onBgClick = useCallback(() => {
    if (open) setOpen(false);
  }, [open, setOpen]);

  const openSelect = useCallback(() => {
    if (!open) setOpen(true);
  }, [open, setOpen]);

  return (
    <div
      className="h-screen w-full relative flex flex-col items-center justify-center text-white font-sans text-center p-8"
      onClick={onBgClick}
    >
      <div className={`flex flex-col items-center justify-center`}>
        <p className={`text-xl ${open ? 'mb-[-40px]' : 'mb-4'} transition-all uppercase font-light | md:text-2xl`}>
          {label}
        </p>
        <Button onClick={openSelect} className={`${open ? 'scale-0 ' : 'scale-1'}`}>
          {buttonLabel}
        </Button>
        <div
          className={`${
            open ? 'opacity-100 scale-100 max-h-[100vh]' : 'opacity-0 scale-50 pointer-events-none max-h-[1px]'
          } transition-all bg-white w-full h-full md:h-auto md:w-2/3 flex flex-col justify-center mx-auto`}
        >
          {values.map((value) => (
            <div
              className="text-slate-600 text-lg font-bold px-4 py-3 uppercase hover:bg-cyan-200 border-b-2 border-b-slate-200 last:border-b-0 cursor-pointer"
              key={value.id}
              onClick={() => onChange(value.id)}
            >
              {value.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BigSelect;
