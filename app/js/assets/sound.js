function sound() {

	let isPlayd = false

	function soundCheckHandler() {
		let popupSound = document.querySelector('.popup-sound')
		let buttonOnMusic = document.querySelector('.onMusic')
		let buttonOffMusic = document.querySelector('.offMusic')
		let buttonOnMusicSmall = document.querySelector('.onMusicSmall')
		let buttonOffMusicSmall = document.querySelector('.offMusicSmall')
		let smallIcon = document.querySelector('.hide-icon')
		let logoFixed = document.querySelector('.footer-logo-always')
		let allVideosWithSound = document.querySelectorAll('.error-message video, .new-mint video')

		function muteVideos () {
			allVideosWithSound.forEach(video => {
				video.muted = true
			})
		}

		function unMuteVideos() {
			allVideosWithSound.forEach(video => {
				video.muted = false
			})
		}
	
		if(window.innerWidth < 515) {
			buttonOnMusic.addEventListener('click', () => {
				unMuteVideos()
				mintAmbientSoundUnMute()
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
			muteVideos()
			mintAmbientSoundMute()
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
			unMuteVideos()
			mintAmbientSoundUnMute()
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
			muteVideos()
			mintAmbientSoundMute()
			isPlayd = false
			buttonOffMusicSmall.style.opacity = '1'
			buttonOffMusicSmall.style.zIndex = '1'
			buttonOnMusicSmall.style.opacity = '0'
			buttonOnMusicSmall.style.zIndex = '-1'
			logoFixed.classList.add('active')
		});
	
		buttonOffMusicSmall.addEventListener('click', () => {
			unMuteVideos()
			mintAmbientSoundUnMute()
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
		let clickSoundAudio = new Audio('../assets/audio/click.wav')
		clickSoundAudio.currentTime = 0
		soundClickButtons.forEach(button => {
			button.addEventListener('click', () => {
				if (!isPlayd) return
				clickSoundAudio.play();
			})
		})
	}
	
	clickSoundHandler()

	let ambientSound = new Audio('../assets/audio/ambient-start.wav')
	ambientSound.currentTime = 0
	ambientSound.loop = true

	function mintAmbientSoundHandler() {
		let mintCallButton = document.querySelector('header .mint-call')	
		mintCallButton.addEventListener('click', () => {
			ambientSound.play()
			if (!isPlayd) return
		})
	}

	mintAmbientSoundHandler()

	function mintAmbientSoundMute() {
		ambientSound.volume = 0
	}

	function mintAmbientSoundUnMute() {
		ambientSound.volume = 1
	}

}

export {sound}