import { useEffect, useRef, useState } from 'react';
import gsap, { Back, Power4 } from 'gsap';
import SharePanel from 'components/SharePanel';
import Background from 'components/Background';
import { MoodType } from 'interfaces';

interface CardPageProps {
  mood: MoodType;
  name: string;
  relation: string;
}

const CardPage = ({ mood, name }: CardPageProps): JSX.Element => {
  const [animComplete, setAnimComplete] = useState(false);
  const [animStart, setAnimStart] = useState(false);
  const { sentences } = mood;
  const target = name.replace('--', ' ');

  const refName = useRef(null);
  const refWish = useRef(null);
  const refYear = useRef(null);
  const refBonus = useRef(null);
  const refDots = useRef(null);
  const refAll = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onStart: () => {
        setAnimStart(true);
        setAnimComplete(false);
      },
      onComplete: () => {
        setAnimComplete(true);
        gsap.killTweensOf('*');
      },
    });
    gsap.set(refName.current, { top: '50%', left: 0, opacity: 0 });
    gsap.set(refWish.current, { opacity: 0 });
    gsap.set(refAll.current, { scale: 0.8 });
    gsap.set(refYear.current, {
      scale: 0.8,
      opacity: 0,
      transformOrigin: 'left',
      'clip-path': 'polygon(0% -20%, 0% -20%, 0% 100%, 0% 100%)',
    });
    //gsap.set(refYear.current, { opacity: 0, x: '-100%', scale: 0.2 });
    gsap.set(refBonus.current, { opacity: 0, y: '-100%' });
    tl.fromTo(refName.current, { scale: 0 }, { scale: 1, opacity: 1, duration: 0.5, delay: 0.5, ease: Back.easeOut });
    tl.to(
      refName.current,
      { top: '100%', rotate: '-90deg', left: 0, scale: 0.5, duration: 1, delay: 0.5, ease: Power4.easeOut },
      'step2'
    );
    tl.to(refDots.current, { opacity: 0, duration: 0.2, delay: 0.5 }, 'step2');
    tl.fromTo(
      refWish.current,
      { x: '+20px', opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.5, ease: Power4.easeOut },
      'step2'
    );
    tl.to(
      refYear.current,
      {
        opacity: 1,
        scale: 1,
        'clip-path': 'polygon(-50% -50%, 150% -50%, 150% 150%, -50% 150%)',
        duration: 1,
        delay: 1,
        ease: Power4.easeOut,
      },
      'step2'
    );
    //tl.to(refYear.current, { opacity: 1, x: 0, scale: 1, duration: 1, delay: 1, ease: Power4.easeOut }, 'step2');
    tl.to(refAll.current, { scale: 1, rotate: '-10deg', y: '-20%', duration: 0.5 }, 'step3');
    tl.to(refBonus.current, { scale: 1, opacity: 1, y: 0, duration: 1, ease: Power4.easeOut }, 'step3');
    tl.set({}, {}, '+=2');
    tl.play();
    return () => {
      gsap.killTweensOf('*');
    };
  }, [setAnimStart, setAnimComplete]);

  return (
    <Background>
      <div
        className={`${
          animComplete
            ? 'transition-all portrait:scale-95 portrait:-translate-y-[15vh] | landscape:scale-[66%] landscaoe:-translate-y-0 landscape:-translate-x-[15vw] | xl:scale-75 '
            : ''
        } duration-500 relative text-white flex flex-col items-start justify-center h-screen w-full px-8 | md:px-12`}
      >
        <div
          ref={refAll}
          className={`${animStart ? 'flex' : 'hidden'} ${
            animComplete ? 'glow scale-0.5' : ''
          } relative text-white flex-col flex-wrap items-start justify-center w-full text-left pl-4 md:pl-12 max-w-[1000px] mx-auto`}
        >
          <div ref={refName} className="absolute">
            <div className="relative h-1 w-1 bg-red-100">
              <div className="absolute min-w-[800px] text-[8vmin] break-words uppercase -translate-y-full font-extrabold leading-none mb-2">
                <span>{target}</span>
                <span ref={refDots}>...</span>
              </div>
            </div>
          </div>
          {sentences.map((sentence, index) => {
            if (index === 0) {
              return (
                <div className="text-[4vmin] md:text-[3vmin] font-extralight break-words" ref={refWish}>
                  {sentence}
                </div>
              );
            } else if (index === 1) {
              return (
                <div className="w-full">
                  <div
                    className="pb-1 uppercase text-[12vmin] md:text-[15vmin] break-words leading-[1] font-extrabold"
                    ref={refYear}
                  >
                    {sentence}
                  </div>
                </div>
              );
            } else {
              return (
                <div ref={refBonus} className="w-full">
                  <div className="w-full md:w-7/12 text-[4vmin] md:text-[3.5vmin] break-words font-extralight leading-tight">
                    {sentence}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <SharePanel visible={animComplete} />
    </Background>
  );
};

export default CardPage;
