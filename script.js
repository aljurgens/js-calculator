const keys = document.querySelectorAll('.key');
const reset = document.querySelector('.reset');
const result = document.querySelector('.result');
const expression = document.querySelector('.expression');
const links = document.querySelector('.links');
const linker = document.querySelector('.linker');

function add(n, m) {
  return n + m;
}

function sub(n, m) {
  return n - m;
}

function multiply(n, m) {
  return n * m;
}

function divide(n, m) {
  return n / m;
}

function mod(n, m) {
  return n % m;
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
    case '%':
      return mod(n, m);
      break;
    default:
      return error;
      break;
  }
}

function clear(e) {
  result.textContent = '0';
  expression.textContent = '';
}

function calculate(key) {
  const keyNum = key.path['0'].innerText;
  switch(keyNum) {
    case '=':

      let exp = expression.textContent;
      let op = null;
      let x = 0;

      for (let i = 0; i < exp.length-1; i++) {
        if (exp[i] == '-' || exp[i] == '+' || exp[i] == '/' || exp[i] == '*' || exp[i] == '%') {
          op = exp.charAt(i);
          x = i;
        }
      }

      let n = Number(expression.textContent.substring(0, x));
      let m = Number(expression.textContent.substring(x + 1, expression.textContent.length));

      let results = operate(op, n, m);
      if (isNaN(results)) {
        result.textContent = 'ERROR';
      } else {
        result.textContent = results;
      }

      break;
    case 'AC':
      clear();
      break;
    default:
      result.textContent = keyNum;
      expression.textContent += keyNum;
      break;
  }
}

keys.forEach(key => key.addEventListener('click', calculate));

linker.addEventListener('mouseover', function(){
  links.classList.add('active');
  linker.classList.add('active');
});

links.addEventListener('mouseleave', function(){
  links.classList.remove('active');
  linker.classList.remove('active');
});
