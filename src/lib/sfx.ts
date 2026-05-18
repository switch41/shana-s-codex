// Lightweight synthesized SFX using Web Audio API — no assets needed.
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

type ToneOpts = {
  freq: number;
  duration?: number;
  type?: OscillatorType;
  volume?: number;
  sweepTo?: number;
  delay?: number;
};

function tone({
  freq,
  duration = 0.18,
  type = "sine",
  volume = 0.06,
  sweepTo,
  delay = 0,
}: ToneOpts) {
  const ac = getCtx();
  if (!ac) return;
  const start = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (sweepTo) osc.frequency.exponentialRampToValueAtTime(sweepTo, start + duration);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(volume, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(start);
  osc.stop(start + duration + 0.02);
}

// Soft hover blip — short high sine
export function playHover() {
  tone({ freq: 880, sweepTo: 1320, duration: 0.12, type: "triangle", volume: 0.04 });
}

// Game-start "enter" — two-tone confirm with sweep
export function playStart() {
  tone({ freq: 220, sweepTo: 660, duration: 0.22, type: "sawtooth", volume: 0.05 });
  tone({ freq: 660, sweepTo: 990, duration: 0.28, type: "triangle", volume: 0.06, delay: 0.08 });
  tone({ freq: 1320, duration: 0.18, type: "sine", volume: 0.035, delay: 0.18 });
}
