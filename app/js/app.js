import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { splitingText } from './assets/splitingText'



window.addEventListener('load', () => {
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
				
			var realHours = Math.floor(timeleft / (1000 * 60 * 60));
			var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
			document.getElementById("hours").innerHTML = realHours
			document.getElementById("mins").innerHTML = minutes
			document.getElementById("secs").innerHTML = seconds
		}, 1000)
	}

	timer()

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
})
