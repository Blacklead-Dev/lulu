function timer() {
	let finishdate = document.querySelector('.date').dataset.date
	var countDownDate = new Date(`${finishdate}`).getTime();
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

		if (timeleft < 0) {
			clearInterval(interval);
			document.querySelector('.timer-wrapper').remove()
			document.querySelector('.timer-button').classList.remove('hidden')
		}

	}, 1000)
}

export {timer}