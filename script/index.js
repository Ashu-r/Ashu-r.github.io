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
