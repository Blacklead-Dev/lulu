function deviceIs () {
	let deviseIsThis = {
		desctop: (window.innerWidth > 515),
		mobile: !(window.innerWidth > 515)
	}
	
	return deviseIsThis
}

export {deviceIs}