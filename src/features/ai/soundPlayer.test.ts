import {
  createSoundPlayer,
  type AudioContextFactory,
  type SoundPlayer,
} from "./soundPlayer";

function createMockAudioContext() {
  const oscillators: Array<{
    type: string;
    frequency: { value: number };
    connect: jest.Mock;
    start: jest.Mock;
    stop: jest.Mock;
  }> = [];
  const gains: Array<{
    gain: { value: number; setValueAtTime: jest.Mock; exponentialRampToValueAtTime: jest.Mock };
    connect: jest.Mock;
  }> = [];

  const ctx = {
    currentTime: 0,
    destination: {},
    createOscillator: jest.fn(() => {
      const osc = {
        type: "sine",
        frequency: { value: 0 },
        connect: jest.fn(),
        start: jest.fn(),
        stop: jest.fn(),
      };
      oscillators.push(osc);
      return osc;
    }),
    createGain: jest.fn(() => {
      const gain = {
        gain: {
          value: 0,
          setValueAtTime: jest.fn(),
          exponentialRampToValueAtTime: jest.fn(),
        },
        connect: jest.fn(),
      };
      gains.push(gain);
      return gain;
    }),
  };

  return { ctx, oscillators, gains };
}

describe("soundPlayer", () => {
  it("does not create oscillators when muted", () => {
    const { ctx, oscillators } = createMockAudioContext();
    const factory: AudioContextFactory = () =>
      ctx as unknown as AudioContext;
    const player: SoundPlayer = createSoundPlayer({
      createAudioContext: factory,
      isMuted: () => true,
    });

    player.play("messageReceived");
    player.play("buddySignOn");

    expect(ctx.createOscillator).not.toHaveBeenCalled();
    expect(oscillators).toHaveLength(0);
  });

  it("plays a short beep when unmuted for messageReceived", () => {
    const { ctx, oscillators } = createMockAudioContext();
    const player = createSoundPlayer({
      createAudioContext: () => ctx as unknown as AudioContext,
      isMuted: () => false,
    });

    player.play("messageReceived");

    expect(oscillators).toHaveLength(1);
    expect(oscillators[0].start).toHaveBeenCalled();
    expect(oscillators[0].stop).toHaveBeenCalled();
  });

  it("uses a distinct frequency for buddySignOn vs messageReceived", () => {
    const { ctx, oscillators } = createMockAudioContext();
    const player = createSoundPlayer({
      createAudioContext: () => ctx as unknown as AudioContext,
      isMuted: () => false,
    });

    player.play("messageReceived");
    player.play("buddySignOn");

    expect(oscillators).toHaveLength(2);
    expect(oscillators[0].frequency.value).not.toBe(
      oscillators[1].frequency.value
    );
  });
});
