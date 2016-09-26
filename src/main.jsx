var owlCarouselStyleElement = document.createElement('link');
owlCarouselStyleElement.rel = 'stylesheet';
owlCarouselStyleElement.async = true;
owlCarouselStyleElement.href = '../libs-owlcarousel/0.0.1/owl.carousel.css';

var owlCarouselThemeElement = document.createElement('link');
owlCarouselThemeElement.rel = 'stylesheet';
owlCarouselThemeElement.async = true;
owlCarouselThemeElement.href = '../libs-owlcarousel/0.0.1/owl.theme.css';

var owlCarouselTransitionsElement = document.createElement('link');
owlCarouselTransitionsElement.rel = 'stylesheet';
owlCarouselTransitionsElement.async = true;
owlCarouselTransitionsElement.href = '../libs-owlcarousel/0.0.1/owl.transitions.css';

var owlCarouselScriptElement = document.createElement('script');
owlCarouselScriptElement.type = 'text/javascript';
owlCarouselScriptElement.async = true;
owlCarouselScriptElement.src = '../libs-owlcarousel/0.0.1/owl.carousel.min.js';

document.head.appendChild(owlCarouselStyleElement);
document.head.appendChild(owlCarouselThemeElement);
document.head.appendChild(owlCarouselTransitionsElement);

loadSemanticScript();

function loadSemanticScript()
{
	if (typeof jQuery === 'undefined') {
		setTimeout(function(){
			loadSemanticScript();
		}, 1000);
	} else {
		document.head.appendChild(owlCarouselScriptElement);
	}
}

global.Menu = window.Menu = require('./Components/Menu.js');
global.Navbar = window.Navbar = require('./Components/Navbar.js');
global.SideMenu = window.SideMenu = require('./Components/SideMenu.js');
global.Cropper = window.Cropper = require('./Components/Cropper.js');
global.Rating = window.Rating = require('./Components/Rating.js').default;
global.TextEditor = window.TextEditor = require('./Components/TextEditor.js').default;
global.FormWidget = window.FormWidget = require('./Components/Form.js');
