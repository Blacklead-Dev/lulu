function customCursor() {
	let cursor = document.querySelector('.cursor');
	let links = document.querySelectorAll('.custom-cursor');

	document.addEventListener('mousemove', function (e) {
		let x = e.clientX;
		let y = e.clientY;
		cursor.style.transform = `translate3d(calc(${e.clientX}px - 25%), calc(${e.clientY}px - 25%), 0)`
	});

	links.forEach(link => {
		link.addEventListener('mouseover', () => {
			cursor.classList.add('hover');
		});
		link.addEventListener('mouseleave', () => {
			cursor.classList.remove('hover');
		});
	})
}

export { customCursor }