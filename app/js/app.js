import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { splitingText } from './assets/splitingText'



window.addEventListener('load', () => {
	gsap.to(window, {duration: .1, scrollTo: {y: 0}, onComplete: () => {
		document.body.classList.add('unscroll')
		document.body.classList.remove('hiddenlines')
		sectionsFunction()}
	});

	let backgroundVideo = (window.innerWidth > 515) ? document.querySelector('.background-video.desctop') : document.querySelector('.background-video.mobile')

	backgroundVideoFunction()
	splitingText()
	setTimeout(() => {
		prelodaderHide()
	}, 2000);
	
	function backgroundVideoFunction() {
		backgroundVideo.currentTime = 0
		ScrollTrigger.create({
			trigger: document.body,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: self => {
				backgroundVideo.currentTime = backgroundVideo.duration * self.progress
			}
		})
	}

	function sectionsFunction() {
		let videoSection = document.querySelectorAll('.video-section') 

		videoSection.forEach( section => {
			let video = section.querySelector('video')
			let content = section.querySelector('.content')
			let textElements =  section.querySelectorAll('.split-line.child')
			if(video) {
				video.currentTime = 0
				gsap.set(video, {
					opacity: 0,
				})
			}
			
			gsap.set( textElements, {
				opacity: 0,
			})
			
			ScrollTrigger.create({
				trigger: section,
				pin: content,
				start: 'center center',
				end: 'bottom center',
				pinSpacer: false,
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
						stagger: .08,
						delay: .2
					})
				},
				onLeave: () => {
					gsap.to(textElements, {
						y: '100%',
						opacity: 0,
					})					
				},
				onEnterBack: () => {
					gsap.to(textElements, {
						y: 0,
						opacity: 1,
						stagger: .08,
						delay: .2
					})
				},
				onLeaveBack: () => {
					if(video) {
						gsap.to(video, {
							opacity: 0,
							duration: .3
						})
					}
					
					gsap.to(textElements, {
						y: '100%',
						opacity: 0,
					})
					
				}
			})
		})
	}
	

	
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
