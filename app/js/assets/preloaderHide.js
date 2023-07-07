import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { MorphSVGPlugin } from '../../assets/gsap/MorphSVGPlugin.min.js'


gsap.registerPlugin(ScrollTrigger, MorphSVGPlugin)
function prelodaderHide() {
	let preloaderCurtain = document.querySelector('.preloader-curtain')
	let preloader = document.querySelector('.preloader')
	let square = document.getElementById('curtain-1')
	let circle = document.getElementById('curtain-2')

	let tl = gsap.timeline()
	tl.to(square, {
		morphSVG: circle,
		ease: 'none',
		duration: .6,
	})
	tl.to(square, {
		morphSVG: square,
		ease: 'none',
		duration: .2,
	}, '>.2')

	gsap.to(preloaderCurtain, {
		y: 0,
		duration: 1,
	})
	gsap.to(preloader, {
		opacity: 0, duration: .5, onComplete: () => {
			preloader.remove()
			document.body.classList.remove('unscroll')
			ScrollTrigger.refresh()
		}, delay: 1.05
	})
}

export {prelodaderHide}