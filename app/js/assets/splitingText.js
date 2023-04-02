import { gsap } from 'gsap'
import SplitText from '../../assets/gsap/SplitText.min.js'

function splitingText() {
	let titleSpliting = new SplitText('.anim-body', {
		type: 'lines',
		linesClass: 'split-line parent'
	})

	let wrappingTitleSpliting = new SplitText(titleSpliting.lines, {
		type: 'lines',
		linesClass: 'split-line child'
	})

	gsap.set(wrappingTitleSpliting.lines, {y: '100%', opacity: 0})
}

export {splitingText}