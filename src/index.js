import './assets/css/base/layout.scss';
import './assets/css/base/backgrounds.scss';
import './assets/css/components/carousel.scss';
import './assets/css/components/navigation.scss';
import './assets/css/components/mainContent.scss';
import './assets/coffee.jpg';
import './assets/photos_of_me/20190730_112059.jpg';

import Navigation from './Navigation';
import ContentManager from './ContentManager';
import ProjectManager from './ProjectManager';

window.addEventListener('load', (e) => {
	let navHandler = new Navigation({
		// This has to be the same value as the media query value in navigation.scss
		// TODO: Handle this better somehow
		widthThreshold: 800,
		mobileWidth: '100%'
	});

	let contentManager = new ContentManager({
		descriptions: {
			home: {
				heading: 'Welcome!',
				text: `I'm glad to see you here!  You will find some of my projects below.
							If you want to ask me any questions, feel free to shoot me an email.
							I will get back to you as soon as possible.
							You can also visit my social links to learn more about me.`
			},
			contact: {
				heading: 'Contact Info',
				text: `Email: mitchschutt@gmail.com`
			},
			about: {
				heading: 'A Little About Me',
				text: `I've been programming off and on for about 4 or 5 years.<br/>I didn't really start
								studying intensely til about 3 years ago, though.<br/>When I'm not working on the computer, 
								I'm probably playing videogames, watching movies,<br/> reading a book or playing golf.  I am currently engaged,
								but my fiance and I haven't set a date.<br/>  I am also searching for a development job either front-end or back-end.`
			}
		},
		startingAnimations: ['slide-in-left-fade-in', 'slide-in-right-fade-in'],
		animationClasses: ['slide-in-left-fade-in', 'slide-in-right-fade-in', 'slide-in-top', 'grow-to-scale', 'fade-in']
	});

	let projManager = new ProjectManager();

	navHandler.on('nav-link-clicked', (name) => {
		contentManager.setDescriptionContent(name);
	});
});