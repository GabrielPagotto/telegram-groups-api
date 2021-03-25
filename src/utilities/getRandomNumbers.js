module.exports = function(count, maxNumber) {
	if (count > maxNumber) return null;
	let selectedNumbers = [];
	
	while (selectedNumbers.length < count) {
		const randomNumber = parseInt(Math.random() * maxNumber);
		let isAdd = true;
		selectedNumbers.map((number) => {
			if (randomNumber === number) isAdd = false;
		})
		if (isAdd) selectedNumbers.push(randomNumber);
	}

	return selectedNumbers;
}
