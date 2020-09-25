function component() {
    var element = document.createElement('div');
  
    element.innerHTML = ('Hello webpack me')
  
    return element;
  }
  
  document.body.appendChild(component());