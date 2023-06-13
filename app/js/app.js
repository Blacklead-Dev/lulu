import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { splitingText } from './assets/splitingText'



window.addEventListener('load', () => {
	let main = document.querySelector('main')
	if(main.classList.contains('hero')){
		console.log('true')
		let progressLine = document.querySelector('.progress-line-inner')
		gsap.to(window, {duration: .1, scrollTo: {y: 0}, onComplete: () => {
			document.body.classList.add('unscroll')
			document.body.classList.remove('hiddenlines')
			gsap.to(progressLine, {height: `0%`})
			sectionsFunction()
		}
		});

		splitingText()
		setTimeout(() => {
			prelodaderHide()
		}, 2000);

		let backgroundVideo = (window.innerWidth > 515) ? document.querySelector('.background-video.desctop') : document.querySelector('.background-video.mobile')
		

		function backgroundVideoFunction() {
			backgroundVideo.play()
			backgroundVideo.pause()
			backgroundVideo.currentTime = 0
			ScrollTrigger.create({
				trigger: document.body,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: self => {
					gsap.to(progressLine, {height: `${self.progress * 100 + 4}%`})
					backgroundVideo.currentTime = backgroundVideo.duration * self.progress
				}
			})
		}

		backgroundVideoFunction()

		function sectionsFunction() {
			let videoSection = document.querySelectorAll('.video-section') 
			let progressButtons = document.querySelectorAll('.progress-buttons .button')
			
			for(let i =0 ; i < videoSection.length; i++) {
				
					let video = videoSection[i].querySelector('video')
					let content = videoSection[i].querySelector('.content')
					let textElements =  videoSection[i].querySelectorAll('.split-line.child')
					
					if(video) {
						video.play()
						video.pause()
						video.currentTime = 0

						gsap.set(video, {
							opacity: 0,
						})
					}
					
					gsap.set( textElements, {
						opacity: 0,
					})
					
					progressButtons[i].addEventListener('click', () => {
						gsap.to(window, {duration: 1, scrollTo: {y: videoSection[i], offsetY: -10}})
					})
					ScrollTrigger.create({
						trigger: videoSection[i],
						pin: content,
						start: '25% center',
						end: 'bottom center',
						pinSpacer: false,
						pinSpacing: false,
						onUpdate: self => {
							if(video) {
								video.currentTime = video.duration * self.progress
							}
						},
						onEnter: () => {
							if(video) {
								gsap.to(video, {
									opacity: 1,
									duration: .3
								})
							}
							
							gsap.to(textElements, {
								y: 0,
								opacity: 1,
								stagger: .05,
								delay: .2
							})
							progressButtons[i].classList.add('active')
						},
						onLeave: () => {
							gsap.killTweensOf(textElements)
							gsap.to(textElements, {
								y: '100%',
								opacity: 0,
							})	
							if(video) {
								gsap.to(video, {
									opacity: 0,
									duration: .3
								})
							}				
							progressButtons[i].classList.remove('active')
						},
						onEnterBack: () => {
							gsap.to(textElements, {
								y: 0,
								opacity: 1,
								stagger: .05,
								delay: .2
							})
							if(video) {
								gsap.to(video, {
									opacity: 1,
									duration: .3
								})
							}
							progressButtons[i].classList.add('active')
						},
						onLeaveBack: () => {
							
							if(video) {
								gsap.to(video, {
									opacity: 0,
									duration: .3
								})
							}
							gsap.killTweensOf(textElements)
							gsap.to(textElements, {
								y: '100%',
								opacity: 0,
							})
							progressButtons[i].classList.remove('active')
						}
					})
				
			}
			
		}
		
		function timer() {
			let finishdate = document.querySelector('.date').dataset.date
			var countDownDate = new Date(`${finishdate}`).getTime();
			var interval = setInterval(function() {
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

		timer()

		const videoElement = document.getElementById('preloader-video');
		const lowBatteryPopup = document.querySelector('.low-battery-popup')
		const lowBatteryPopupClose = document.querySelector('.low-battery-popup-close')

		Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
			get: function () {
				return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
			}
		});


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

		
		var cursor = document.querySelector('.cursor');
		var a = document.querySelectorAll('.custom-cursor');

		document.addEventListener('mousemove', function(e){
			var x = e.clientX;
			var y = e.clientY;
			cursor.style.transform = `translate3d(calc(${e.clientX}px - 25%), calc(${e.clientY}px - 25%), 0)`
		});

		a.forEach(item => {
			item.addEventListener('mouseover', () => {
				cursor.classList.add('hover');
			});
			item.addEventListener('mouseleave', () => {
				cursor.classList.remove('hover');
			});
		})


		function prelodaderHide() {
			let preloaderCurtain = document.querySelector('.preloader-curtain')
			let preloader = document.querySelector('.preloader')
			preloaderCurtain.classList.add('close')
			
			gsap.to(preloader, {opacity: 0, duration: 1, onComplete: () => {
				preloader.remove()
				document.body.classList.remove('unscroll')
			}, delay: 1.1})
			setTimeout(() => {
				document.body.classList.remove('unscroll')
				ScrollTrigger.refresh()
			}, 1000);
		}

		window.addEventListener('resize', () => {
			ScrollTrigger.refresh()
		})
	} else {
		console.log('false')
		const blocks = document.querySelectorAll('.element');
		const desc = document.querySelectorAll('.description')
		if(window.innerWidth > 515) {
			blocks.forEach((block) => {
			block.addEventListener('mouseenter', () => {
				blocks.forEach((b) => {
				if (b !== block) {
					b.classList.add('hide');
					// desc.classList.add('show')
				}
				});
			});
	
			block.addEventListener('mouseleave', () => {
				blocks.forEach((b) => {
					b.classList.remove('hide');
					// desc.classList.remove('show')
				});
			});
			});
	
			var cursor = document.querySelector('.cursor');
			var a = document.querySelectorAll('.custom-cursor');
	
			document.addEventListener('mousemove', function(e){
				var x = e.clientX;
				var y = e.clientY;
				cursor.style.transform = `translate3d(calc(${e.clientX}px - 25%), calc(${e.clientY}px - 25%), 0)`
			});
	
			a.forEach(item => {
				item.addEventListener('mouseover', () => {
					cursor.classList.add('hover');
				});
				item.addEventListener('mouseleave', () => {
					cursor.classList.remove('hover');
				});
			})
		} else {
			const blocks = document.querySelectorAll('.element');
			const desc = document.querySelectorAll('.description-mobile')
			const popupmob = document.querySelector('.for-mobile ')
			const closeMobpopup = document.querySelector('.close-mob')
			for (let i = 0; i < blocks.length; i++) {
				for (let i = 0; i < desc.length; i++) {
					blocks[i].addEventListener('click', () => {
						desc[i].classList.add('active')
						popupmob.classList.add('active')
					})
					closeMobpopup.addEventListener('click', () =>{
						desc[i].classList.remove('active')
						popupmob.classList.remove('active')
					})
				}
			}
			
		}
	}

	const addButton = document.querySelector('.plus');
	const minusButton = document.querySelector('.minus');
	const fromInput = document.querySelector('.from-input');
	const numberElement = document.querySelector('.number');
	let total = document.querySelector('.total span')
	let number = 1;
 	///price
	total.innerHTML = 0.2 * number;

	addButton.addEventListener('click', () => {
		const newInput = document.createElement('input');
		
		newInput.type = 'text';
		newInput.placeholder = 'enter your wallet address';
		fromInput.appendChild(newInput);
		number++;
		numberElement.textContent = number;
		total.innerHTML = (0.2 * number).toFixed(1);
	});

	minusButton.addEventListener('click', () => {
		const lastInput = fromInput.lastElementChild;
		if (lastInput) {
			fromInput.removeChild(lastInput);
			number--;
			numberElement.textContent = number;
			total.innerHTML = (0.2 * number).toFixed(1);
		}
		
	});

	const tabComp = document.querySelector('.composition')
	const tabRewards = document.querySelector('.rewards')
	const tabs = document.querySelector('.tabs')
	const containerInside = document.querySelector('.tabs-container')
	tabRewards.addEventListener('click', () => {
		tabs.classList.add('active')
		containerInside.classList.add('active')
	})
	tabComp.addEventListener('click', () => {
		tabs.classList.remove('active')
		containerInside.classList.remove('active')
	})

	const addButtonPub = document.querySelector('.plus-public');
	const minusButtonPub = document.querySelector('.minus-public');
	const numberElementPub = document.querySelector('.number-public');
	let totalPub = document.querySelector('.total-public span')
	let numberPub = 1;
	totalPub.innerHTML = 0.2 * numberPub;

	addButtonPub.addEventListener('click', () => {
		numberPub++;
		numberElementPub.textContent = numberPub;
		totalPub.innerHTML = (0.2 * numberPub).toFixed(1);
	});


	minusButtonPub.addEventListener('click', () => {
		numberPub--;
		numberElementPub.textContent = numberPub;
		totalPub.innerHTML = (0.2 * numberPub).toFixed(1);
	})
		
})
