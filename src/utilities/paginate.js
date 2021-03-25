module.exports = ({ list, totalForPage, currentPage = null }) => {
	let pages = [], page = [];

	list.map(item => {
		if (page.length < totalForPage - 1) {
			page.push(item);
		} else {
			page.push(item);
			pages.push(page);
			page = [];
		}
	});

	if (page.length > 0) pages.push(page);

	if (currentPage !== null) {
		return {
			total: pages.length,
			page: pages[currentPage - 1],
		};
	} else {
		return {
			total: pages.length,
			pages,
		};
	}
};
