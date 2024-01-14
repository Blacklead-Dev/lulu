import Lenis from '@studio-freight/lenis'

import { customCursor } from './assets/customCursor'
import { adaptiveVideos } from './assets/adaptiveVideos'
import { mainPage } from './pages/main'
import { teamPage } from './pages/team'
import { mint } from './assets/mint'
import { sound } from './assets/sound'
import { runHookFn } from "./assets/commonUtils"

window.addEventListener('load', async () => {
	let main = document.querySelector('main')
	
	if(main.classList.contains('hero')) {
		adaptiveVideos()
		const mainPageRef = await mainPage({
			timerOptions: {
				enabled: false,
			},
		})
		mint({
			connectWalledEnabled: true,
			onMintOpen() {
				runHookFn(mainPageRef.onLeave);
			},
			holderMintOptions: {
				foundersMintActive: true,
			},
			mintFlow: 'public',
		})
		customCursor()
		sound()
	} 
	if(main.classList.contains('team')) {
		adaptiveVideos()
		teamPage()
		customCursor()
	}

	const lenis = new Lenis({})

	function raf(time) {
		lenis.raf(time)
		requestAnimationFrame(raf)
	}

	requestAnimationFrame(raf)
});

const devHosts = ['localhost', '192.168.0.42'];
const isDevEnv = devHosts.includes(window.location.hostname);

if (!isDevEnv) {
	window.console.log = function () {}
}
