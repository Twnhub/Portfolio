export function reDraw(el) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			void el.offsetWidth;
			void el.getComputedStyle;
			resolve();
		}, 1);
	});
}