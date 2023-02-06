const firstSelectBox = document.getElementById("first-exchange-value")
const secondSelectBox = document.getElementById("second-exchange-value")

const selecListData = async () => {
    const response = await fetch("https://api.exchangerate.host/lastes")
    const data = await response.json();
    let html = ""
    Object.entries(data.rates).forEach(([key, value]) => {
        html += 
        `
         <option value="${value}">${key}</option>
        ` 
    })

    firstSelectBox.innerHTML += html;
    secondSelectBox.innerHTML += html;

}

selecListData()