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

  let progressBarTween;
  function startPreloaderAnimation() {
    const obj = { progress: 100 };
    progressBarTween = gsap.to(obj, {
      progress: 0,
      repeat: -1,
      duration: preloader.duration,
      ease: Power0.easeIn,
      yoyoEase: Power0.easeOut,
      yoyo: true,
      onUpdate: () => {
        preloader.currentTime = preloader.duration * (obj.progress / 100);
      },
    });

    console.log("It you see it multiple times - there is a memory leak!!!", {
      progressBarTween,
    });
  }

  if (preloader.ended) {
    startPreloaderAnimation();
  } else {
    preloader.addEventListener("ended", startPreloaderAnimation, {
      once: true,
    });
  }

  let progressLine = document.querySelector(".progress-line-inner");

  loadHowlerSounds([
    sounds.foundersMintOnboarding.sprite,
    sounds.foundersMintOnboarding.primaryBackground,
    sounds.foundersMintOnboarding.finalBackground,
  ]);
  await loadWebGlAnimations();

  setTimeout(() => {
    prelodaderHide();

    preloader.removeEventListener("ended", startPreloaderAnimation);

    if (progressBarTween) {
      progressBarTween.kill();
      progressBarTween = null;
    }
  }, 2000);

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

  function backgroundVideoFunction() {
    let backgroundVideo = document.querySelector(".background-video");
    backgroundVideo.play();
  }

  backgroundVideoFunction();

  function sectionsFunction() {
    let videoSection = document.querySelectorAll(".video-section");
    let progressButtons = document.querySelectorAll(
      ".progress-buttons .button"
    );

    for (let i = 0; i < videoSection.length; i++) {
      let offsetHeight = videoSection[i].getBoundingClientRect().height * 0.2;

      progressButtons[i].addEventListener("click", () => {
        gsap.to(window, {
          duration: 1,
          scrollTo: { y: videoSection[i], offsetY: -offsetHeight },
        });
      });

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

        // progressButtons[i].addEventListener("click", () => {
        //   gsap.to(window, {
        //     duration: 1,
        //     scrollTo: { y: videoSection[i], offsetY: -offsetHeight },
        //   });
        // });
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

        // let offsetHeight = videoSection[i].getBoundingClientRect().height * 0.2;

        // progressButtons[i].addEventListener("click", () => {
        //   gsap.to(window, {
        //     duration: 1,
        //     scrollTo: { y: videoSection[i], offsetY: -offsetHeight },
        //   });
        // });

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
