var defaultDefaultStyleElement = document.createElement('link');
defaultDefaultStyleElement.rel = 'stylesheet';
defaultDefaultStyleElement.async = true;
defaultDefaultStyleElement.href = '../libs-css/0.1.1/default.css';

// var defaultDarkStyleElement = document.createElement('link');
// defaultDarkStyleElement.rel = 'stylesheet';
// defaultDarkStyleElement.async = true;
// defaultDarkStyleElement.href = '../libs-css/0.1.1/dark.css';

var ioniconscStyleElement = document.createElement('link');
ioniconscStyleElement.rel = 'stylesheet';
ioniconscStyleElement.async = true;
ioniconscStyleElement.href = '../libs-css/0.1.1/ionicons/ionicons.min.css';

var semanticScriptElement = document.createElement('script');
semanticScriptElement.type = 'text/javascript';
semanticScriptElement.async = true;
semanticScriptElement.src = '../libs-css/0.1.1/semantic.min.js';

document.head.appendChild(defaultDefaultStyleElement);
// document.head.appendChild(defaultDarkStyleElement);
document.head.appendChild(ioniconscStyleElement);

loadSemanticScript();

function loadSemanticScript()
{
	if (typeof jQuery === 'undefined') {
		setTimeout(function(){
			loadSemanticScript();
		}, 1000);
	} else {
		document.head.appendChild(semanticScriptElement);
	}
}
