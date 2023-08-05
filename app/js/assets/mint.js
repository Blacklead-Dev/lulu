import gsap from 'gsap'

function mint() {

	let price = 0.2

	function main() {

		let connectWalletLink = document.querySelector('header .connect')
		let website = document.querySelector('html')
		let popupSound = document.querySelector('.popup-sound')
		let logoFixed = document.querySelector('.footer-logo-always')
		
		let holder = true
		let mintCallButton = document.querySelector('header .mint-call')
		connectWalletLink.addEventListener('click', (e) => {

			e.preventDefault()
			//popup metamast, connect wallet, and get info about client: holder, or not?
			//if holder => holder = true
			setTimeout(() => {
				mintCallButton.classList.add('active')
				mintCallButton.addEventListener('click', (e) => {
					e.preventDefault()
					website.classList.add('unscroll')
					mintCallButton.classList.add('inside')
					connectWalletLink.classList.add('hide')
					logoFixed.classList.add('active')
					popupSound.classList.add('active')
					popupSound.classList.add('mintact')
					if(window.innerWidth < 515){
						popupSound.classList.add('totop')
					}
					if(holder) {
						simpleMintVersion()
						// holderMint()
						// errorMint()
					} else {
						// publicMint()
					}
				})
			}, 0);
		})
	}

	main()

	
	function simpleMintVersion() {	
		let newMint = document.querySelector('.new-mint')
		let pixelate = document.querySelector('.pixelate')
		let burnCardLooped = document.querySelector('.burn-card-looped')
		let cardInsert = newMint.querySelector('.card-insert')
		let fnicLoading = newMint.querySelector('.fnic-loading')
		let selfDestruct = newMint.querySelector('.self-destruct')
		let seeYou = newMint.querySelector('.see-you')
		
		newMint.classList.add('active')
		setTimeout(() => {
			pixelate.play()
		}, 600);
		

		pixelate.addEventListener('ended', function() {
			gsap.set(pixelate,{
				display: 'none'
			})
			gsap.to(burnCardLooped,{
				visibility: 'visible',
			})
			burnCardLooped.play()
		})

		burnCardLooped.addEventListener('click',startCardInserd)

		function startCardInserd() {
			burnCardLooped.pause()
			gsap.to(burnCardLooped, {
				display: 'none'
			})
			gsap.set(cardInsert,{
				delay: 0.5,
				display: 'flex'
			})
			cardInsert.play()

			cardInsert.addEventListener('ended', function() {
				gsap.to(cardInsert,{
					display: 'none'
				})
				gsap.set(fnicLoading,{
					display: 'flex'
				})
				fnicLoading.play()
			});


			//here we get response from web3.0
			fnicLoading.addEventListener('click', function() {
				fnicLoading.pause()
				gsap.to(fnicLoading, {
					display: 'none'
				})
				gsap.to(selfDestruct, {
					display: 'flex'
				})
				selfDestruct.play()
			})
			selfDestruct.addEventListener('ended', function() {
				gsap.to(selfDestruct, {
					display: 'none'
				})
				gsap.set(seeYou, {
					display: 'flex',
				})
				seeYou.play()
			})
		}

	}

	function holderMint() {
		let holdersMintBlock = document.querySelector('.holders-mint')
		let lulusha = holdersMintBlock.querySelector('.lulusha')
		let cardInsert = holdersMintBlock.querySelector('.card-insert')
		let fnicLoading = holdersMintBlock.querySelector('.fnic-loading')
		let fnicAuthorised = holdersMintBlock.querySelector('.fnic-authorised')
		let holdersContentRight = holdersMintBlock.querySelector('.fnic-section .content-right')
		let holdersContentLeft = holdersMintBlock.querySelector('.fnic-section .content-left')
		let fnicSection = holdersMintBlock.querySelector('.fnic-section')
		let afterSuccessful = holdersMintBlock.querySelector('.after-successful-section')
		let selfDestruct = holdersMintBlock.querySelector('.self-destruct')
		let staticNoise = holdersMintBlock.querySelector('.static-noise')
		let flash = holdersMintBlock.querySelector('.flash')
		let lulushaAfter = holdersMintBlock.querySelector('.lulusha-after')
		let scanLulu = afterSuccessful.querySelector('.scan-lulu')
		let successfulText = afterSuccessful.querySelector('.successful-text')
		let afterSuccessfulContent = afterSuccessful.querySelector('.content')

		holdersMintBlock.classList.add('active')

		gsap.to([holdersMintBlock, lulusha], 3, {
			display: 'flex'
		})
		lulusha.play()
		if(window.innerWidth < 515){
			gsap.to(holdersContentLeft, 3, {
				display: 'flex',
				zIndex: 2
			})
		}


		let useFnicCardButton = holdersMintBlock.querySelector('.animation-fnic')

		useFnicCardButton.addEventListener('click', (e) => {
			e.preventDefault()
			useFnicCardButton.classList.add('active')

			//were waiting for accept from client and getting response
			setTimeout(() => {
				useFnicCard()
			}, 2000);
		})

		function useFnicCard() {
			gsap.set(lulusha,{
				display: 'none'
			})
			gsap.set(cardInsert,{
				display: 'flex'
			})
			cardInsert.play()

			cardInsert.addEventListener('ended', function() {
				gsap.set(cardInsert,{
					display: 'none'
				})
				gsap.set(fnicLoading,{
					display: 'flex'
				})
				fnicLoading.play()
			});
			fnicLoading.addEventListener('ended', function() {
				gsap.set(fnicLoading, {
					display: 'none'
				})
				gsap.to(fnicAuthorised, {
					display: 'flex'
				})
				fnicAuthorised.play()
				gsap.to(holdersContentRight, .5, {
					display: 'flex',
					y: 0,
					opacity: 1,
					delay: .7
				})
				if(window.innerWidth < 515){
					gsap.to(holdersContentLeft, .3, {
						display: 'none',
						y: '1rem',
						opacity: 0,
						zIndex: -1
					})
				}
			})
			console.log('use fnic')
		}

		let burnAndMintButton = holdersMintBlock.querySelector('.burn-button')
		burnAndMintButton.addEventListener('click', (e) => {
			e.preventDefault()
			burnAndMintButton.classList.add('active')

			//were waiting for signing from clienr and burning
			setTimeout(() => {
				burnAndMint()
			}, 2000);
		})

		function burnAndMint() {
			gsap.set(fnicAuthorised, {
				display: 'none'
			})
			gsap.set(fnicSection, {
				display: 'none'
			})
			gsap.to(afterSuccessful, 3, {
				display: 'flex'
			})
			gsap.set(selfDestruct, {
				display: 'flex',
			})
			selfDestruct.play()
			if(window.innerWidth < 515){
				gsap.to(selfDestruct, .5, {
					y: '1rem'
				})
			}
			selfDestruct.addEventListener('ended', function() {
				gsap.set(selfDestruct, {
					display: 'none'
				})
				gsap.set(staticNoise, {
					display: 'flex',
				})
				staticNoise.play()
				if(window.innerWidth < 515){
					gsap.to(staticNoise, 0, {
						y: '1rem'
					})
				}
			})

			////////wait answer //////
			// setTimeout(() => {
			// 	gsap.to(staticNoise, .3, {
			// 		display: 'none'
			// 	})
			// 	gsap.to(scanLulu, .7, {
			// 		display: 'flex',
			// 		scale: '1'
			// 	})
			// 	gsap.to(lulushaAfter, .7, {
			// 		display: 'flex',
			// 		scale: 1
			// 	})
			// }, 2000);
			staticNoise.addEventListener('ended', function() {
				gsap.set(staticNoise, {
					display: 'none'
				})
				gsap.set(flash, {
					display: 'flex',
				})
				flash.play()
				gsap.to(scanLulu, .7, {
					display: 'flex',
					scale: '1',
					delay: .3
				})
				gsap.to(lulushaAfter, .7, {
					display: 'flex',
					scale: 1,
					delay: .3
				})
				scanLulu.play()
				lulushaAfter.play()
			})
			scanLulu.addEventListener('ended', function() {
				gsap.set(scanLulu, {
					display: 'none',
				})
				if(window.innerWidth < 515){
					console.log('aaaaa')
					gsap.to(successfulText, .3, {
						opacity: 1,
						y: 0
					})
					gsap.to(lulushaAfter, .3, {
						y: '1.9rem'
					})
					gsap.to(successfulText, .5, {
						delay: 4,
						opacity: 0,
						y: '1rem'
					})
					gsap.to(afterSuccessfulContent, .5, {
						delay: 4,
						opacity: 1,
						y: '0'
					})
					gsap.to(lulushaAfter, .5, {
						delay: 4,
						scale: 1,
						y: '-1rem'
					})
					// afterSuccessful.classList.add('over')
				} else {
					gsap.to(successfulText, .3, {
						opacity: 1,
						y: '-3rem'
					})
					gsap.to(successfulText, .5, {
						delay: 4,
						opacity: 0,
						y: '0rem'
					})
					gsap.to(afterSuccessfulContent, .5, {
						delay: 4,
						opacity: 1,
						y: '0'
					})
					gsap.to(lulushaAfter, .5, {
						delay: 4,
						scale: 1.2,
						y: '0rem'
					})
				}
			})
			console.log('burn and mint')
		}

		


		function mintCalculation() {
			const addButton = document.querySelector('.plus');
			const minusButton = document.querySelector('.minus');
			const fromInput = document.querySelector('.from-input');
			const numberElement = document.querySelector('.number');
			let total = document.querySelector('.total span')
			let number = 1;
			 ///price
			total.innerHTML = price * number;
			minusButton.disabled = true;
			minusButton.style.color = 'gray';
			const updateMinusButtonState = () => {
				if (number > 0) {
				  minusButton.disabled = false;
				  minusButton.style.color = 'white';
				  addButton.style.color = 'white'
				} else {
				  minusButton.disabled = true;
				  minusButton.style.color = 'gray';
				  addButton.style.color = 'white'
				}
				if (number >= 5) {
					addButton.style.color = 'gray';
				  } else {
					addButton.style.color = 'white';
				}
			};
			addButton.addEventListener('click', () => {
				if (number < 5) {
					const newInput = document.createElement('input');
					newInput.type = 'text';
					newInput.placeholder = 'enter your wallet address';
					fromInput.appendChild(newInput);
					number++;
					numberElement.textContent = number;
					total.innerHTML = (price * number).toFixed(1);
					updateMinusButtonState();
				}
			});
			minusButton.addEventListener('click', () => {
				const lastInput = fromInput.lastElementChild;
				if (lastInput) {
					fromInput.removeChild(lastInput);
					number--;
					numberElement.textContent = number;
					total.innerHTML = (price * number).toFixed(1);
					updateMinusButtonState();
				}
			});
		}

		mintCalculation()

		function tabs() {
			const tabComp = document.querySelector('.composition')
			const tabRewards = document.querySelector('.rewards')
			const tabs = document.querySelector('.tabs')
			const containerInside = document.querySelector('.tabs-container')
			tabRewards.addEventListener('click', () => {
				tabs.classList.add('active')
				containerInside.classList.add('active')
			})
			tabComp.addEventListener('click', () => {
				tabs.classList.remove('active')
				containerInside.classList.remove('active')
			})	
		}

		tabs()

	}

	function publicMint() {
		let publicMintBlock = document.querySelector('.public-mint')
		let lulusha = publicMintBlock.querySelector('.lulusha')
		let fnicPub = publicMintBlock.querySelector('.fnic-section')
		let fnicPubContent = fnicPub.querySelector('.content')
		let scanLuluPub = fnicPub.querySelector('.scan-lulu')
		let successfulText = fnicPub.querySelector('.successful-text')
		publicMintBlock.classList.add('active')

		let publicMintButton = publicMintBlock.querySelector('.pubburn-button')
		publicMintButton.addEventListener('click', (e) => {
			e.preventDefault()
			publicMintButton.classList.add('active')

			//were waiting for signing from clienr and burning
			setTimeout(() => {
				publicMint()
			}, 2000);
		})

		function publicMint() {
			gsap.to(fnicPubContent, 0, {
				opacity: 0,
				zIndex: -2,
			})
			gsap.set(fnicPub, {
				height: 'unset'
			})

			gsap.set(lulusha, {
				scale: 0
			})
			gsap.to(lulusha, .7, {
				scale: 1,
				y: '1rem'
			})
			gsap.to(scanLuluPub, .7, {
				display: 'flex',
				scale: '1'
			})
			scanLuluPub.play()
			fnicPub.classList.add('active')
			/////or waiting answer////
			scanLuluPub.addEventListener('ended', function() {
				gsap.set(scanLuluPub, {
					display: 'none'
				})
				gsap.to(successfulText, .3, {
					opacity: 1,
					y: '-3rem'
				})
				if(window.innerWidth < 515){
					gsap.to(lulusha, .3, {
						y: '3rem'
					})
					gsap.to(successfulText, .3, {
						opacity: 1,
						y: '0'
					})
					gsap.to(successfulText, .5, {
						delay: 4,
						opacity: 0,
						y: '2rem'
					})
				}
				gsap.to(lulusha, .5, {
					delay: 4,
					scale: 1,
					y: '0rem'
				})
				gsap.to(successfulText, .5, {
					delay: 4,
					opacity: 0,
					y: '-3rem'
				})
				gsap.to(fnicPub, 0, {
					delay: 4,
					height: 'calc(var(--vh, 1vh) * 100)'
				})
				gsap.to(fnicPubContent, .5, {
					delay: 4,
					opacity: 1,
					zIndex: 1,
				})
			})
		}


		function mintCalculation() {
			const addButtonPub = document.querySelector('.plus-public');
			const minusButtonPub = document.querySelector('.minus-public');
			const numberElementPub = document.querySelector('.number-public');
			let totalPub = document.querySelector('.total-public span')
			let numberPub = 1;
			totalPub.innerHTML = price * numberPub;
			minusButtonPub.disabled = true;
			minusButtonPub.style.color = 'gray';

			const updateMinusButtonState = () => {
				if (numberPub > 0) {
				  minusButtonPub.disabled = false;
				  minusButtonPub.style.color = 'white';
				  addButtonPub.style.color = 'white'
				} else {
				  minusButtonPub.disabled = true;
				  minusButtonPub.style.color = 'gray';
				  addButtonPub.style.color = 'white'
				}
				if (numberPub >= 2) {
					addButtonPub.style.color = 'gray';
				  } else {
					addButtonPub.style.color = 'white';
				}
			};
		
			addButtonPub.addEventListener('click', () => {
				if (numberPub < 2) {
					numberPub++;
					numberElementPub.textContent = numberPub;
					totalPub.innerHTML = (price * numberPub).toFixed(1);
					updateMinusButtonState();
					minusButtonPub.style.pointerEvents = 'visible'
				} else {
					addButtonPub.style.color = 'gray'
				}
				
			});
		
			minusButtonPub.addEventListener('click', () => {
				numberPub--;
				numberElementPub.textContent = numberPub;
				totalPub.innerHTML = (price * numberPub).toFixed(1);
				updateMinusButtonState();
				if (numberPub <= 0) {
					minusButtonPub.style.pointerEvents = 'none'
				} 
			})
		}

		mintCalculation()
	}

	function errorMint() {
		let blockError = document.querySelector('.error-message')
		blockError.classList.add('active')
		video.pause()
		// video.muted = false
		setTimeout(() => {
			video.play()
		}, 2000);
	}
}

export {mint}