
window.$ = window.jQuery = require('jquery');

loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-css/default.css');
loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-css/ionicons/ionicons.min.css');
loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-css/default.css');
loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-owlcarousel/owl.carousel.css');
loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-owlcarousel/owl.theme.css');
loadStyleSheet('../jspm_packages/uspace-sdk-ui@0.1.0/libs/libs-owlcarousel/owl.transitions.css');

loadSemanticScript();

function loadStyleSheet(path)
{
    var styleSheetElement = document.createElement('link');
    styleSheetElement.rel = 'stylesheet';
    styleSheetElement.async = true;
    styleSheetElement.href = path;
    document.head.appendChild(styleSheetElement);
}

require('libs/libs-css/semantic.min.js');
require('libs/libs-owlcarouse/owl.carouse.min.js');

module.exports = {
    DropZone: require('./src/Components/DropZone'),
    Form: require('./src/Components/Form'),
    Menu: require('./src/Components/Menu'),
    Navbar: require('./src/Components/Navbar')
}
