import { deviceIs } from "./device"

function adaptiveVideos() {

	let videos = document.querySelectorAll('.adaptive-video')

	if (videos.length  < 1 ) return

	for( let i = 0; i < videos.length; i++ ) {

		let sources = videos[i].querySelectorAll('source')
		for (let j = 0; j < sources.length; j++) {
			if(deviceIs().desctop) {
				sources[j].src = sources[j].dataset.desctopSrc
			} else if (deviceIs().mobile) {
				sources[j].src = sources[j].dataset.mobileSrc
			}
		}
		videos[i].load()
	}
}

export {adaptiveVideos}