import Lenis from '@studio-freight/lenis'

import { customCursor } from './assets/customCursor'
import { adaptiveVideos } from './assets/adaptiveVideos'
import { mainPage } from './pages/main'
import { teamPage } from './pages/team'
import { mint } from './assets/mint'
import { sound } from './assets/sound'

window.addEventListener('load', () => {
	let main = document.querySelector('main')
	
	if(main.classList.contains('hero')) {
		adaptiveVideos()
		mainPage()
		sound()
		mint()
		customCursor()
	} 
	if(main.classList.contains('team')) {
		adaptiveVideos()
		teamPage()
		customCursor()
		sound()
		mint()
	}

	const lenis = new Lenis({

	})

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
})
