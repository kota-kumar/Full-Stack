let task_cont = document.querySelector(".task_container")
task_cont.style.display = "none"
let add_btn = document.querySelector(".add_btn")
let textarea = document.querySelector(".text_area")
let tick_cont = document.querySelector(".ticket_cont")
let all_clr = document.querySelectorAll(".color")
let delete_btn = document.querySelector(".delete_btn")
let Priority_filter =document.querySelector("#Priority_filter")
let color_box = document.querySelectorAll(".priority_color>p")
let color_fit = document.querySelectorAll("color_box")
let filter_remove=document.querySelector(".filter_removal")

let unlockClass = 'fa-lock-open'
let lockClass = 'fa-lock'
let isclicked = false;
let removetaskflag = false;
let addtaskflag = false;
let priority_clr = "grey"
let color_array = ['yellow', 'green', 'lightblue', 'grey'];
add_btn.addEventListener("click", function () {
    isclicked = !isclicked
    if (isclicked == true) {
        task_cont.style.display = "flex"
    } else {
        task_cont.style.display = "none"
    }
})
task_cont.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key == "Shift") {
        let text = textarea.value;
        new_ticket(text)
    }
})
function new_ticket(task) {
    let id = shortid()
    let new_task = document.createElement("div")
    new_task.setAttribute("class", "ticket_area")
    new_task.innerHTML = `<div class="ticket_color ${priority_clr}"></div>
                <div class="ticket_id">${id}</div>
                <div class="ticket_task">${task}</div>
                <div class="lock_icon"><i class="fa-solid fa-lock"></i></div>`
    tick_cont.appendChild(new_task)
    task_cont.style.display = "none"
    lock_functionality(new_task)
    delete_task(new_task)
    color_filter(new_task)
    filter_value(new_task)
}
all_clr.forEach(function (color_ele) {
    color_ele.addEventListener("click", function () {
        all_clr.forEach(function (priority_clr_ele) {
            priority_clr_ele.classList.remove("active")
        })
        color_ele.classList.add("active")
        let selected_clr = color_ele.classList[1]
        priority_clr = selected_clr
    })
})
function lock_functionality(lock_task) {
    let ticket_lock = lock_task.querySelector(".lock_icon")
    let lock_class = ticket_lock.children[0]
    let task_area = lock_task.querySelector(".ticket_task")
    ticket_lock.addEventListener("click", function () {
        if (lock_class.classList.contains(lockClass)) {
            task_area.setAttribute("contenteditable", "true")
            lock_class.classList.add(unlockClass)
            lock_class.classList.remove(lockClass)
        } else {
            lock_class.classList.add(lockClass)
            lock_class.classList.remove(unlockClass)
            task_area.setAttribute("contenteditable", "false")
        }

    })
}

delete_btn.addEventListener("click", function () {
    removetaskflag = !removetaskflag
    if (removetaskflag == true) {
        alert("Remove button Activated, please click on task you would like to delete")
        delete_btn.style.fontSize = "3rem"
    } else {
        alert("Remove button De-Activated")
        delete_btn.style.fontSize = "2rem"
    }
    delete_task();

})

function delete_task(ticket) {
    ticket.addEventListener("click", function () {
        if (removetaskflag == false) {
            return;
        } else {
            ticket.remove()
        }
    })
}


function color_filter(ticket) {
   let color_band = ticket.querySelector(".ticket_color");

   color_band.addEventListener("click", function(){
    let current_color_band = color_band.classList[1];
    let current_color_band_index = color_array.findIndex(function(clr){
        return current_color_band===clr
    })
    current_color_band_index++;
    let new_color_bandidx = current_color_band_index%color_array.length;
    let new_color_band = color_array[new_color_bandidx]
    color_band.classList.remove(current_color_band)
    color_band.classList.add(new_color_band)
   })
}


function filter_value(ticket){
Priority_filter.addEventListener("change", function(){
    let current_val = Priority_filter.value;
        for(let i =0;i<color_box.length;i++){
            if(current_val===color_box[i].innerText){
                let color_ele =color_box[i].previousSibling.classList[0];
                let current_color = ticket.querySelector(".ticket_color")
                let current_color_class=current_color.classList[1]
              if(color_ele==current_color_class){
                ticket.style.display="block"
              }else{
                ticket.style.display="none"
              }
            }
        }

})
            filter_remove.addEventListener("click", function(){
                ticket.style.display="initial"
                Priority_filter.value=""
            })
}