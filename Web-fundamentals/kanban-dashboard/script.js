let plus_btn = document.querySelector(".add-btn")
let delete_btn=document.querySelector(".delete-btn")
let new_ticket_area=document.querySelector(".new-ticket-area")
let ticket_details = document.querySelector(".ticket-area")
let not_started = document.querySelector(".not_started")
let textarea = document.querySelector(".text-area")
let all_clr_priority = document.querySelectorAll(".priority-color")
let current_color_selected = "yellow"
new_ticket_area.style.display="none"
let openlock = 'fa-lock-open';
let closelock = 'fa-lock';
let islock =true;
let isdelete=false;
let isvisible=false
plus_btn.addEventListener("click", function(){
    isvisible=!isvisible
    if(isvisible==true){
        new_ticket_area.style.display="flex"
    }else{
        new_ticket_area.style.display="none"
    }
})

new_ticket_area.addEventListener("keydown", function(e){
    let key = e.key
  if(key=="Shift"){
    let new_task = textarea.value
    createTicket(new_task, current_color_selected)
  }

})
function createTicket(taskdetails, clr_selected){
    let id=shortid()
    let ticket_cont = document.createElement("div")
    ticket_cont.setAttribute("class", "task-details")
    ticket_cont.innerHTML=`<div class="task-details">
        <div class="ticket-color ${clr_selected}"></div>
            <div class="ticket-id">${id}</div>
            <div class="ticket-task">${taskdetails}</div>
            <div class="lock-icon"><i class="fa-solid fa-lock"></i></div>      
    </div>`
   
not_started.appendChild(ticket_cont)

 new_ticket_area.style.display="none"
lockhandle(ticket_cont)
}

all_clr_priority.forEach(function(colorElem){
    colorElem.addEventListener("click", function(){
        all_clr_priority.forEach(function(current_clr){
            current_clr.classList.remove("active")
        });
        colorElem.classList.add("active")
        let color_selected=colorElem.classList[1]
        console.log(color_selected)
        current_color_selected = color_selected;
    })
})

function lockhandle(ticket){
    let tick_loc_ele = ticket.querySelector(".lock-icon")
    let tick_loc_icon = tick_loc_ele.children[0]
    let taskarea=ticket.querySelector(".ticket-task")
    tick_loc_icon.addEventListener("click", function(){
        if(tick_loc_icon.classList.contains(closelock)){
            tick_loc_icon.classList.add(openlock)
            tick_loc_icon.classList.remove(closelock)
            taskarea.setAttribute("contenteditable", "true")
        }else{
            tick_loc_icon.classList.add(closelock)
            tick_loc_icon.classList.remove(openlock)
            taskarea.setAttribute("contenteditable", "false")
        }
    })
}
lockhandle()