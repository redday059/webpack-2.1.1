import { multiply } from './mathStuff';

const page1 = `
	<div>
		<h1>Page 1</h1>
		<p>Let's use mathStuff. As we use only one function from 
		mathStuff we'll not see all the other in the resulting bundle.js</p>
		<p>3 times 3 is ${multiply(3, 3)}</p>
	</div>
`;

export default page1;