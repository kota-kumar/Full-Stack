const form = document.querySelector('form')
const text = document.querySelector('.searchField')
const temp = document.querySelector('.temperature')
const loc = document.querySelector('.location p')
const loc_time = document.querySelector('.location span')
const weather_icon = document.querySelector('.condition img')
const weather_condi = document.querySelector('.condition span')

let target = "Hyderabad"

form.addEventListener('submit', search)

function search(e){
    e.preventDefault()
    target = text.value
    console.log(target)
    fetch_details(target)
}

async function fetch_details(target){
    const api_calls = `http://api.weatherapi.com/v1/current.json?key=3dd8b1c6b05b49b48bc162415242207&q=${target}&aqi=no`
    const response = await fetch(api_calls)
    const final_data = await response.json()
    const current_temp = final_data.current.temp_c
    const current_loc = final_data.location.name
    const current_time = final_data.current.last_updated
    const weather_icon = final_data.current.condition.icon
    const weather_condition = final_data.current.condition.text
    console.log(final_data)
    add_details(current_temp, current_loc, current_time, weather_icon, weather_condition)
}
function add_details(curr_temp, curr_loc, curr_time, emoji, weather_condition){
    temp.innerText = curr_temp
    loc.innerText = curr_loc
    loc_time.innerText = curr_time
    weather_icon.src = emoji
    weather_condi.innerText = weather_condition
}