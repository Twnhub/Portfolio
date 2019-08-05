
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
		prevw.src = this.preview;
		prevw.alt = this.title;
		let desc = document.createElement('p');
		desc.classList.add('project-description');
		desc.innerHTML = `${this.description}</br>
					View the source code <a href="${this.src_link}" target="_blank">here</a>.`;
		
		let frameworkContainer = document.createElement('div');
		frameworkContainer.classList.add('framework-list-container');
		

		return `
			<div class="project">
				<h2 class="project-title">${this.title}</h2>
				<img class="project-preview" src="${this.preview}" alt="${this.title}">
				<p class="project-description">
					${this.description}</br>
					View the source code <a href="${this.src_link}" target="_blank">here</a>.
				</p>
				<div class="framework-list-container">
					<h3 class="framework-list-heading">Frameworks I Used</h3>
					<ul class="frameworks-list">
						${frameworksItems}
					</ul>
				</div>
			</div>
		`;
	}
}