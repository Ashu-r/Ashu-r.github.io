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
			eduDiv.querySelector('.line-1').classList.add('bg-1dark');
		} else if (i === data.education.length - 1) {
			eduDiv.querySelector('.line-2').classList.add('bg-1dark');
		}
		eduDiv.classList.remove('d-none');

		education.parentElement.appendChild(eduDiv);
	}
}
fetchData();
