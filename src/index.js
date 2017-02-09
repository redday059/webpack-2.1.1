var style = require('./style/globalStyle.css');
// jQuery is included as externals
import $ from 'jquery'

import messages from './messages'

var app = document.getElementById('app');

const environment = () => (`
    <div class="${style.box}">
        <div>ENVIRONMENT</div>
        DEVELOPMENT: ${DEVELOPMENT.toString()}<br>
        PRODUCTION: ${PRODUCTION.toString()}<br>
    </div>    
`);

app.innerHTML = `
    <div id="intro">
        ${environment()}
    </div>
	<div id="menu">
		<button id="loadPage1">Load Page 1</button>
		<button id="loadPage2">Load Page 2</button>
	</div>
	<div id="content">
		<p>
			<h1>Home</h1>
			<ul>
                <li>${messages.first}</li>
                <li>${messages.second}</li>
            </ul>
		</p>
	</div>
`;

const elContent = document.getElementById('content');

// lazy loading modules with System.import

document.getElementById('loadPage1').addEventListener('click', () => {
    System.import('./page1')
        .then(pageModule => {
            elContent.innerHTML = pageModule.default;
        })
});

document.getElementById('loadPage2').addEventListener('click', () => {
    System.import('./page2')
        .then(pageModule => {
            elContent.innerHTML = pageModule.default;
        })
});

$('#content').css('background-color', '#efefef');

if (DEVELOPMENT) {
    if (module.hot) {
        module.hot.accept();
    }
}
