const search_text = document.querySelector(".search-area")
const submit = document.querySelector("form")
let temp = document.querySelector(".temperature")
let loc = document.querySelector(".location>p")
let timestamp = document.querySelector(".location>span")
let icone = document.querySelector(".condition>img")
let cond = document.querySelector(".condition>span")

let target = "Hyderabad"
submit.addEventListener("submit", search_val)
    function search_val(e){
        e.preventDefault();
        target = search_text.value
        fetch_details_API(target)
    }

async function fetch_details_API(target){
    let fetch_data = `https://api.weatherapi.com/v1/current.json?key=3dd8b1c6b05b49b48bc162415242207&q=${target}&aqi=no`
    let response = await fetch(fetch_data)
    let data = await response.json()
   console.log(data)
   let currTemp =data.current.temp_c;
   temp.innerText = currTemp
   let currloc = data.location.name;
   loc.innerText=currloc
   let time = data.current.last_updated;
   timestamp.innerText=time;
   let icon = data.current.condition.icon;
   icone.src =icon    
   let currcond = data.current.condition.text;
   cond.innerText = currcond

}
fetch_details_API(target)