import State from './state'
export default (prevState = State , actions )=>{
	let newData = JSON.parse(JSON.stringify(prevState))
	let {type,params} = actions
	
	switch (type) {
		case "CHANGE_THEME":
			newData.theme = params
			break;
			
		case "CHANGE_MEDOL":
			newData.Medol = params
			break;
			
		case "DEFAULT_OPENKEY":
			newData.openKey = params
			break;
			
		case "DEFAULT_SELECTEDKEY":
			newData.SelectedKeys = params
			break;
		case "userInfo":
			newData.userInfo = params
			break;
		case "authRouterList":
			newData.authRouterList = params
			break;
						
			
		default:
			break;
	}
	return newData
}
