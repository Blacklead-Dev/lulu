import gsap from "gsap";
import { sounds } from "./sounds";
import { playSound } from "./soundUtils";
import { initHolderMintAnimation } from "./webGlAnimations";
import { deviceIs } from "./device";
import { runHookFn } from "./commonUtils";
import { createHtmlWritter, writeString } from "./typingAnimation";

/**
 * @typedef {Object} HolderMintOptions
 * @property {boolean} foundersMintActive - is mint button enabled
 */

/**
 * @typedef {Object} MintOptions
 * @property {boolean} connectWalledEnabled - is connect wallet button enabled
 * @property {Function} [onMintOpen] - callback when any mint is opened
 * @property {HolderMintOptions} holderMintOptions - options for holder mint
 * @property {'simple-and-holder' | 'error' | 'public'} mintFlow - the type of mint flow
 */

/**
 * @param {MintOptions} options
 */
function mint(options) {
  let price = 0.2;

  function main() {
    let connectWalletLink = document.querySelector("header .connect");
    let website = document.querySelector("html");
    // let popupSound = document.querySelector(".popup-sound");
    let logoFixed = document.querySelector(".footer-logo-always");

    let holder = true;
    let mintCallButton = document.querySelector("header .mint-call");

    if (!options.connectWalledEnabled) {
      connectWalletLink.classList.add("hide");
    } else {
      connectWalletLink.addEventListener("click", (e) => {
        e.preventDefault();
        //popup metamast, connect wallet, and get info about client: holder, or not?
        //if holder => holder = true
        setTimeout(() => {
          mintCallButton.classList.add("active");
          mintCallButton.addEventListener("click", (e) => {
            e.preventDefault();
            runHookFn(options.onMintOpen);

            website.classList.add("unscroll");
            mintCallButton.classList.add("inside");
            connectWalletLink.classList.add("hide");
            logoFixed.classList.add("active");
            // popupSound.classList.add("active");
            // popupSound.classList.add("mintact");
            // if (window.innerWidth < 515) {
            //   popupSound.classList.add("totop");
            // }
            switch (options.mintFlow) {
              case "error":
                errorMint();
                break;
              case "simple-and-holder":
                let enrolmentDateKey = "odlabs/lulu/enrolment-date";
                let enrolmentDate = localStorage.getItem(enrolmentDateKey);

                if (!enrolmentDate) {
                  simpleMintVersion({
                    onComplete: function () {
                      console.log("simple mint completed");

                      localStorage.setItem(
                        enrolmentDateKey,
                        new Date().toISOString()
                      );
                    },
                  });
                } else {
                  holderMint(options.holderMintOptions);
                }
                break;
              case "public":
                publicMint();
                break;
              default:
                throw new Error(`Unknown mint flow: ${options.mintFlow}`);
            }
          });
        }, 0);
      });
    }
  }

  main();

  function simpleMintVersion(params) {
    let newMint = document.querySelector(".new-mint");
    let pixelate = document.querySelector(".pixelate");
    let burnCard = document.querySelector(".burn-card");
    let burnCardLooped = document.querySelector(".burn-card-looped");
    let cardInsert = newMint.querySelector(".card-insert");
    let fnicLoading = newMint.querySelector(".fnic-loading");
    let fnicAuthorised = newMint.querySelector(".fnic-authorised");
    let selfDestruct = newMint.querySelector(".self-destruct");
    let staticNoise = newMint.querySelector(".static-noise");
    let burnSuccess = newMint.querySelector(".burn-success");
    let seeYou = newMint.querySelector(".see-you");

    playSound(sounds.foundersMintOnboarding.primaryBackground, {
      loop: true,
      fade: { inPercent: 25 },
    });

    newMint.classList.add("active");
    setTimeout(() => {
      pixelate.play();
      playSound(sounds.foundersMintOnboarding.welcomeKeyboardTypingSprite, {
        sprite: "welcome",
      });
    }, 600);

    pixelate.addEventListener("ended", function () {
      gsap.set(pixelate, {
        display: "none",
      });
      gsap.to(burnCard, {
        visibility: "visible",
      });

      burnCard.play();
      setTimeout(function () {
        playSound(sounds.foundersMintOnboarding.welcomeKeyboardTypingSprite, {
          sprite: "burn",
        });
      }, 1000);
    });

    burnCard.addEventListener("ended", function () {
      gsap.set(burnCard, {
        display: "none",
      });
      gsap.to(burnCardLooped, {
        visibility: "visible",
      });
      burnCardLooped.play();
    });

    burnCardLooped.addEventListener("click", (e) => {
      e.preventDefault();

      //were waiting for accept from client and getting response
      setTimeout(() => {
        startCardInserd();
      }, 0);
    });

    /**
     * Animation timeframe
     * - finc autorized animations - two times
     * - self destruct - three fires
     * - static noise - one time
     * - burn successful - one time
     * - see you on mint date - one time
     */
    function startCardInserd() {
      burnCardLooped.pause();

      sounds.foundersMintOnboarding.primaryBackground.fade(1, 0, 1000);
      setTimeout(() => {
        sounds.foundersMintOnboarding.primaryBackground.stop();
      }, 1000);

      playSound(sounds.foundersMintOnboarding.finalBackground, {
        loop: true,
        volume: 0.5,
        fade: {
          inPercent: 25,
          outPercent: 25,
        },
      });

      gsap.to(burnCardLooped, {
        display: "none",
      });
      gsap.to(cardInsert, {
        delay: 0.2,
        display: "flex",
      });
      cardInsert.play();

      cardInsert.addEventListener("ended", function () {
        gsap.to(cardInsert, {
          display: "none",
        });
        gsap.set(fnicLoading, {
          display: "flex",
        });

        fnicLoading.play();
      });
      fnicLoading.addEventListener("ended", function () {
        gsap.to(fnicLoading, {
          display: "none",
        });
        gsap.to(fnicAuthorised, {
          display: "flex",
        });
        fnicAuthorised.play();
        playSound(sounds.foundersMintOnboarding.sprite, {
          sprite: "fnicAutohrized",
          rate: 0.85,
        });
        // const sound = sounds.foundersMintOnboarding.fnicLoading
        // const id = sound.play()
        // sound.rate(0.85, id)
      });
      fnicAuthorised.addEventListener("ended", function () {
        gsap.to(selfDestruct, {
          display: "flex",
        });
        gsap.to(fnicAuthorised, {
          display: "none",
        });
        selfDestruct.play();
        playSound(sounds.foundersMintOnboarding.sprite, {
          sprite: "selfDestruct",
          rate: 0.85,
        });
        // const sound = sounds.foundersMintOnboarding.selfDestruct
        // const id = sound.play()
        // sound.rate(0.85, id)
      });
      selfDestruct.addEventListener("ended", function () {
        // seeYou.play()
        gsap.to(selfDestruct, {
          display: "none",
        });
        gsap.to(staticNoise, {
          display: "flex",
        });
        staticNoise.play();
        playSound(sounds.foundersMintOnboarding.sprite, {
          sprite: "staticNoise",
          rate: 0.6,
        });
        // const sound = sounds.foundersMintOnboarding.staticNoise
        // const id = sound.play()
        // sound.rate(0.6, id)
        // gsap.set(seeYou, {
        // 	display: 'flex',
        // })

        // if (typeof params.onComplete === 'function') {
        // 	params.onComplete();
        // }
      });
      staticNoise.addEventListener("ended", function () {
        gsap.to(staticNoise, {
          display: "none",
        });
        gsap.to(burnSuccess, {
          display: "flex",
        });
        burnSuccess.play();
        playSound(sounds.foundersMintOnboarding.sprite, {
          sprite: "keyboardTypingSuccess",
          rate: 0.7,
        });
        // const sound = sounds.foundersMintOnboarding.sprite;
        // const id = sound.play("keyboardTypingSuccess");
        // sound.rate(0.7, id);
      });
      // fnicAuthorised.addEventListener('ended', function() {
      // 	gsap.to(fnicAuthorised, {
      // 		display: 'none'
      // 	})
      // 	gsap.to(seeYou, {
      // 		display: 'flex'
      // 	})
      // 	seeYou.play()
      // })
      burnSuccess.addEventListener("ended", function () {
        gsap.to(burnSuccess, {
          display: "none",
        });
        gsap.to(seeYou, {
          display: "flex",
        });
        seeYou.play();
        playSound(sounds.foundersMintOnboarding.sprite, {
          sprite: "seeYou",
          rate: 0.75,
        });
        // const sound = sounds.foundersMintOnboarding.sprite;
        // const id = sound.play("seeYou");
        // sound.rate(0.75, id);

        if (typeof params.onComplete === "function") {
          params.onComplete();
        }
      });
    }
  }

  /**
   *
   * @param {HolderMintOptions} options
   */
  function holderMint(options = {}) {
    let holdersMintBlock = document.querySelector(".holders-mint");
    let videoWrapper = holdersMintBlock.querySelector(".from-video");
    // let lulusha = holdersMintBlock.querySelector(".lulusha");
    let cardInsert = holdersMintBlock.querySelector(".card-insert");
    let fnicLoading = holdersMintBlock.querySelector(".fnic-loading");
    let fnicAuthorised = holdersMintBlock.querySelector(".fnic-authorised");
    let holdersContentRight = holdersMintBlock.querySelector(
      ".fnic-section .content-right"
    );
    let holdersContentLeft = holdersMintBlock.querySelector(
      ".fnic-section .content-left"
    );
    let fnicSection = holdersMintBlock.querySelector(".fnic-section");
    let afterSuccessful = holdersMintBlock.querySelector(
      ".after-successful-section"
    );
    let selfDestruct = holdersMintBlock.querySelector(".self-destruct");
    let staticNoise = holdersMintBlock.querySelector(".static-noise");
    let flash = holdersMintBlock.querySelector(".flash");
    let lulushaAfter = holdersMintBlock.querySelector(".lulusha-after");
    let scanLulu = afterSuccessful.querySelector(".scan-lulu");
    let successfulText = afterSuccessful.querySelector(".successful-text");
    let afterSuccessfulContent = afterSuccessful.querySelector(".content");
    let foundersMintOfflineText = holdersMintBlock.querySelector(
      ".animation-fnic-text .offline"
    );
    let foundersMintNowLiveText = holdersMintBlock.querySelector(
      ".animation-fnic-text .now-live"
    );
    let useFnicCardButton = holdersMintBlock.querySelector(".animation-fnic");
    let burnAndMintButton = holdersMintBlock.querySelector(".burn-button");

    const holderMintLuluAnimation = initHolderMintAnimation({
      element: videoWrapper,
      scaleFn: (x, y) => Math.min(x, y) * (deviceIs().mobile ? 0.85 : 0.5),
    });

    // let foundersMintActive = true;
    if (options.foundersMintActive) {
      gsap.to(foundersMintOfflineText, {
        display: "none",
        duration: 0,
      });
      gsap.to(foundersMintNowLiveText, {
        display: "inline",
        duration: 0,
      });

      useFnicCardButton.addEventListener("click", (e) => {
        e.preventDefault();
        useFnicCardButton.classList.add("active");

        //were waiting for accept from client and getting response
        // setTimeout(() => {
        // 	useFnicCard()
        // }, 2000);
        useFnicCard();
      });
    }

    holdersMintBlock.classList.add("active");

    // gsap.to([holdersMintBlock, lulusha], 3, {
    gsap.to([holdersMintBlock], 3, {
      display: "flex",
    });
    // lulusha.play();
    if (window.innerWidth < 515) {
      gsap.to(holdersContentLeft, 3, {
        display: "flex",
        zIndex: 2,
      });
    }

    function useFnicCard() {
      // gsap.set(lulusha,{
      // 	display: 'none'
      // })
      // gsap.set(cardInsert,{
      // 	display: 'flex'
      // })
      // cardInsert.play()
      //
      // cardInsert.addEventListener('ended', function() {
      // 	gsap.set(cardInsert,{
      // 		display: 'none'
      // 	})
      // 	gsap.set(fnicLoading,{
      // 		display: 'flex'
      // 	})
      // 	fnicLoading.play()
      // });
      // fnicLoading.addEventListener('ended', function() {
      // 	gsap.set(fnicLoading, {
      // 		display: 'none'
      // 	})
      // 	gsap.to(fnicAuthorised, {
      // 		display: 'flex'
      // 	})
      // 	fnicAuthorised.play()
      // 	gsap.to(holdersContentRight, .5, {
      // 		display: 'flex',
      // 		y: 0,
      // 		opacity: 1,
      // 		delay: .7
      // 	})
      // 	if(window.innerWidth < 515){
      // 		gsap.to(holdersContentLeft, .3, {
      // 			display: 'none',
      // 			y: '1rem',
      // 			opacity: 0,
      // 			zIndex: -1
      // 		})
      // 	}
      // })
      console.log("use fnic");

      gsap.to(holdersContentRight, 0.5, {
        display: "flex",
        y: 0,
        opacity: 1,
        // delay: .7
      });

      if (window.innerWidth < 515) {
        gsap.to(holdersContentLeft, 0.3, {
          display: "none",
          y: "1rem",
          opacity: 0,
          zIndex: -1,
        });
      }
    }

    burnAndMintButton.addEventListener("click", (e) => {
      e.preventDefault();
      burnAndMintButton.classList.add("active");

      //were waiting for signing from clienr and burning
      setTimeout(() => {
        holderMintLuluAnimation.app.destroy(true, {
          children: true,
        });

        burnAndMint();
      }, 2000);
    });

    function burnAndMint() {
      // gsap.set(fnicAuthorised, {
      // 	display: 'none'
      // })
      // @TODO: determine what it the goal of fnicSection
      // gsap.set(fnicSection, {
      // 	display: 'none'
      // })
      //   gsap.to(afterSuccessful, 3, {
      gsap.set(afterSuccessful, {
        display: "flex",
      });

      const luluAnimationWrapper =
        afterSuccessful.querySelector(".lulu-anim-wrapper");
      const luluAnimation = initHolderMintAnimation({
        element: luluAnimationWrapper,
        scaleFn: (x, y) => Math.min(x, y),
      });

      // gsap.set(selfDestruct, {
      // 	display: 'flex',
      // })
      // selfDestruct.play()
      // if(window.innerWidth < 515){ // @TODO: move mobile breakpoint value to a constant or the entire check to a function
      // 	gsap.to(selfDestruct, .5, {
      // 		y: '1rem'
      // 	})
      // }
      // selfDestruct.addEventListener('ended', function() {
      // 	gsap.set(selfDestruct, {
      // 		display: 'none'
      // 	})
      // 	gsap.set(staticNoise, {
      // 		display: 'flex',
      // 	})
      // 	staticNoise.play()
      // 	if(window.innerWidth < 515){
      // 		gsap.to(staticNoise, 0, {
      // 			y: '1rem'
      // 		})
      // 	}
      // })

      ////////wait answer //////
      // setTimeout(() => {
      // 	gsap.to(staticNoise, .3, {
      // 		display: 'none'
      // 	})
      // 	gsap.to(scanLulu, .7, {
      // 		display: 'flex',
      // 		scale: '1'
      // 	})
      // 	gsap.to(lulushaAfter, .7, {
      // 		display: 'flex',
      // 		scale: 1
      // 	})
      // }, 2000);
      // staticNoise.addEventListener('ended', function() {
      // 	gsap.set(staticNoise, {
      // 		display: 'none'
      // 	})
      gsap.set(flash, {
        display: "flex",
      });
      flash.play();
      gsap.to(scanLulu, 0.7, {
        display: "flex",
        scale: "1",
        delay: 0.3,
      });
      gsap.to(lulushaAfter, 0.7, {
        display: "flex",
        scale: 1,
        delay: 0.3,
      });
      gsap.fromTo(
        luluAnimationWrapper,
        { scale: 0 },
        {
          scale: 1,
          delay: 0.3,
        }
      );

      scanLulu.play();
      //   lulushaAfter.play();
      // })

      scanLulu.addEventListener("ended", function () {
        gsap.set(scanLulu, {
          display: "none",
        });
        if (window.innerWidth < 515) {
          console.log("aaaaa");
          gsap.to(successfulText, 0.3, {
            opacity: 1,
            y: 0,
          });
          gsap.to(luluAnimationWrapper, 0.3, {
            y: "1.9rem",
          });
          gsap.to(successfulText, 0.5, {
            delay: 4,
            opacity: 0,
            y: "1rem",
          });
          gsap.to(afterSuccessfulContent, 0.5, {
            delay: 4,
            opacity: 1,
            y: "0",
          });
          gsap.to(luluAnimationWrapper, 0.5, {
            delay: 4,
            scale: 1,
            y: "-1rem",
          });
          // afterSuccessful.classList.add('over')
        } else {
          gsap.to(successfulText, 0.3, {
            opacity: 1,
            y: "-3rem",
          });
          gsap.to(successfulText, 0.5, {
            delay: 4,
            opacity: 0,
            y: "0rem",
          });
          gsap.to(afterSuccessfulContent, 0.5, {
            delay: 4,
            opacity: 1,
            y: "0",
          });
          gsap.to(luluAnimationWrapper, 0.5, {
            delay: 4,
            scale: 1.2,
            y: "0rem",
          });
        }
      });
      console.log("burn and mint");
    }

    function mintCalculation() {
      const addButton = document.querySelector(".plus");
      const minusButton = document.querySelector(".minus");
      const fromInput = document.querySelector(".from-input");
      const numberElement = document.querySelector(".number");
      let total = document.querySelector(".total span");
      let number = 1;
      ///price
      total.innerHTML = price * number;
      minusButton.disabled = true;
      minusButton.style.color = "gray";
      const updateMinusButtonState = () => {
        if (number > 0) {
          minusButton.disabled = false;
          minusButton.style.color = "white";
          addButton.style.color = "white";
        } else {
          minusButton.disabled = true;
          minusButton.style.color = "gray";
          addButton.style.color = "white";
        }
        if (number >= 5) {
          addButton.style.color = "gray";
        } else {
          addButton.style.color = "white";
        }
      };
      addButton.addEventListener("click", () => {
        function createNewMintInput() {
          const input = document.createElement("input");
          input.type = "text";
          input.placeholder = "enter your wallet address";

          return input;
        }

        if (number < 5) {
          fromInput.appendChild(createNewMintInput());
          fromInput.appendChild(createNewMintInput());

          number++;
          numberElement.textContent = number;
          total.innerHTML = (price * number).toFixed(1);
          updateMinusButtonState();
        }
      });
      minusButton.addEventListener("click", () => {
        function removeMintInput() {
          const lastInput = fromInput.lastElementChild;
          if (!lastInput) {
            return false;
          }

          fromInput.removeChild(lastInput);

          return true;
        }

        let removeResults = [];

        removeResults.push(removeMintInput());
        removeResults.push(removeMintInput());

        if (!removeResults.some(Boolean)) {
          return;
        }

        number--;
        numberElement.textContent = number;
        total.innerHTML = (price * number).toFixed(1);
        updateMinusButtonState();
      });
    }

    mintCalculation();

    function tabs() {
      const tabComp = document.querySelector(".composition");
      const tabRewards = document.querySelector(".rewards");
      const tabs = document.querySelector(".tabs");
      const containerInside = document.querySelector(".tabs-container");
      tabRewards.addEventListener("click", () => {
        tabs.classList.add("active");
        containerInside.classList.add("active");
      });
      tabComp.addEventListener("click", () => {
        tabs.classList.remove("active");
        containerInside.classList.remove("active");
      });
    }

    tabs();
  }

  function publicMint() {
    let publicMintBlock = document.querySelector(".public-mint");
    let lulusha = publicMintBlock.querySelector(".lulusha");
    let fnicPub = publicMintBlock.querySelector(".fnic-section");
    let fnicPubContent = fnicPub.querySelector(".content");
    let scanLuluPub = fnicPub.querySelector(".scan-lulu");
    let successfulText = fnicPub.querySelector(".successful-text");
    publicMintBlock.classList.add("active");

    let publicMintButton = publicMintBlock.querySelector(".pubburn-button");
    publicMintButton.addEventListener("click", (e) => {
      e.preventDefault();
      publicMintButton.classList.add("active");

      //were waiting for signing from clienr and burning
      setTimeout(() => {
        publicMint();
      }, 2000);
    });

    function publicMint() {
      gsap.to(fnicPubContent, 0, {
        opacity: 0,
        zIndex: -2,
      });
      gsap.set(fnicPub, {
        height: "unset",
      });

      gsap.set(lulusha, {
        scale: 0,
      });
      gsap.to(lulusha, 0.7, {
        scale: 1,
        y: "1rem",
      });
      gsap.to(scanLuluPub, 0.7, {
        display: "flex",
        scale: "1",
      });
      scanLuluPub.play();
      fnicPub.classList.add("active");
      /////or waiting answer////
      scanLuluPub.addEventListener("ended", function () {
        gsap.set(scanLuluPub, {
          display: "none",
        });
        gsap.to(successfulText, 0.3, {
          opacity: 1,
          y: "-3rem",
        });
        if (window.innerWidth < 515) {
          gsap.to(lulusha, 0.3, {
            y: "3rem",
          });
          gsap.to(successfulText, 0.3, {
            opacity: 1,
            y: "0",
          });
          gsap.to(successfulText, 0.5, {
            delay: 4,
            opacity: 0,
            y: "2rem",
          });
        }
        gsap.to(lulusha, 0.5, {
          delay: 4,
          scale: 1,
          y: "0rem",
        });
        gsap.to(successfulText, 0.5, {
          delay: 4,
          opacity: 0,
          y: "-3rem",
        });
        gsap.to(fnicPub, 0, {
          delay: 4,
          height: "calc(var(--vh, 1vh) * 100)",
        });
        gsap.to(fnicPubContent, 0.5, {
          delay: 4,
          opacity: 1,
          zIndex: 1,
        });
      });
    }

    function mintCalculation() {
      const addButtonPub = document.querySelector(".plus-public");
      const minusButtonPub = document.querySelector(".minus-public");
      const numberElementPub = document.querySelector(".number-public");
      let totalPub = document.querySelector(".total-public span");
      let numberPub = 1;
      totalPub.innerHTML = price * numberPub;
      minusButtonPub.disabled = true;
      minusButtonPub.style.color = "gray";

      const updateMinusButtonState = () => {
        if (numberPub > 0) {
          minusButtonPub.disabled = false;
          minusButtonPub.style.color = "white";
          addButtonPub.style.color = "white";
        } else {
          minusButtonPub.disabled = true;
          minusButtonPub.style.color = "gray";
          addButtonPub.style.color = "white";
        }
        if (numberPub >= 2) {
          addButtonPub.style.color = "gray";
        } else {
          addButtonPub.style.color = "white";
        }
      };

      addButtonPub.addEventListener("click", () => {
        if (numberPub < 2) {
          numberPub++;
          numberElementPub.textContent = numberPub;
          totalPub.innerHTML = (price * numberPub).toFixed(1);
          updateMinusButtonState();
          minusButtonPub.style.pointerEvents = "visible";
        } else {
          addButtonPub.style.color = "gray";
        }
      });

      minusButtonPub.addEventListener("click", () => {
        numberPub--;
        numberElementPub.textContent = numberPub;
        totalPub.innerHTML = (price * numberPub).toFixed(1);
        updateMinusButtonState();
        if (numberPub <= 0) {
          minusButtonPub.style.pointerEvents = "none";
        }
      });
    }

    mintCalculation();
  }

  async function errorMint() {
    const blockError = document.querySelector(".error-message");
    const details = blockError.querySelector(".error-message_details");

    blockError.classList.add("active");

    async function createNewElementAndWriteString({
      parent,
      text,
      duration = 1000,
    } = {}) {
      const item = document.createElement("p");
      parent.appendChild(item);

      const itemWriter = createHtmlWritter(item);
      await writeString(text, { writter: itemWriter, duration });

      return {
        destroy() {
          parent.removeChild(item);
        },
        scrollIntoView() {
          item.scrollIntoView({ behavior: "smooth" });
        },
      };
    }

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    const accessTexts = [
      { title: "> Access od security", text: "Access: permission denied" },
      { title: "> Access od security grid", text: "Access: permission denied" },
      {
        title: "> Access main od security grid",
        text: "Access: permission denied...and...",
      },
    ];
    for (const { title, text } of accessTexts) {
      const item = document.createElement("div");
      details.appendChild(item);

      await createNewElementAndWriteString({
        parent: item,
        text: title,
        duration: 2000,
      });

      await delay(500);

      playSound(sounds.errorMint.sprite, {
        sprite: "accessDenied",
      });
      await createNewElementAndWriteString({ parent: item, text, duration: 0 });

      await delay(2000);
    }

    let prevTime = 0;
    const pxPerSec = 140;
    function updateScrollPosition(time) {
      const currentTime = Date.now();

      if (!prevTime) {
        prevTime = currentTime;
      }
      const timeDiff = currentTime - prevTime;
      const scrollBy = (pxPerSec * timeDiff) / 1000;

      prevTime = currentTime;

      blockError.scroll(0, blockError.scrollTop + scrollBy);

      requestAnimationFrame(updateScrollPosition);
    }

    requestAnimationFrame(updateScrollPosition);

    playSound(sounds.errorMint.sprite, {
      sprite: "accessAttemptFailed",
    }).once("end", function () {
      playSound(sounds.errorMint.sprite, {
        sprite: "noNoNo",
        loop: true,
      });
    });

    const loopTextContainer = document.createElement("div");
    details.appendChild(loopTextContainer);
    const loopItems = [];
    while (true) {
      const item = await createNewElementAndWriteString({
        parent: loopTextContainer,
        text: "You didn’t say the magic word!",
        duration: 300,
      });

      loopItems.push(item);

      if (loopItems.length > 30) {
        loopItems.shift().destroy();
      }
    }
  }
}

export { mint };
