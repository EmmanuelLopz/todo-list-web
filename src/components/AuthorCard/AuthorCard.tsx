import authorAvatar from "../../assets/emmanuel.png";

const NetworkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <line x1="12" y1="7" x2="5" y2="17" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    <line x1="12" y1="7" x2="19" y2="17" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
    <line x1="5" y1="19" x2="19" y2="19" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

const AtIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="4" />
    <path strokeLinecap="round" d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" />
  </svg>
);

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="10" />
    <path strokeLinecap="round" d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.607L4.2 14M19.8 15l-.718 2.527A9.06 9.06 0 0 1 12 21a9.06 9.06 0 0 1-7.082-3.473L4.2 15m0 0-1.57-.607" />
  </svg>
);

const PaletteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z" />
  </svg>
);

const AuthorCard = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center text-center">
        <img
          src={authorAvatar}
          alt="Author avatar"
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm"
        />
        <h3 className="text-xl font-bold text-gray-900 mb-1">Emmanuel Lopez</h3>
        <p className="text-blue-600 font-medium text-sm mb-6">
          Software Engineer &amp; Educator
        </p>
        <div className="flex items-center gap-6 text-gray-500">
          <button className="hover:text-blue-600 transition-colors">
            <NetworkIcon />
          </button>
          <button className="hover:text-blue-600 transition-colors">
            <AtIcon />
          </button>
          <button className="hover:text-blue-600 transition-colors">
            <GlobeIcon />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-2xl p-6">
        <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
          Quick Stats
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <BrainIcon />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                Favorite CS Topic
              </p>
              <p className="text-gray-800 font-semibold text-sm leading-snug">
                Distributed Systems &amp; UI Architecture
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0">
              <PaletteIcon />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
                Hobbies
              </p>
              <p className="text-gray-800 font-semibold text-sm leading-snug">
                Analog Photography, Coffee Brewing, Urban Sketching
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
