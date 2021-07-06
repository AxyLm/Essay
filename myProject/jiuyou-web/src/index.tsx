import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Router } from 'react-router-dom'

import CompileRouter from "./routers/render"
import routers from "./routers/router.config.js"

ReactDOM.render(

	<Router>
		<React.Suspense fallback={<div>loading...</div>}>
			<CompileRouter routes={routers}></CompileRouter>
		</React.Suspense>
	</Router>
	, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();