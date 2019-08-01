import reDraw from './RenderUtils';

let previousAnimations = [];

export default class ContentManager {
	constructor(options) {
		this.descriptionContent = options.descriptions;
		this.animationClasses = options.animationClasses;

		this.descriptionHeading = document.querySelector('.description-heading');
		this.descriptionText = document.querySelector('.description-text');
		this.descriptionRow = document.querySelector('.description-row');

		this.render(options.startingAnimations);
	}

	getRandomAnimation() {
		if (this.animationClasses.length === 0) {
			// default to slide-in-left
			return 'slide-in-left';
		} else {
			return this.animationClasses[Math.floor(Math.random() * this.animationClasses.length)];
		}
	}

	setDescriptionContent(contentName) {
		if (this.descriptionContent[contentName] !== undefined) {
			this.descriptionHeading.innerHTML = this.descriptionContent[contentName].heading;
			this.descriptionText.innerHTML = this.descriptionContent[contentName].text;
		}
		this.render([this.getRandomAnimation(), this.getRandomAnimation()]);
	}

	render(animations) {
		if (previousAnimations.length > 0) {
			this.descriptionHeading.classList.remove(previousAnimations[0]);
			this.descriptionText.classList.remove(previousAnimations[1]);
		}
		this.descriptionHeading.remove();
		this.descriptionText.remove();
		this.descriptionHeading.classList.add(animations[0]);
		this.descriptionText.classList.add(animations[1]);
		previousAnimations = animations;
		this.descriptionRow.appendChild(this.descriptionHeading);
		this.descriptionRow.appendChild(this.descriptionText);
	}
}