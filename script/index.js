const title = document.querySelector('#title');

// title.innerHTML = 'Hello World';

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		const targetId = e.target.getAttribute('href').substring(1);
		const target = document.getElementById(targetId);
		window.scrollTo({
			top: target.offsetTop,
			behavior: 'smooth',
		});
	});
});

let scrollValue = 0;
let scrollDirectionUp = false;
window.addEventListener('scroll', async () => {
	const navbar = document.querySelector('.navbar');
	const scrollY = window.scrollY;
	if (scrollY > scrollValue) {
		navbar.classList.add('d-none');
	} else {
		if (navbar.classList.contains('d-none')) {
			for (let i = 60; i >= 0; i -= 1) {
				navbar.style.top = `-${i}px`;
				navbar.classList.remove('d-none');
				await new Promise((r) => setTimeout(r, 4));
			}
		}
	}
	scrollValue = scrollY;
});
async function fetchData() {
	let data = {};
	await fetch('/data/data.json')
		.then((res) => res.json())
		.then((d) => {
			data = d;
		});
	// about
	const about = document.querySelector('#aboutData');
	about.innerHTML = data.about;
	// experience
	const experience = document.querySelector('.experience');
	for (let i = 0; i < data.experience.length; i++) {
		let item = data.experience[i];
		const expDiv = experience.cloneNode(true);
		if (i === 0) {
			expDiv.querySelector('.line-1').classList.add('bg-1dark');
		} else if (i === data.experience.length - 1) {
			expDiv.querySelector('.line-2').classList.add('bg-1dark');
		}
		console.log(i, data.experience.length - 1);
		expDiv.classList.remove('d-none');
		expDiv.querySelector(
			'.exp-timeline'
		).innerHTML = `${item.startDate} - ${item.endDate}`;
		expDiv.querySelector('.exp-location').innerHTML = item.location;
		expDiv.querySelector('.exp-description').innerHTML = item.description;
		expDiv.querySelector('.exp-org').innerHTML = item.organization;
		expDiv.querySelector('.exp-title').innerHTML = item.title;

		experience.parentElement.appendChild(expDiv);
	}
	// education
	const education = document.querySelector('.education');
	for (let i = 0; i < data.education.length; i++) {
		let item = data.education[i];
		const eduDiv = education.cloneNode(true);
		if (i === 0) {
			eduDiv.querySelector('.line-1').classList.add('bg-2');
		}
		if (i === data.education.length - 1) {
			eduDiv.querySelector('.line-2').classList.add('bg-2');
		}
		eduDiv.classList.remove('d-none');
		eduDiv.querySelector('.edu-timeline').innerHTML = item.year;
		eduDiv.querySelector('.edu-location').innerHTML = item.location;
		eduDiv.querySelector('.edu-description').innerHTML = item.specialization;
		eduDiv.querySelector('.edu-org').innerHTML = item.university;
		eduDiv.querySelector('.edu-title').innerHTML = item.degree;

		education.parentElement.appendChild(eduDiv);
	}
	// projects
	const projects = document.querySelector('.project');
	for (let i = 0; i < data.projects.length; i++) {
		let item = data.projects[i];
		const projDiv = projects.cloneNode(true);
		projDiv.classList.remove('d-none');
		projDiv.querySelector('.project-title').innerHTML = item.title;
		projDiv.querySelector('.project-description').innerHTML = item.description;
		projDiv.querySelector('#project-live').href = item.live;
		projDiv.querySelector('#project-github').href = item.github;
		projDiv.querySelector('.project-thumbnail').src = item.thumbnail;
		// Add icons from technologies property to div with class project-icons
		const icons = projDiv.querySelector('.project-icons');
		let daviconData = {};
		await fetch('/data/davicon.json')
			.then((res) => res.json())
			.then((d) => {
				daviconData = d;
			});
		for (let j = 0; j < item.technologies.length; j++) {
			const icon = document.createElement('i');
			icon.classList.add(...daviconData[item.technologies[j].toLowerCase()]);
			icon.title = item.technologies[j];
			icons.appendChild(icon);
		}
		projects.parentElement.appendChild(projDiv);
	}
}
fetchData();
