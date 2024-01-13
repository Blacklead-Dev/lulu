import { Howl } from "howler";

export const sounds = {
  foundersMintOnboarding: {
    fnicLoading: new Howl({
      src: ["./assets/audio/fnic-loading.mp3"],
      preload: false,
    }),
    selfDestruct: new Howl({
      src: ["./assets/audio/self-destruct.mp3"],
      preload: false,
    }),
    staticNoise: new Howl({
      src: ["./assets/audio/static-noise.mp3"],
      preload: false,
    }),
    keyboardTypingSuccess: new Howl({
      src: ["./assets/audio/keyboard-typing-success.mp3"],
      preload: false,
    }),
    welcomeKeyboardTypingSprite: new Howl({
      src: ["./assets/audio/welcome-mint-keyboard-typing.mp3"],
      sprite: {
        welcome: [0, 6100],
        burn: [8367, 9795],
      },
    }),
    sprite: new Howl({
      src: ["./assets/audio/founders-mint-onboarding-animation-sounds.mp3"],
      sprite: {
        fnicAutohrized: [0, 6050],
        selfDestruct: [6050, 10860],
        staticNoise: [10860, 13980],
        keyboardTypingSuccess: [14760, 21340],
        seeYou: [23155, 27092],
      },
    }),
    primaryBackground: new Howl({
      src: ["./assets/audio/activate-founders-mint-primary-background.mp3"],
    }),
    finalBackground: new Howl({
      src: ["./assets/audio/activate-founders-mint-background.mp3"],
    }),
  },
  homepageBackground: new Howl({
    src: ["./assets/audio/website-homepage-main-loop-v1.mp3"],
  }),
};
