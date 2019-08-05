import './assets/css/components/projectManager.scss';
import './assets/project_previews/game_of_life.gif';
import './ProjectViewModel';
import ProjectViewModel from './ProjectViewModel';

let getProjects = function(url) {
	return new Promise((resolve, reject) => {
		let req = new XMLHttpRequest();
	
		req.addEventListener('readystatechange', (ev) => {
			if (req.readyState === 4 && req.status === 200) {
				resolve(JSON.parse(req.responseText));		
			} else if (req.readyState === 4 && req.status !== 200) {
				reject({
					msg: req.statusText,
					code: req.status
				});
			}
		});
		req.open("GET", `${url}`);
		req.send();
	});
}

class ProjectManager {
	constructor(options, cb) {
		options = Object.assign({
			config: 'project_previews/projects.json'
		}, options);
		this.configLoc = options.config;
		this.projects = {};

		getProjects(this.configLoc)
			.then((obj) => {
				this.projects = obj.projects.map((proj) => {
					return new ProjectViewModel(proj);
				});
				console.log(this.projects);
				cb();
			})
			.catch((err) => {
				console.error(err);
			});
	}
	
	render() {
		let projectTree = this.projects.map((el) => {
			return el.render();
		});
		return projectTree;
	}
}

export default ProjectManager;