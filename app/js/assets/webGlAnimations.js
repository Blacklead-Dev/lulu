import * as PIXI from "pixi.js";
import gsap from "gsap";

// disabling PIXI tickers to save computation resources
PIXI.Ticker.system.autoStart = false;
PIXI.Ticker.system.stop();

PIXI.Ticker.shared.autoStart = false;
PIXI.Ticker.shared.stop();

const BG_ANIMATION_BUNDLE = "32bit-0.5x-no-scale-marker";
const BG_ANIMATION_NAME = "optimized-bg-sequence/Lulubg";

const CARD_INSERT_ANIMATION_BUNDLE = "card-insert-8bit-0.5x";
const CARD_INSERT_ANIMATION_NAME = "optimized/1";

const FNIC_LOADING_ANIMATION_BUNDLE = "fnic-loading-8bit-0.5x";
const FNIC_LOADING_ANIMATION_NAME = "02. Fnic loading/1";

export async function loadWebGlAnimations() {
  await PIXI.Assets.init({
    manifest: {
      bundles: [
        {
          name: "card-insert-32bit-0.5x",
          assets: [
            {
              alias: "card-insert-32bit-0.5x",
              src: Array.from({ length: 5 }).map(
                (_, idx) =>
                  `./images/dist/animations/card-insert/32bit-0.5x/card-insert-${idx}.json`
              ),
            },
          ],
        },
        {
          name: "card-insert-8bit-0.5x",
          assets: [
            {
              alias: "card-insert-8bit-0.5x",
              src: Array.from({length: 5}).map(
                (_, idx) =>
                  `./images/dist/animations/card-insert/8bit-0.5x/card-insert-${idx}.json`
              ),
            }
          ],
        },
        {
          name: "fnic-loading-32bit-0.5x",
          assets: [
            {
              alias: "fnic-loading-32bit-0.5x",
              src: Array.from({ length: 6 }).map(
                (_, idx) =>
                  `./images/dist/animations/fnic-loading/32bit-0.5x/fnic-loading-${idx}.json`
              ),
            },
          ],
        },
        {
          name: "fnic-loading-8bit-0.5x",
          assets: [
            {
              alias: "fnic-loading-8bit-0.5x",
              src: Array.from({length: 6}).map(
                (_, idx) =>
                  `./images/dist/animations/fnic-loading/8bit-0.5x/fnic-loading-${idx}.json`
              ),
            }
          ],
        },
        {
          name: "32bit-0.5x-no-scale-marker",
          assets: [
            {
              alias: "32bit-0.5x-no-scale-marker",
              src: Array.from({ length: 52 }).map(
                (_, idx) =>
                  `./images/dist/animations/lulu-bg/32bit-0.5x-no-scale-marker/bg-lulu-${idx}.json`
              ),
            },
          ],
        },
      ],
    },
  });

  const load = async () => {
    await PIXI.Assets.loadBundle([
      CARD_INSERT_ANIMATION_BUNDLE,
      FNIC_LOADING_ANIMATION_BUNDLE,
      // BG_ANIMATION_BUNDLE,
    ]);
  };

  let retriesCounr = 0;
  const maxRetries = 3;
  while (retriesCounr < maxRetries) {
    try {
      await load();

      break;
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

export function attachResizerToApp(
  app,
  element,
  component,
  width,
  height,
  scaleFn
) {
  function resize(element) {
    const xScale = element.offsetWidth / width;
    const yScale = element.offsetHeight / height;
    const scale = scaleFn(xScale, yScale);

    app.renderer.resize(element.offsetWidth, element.offsetHeight);

    component.scale.set(scale);
    component.position.set(element.offsetWidth / 2, element.offsetHeight / 2);
  }

  window.addEventListener("resize", () => {
    resize(element);
  });

  resize(element);
}

/**
 * CURRENTLY NOT IN USE
 *
 * @typedef {Object} LuluBgAnimationOptions
 * @property {Element} element
 *
 * @param {LuluBgAnimationOptions} options
 * @returns {PIXI.AnimatedSprite}
 */
export function initLuluBgAnimation(options) {
  // The original dimensions of the image used for animation
  const WIDTH = 1920;
  const HEIGHT = 1081;
  const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    resizeTo: options.element,
    antialias: true,
    transparent: true,
    backgroundAlpha: 0,
    resolution: 1,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    autoStart: false,
    sharedTicker: true,
  });

  // Connect to a debugger
  globalThis.__PIXI_APP__ = app;

  options.element.appendChild(app.view);

  const luluBgAnimation =
    PIXI.Assets.get(BG_ANIMATION_BUNDLE).data.animations[BG_ANIMATION_NAME];
  const animatedSprite = PIXI.AnimatedSprite.fromFrames(luluBgAnimation);

  animatedSprite.anchor.set(0.5, 0.5);
  animatedSprite.position.set(WIDTH / 2, HEIGHT / 2);

  app.stage.addChild(animatedSprite);

  app.stage.cullable = true;
  animatedSprite.cullable = true;

  attachResizerToApp(
    app,
    options.element,
    animatedSprite,
    WIDTH,
    HEIGHT,
    Math.max
  );

  app.renderer.render(app.stage);

  return { sprite: animatedSprite, app };
}

/**
 * @typedef {Object} CardInsertAnimationOptions
 * @property {Element} element
 *
 * @param {CardInsertAnimationOptions} options
 */
export function initCardInsertAndLoadingAnimation(options) {
  const WIDTH = 1080;
  const HEIGHT = 1080;
  const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    antialias: true,
    transparent: true,
    backgroundAlpha: 0,
    resolution: 1,
    autoDensity: true,
    resolution: window.devicePixelRatio || 1,
    autoStart: false,
    sharedTicker: true,
  });

  options.element.appendChild(app.view);

  const cardInsertAnimation = PIXI.Assets.get(CARD_INSERT_ANIMATION_BUNDLE).data
    .animations[CARD_INSERT_ANIMATION_NAME];
  const fnicLoadingAnimation = PIXI.Assets.get(FNIC_LOADING_ANIMATION_BUNDLE)
    .data.animations[FNIC_LOADING_ANIMATION_NAME];

  const animatedSprite = PIXI.AnimatedSprite.fromFrames(
    [].concat(cardInsertAnimation, fnicLoadingAnimation)
  );

  animatedSprite.scale.set(0.3);
  animatedSprite.loop = true;

  animatedSprite.anchor.set(0.5, 0.5);
  animatedSprite.position.set(app.screen.width / 2, app.screen.height / 2);

  app.stage.addChild(animatedSprite);

  attachResizerToApp(
    app,
    options.element,
    animatedSprite,
    WIDTH,
    HEIGHT,
    Math.min
  );

  return { sprite: animatedSprite, app };
}
