const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-grid')

let displayValue = '0'
let firstValue = null
let operator = null
let waitingForSecondValue = false

updateDisplay()

function updateDisplay() {
  display.value = displayValue
}

keys.addEventListener('click', function (e) {
  const element = e.target
  if (!element.matches('button')) return

  if (element.classList.contains('operator')) {
    // console.log('operator', element.value)
    handleOperator(element.value)
    updateDisplay()
    return
  }
  if (element.classList.contains('decimal')) {
    // console.log('operator', element.value)
    inputDecimal(element.value)
    updateDisplay()
    return
  }
  if (element.classList.contains('clear')) {
    // console.log('operator', element.value)
    clear()
    updateDisplay()
    return
  }
  if (element.classList.contains('delete')) {
    console.log('operator', element.value)
    return
  }
  // console.log('number', element.value)
  inputNumber(element.value)
  updateDisplay()
})

function handleOperator(nextOperator) {
  const value = parseFloat(displayValue)

  if (operator && waitingForSecondValue) {
    operator = nextOperator
    return
  }

  if (firstValue == null) {
    firstValue = value
  } else if (operator) {
    const result = calculater(firstValue, value, operator)

    displayValue = `${parseFloat(result.toFixed(3))}`
    firstValue = result
  }
  waitingForSecondValue = true
  operator = nextOperator

  console.log(displayValue, firstValue, operator, waitingForSecondValue)
}
function calculater(first, second, operator) {
  if (operator === '+') {
    return first + second
  } else if (operator === '-') {
    return first - second
  } else if (operator === '*') {
    return first * second
  } else if (operator === '%') {
    return first / second
  }
  return second
}

function inputNumber(num) {
  if (waitingForSecondValue) {
    displayValue = num
    waitingForSecondValue = false
  } else {
    displayValue = displayValue === '0' ? num : displayValue + num
  }
}

function inputDecimal() {
  if (!displayValue.includes('.')) displayValue += '.'
}

function clear() {
  displayValue = '0'
}
