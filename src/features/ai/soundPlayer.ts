export type AimSound = "messageReceived" | "buddySignOn";

export interface SoundPlayer {
  play(sound: AimSound): void;
}

export type AudioContextFactory = () => AudioContext;

export interface SoundPlayerOptions {
  createAudioContext?: AudioContextFactory;
  isMuted: () => boolean;
}

const SOUND_CONFIG: Record<
  AimSound,
  { frequency: number; durationMs: number; type: OscillatorType }
> = {
  messageReceived: { frequency: 880, durationMs: 90, type: "square" },
  buddySignOn: { frequency: 523.25, durationMs: 160, type: "sine" },
};

function defaultAudioContextFactory(): AudioContext {
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext })
      .webkitAudioContext;
  return new Ctx();
}

export function createSoundPlayer(options: SoundPlayerOptions): SoundPlayer {
  const createAudioContext =
    options.createAudioContext ?? defaultAudioContextFactory;
  let sharedCtx: AudioContext | null = null;

  return {
    play(sound: AimSound) {
      if (options.isMuted()) return;

      const config = SOUND_CONFIG[sound];
      try {
        if (!sharedCtx) sharedCtx = createAudioContext();
        const ctx = sharedCtx;
        const oscillator = ctx.createOscillator();
        const gain = ctx.createGain();
        oscillator.type = config.type;
        oscillator.frequency.value = config.frequency;
        gain.gain.value = 0.05;
        const start = ctx.currentTime;
        const end = start + config.durationMs / 1000;
        gain.gain.setValueAtTime(0.05, start);
        gain.gain.exponentialRampToValueAtTime(0.001, end);
        oscillator.connect(gain);
        gain.connect(ctx.destination);
        oscillator.start(start);
        oscillator.stop(end);
      } catch {
        // AudioContext unavailable (tests / restricted environments)
      }
    },
  };
}
