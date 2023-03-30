import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)


gsap.to(window, {duration: .1, scrollTo: {y: 0}, onComplete: () => {
	document.body.classList.add('unscroll')
	document.body.classList.remove('hiddenlines')}
});

window.addEventListener('load', () => {

	let backgroundVideo = document.querySelector('.background-video')
	console.log(backgroundVideo)
	if(backgroundVideo.buffered) {
		backgroundVideoFunction()
	} else {
		backgroundVideo.addEventListener('loadedmetadata', backgroundVideoFunction)
	}
	

	function backgroundVideoFunction() {
		backgroundVideo.pause()
		backgroundVideo.currentTime = 0
		ScrollTrigger.create({
			trigger: document.body,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: self => {
				backgroundVideo.currentTime = backgroundVideo.duration * self.progress
				console.log(backgroundVideo.currentTime)
			}
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
	}

	setTimeout(() => {
		prelodaderHide()
	}, 2000);


	let videoSection = document.querySelectorAll('.video-section') 

	videoSection.forEach( section => {
		let video = section.querySelector('video')
		let content = section.querySelector('.content')
		let textElements =  section.querySelectorAll('h2, p')
		video.pause()
		video.currentTime = 0
		gsap.set([video, textElements], {
			opacity: 0,
		})
		
		ScrollTrigger.create({
			trigger: section,
			pin: content,
			start: 'center center',
			end: 'bottom center',
			pinSpacer: false,
			onUpdate: self => {
				video.currentTime = (video.duration * self.progress)
			},
			onEnter: () => {
				gsap.to([video, textElements], {
					opacity: 1,
					duration: .3
				})
			},
			onLeave: () => {
				gsap.to(textElements, {
					opacity: 0,
					duration: .3
				})
			},
			onEnterBack: () => {
				gsap.to(textElements, {
					opacity: 1,
					duration: .3
				})
			},
			onLeaveBack: () => {
				gsap.to([video, textElements], {
					opacity: 0,
					duration: .3
				})
			}
		})
	})
	ScrollTrigger.refresh()

	window.addEventListener('resize', () => {
		ScrollTrigger.refresh()
	})
})
