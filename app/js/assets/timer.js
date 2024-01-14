/**
 * @typedef {Object} TimerOptions
 * @property {boolean} enabled - if the timer is enabled
 */

/**
 * @param {TimerOptions} options 
 */
function timer(options) {
	const dateDisplay = document.querySelector('.date')
	let finishdate = document.querySelector('.date').dataset.date
	const parsedFinishDate = new Date(`${finishdate}`);
	var countDownDate = parsedFinishDate.getTime();
	var interval = setInterval(function () {
		var now = new Date().getTime();
		var timeleft = countDownDate - now;

		var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
		var realHours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
		var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

		document.getElementById("days").innerHTML = days
		document.getElementById("hours").innerHTML = (realHours > 9) ? realHours : `0${realHours}`
		document.getElementById("mins").innerHTML = (minutes > 9) ? minutes : `0${minutes}`
		document.getElementById("secs").innerHTML = (seconds > 9) ? seconds : `0${seconds}`
		
		dateDisplay.innerHTML = [
			parsedFinishDate.getDate(),
			String(parsedFinishDate.getMonth() + 1).padStart(2, "0"),
			parsedFinishDate.getFullYear(),
		].join(".");

		document.querySelector('.timer-button').classList.remove('hidden')
		
		if (timeleft < 0 || !options.enabled) {
			clearInterval(interval);
			document.querySelector('.timer-wrapper').remove()
		}

	}, 1000)
}

export {timer}