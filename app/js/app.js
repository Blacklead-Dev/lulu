import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {
	
	let body = document.querySelector('body')
	let video = document.querySelector('.background-video')
	let brainVideo = document.querySelector('.brain-video')
	video.onloadedmetadata = backgroundVideo
	
	function backgroundVideo() {
		
		let videoDuration = video.duration
		brainVideo.load()
		video.load()
		ScrollTrigger.create({
			trigger: body,
			markers: true,
			start: 'top top',
			end: 'bottom bottom',
			onUpdate: self => {
				let currentPosition = videoDuration * self.progress
				video.currentTime = currentPosition

				brainVideo.currentTime = brainVideo.duration*self.progress*5
				console.log(video.currentTime, self.progress)
			}
		})
	}
	


})
