// elements
let form = document.getElementById("form");
let calcButton = document.getElementById("calculate");
let amountInput = document.getElementById("amount");
let interestInput = document.getElementById("interest");
let monthsInput = document.getElementById("months");

// functions
const submitForm = (event) => {
  event.preventDefault();
  calculate();
};

const isCleanData = () => {
  // values
  let months = Number(monthsInput.value);
  let amount = Number(amountInput.value);
  let interest = Number(interestInput.value);
  let clean = true
  if (!Number(months) || !Number(amount) || !isNumber(interest)) {
    clean = false
  }
  return clean
}

const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
}

const calculate = () => {
  // values
  let months = Number(monthsInput.value);
  let amount = Number(amountInput.value);
  let interest = Number(interestInput.value);
  let amortization = Number(amount / months);
  if (!isCleanData()) return
  let cardPayments = []
  const percentage = interest / 100
  let remainingPayment = amount
  for (const _ of [...Array(months).keys()]) {
    const interest = Math.round((remainingPayment * percentage * 100) / 100)
    const payment = Math.round((amortization + interest))
    cardPayments.push({
      payment,
      remainingPayment,
      interest
    })
    remainingPayment = remainingPayment - payment + interest
  }
  printResults(cardPayments)
};

const printResults = (results) => { 
  let resultGrid = document.getElementsByClassName("result")?.[0];
  let tempResultsDiv = document.createElement('div')
  tempResultsDiv.classList.add('result')
  let monthsHeader = document.createElement('div')
  monthsHeader.classList.add('grid-element')
  let resultsHeader = document.createElement('div')
  resultsHeader.classList.add('grid-element')
  monthsHeader.append(document.createTextNode('Months'))
  resultsHeader.append(document.createTextNode('Payments'))
  tempResultsDiv.append(monthsHeader)
  tempResultsDiv.append(resultsHeader)
  results.map((result, i) => {
    let paymentData = document.createElement('div')
    let monthData = document.createElement('div')
    monthData.append(document.createTextNode(`${i + 1}`))
    paymentData.append(document.createTextNode(`$${result.payment}`))
    monthData.classList.add('grid-element')
    paymentData.classList.add('grid-element')
    tempResultsDiv.append(monthData)
    tempResultsDiv.append(paymentData)
  })
  resultGrid.replaceWith(tempResultsDiv)
}

// listeners
form.addEventListener("submit", submitForm);
