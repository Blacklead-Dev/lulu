import gsap from "gsap";

/**
 * @typedef {Object} ScrollAnimationParams
 * @property {HTMLElement} trigger
 * @property {HTMLElement} content
 * @property {HTMLElement} video
 * @property {HTMLElement} textElements
 * @property {HTMLElement} progressButton
 * @property {string} id
 * @property {Function} onUpdate
 *
 * @param {*} params
 */
export function attachScrollAnimationToSection(params) {
  const { trigger, content, video, textElements, progressButton, id } = params;

  const target = trigger;
  const pin = content;

  const state = {
    onEnterFired: false,
    onLeaveFired: false,
    onEnteredBackFired: false,
    onLeaveBackFired: false,
    elementPhases: {
      prev: null,
      current: null,
    },
  };

  const elementPhases = {
    ENTERED: "entered",
    LEAVED: "leaved",
    ENTERED_BACK: "entered_back",
    LEAVED_BACK: "leaved_back",
  };

  const cache = {
    scrollProgress: 0,
  };

  const pinData = {
    attached: false,
    tween: null,
    unsubscribe () {},
  };

  function updateElementPhase(phase) {
    if (state.elementPhases.current !== phase) {
      state.elementPhases.prev = state.elementPhases.current;
      state.elementPhases.current = phase;
    }
  }

  function withSupressError(fn) {
    return function () {
      try {
        fn();
      } catch (error) {
        console.error(error);
      }
    };
  }

  const fireOnEnter = withSupressError(function onEnterWrapper() {
    if (video) {
      gsap.to(video, {
        opacity: 1,
        duration: 0.3,
        visibility: "unset",
      });
    }

    gsap.to(textElements, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      delay: 0.2,
    });

    progressButton.classList.add("active");
  });

  const fireOnLeave = withSupressError(function onLeaveWrapper() {
    gsap.killTweensOf(textElements);
    gsap.to(textElements, {
      y: "100%",
      opacity: 0,
    });
    if (video) {
      gsap.to(video, {
        opacity: 0,
        duration: 0.3,
        visibility: "hidden",
      });
    }
    progressButton.classList.remove("active");
  });

  const fireOnEnterBack = withSupressError(function onEnterBackWrapper() {
    gsap.to(textElements, {
      y: 0,
      opacity: 1,
      stagger: 0.05,
      delay: 0.2,
    });
    if (video) {
      gsap.to(video, {
        opacity: 1,
        duration: 0.3,
        visibility: "unset",
      });
    }
    progressButton.classList.add("active");
  });

  const fireOnLeaveBack = withSupressError(function onLeaveBackWrapper() {
    if (video) {
      gsap.to(video, {
        opacity: 0,
        duration: 0.3,
        visibility: "hidden",
      });
    }

    gsap.killTweensOf(textElements);
    gsap.to(textElements, {
      y: "100%",
      opacity: 0,
    });
    progressButton.classList.remove("active");
  });

  function pinElement() {
    if (pinData.attached) {
      return;
    }

    console.log(`activating pin effect for section ${id}`);
    
    pinData.attached = true;

    function setPinProperties() {
      console.log(`setting pin properties for section ${id}`);
      
      pinData.tween = gsap.set(pin, {
        position: "fixed",
        top: 0,
        left: 0,
        width: window.innerWidth || document.documentElement.clientWidth,
        minWidth: window.innerWidth || document.documentElement.clientWidth,
        height: window.innerHeight || document.documentElement.clientHeight,
        minHeight: window.innerHeight || document.documentElement.clientHeight,
      });
    }

    window.addEventListener("resize", setPinProperties);

    setPinProperties();

    pinData.unsubscribe = () => {
      console.log(`deactivating pin effect for section ${id}`);

      window.removeEventListener("resize", setPinProperties);
      
      pin.removeAttribute("style");

      pinData.tween.kill();
      pinData.tween = null;
      
      pinData.attached = false;
    }
  }

  function unpinElement() {
    if (!pinData.attached) {
      return;
    }

    pinData.unsubscribe();
  }

  console.log(`attaching scroll animation to section ${id}`);

  function update() {
    requestAnimationFrame(update);

    if (!target) {
      console.error("Target is not found!", id);
      return;
    }

    const targetRect = target.getBoundingClientRect();

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowYStart = window.scrollY || document.documentElement.scrollTop;

    const viewportYEnd = windowYStart + windowHeight;
    const viewportYStart = windowYStart + windowHeight * 0.5;
    const targetYStart =
      windowYStart + targetRect.top + targetRect.height * 0.25;
    const targetYEnd = windowYStart + targetRect.bottom;

    const viewportTopBorderInTarget =
      viewportYStart > targetYStart && viewportYStart < targetYEnd;
    // const viewportBottomBorderInTarget =
    //   viewportYEnd > targetYStart && viewportYEnd < targetYEnd;

    const logValues = {
      viewportYStart,
      viewportYEnd,
      targetYStart,
      targetYEnd,
      viewportTopBorderInTarget,
      // viewportBottomBorderInTarget,
    };

    if (viewportTopBorderInTarget) {
      pinElement();

      const progressPrecision = 10000;
      /**
       * The full height of the section
       * From the start point - top of the target by default
       * To the end point - bottom of the target by default
       */
      const fullPathToScroll = Math.abs(targetYStart - targetYEnd);
      /**
       * The progress of the animation
       * From viewport top to the end of the section
       */
      const targetProgressOnScrollPath = Math.max(
        0,
        Math.round(
          progressPrecision -
            (Math.abs(targetYEnd - viewportYStart) / fullPathToScroll) *
              progressPrecision
        ) / progressPrecision
      );

      if (!state.onEnterFired && state.elementPhases.current === null) {
        console.log(`section's ${id} onEnter fired`, logValues);

        fireOnEnter();

        state.onEnterFired = true;
        updateElementPhase(elementPhases.ENTERED);
      }

      const isLeavedPhase = [
        elementPhases.LEAVED,
        elementPhases.LEAVED_BACK,
      ].includes(state.elementPhases.current);
      if (!state.onEnteredBackFired && isLeavedPhase) {
        console.log(`section's ${id} onEnterBack fired`, logValues);

        fireOnEnterBack();

        state.onLeaveBackFired = false;
        state.onEnteredBackFired = true;
        updateElementPhase(elementPhases.ENTERED_BACK);
      }

      if (cache.scrollProgress !== targetProgressOnScrollPath) {
        console.log(
          `section's ${id} animation progress: ${targetProgressOnScrollPath}`
        );

        cache.scrollProgress = targetProgressOnScrollPath;

        if (typeof params.onUpdate === "function") {
          params.onUpdate({
            progress: targetProgressOnScrollPath,
          });
        }
      }
    } else {
      unpinElement();

      if (
        !state.onLeaveFired &&
        state.elementPhases.current === elementPhases.ENTERED
      ) {
        console.log(`section's ${id} onLeave fired`, logValues);

        fireOnLeave();

        state.onLeaveFired = true;
        updateElementPhase(elementPhases.LEAVED);
      }

      if (
        !state.onLeaveBackFired &&
        state.elementPhases.current === elementPhases.ENTERED_BACK
      ) {
        console.log(`section's ${id} onLeaveBack fired`, logValues);

        fireOnLeaveBack();

        state.onEnteredBackFired = false;
        state.onLeaveBackFired = true;
        updateElementPhase(elementPhases.LEAVED_BACK);
      }
    }
  }

  requestAnimationFrame(update);
}

