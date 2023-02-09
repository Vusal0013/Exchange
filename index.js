const firstSelectBox = document.getElementById("first-exchange-value")
const secondSelectBox = document.getElementById("second-exchange-value");

const selectBoxs = document.querySelectorAll(".select-box")

const firstInput = document.getElementById("first-input")
const secondInput = document.getElementById("second-input")

const exchangeSymbol = document.querySelectorAll(".exchange-symbol")

let exchangeData;


// selectBoxlara optionlar vermek uchun funksiya
const selecListData = async () => {
    const response = await fetch("https://api.exchangerate.host/lastes")
    const data = await response.json();
    let html = ""
    Object.keys(data.rates).forEach((key) => {
        html += 
        `
         <option value="${key}">${key}</option>
        ` 
    })

    firstSelectBox.innerHTML += html;
    secondSelectBox.innerHTML += html;
}
window.addEventListener("load", selecListData)


// selectBoxlar change oldugu zaman kod bloku ishleyir
selectBoxs.forEach(selectBox => {
    selectBox.addEventListener("change", () => {
        if(firstSelectBox.value !== "0" && secondSelectBox.value !== "0")
        {
            getResponse(firstSelectBox.value, secondSelectBox.value);
            firstInput.disabled = false
        }
    })
})


// apidan datani alir ve exchangeData deyisheninde saxlayir
const getResponse = async (firstValue, secondValue) => {
    const res = await fetch(`https://api.exchangerate.host/latest?base=${firstValue}&symbols=${secondValue}`);
    exchangeData = await res.json()
    changeExchangeValues(firstSelectBox.value, secondSelectBox.value); // eger valyuta deyishdikde inputboxda value varsa ona uygun olaraq emeliyyat yerine yetirilir
}



//deyer daxil edildikde Exchange emeliyyati yerine yetirilir
const changeExchangeValues = async (firstValue, secondValue) => {
    let data = await exchangeData
    exchangeSymbol[0].innerText = `1 ${firstValue} = 1 ${firstValue}`
    exchangeSymbol[1].innerText = `1 ${firstValue} = ${data.rates[secondValue]} ${secondValue}`

    secondInput.value = (firstInput.value * data.rates[secondValue]).toFixed(2)
}

firstInput.addEventListener("input", () => {
    changeExchangeValues(firstSelectBox.value, secondSelectBox.value);
})
