const keys = document.querySelectorAll('.key');
const result = document.querySelector('.result');
const expression = document.querySelector('.expression');
const links = document.querySelector('.links');
const linker = document.querySelector('.linker');
let lastSubmitted = false;

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

function calculate(str) {
  if(str.includes('(')) {
    let start = str.indexOf('(') + 1;
    let end = str.lastIndexOf(')');
    let innerExpression = str.substring(start, end);
    let calculatedExpression = calculate(innerExpression);
    let newStr = str.replace(innerExpression, calculatedExpression);
    if (newStr.indexOf('(') != 0) {
      newStr = newStr.replace('(', '*');
    } else {
      newStr = newStr.replace('(', '');
    }
    if (newStr.lastIndexOf(')') != newStr.length - 1) {
      newStr = newStr.replace(')', '*');
    } else {
      newStr = newStr.replace(')', '');
    }
    return calculate(newStr);
  } else if(str.includes('+') || str.includes('-')) {
    let index = null;
    if(str.includes('+')) {
      index = str.indexOf('+');
    } else {
      index = str.indexOf('-');
    }
    let op = str.charAt(index);
    let firstExpression = str.substring(0, index);
    let secondExpression = str.substring(index + 1, str.length);
    if (firstExpression[0] == '*') {
      firstExpression = firstExpression.substring(1, firstExpression.length);
    }
    if (firstExpression[firstExpression.length - 1] == '*') {
      firstExpression = firstExpression.substring(0, firstExpression.length - 1);
    }
    if (secondExpression[0] == '*') {
      secondExpression = secondExpression.substring(1, secondExpression.length);
    }
    if (secondExpression[secondExpression.length - 1] == '*') {
      secondExpression = secondExpression.substring(0, secondExpression.length - 1);
    }
    firstExpression = calculate(firstExpression);
    secondExpression = calculate(secondExpression);
    return operate(op, firstExpression, secondExpression);
  } else if(str.includes('*') || str.includes('/') || str.includes('%')) {
    let index = 0;
    if(str.includes('*')) {
      index = str.lastIndexOf('*');
    }
    if(str.includes('/')) {
      if (index < str.lastIndexOf('/')) {
        index = str.lastIndexOf('/');
      }
    }
    if (str.includes('%')){
      if (index < str.lastIndexOf('%')) {
        index = str.lastIndexOf('%');
      }
    }
    let op = str.charAt(index);

    let firstExpression = calculate(str.substring(0, index));
    let secondExpression = calculate(str.substring(index + 1, str.length));
    return operate(op, firstExpression, secondExpression);
  } else {
    return Number(str);
  }
}

function computeExpression(key) {
  const keyNum = key.path['0'].innerText;
  if (lastSubmitted) {
    expression.textContent = '';
    lastSubmitted = false;
  }
  switch(keyNum) {
    case '=':
      let results = parseFloat(calculate(expression.textContent).toFixed(2));
      if (isNaN(results)){
        result.textContent = 'ERROR';
      } else {
        result.textContent = results;
      }
      lastSubmitted = true;
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

keys.forEach(key => key.addEventListener('click', computeExpression));

linker.addEventListener('mouseover', function(){
  links.classList.add('active');
  linker.classList.add('active');
});

links.addEventListener('mouseleave', function(){
  links.classList.remove('active');
  linker.classList.remove('active');
});