/**
 * @typedef {Object} ScrollAnimationParams
 * @property {Function} onUpdate
 *
 * @param {ScrollAnimationParams} params
 */
export function attachScrollAnimationToBackground(params) {
  const cache = {
    scrollProgress: 0,
  };

  function update() {
    requestAnimationFrame(update);

    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowYStart = window.scrollY || document.documentElement.scrollTop;

    // const viewportYEnd = windowYStart + windowHeight;
    const viewportYStart = windowYStart;
    const targetYStart = 0;
    const targetYEnd = document.documentElement.scrollHeight;

    // console.log("background animation values", {
    //   viewportYEnd,
    //   viewportYStart,
    //   targetYStart,
    //   targetYEnd,
    // });

    const progressPrecision = 10000;
    /**
     * Full height of the page minus the last screen
     */
    const fullPathToScroll = Math.abs(targetYStart - targetYEnd) - windowHeight;
    /**
     * The progress of the animation
     * From viewport top to the end of the page miuns the last screen
     */
    const targetProgressOnScrollPath = Math.max(
      0,
      Math.round(
        progressPrecision -
          (Math.abs(targetYEnd - windowHeight - viewportYStart) /
            fullPathToScroll) *
            progressPrecision
      ) / progressPrecision
    );

    if (cache.scrollProgress !== targetProgressOnScrollPath) {
      cache.scrollProgress = targetProgressOnScrollPath;

      try {
        params.onUpdate({
          progress: targetProgressOnScrollPath,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  requestAnimationFrame(update);
}
