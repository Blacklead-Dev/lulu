function mint() {

	let price = 0.2

	function main() {

		let connectWalletLink = document.querySelector('header .connect')
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
					if(holder) {
						holderMint()
					} else {
						publicMint()
					}
				})
			}, 2000);
		})
	}

	main()

	function holderMint() {
		let holdersMintBlock = document.querySelector('.holders-mint')
		holdersMintBlock.classList.add('active')

		let useFnicCardButton = holdersMintBlock.querySelector('.animation-fnic')

		useFnicCardButton.addEventListener('click', (e) => {
			e.preventDefault()

			//were waiting for accept from client and getting response
			setTimeout(() => {
				useFnicCard()
			}, 2000);
		})

		function useFnicCard() {
			console.log('use fnic')
		}

		let burnAndMintButton = holdersMintBlock.querySelector('.burn-button')
		burnAndMintButton.addEventListener('click', (e) => {
			e.preventDefault()

			//were waiting for signing from clienr and burning
			setTimeout(() => {
				burnAndMint()
			}, 2000);
		})

		function burnAndMint() {
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
		
			addButton.addEventListener('click', () => {
				const newInput = document.createElement('input');
				
				newInput.type = 'text';
				newInput.placeholder = 'enter your wallet address';
				fromInput.appendChild(newInput);
				number++;
				numberElement.textContent = number;
				total.innerHTML = (price * number).toFixed(1);
			});
		
			minusButton.addEventListener('click', () => {
				const lastInput = fromInput.lastElementChild;
				if (lastInput) {
					fromInput.removeChild(lastInput);
					number--;
					numberElement.textContent = number;
					total.innerHTML = (price * number).toFixed(1);
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
		function mintCalculation() {
			const addButtonPub = document.querySelector('.plus-public');
			const minusButtonPub = document.querySelector('.minus-public');
			const numberElementPub = document.querySelector('.number-public');
			let totalPub = document.querySelector('.total-public span')
			let numberPub = 1;
			totalPub.innerHTML = price * numberPub;
		
			addButtonPub.addEventListener('click', () => {
				numberPub++;
				numberElementPub.textContent = numberPub;
				totalPub.innerHTML = (price * numberPub).toFixed(1);
			});
		
			minusButtonPub.addEventListener('click', () => {
				numberPub--;
				numberElementPub.textContent = numberPub;
				totalPub.innerHTML = (price * numberPub).toFixed(1);
			})
		}

		mintCalculation()
	}
}

export {mint}