import { useEffect, useState } from 'react';
import Welcome from './scenes/Welcome';
import Nasihat from './scenes/Nasihat';
import Darurat from './scenes/Darurat';
import Kebun from './scenes/Kebun';
import Surat from './scenes/Surat';
import Meteran from './scenes/Meteran';
import EggToasts from './easter/EggToasts';
import EasterLayer from './easter/EasterLayer';
import Arsen from './components/Arsen';
import { Glyph, type GlyphKind } from './components/icons';
import { Doodle, useLocalStorage } from './components/ui';
import { sfx } from './lib/sound';

type Scene = 'welcome' | 'nasihat' | 'darurat' | 'kebun' | 'surat' | 'meter';

interface Tab {
  id: Exclude<Scene, 'welcome'>;
  label: string;
  icon: GlyphKind;
}

const TABS: Tab[] = [
  { id: 'nasihat', label: 'Nasihat', icon: 'chat' },
  { id: 'darurat', label: 'Darurat', icon: 'bell' },
  { id: 'kebun', label: 'Kebun', icon: 'sprout' },
  { id: 'surat', label: 'Surat', icon: 'envelope' },
  { id: 'meter', label: 'Gemes', icon: 'heart' },
];

const SCENE_TITLES: Record<Exclude<Scene, 'welcome'>, string> = {
  nasihat: 'Mesin Nasihat',
  darurat: 'Tombol Darurat Kangen',
  kebun: 'Kebun Interaktif',
  surat: 'Letters for Livia',
  meter: 'Pengukur Kegemesan',
};

function SceneView({ scene }: { scene: Exclude<Scene, 'welcome'> }) {
  switch (scene) {
    case 'nasihat':
      return <Nasihat />;
    case 'darurat':
      return <Darurat />;
    case 'kebun':
      return <Kebun />;
    case 'surat':
      return <Surat />;
    case 'meter':
      return <Meteran />;
  }
}

export default function App() {
  const [entered, setEntered] = useLocalStorage('arsen-entered', false);
  const [scene, setScene] = useState<Scene>(() => (entered ? 'nasihat' : 'welcome'));
  const [soundOn, setSoundOn] = useState(() => sfx.enabled());

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [scene]);

  const go = (next: Scene) => {
    sfx.click();
    setScene(next);
  };

  const toggleSound = () => {
    const next = !soundOn;
    sfx.setEnabled(next);
    setSoundOn(next);
    if (next) sfx.pop();
  };

  const handleEnter = () => {
    setEntered(true);
    setScene('nasihat');
  };

  if (scene === 'welcome') {
    return (
      <>
        <Welcome onEnter={handleEnter} />
        <EggToasts />
        <EasterLayer />
      </>
    );
  }

  return (
    <div className="flex min-h-svh flex-col">
      {/* header */}
      <header className="bg-cream/90 sticky top-0 z-40 border-b-2 border-ink/10 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-2">
          <button
            type="button"
            onClick={() => go('welcome')}
            aria-label="Kembali ke halaman pembuka"
            className="flex min-h-[44px] min-w-[44px] items-center gap-2 rounded-2xl"
          >
            <Arsen expression="happy" size={40} className="animate-bob" />
            <span className="font-display text-ink text-left text-lg leading-tight font-extrabold">
              Arsen's Little
              <br className="sm:hidden" /> Universe
            </span>
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundOn ? 'Matikan efek suara' : 'Nyalakan efek suara'}
            aria-pressed={soundOn}
            className="border-ink bg-paper flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border-2 text-xl shadow-[0_3px_0_rgba(74,59,82,0.18)] active:translate-y-[2px] active:shadow-none"
          >
            <Glyph kind={soundOn ? 'volume' : 'volume-off'} className="h-6 w-6" />
            <span className="sr-only">{soundOn ? 'suara nyala' : 'suara mati'}</span>
          </button>
        </div>

        {/* nav pil — desktop */}
        <nav aria-label="Navigasi dunia" className="hidden justify-center pb-3 md:flex">
          <div className="border-ink bg-paper inline-flex gap-1 rounded-full border-2 p-1.5 shadow-[0_3px_0_rgba(74,59,82,0.18)]">
            {TABS.map((t) => {
              const active = scene === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => go(t.id)}
                  aria-current={active ? 'page' : undefined}
                  className={`font-display flex min-h-[44px] items-center gap-1.5 rounded-full px-4 text-base font-bold transition-colors ${
                    active ? 'bg-blush-200 text-ink' : 'text-ink-soft hover:bg-cream-deep'
                  }`}
                >
                  <Glyph kind={t.icon} className="h-6 w-6" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      {/* isi scene */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pt-6 pb-28 md:pb-12">
        <div key={scene} className="animate-pop-in">
          <SceneView scene={scene} />
        </div>
      </main>

      {/* footer */}
      <footer className="px-4 pt-2 pb-28 md:pb-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-1 text-center">
          <div className="flex items-center gap-2" aria-hidden="true">
            <Doodle kind="heart" className="text-blush-500 h-4 w-4" />
            <Doodle kind="sparkle" className="text-butter-400 h-4 w-4" />
            <Doodle kind="heart" className="text-blush-500 h-4 w-4" />
          </div>
          <p className="font-hand text-ink-soft text-xl">
            dibuat dengan sayang oleh Arsen, buat Livia
          </p>
          <p className="text-ink-faint text-xs">{SCENE_TITLES[scene]} — semoga harimu semanis kamu</p>
        </div>
      </footer>

      {/* tab bar bawah — mobile */}
      <nav
        aria-label="Navigasi dunia"
        className="bg-paper/95 border-ink fixed inset-x-0 bottom-0 z-40 border-t-2 backdrop-blur md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="grid grid-cols-5">
          {TABS.map((t) => {
            const active = scene === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => go(t.id)}
                aria-current={active ? 'page' : undefined}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 ${
                  active ? 'text-blush-700' : 'text-ink-soft'
                }`}
              >
                <Glyph kind={t.icon} className={`h-6 w-6 ${active ? 'animate-wiggle' : ''}`} />
                <span className={`font-display text-xs font-bold ${active ? '' : 'font-semibold'}`}>
                  {t.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-1.5 w-1.5 rounded-full ${active ? 'bg-blush-500' : 'bg-transparent'}`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      <EggToasts />
      <EasterLayer />
    </div>
  );
}
