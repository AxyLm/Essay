function component() {
    var element = document.createElement('div');
  
    element.innerHTML = ('Hello webpack index')
  
    return element;
  }
  
  document.body.appendChild(component());