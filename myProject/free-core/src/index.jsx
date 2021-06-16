import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Link } from 'react-router-dom'

import * as serviceWorker from './serviceWorker';

import { Skeleton } from 'antd';
import 'antd/dist/antd.css';
import axios from './utils/axios'
import CompileRouter from "./routers/render"
import routers from "./routers/router.config.js"
React.Component.prototype.$axios = axios;

// TODO 权限and动态路由
ReactDOM.render(
	<Router>
		<React.Suspense fallback={<div>loading...</div>}>
			<CompileRouter routes={routers}></CompileRouter>
		</React.Suspense>
	</Router>
	, document.getElementById('root'));
serviceWorker.unregister();




