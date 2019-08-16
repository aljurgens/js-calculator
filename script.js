const linker = document.querySelector('.linker');
const links = document.querySelector('.links');

function add(n, m) {
  return n + m;
}

function subtract(n, m) {
  return n - m;
}

function multiply(n, m) {
  return n * m;
}

function divide(n, m) {
  return n / m;
}

function operate(op, n, m) {
  switch(op) {
    case '+':
      return add(n, m);
      break;
    case '-':
      return sub(n, m);
      break;
    case '*':
      return multiply(n, m);
      break;
    case '/':
      return divide(n, m);
      break;
    default:
      return error;
      break;
  }
}

linker.addEventListener('mouseover', function(){
  links.classList.add('active');
  linker.classList.add('active');
});

links.addEventListener('mouseleave', function(){
  links.classList.remove('active');
  linker.classList.remove('active');
});
