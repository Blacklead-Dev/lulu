import Lenis from '@studio-freight/lenis'

import { customCursor } from './assets/customCursor'

import { mainPage } from './pages/main'
import { teamPage } from './pages/team'
import { mint } from './assets/mint'

window.addEventListener('load', () => {
	let main = document.querySelector('main')
	
	if(main.classList.contains('hero')){
		mainPage()
		mint()
		customCursor()
	} 
	if(main.classList.contains('team')) {
		teamPage()
		customCursor()
	}

	const lenis = new Lenis()

	lenis.on('scroll', (e) => {

	})

	function raf(time) {
	lenis.raf(time)
	requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
})
