function sound() {
	let popupSound = document.querySelector('.popup-sound')
	let buttonOnMusic = document.querySelector('.onMusic')
	let buttonOffMusic = document.querySelector('.offMusic')
	let buttonOnMusicSmall = document.querySelector('.onMusicSmall')
	let buttonOffMusicSmall = document.querySelector('.offMusicSmall')
	let smallIcon = document.querySelector('.hide-icon')
	let video = document.getElementById('myVideo');
	let logoFixed = document.querySelector('.footer-logo-always')
	if(window.innerWidth < 515) {
		buttonOnMusic.addEventListener('click', () => {
			video.muted = false;
			video.pause()
			// console.log('Звук включен');
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
		video.muted = true;
		// console.log('Звук выключен');
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
		video.muted = false;
		// console.log('Звук включен');
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
		video.muted = true;
		// console.log('Звук выключенннннннн');
		buttonOffMusicSmall.style.opacity = '1'
		buttonOffMusicSmall.style.zIndex = '1'
		buttonOnMusicSmall.style.opacity = '0'
		buttonOnMusicSmall.style.zIndex = '-1'
		logoFixed.classList.add('active')
	});

	buttonOffMusicSmall.addEventListener('click', () => {
		video.muted = false;
		// console.log('Звук включеннннннн');
		buttonOnMusicSmall.style.opacity = '1'
		buttonOnMusicSmall.style.zIndex = '1'
		buttonOffMusicSmall.style.opacity = '0'
		buttonOffMusicSmall.style.zIndex = '-1'
		logoFixed.classList.add('active')
		
	});
}

export {sound}