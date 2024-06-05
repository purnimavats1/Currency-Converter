const BASE_URL = "https://api.frankfurter.app/latest?amount=1&from=USD&to=INR"

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load" , () =>
{
    updateExchangeRate();

})

for (let select of dropdown) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        }
        else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateFlag = (Element) => {
    code = Element.value;
    let countryCode = countryList[code];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = Element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click",  (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});
 
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input")
    let amtValue = amount.value;
    if (amtValue === "" || amtValue < 1) {
        amtValue = 1;
        amount.value = "1";

    }
    const URL = `https://api.frankfurter.app/latest?amount=${amtValue}&from=${fromCurr.value}&to=${toCurr.value}`;
    let response = await fetch(URL);
    let data = await response.json();
    const rate = data.rates[toCurr.value];
    msg.innerHTML = `${amtValue} ${fromCurr.value} = ${rate} ${toCurr.value}`;
}
