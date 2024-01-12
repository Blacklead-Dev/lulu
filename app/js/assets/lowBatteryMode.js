function lowBatteryMode() {
	const videoElement = document.getElementById('preloader-video');
	const lowBatteryPopup = document.querySelector('.low-battery-popup')
	const lowBatteryPopupClose = document.querySelector('.low-battery-popup-close')

	Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
		get: function () {
			return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
		}
	});

	// videoElement.play();
	// videoElement.pause();

	videoElement
		.play()
		.then(() => {
		})
		.catch((error) => {
			lowBatteryPopup.classList.add('active')
		});

	lowBatteryPopupClose.addEventListener('click', () => {
		lowBatteryPopup.classList.remove('active')
	})
}

export {lowBatteryMode}