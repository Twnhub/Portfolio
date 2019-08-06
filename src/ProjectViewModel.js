
export default class ProjectViewModel {
	constructor(options) {
		this.title = options.title;
		this.preview = options.preview;
		this.description = options.description;
		this.src_link = options.src_link;
		this.frameworks = options.frameworks;
	}

	render() {

		let frameworksItems = this.frameworks.map((framework) => {
			let li = document.createElement('li');
			li.classList.add('framework-list-item');
			let a = document.createElement('a');
			a.href = framework.link;
			a.classList.add('framework-link');
			a.target = "_blank";
			a.textContent = framework.name;
			li.appendChild(a);
			return li;
		});

		let project = document.createElement('div');
		project.classList.add('project');
		let title = document.createElement('h2');
		title.classList.add('project-title');
		title.textContent = this.title;
		let prevw = document.createElement('img');
		prevw.classList.add('project-preview');
		prevw.src = this.preview;
		prevw.alt = this.title;
		let desc = document.createElement('p');
		desc.classList.add('project-description');
		desc.innerHTML = `${this.description}</br>
					View the source code <a href="${this.src_link}" target="_blank">here</a>.`;
		
		let frameworkContainer = document.createElement('div');
		frameworkContainer.classList.add('framework-list-container');
		let frameworkHeading = document.createElement('h3');
		frameworkHeading.classList.add('framework-list-heading');
		frameworkHeading.textContent = 'Frameworks I used';
		let frameworkList = document.createElement('ul');
		frameworksItems.forEach((li) => {
			frameworkList.appendChild(li);
		});
		frameworkContainer.appendChild(frameworkHeading);
		frameworkContainer.appendChild(frameworkList);

		project.appendChild(title);
		project.appendChild(prevw);
		project.appendChild(desc);
		project.appendChild(frameworkContainer);

		return project;
	}
}