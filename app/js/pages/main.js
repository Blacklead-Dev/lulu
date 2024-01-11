import gsap from "gsap";
import { Power0 } from "gsap/all";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { deviceIs } from "../assets/device";

gsap.registerPlugin(ScrollToPlugin);

import { splitingText } from "../assets/splitingText";
import { vhFunction } from "../assets/realVh";
import { lowBatteryMode } from "../assets/lowBatteryMode.js";
import { prelodaderHide } from "../assets/preloaderHide.js";
import { timer } from "../assets/timer.js";
import { loadHowlerSounds } from "../assets/soundUtils.js";
import { sounds } from "../assets/sounds.js";
import {
  loadWebGlAnimations,
  initCardInsertAndLoadingAnimation,
  initLuluBgAnimation,
} from "../assets/webGlAnimations.js";
import {
  attachScrollAnimationToBackground,
  attachScrollAnimationToSection,
} from "../assets/scrollTrigger.js";

async function mainPage() {
  const preloader = document.querySelector("#preloader-video");

  try {
    // preloader.load();
    preloader.pause();
  } catch (err) {}

  const obj = { progress: 0 };
  const progressBarTween = gsap.to(obj, {
    progress: 100,
    repeat: -1,
    duration: preloader.duration,
    ease: Power0.easeIn,
    yoyoEase: Power0.easeOut,
    yoyo: true,
    onUpdate: () => {
      preloader.currentTime = preloader.duration * (obj.progress / 100);
    },
  });

  let progressLine = document.querySelector(".progress-line-inner");

  loadHowlerSounds([
    sounds.foundersMintOnboarding.sprite,
    sounds.foundersMintOnboarding.primaryBackground,
  ]);
  await loadWebGlAnimations();

  gsap.to(window, {
    duration: 0.1,
    scrollTo: { y: 0 },
    delay: 0.2,
    onComplete: () => {
      document.body.classList.add("unscroll");
      document.body.classList.remove("hiddenlines");
      gsap.to(progressLine, { height: `0%` });
      sectionsFunction();
    },
  });

  setTimeout(() => {
    prelodaderHide();
    progressBarTween.kill();
  }, 2000);

  function backgroundVideoFunction() {
    let backgroundVideo = document.querySelector(".background-video");
    // let bg = initLuluBgAnimation({ element: backgroundVideo });

    let lineOffset =
      100 / document.querySelectorAll(".video-section").length / 5;

    async function playVideo() {
      try {
        await backgroundVideo.play();
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => {
          backgroundVideo.pause();
        }, 100);
      }
    }

    playVideo();

    attachScrollAnimationToBackground({
      onUpdate: (self) => {
        console.log("Backgroud animation progress", self);

        gsap.to(progressLine, {
          height: `${self.progress * 100 - lineOffset + 2}%`,
        });

        // Commented out code for Sprite animation
        // const progress = Power3.easeOut(self.progress * 0.5);
        // const progress = Power0.easeInOut(self.progress * 0.5);
        // const progress = self.progress;
        // const frame = Math.min(
        //   Math.round(bg.sprite.totalFrames * progress),
        //   bg.sprite.totalFrames - 1
        // );
        // bg.sprite.gotoAndStop(frame);
        // bg.app.renderer.render(bg.app.stage);

        const multipliedProgress = self.progress * 2;
        const multipliedTime = backgroundVideo.duration * multipliedProgress;

        if (Math.ceil(multipliedTime / backgroundVideo.duration) % 2 === 0) {
          const backwardCurrentTime =
            backgroundVideo.duration -
            (multipliedTime % backgroundVideo.duration);

          console.log("[bg] backward animation play", backwardCurrentTime);

          backgroundVideo.currentTime = backwardCurrentTime;
        } else {
          const forwardCurrentTime = multipliedTime % backgroundVideo.duration;

          console.log("[bg] forward animation play", forwardCurrentTime);

          backgroundVideo.currentTime = forwardCurrentTime;
        }
      },
    });
  }

  backgroundVideoFunction();

  function sectionsFunction() {
    let videoSection = document.querySelectorAll(".video-section");
    let progressButtons = document.querySelectorAll(
      ".progress-buttons .button"
    );

    for (let i = 0; i < videoSection.length; i++) {
      if (videoSection[i].getAttribute("data-webgl-animation") === "true") {
        const animationContainer = videoSection[i];
        const content = animationContainer.querySelector(".content");
        const animation = animationContainer.querySelector(".webgl-animation");
        const textElements =
          animationContainer.querySelectorAll(".split-line.child");
        const { sprite, app } = initCardInsertAndLoadingAnimation({
          element: animation,
        });

        attachScrollAnimationToSection({
          trigger: animationContainer,
          content,
          video: animation,
          textElements,
          progressButton: progressButtons[i],
          id: i,
          onUpdate: (self) => {
            const frame = Math.max(
              0,
              Math.min(
                Math.round(sprite.totalFrames * self.progress),
                sprite.totalFrames - 1
              )
            );
            sprite.gotoAndStop(frame);

            app.renderer.render(app.stage);
          },
        });

        gsap.set(textElements, {
          opacity: 0,
        });
        gsap.set(animation, {
          opacity: 0,
          visibility: "hidden",
        });
      } else {
        let video = videoSection[i].querySelector(".secvens-video");
        let content = videoSection[i].querySelector(".content");
        let textElements =
          videoSection[i].querySelectorAll(".split-line.child");

        if (video) {
          async function playVideo() {
            try {
              await video.play();
            } catch (err) {
              console.log(err);
            } finally {
              video.pause();
            }
          }

          playVideo();
          video.currentTime = 0;

          gsap.set(video, {
            opacity: 0,
            visibility: "hidden",
          });
        }

        gsap.set(textElements, {
          opacity: 0,
        });

        let offsetHeight = videoSection[i].getBoundingClientRect().height * 0.2;

        progressButtons[i].addEventListener("click", () => {
          gsap.to(window, {
            duration: 1,
            scrollTo: { y: videoSection[i], offsetY: -offsetHeight },
          });
        });

        attachScrollAnimationToSection({
          trigger: videoSection[i],
          content,
          textElements,
          video,
          progressButton: progressButtons[i],
          id: i,
          onUpdate: (self) => {
            if (video) {
              // console.log(video.duration, self.progress, video.duration * self.progress)
              video.currentTime = video.duration * self.progress;
            }
          },
        });
      }
    }
  }

  timer();
  lowBatteryMode();
  vhFunction();
  splitingText();
}

export { mainPage };
