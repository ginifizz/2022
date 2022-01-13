import { useCallback } from 'react';
import { useRouter } from 'next/router';
import Button from 'components/Button';
import Facebook from 'components/social/Facebook';
import Twitter from 'components/social/Twitter';
import Linkedin from 'components/social/Linkedin';
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share';
import { DESCRIPTION, TITLE, URL } from 'SEO';

interface SharePanelProps {
  visible: boolean;
}

const SocialImg = ({ children }): JSX.Element => (
  <div className="rounded-full bg-transparent w-8 sm:w-12 p-1 m-1 hover:text-cyan-400">{children}</div>
);

const SharePanel = ({ visible }: SharePanelProps): JSX.Element => {
  const router = useRouter();
  const goToHome = useCallback(() => {
    router.push('/generate');
  }, [router]);

  return (
    <div
      className={`${
        visible ? 'portrait:-translate-y-full | landscape:-translate-x-full' : ''
      } px-8 py-4 flex flex-col items-center justify-center text-center transition-all duration-1000 bg-[#02315d] border-cyan-300 portrait:border-t-4 landscape:border-l-4 shadow-md text-white w-screen fixed z-30 portrait:top-full | landscape:h-screen landscape:w-1/3 landscape:top-0 landscape:left-full `}
    >
      <p className="text-sm sm:text-lg mb-2 font-bold leading-tight">Partagez cette carte de voeux !</p>
      <div className="max-w-[400px] border-b-2 border-white/50 w-full">
        <FacebookShareButton url={URL} quote={DESCRIPTION}>
          <SocialImg>
            <Facebook />
          </SocialImg>
        </FacebookShareButton>
        <TwitterShareButton url={URL} title={DESCRIPTION}>
          <SocialImg>
            <Twitter />
          </SocialImg>
        </TwitterShareButton>
        <LinkedinShareButton url={URL} source={URL} title={TITLE} summary={DESCRIPTION}>
          <SocialImg>
            <Linkedin />
          </SocialImg>
        </LinkedinShareButton>
      </div>
      <p className="mx-auto max-w-[400px] block text-xs sm:text-sm mt-4 md:mt-8 mb-4 leading-tight">
        En retard pous vos voeux&nbsp;? Envoyez une carte personnalisée à la personne de votre choix&nbsp;!
      </p>
      <Button onClick={goToHome}>Envoyer votre propre message</Button>
    </div>
  );
};

export default SharePanel;
