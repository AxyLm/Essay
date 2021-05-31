import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
 
import { Skeleton } from 'antd';
import 'antd/dist/antd.css';
import axios from'./utils/axios'
import Chart from "./views/chartHome/index"
React.Component.prototype.$axios = axios;
ReactDOM.render(
		<Chart></Chart >
	, document.getElementById('root'));
serviceWorker.unregister();




