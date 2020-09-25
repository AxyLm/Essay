console.log('111')
function component() {
    var element = document.createElement('div');
  
    element.innerHTML = ('Hello webpack common')
  
    return element;
  }
  
  document.body.appendChild(component());