import ('../style/style.css')
function component() {
    var element = document.createElement('div');
  
    element.innerHTML = ('Hello webpack  about')
  
    return element;
  }
  
  document.body.appendChild(component());