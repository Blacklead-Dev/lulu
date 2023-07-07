import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'


gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { splitingText } from '../assets/splitingText'
import { vhFunction } from '../assets/realVh'
import { lowBatteryMode } from '../assets/lowBatteryMode.js'
import { prelodaderHide } from '../assets/preloaderHide.js'
import { timer } from '../assets/timer.js'

function mainPage() {

	let progressLine = document.querySelector('.progress-line-inner')

	gsap.to(window, {
		duration: .1, scrollTo: { y: 0 }, onComplete: () => {
			document.body.classList.add('unscroll')
			document.body.classList.remove('hiddenlines')
			gsap.to(progressLine, { height: `0%` })
			sectionsFunction()
		}
	});

	setTimeout(() => {
		prelodaderHide()
	}, 2000);

	function backgroundVideoFunction() {

		let backgroundVideo = (window.innerWidth > 515) ? document.querySelector('.background-video.desctop') : document.querySelector('.background-video.mobile')
		let lineOffset = (100 / document.querySelectorAll('.video-section').length) / 5
		
		async function playVideo() {
			try {
				await backgroundVideo.play();
			} catch (err) {
				console.log(err)
			} finally {
				backgroundVideo.pause()
			}
		}

		playVideo()

		backgroundVideo.currentTime = 0
		ScrollTrigger.create({
			trigger: document.body,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: self => {
				gsap.to(progressLine, { height: `${self.progress * 100 - lineOffset + 2}%` })
				backgroundVideo.currentTime = backgroundVideo.duration * (self.progress)
			}
		})
	}

	backgroundVideoFunction()

	function sectionsFunction() {
		let videoSection = document.querySelectorAll('.video-section')
		let progressButtons = document.querySelectorAll('.progress-buttons .button')

		for (let i = 0; i < videoSection.length; i++) {

			let video = videoSection[i].querySelector('.secvens-video')
			let content = videoSection[i].querySelector('.content')
			let textElements = videoSection[i].querySelectorAll('.split-line.child')

			if (video) {
				async function playVideo() {
					try {
						await video.play();
					} catch (err) {
						console.log(err)
					} finally {
						video.pause()
					}
				}
		
				playVideo()
				video.currentTime = 0

				gsap.set(video, {
					opacity: 0,
					visibility: 'hidden'
				})
			}

			gsap.set(textElements, {
				opacity: 0,
			})

			let offsetHeight = videoSection[i].getBoundingClientRect().height * 0.2

			progressButtons[i].addEventListener('click', () => {
				gsap.to(window, { duration: 1, scrollTo: { y: videoSection[i], offsetY: -offsetHeight } })
			})

			ScrollTrigger.create({
				trigger: videoSection[i],
				pin: content,
				start: '25% center',
				end: 'bottom center',
				pinSpacer: false,
				pinSpacing: false,
				onUpdate: self => {
					if (video) {
						video.currentTime = video.duration * self.progress
					}
				},
				onEnter: () => {
					if (video) {
						gsap.to(video, {
							opacity: 1,
							duration: .3,
							visibility: 'unset'
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
					if (video) {
						gsap.to(video, {
							opacity: 0,
							duration: .3,
							visibility: 'hidden'
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
					if (video) {
						gsap.to(video, {
							opacity: 1,
							duration: .3,
							visibility: 'unset'
						})
					}
					progressButtons[i].classList.add('active')
				},
				onLeaveBack: () => {

					if (video) {
						gsap.to(video, {
							opacity: 0,
							duration: .3,
							visibility: 'hidden'
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

	timer()
	lowBatteryMode()
	vhFunction()
	splitingText()

	window.addEventListener('resize', () => {
		ScrollTrigger.refresh()
	})
}


export { mainPage }