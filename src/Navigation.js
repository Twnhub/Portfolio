import EventEmitter from './EventEmitter';
class Navigation extends EventEmitter {
	constructor(options) {
		super();
		let _that = this;
		this.navItemsContainer = document.querySelector('.nav-items-container');
		this.navBtn = document.querySelector('.nav-btn');
		this.navCloseBtn = document.querySelector('.nav-close');
		this.navLinks = document.querySelectorAll('.nav-link');

		this.navProps = Object.assign({
			active: false, 
			mobileWidth: '75%', 
			desktopWidth: '100%',
			widthThreshold: 440
		}, options);
	
		this.navItemsContainer.style.width = this.navProps.width;

		this.navBtn.addEventListener('click', e => {
			_that.setNavActiveState(!_that.navProps.active);
		});

		this.navCloseBtn.addEventListener('click', e => {
			_that.setNavActiveState(false);
		});

		let previousWindowWidth = window.innerWidth;

		window.addEventListener('resize', e => {
			let deltaWidth = window.innerWidth - previousWindowWidth;
			if (
				previousWindowWidth + deltaWidth > _that.navProps.widthThreshold &&
				previousWindowWidth < window.innerWidth
			) {
				_that.setNavActiveState(true);
				_that.navItemsContainer.style.width = _that.navProps.desktopWidth;
			} else if (
				previousWindowWidth + deltaWidth < _that.navProps.widthThreshold &&
				previousWindowWidth > window.innerWidth
			) {
				_that.setNavActiveState(false);
				_that.navItemsContainer.style.width = _that.navProps.mobileWidth;
			}
			previousWindowWidth = window.innerWidth;
		});

		for (let i = 0; i < this.navLinks.length; i++) {
			this.navLinks[i].onclick = e => {
				e.preventDefault();
				_that.emit('nav-link-clicked', this.navLinks[i].name.replace('nav-link-', '').toLowerCase());
			};
		}
	}

	setNavActiveState(isActive) {
		if (isActive === true) {
			this.navItemsContainer.style.left = '0px';
		} else {
			this.navItemsContainer.style.left = `-${this.navProps.mobileWidth}`;
		}
		this.navProps.active = isActive;
	}
}

export default Navigation;