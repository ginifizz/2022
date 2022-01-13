const Background = ({ children }): JSX.Element => (
  <div className="min-h-screen with-sky bg-sky bg-cover bg-center w-full h-full relative overflow-hidden">
    <div className="hidden xl:block fixed z-20 top-[80px] right-[-58px] w-[300px] rotate-45 border-px border-white">
      <img alt="made with love by Les-Tilleuls.coop" src="/madewithlove.svg" />
    </div>
    <div className="stars1" />
    <div className="stars2" />
    <div className="stars3" />
    <div className="shooting-stars" />
    {children}
    <div className="xl:hidden fixed bottom-0 py-2 w-full z-20">
      <img alt="made with love by Les-Tilleuls.coop" className="w-[220px] mx-auto" src="/madewithlove_mobile.svg" />
    </div>
  </div>
);

export default Background;
