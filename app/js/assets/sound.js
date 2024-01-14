import { playSound } from "./soundUtils";
import { sounds } from "./sounds";

function sound() {

	function disableSounds() {
		Howler.mute(true);
	}

	function enableSounds() {
		Howler.mute(false);
	}

	let isPlayd = true
	// let currentSound

	function soundCheckHandler() {
		let popupSound = document.querySelector('.popup-sound')
		let buttonOnMusic = document.querySelector('.onMusic')
		let buttonOffMusic = document.querySelector('.offMusic')
		let buttonOnMusicSmall = document.querySelector('.onMusicSmall')
		let buttonOffMusicSmall = document.querySelector('.offMusicSmall')
		let smallIcon = document.querySelector('.hide-icon')
		let logoFixed = document.querySelector('.footer-logo-always')
	
		if(window.innerWidth < 515) {
			buttonOnMusic.addEventListener('click', () => {
				enableSounds();

				isPlayd = true
				popupSound.classList.add('active')
				smallIcon.classList.add('active')
				buttonOffMusicSmall.style.opacity = '0'
				buttonOffMusicSmall.style.zIndex = '-1'
				buttonOnMusicSmall.style.opacity = '1'
				buttonOnMusicSmall.style.zIndex = '1'
				logoFixed.classList.add('active')
			});
		}
	
		buttonOffMusic.addEventListener('click', () => {
			disableSounds();

			isPlayd = false
			popupSound.classList.add('active')
			smallIcon.classList.add('active')
			buttonOnMusicSmall.style.opacity = '0'
			buttonOnMusicSmall.style.zIndex = '-1'
			buttonOffMusicSmall.style.opacity = '1'
			buttonOffMusicSmall.style.zIndex = '1'
			document.body.classList.remove('unscroll')
			logoFixed.classList.add('active')
		});
	
		buttonOnMusic.addEventListener('click', () => {
			enableSounds();

			isPlayd = true
			popupSound.classList.add('active')
			smallIcon.classList.add('active')
			buttonOffMusicSmall.style.opacity = '0'
			buttonOffMusicSmall.style.zIndex = '-1'
			buttonOnMusicSmall.style.opacity = '1'
			buttonOnMusicSmall.style.zIndex = '1'
			document.body.classList.remove('unscroll')
			logoFixed.classList.add('active')
		});
		buttonOnMusicSmall.addEventListener('click', () => {
			disableSounds();

			isPlayd = false
			buttonOffMusicSmall.style.opacity = '1'
			buttonOffMusicSmall.style.zIndex = '1'
			buttonOnMusicSmall.style.opacity = '0'
			buttonOnMusicSmall.style.zIndex = '-1'
			logoFixed.classList.add('active')
		});
	
		buttonOffMusicSmall.addEventListener('click', () => {
			enableSounds();
			
			isPlayd = true
			buttonOnMusicSmall.style.opacity = '1'
			buttonOnMusicSmall.style.zIndex = '1'
			buttonOffMusicSmall.style.opacity = '0'
			buttonOffMusicSmall.style.zIndex = '-1'
			logoFixed.classList.add('active')
		});
	}
	
	soundCheckHandler()

	function clickSoundHandler() {
		let soundClickButtons = document.querySelectorAll('.sound-click')
		// let clickSoundAudio = new Audio('../assets/audio/click.wav')
		// clickSoundAudio.currentTime = 0
		soundClickButtons.forEach(button => {
			button.addEventListener('click', () => {
				playSound(sounds.mintBtnClick);
			})
		})
	}
	
	clickSoundHandler()

	// function minSoundHandler() {
	// 	let mintCallButton = document.querySelector('header .mint-call')
	// 	let typingSoundAudio = new Audio('../assets/audio/pixelate.wav')
	// 	typingSoundAudio.currentTime = 0
	// 	// typingSoundAudio.volume = 0
	// 	mintCallButton.addEventListener('click', () => {
	// 		currentSound = typingSoundAudio
	// 		typingSoundAudio.play()
			

	// 		if (!isPlayd) return
	// 		// currentSound.volume = 1.0
	// 	})
	// }

	// minSoundHandler()

}

/**
 * @deprecated
 */
function runTypingSound() {
	// let mintCallButton = document.querySelector('header .mint-call')
	// let typingSoundAudio = new Audio('../assets/audio/pixelate.wav')
	// typingSoundAudio.currentTime = 0
	// typingSoundAudio.volume = 0
	// mintCallButton.addEventListener('click', () => {
		// currentSound = typingSoundAudio
		// typingSoundAudio.play()
		

		// if (!isPlayd) return
		// currentSound.volume = 1.0
	// })
}

export {
	sound,
	runTypingSound,
}