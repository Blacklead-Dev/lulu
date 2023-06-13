function teamPage() {
	const members = document.querySelectorAll('.element');
	const desc = document.querySelectorAll('.description')

	function desctopScript() {
		members.forEach(member => {
			member.addEventListener('mouseenter', () => {
				members.forEach(b => {
					if (b !== member) {
						b.classList.add('hide');
						// desc.classList.add('show')
					}
				});
			});

			member.addEventListener('mouseleave', () => {
				members.forEach(b => {
					b.classList.remove('hide');
					// desc.classList.remove('show')
				});
			});
		});


	}

	function mobileScript() {
		const members = document.querySelectorAll('.element');
		const desc = document.querySelectorAll('.description-mobile')
		const popupmob = document.querySelector('.for-mobile ')
		const closeMobpopup = document.querySelector('.close-mob')
		for (let i = 0; i < members.length; i++) {
			for (let i = 0; i < desc.length; i++) {
				members[i].addEventListener('click', () => {
					desc[i].classList.add('active')
					popupmob.classList.add('active')
				})
				closeMobpopup.addEventListener('click', () => {
					desc[i].classList.remove('active')
					popupmob.classList.remove('active')
				})
			}
		}
	}

	if (window.innerWidth > 515) {
		desctopScript()
	} else {
		mobileScript()
	}
}

export { teamPage }