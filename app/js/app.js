import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import { splitingText } from './assets/splitingText'
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
})
