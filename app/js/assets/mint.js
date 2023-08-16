function mint() {
    let price = 0.2;
    let isBurnCardClicked = false;
    let isLoaded = true; //change this to false when web 3.0

    function main() {
        let connectWalletLink = document.querySelector("header .connect");
        let website = document.querySelector("html");
        let popupSound = document.querySelector(".popup-sound");
        let logoFixed = document.querySelector(".footer-logo-always");

        let holder = true;
        let mintCallButton = document.querySelector("header .mint-call");
        connectWalletLink.addEventListener("click", (e) => {
            e.preventDefault();
            //popup metamast, connect wallet, and get info about client: holder, or not?
            //if holder => holder = true
            setTimeout(() => {
                mintCallButton.classList.add("active");
                mintCallButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    website.classList.add("unscroll");
                    mintCallButton.classList.add("inside");
                    connectWalletLink.classList.add("hide");
                    logoFixed.classList.add("active");
                    popupSound.classList.add("active");
                    popupSound.classList.add("mintact");
                    if (window.innerWidth < 515) {
                        popupSound.classList.add("totop");
                    }
                    if (holder) {
                        simpleMintVersion();
                        // holderMint()
                        // errorMint()
                    } else {
                        // publicMint()
                    }
                });
            }, 0);
        });
    }

    main();

    function simpleMintVersion() {
        let newMint = document.querySelector(".new-mint");
        let mintVideo = document.querySelector(".pixelate");
        let burnCardButton = document.querySelector(
            ".new-mint-burn-card-button"
        );

        newMint.classList.add("active");
        setTimeout(() => {
            mintVideo.play();
        }, 300);

        burnCardButton.addEventListener("click", () => {
            console.log("click");
            burnCardButton.classList.remove("active");
            isBurnCardClicked = true;
            mintVideo.currentTime = 26.9; //26.9
        });

        function loadingSuccess() {
            isLoaded = true; // TODO  ACCESS this function on callback from web 3.0
            mintVideo.currentTime = 33.35;
        }
        function videoDuration() {
            console.log(mintVideo.currentTime)
            if (mintVideo.currentTime > 10 && !isBurnCardClicked)
                burnCardButton.classList.add("active");
            if (mintVideo.currentTime > 24.2 && !isBurnCardClicked)
                mintVideo.currentTime = 10.5;
            if (mintVideo.currentTime > 33.35 && !isLoaded)
                mintVideo.currentTime = 31.25;
            if (mintVideo.currentTime > 76) mintVideo.currentTime = 65.6;

            requestAnimationFrame(videoDuration);
        }

        videoDuration();
    }

    function errorMint() {
        let blockError = document.querySelector(".error-message");
        blockError.classList.add("active");
        video.pause();
        // video.muted = false
        setTimeout(() => {
            video.play();
        }, 2000);
    }
}

export { mint };
