let add_btn = document.querySelector(".add_btn");
let add_task = document.querySelector("#add_task")
let cancel_task = document.querySelector("#cancel_task")
let new_task_area = document.querySelector(".new_task_area")
let new_task = document.querySelector("#new_task")
let ticket_container = document.querySelector(".ticket_container")
let new_ticke = document.querySelectorAll(".ticket_container")
let new_task_input = document.querySelectorAll(".new_task_area>input[type=radio]")
let color_box = document.querySelectorAll(".color_box")
let delete_btn = document.querySelector(".delete_btn");
let priority_filter = document.querySelector("#priority_filter")
let filter_removal = document.querySelector(".filter_removal")
let sections = document.querySelectorAll(".sections")
let not_started = document.querySelector("#not_started")
let in_progress = document.querySelector("#in_progress")
let in_review = document.querySelector("#in_review")
let comp = document.querySelector("#comp")
let isdraggableele = null;
let is_add_btn_clicked = false;
let is_delete_clicked = false;
let ticketArray = [];

let clr = "gray"
let clr_array = ["gray", "purple", "green", "jasper"]
let tickets_from_localstorage = JSON.parse(localStorage.getItem('ticketArray'))
if (tickets_from_localstorage) {
    ticketArray = tickets_from_localstorage
    ticketArray.forEach(function (ticket) {
        createNewTicket(ticket.ticket_id, ticket.task_details, ticket.clr, ticket.status)
    })
}
add_btn.addEventListener("click", function () {
    is_add_btn_clicked = !is_add_btn_clicked
    if (is_add_btn_clicked == true) {
        new_task_area.style.display = "flex"
    } else {
        new_task_area.style.display = "none"
    }
})
add_task.addEventListener("click", function () {
    let task_text = new_task.value;
    createNewTicket(null, task_text, clr)
    new_task_area.style.display = "none"
    new_task.value = "";
})

cancel_task.addEventListener("click", function () {
    new_task_area.style.display = "none"
    new_task.value = "";
    new_task_input.checked = "none";
})
function createNewTicket(id, task_details, clr, status = "not_started") {
    let ticket_id;
    if (id) {
        ticket_id = id;
    } else {
        ticket_id = shortid();
    }
    let newTicket = document.createElement("div")

    newTicket.setAttribute("class", "ticket_area")
    newTicket.setAttribute("draggable", "true")
    newTicket.setAttribute("data-id", ticket_id)
    newTicket.innerHTML = `<div class="ticket_task_area">${task_details}</div>
                <div class="ticket_id_sec">
                    <div class="ticket_color ${clr}"></div>
                <div class="ticket_id">${ticket_id}</div>`

    document.getElementById(status).appendChild(newTicket)

    if (!id) {
        ticketArray.push({ ticket_id, task_details, clr, status })
        updateStorage()
    }

    PrioriyColor(ticket_id, newTicket)
    deleteTicket(ticket_id, newTicket)
    changePriorityColor(ticket_id, newTicket)
    filterPriority(newTicket)
    addDragListeners(newTicket)
}

function addDragListeners(element) {
    element.addEventListener('dragstart', dragStart)
    element.addEventListener('dragend', dragEnd)
}

function dragStart(e) {
    isdraggableele = e.target
    setTimeout(() => {
        e.target.style.display = 'none'
    }, 0)
}

function dragEnd(e) {
    e.target.style.display = 'block'
    isdraggableele = null
}

sections.forEach(section => {
    section.addEventListener('dragover', dragOver)
    section.addEventListener('dragenter', dragEnter)
    section.addEventListener('dragleave', dragLeave)
    section.addEventListener('drop', dragDrop)
})

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
    e.target.classList.add('drag-over')
}

function dragLeave(e) {
    e.target.classList.remove('drag-over')
}

function dragDrop(e) {
    e.target.classList.remove('drag-over')
    const closestSection = e.target.closest('.sections')
    if (closestSection && isdraggableele) {
        closestSection.appendChild(isdraggableele)
        updateTicketStatus(isdraggableele.getAttribute('data-id'), closestSection.id)
    }
}

function updateTicketStatus(id, newStatus) {
    let idx = ticketArray.findIndex(ticket => ticket.ticket_id === id)
    if (idx !== -1) {
        ticketArray[idx].status = newStatus
        updateStorage()
    }
}

function updateStorage() {
    localStorage.setItem("ticketArray", JSON.stringify(ticketArray))
}

new_task_input.forEach(function (priority_category) {
    priority_category.addEventListener("click", function (e) {
        e.target.setAttribute("checked", "checked")
        for (let i = 0; i < new_task_input.length; i++) {
            if (!new_task_input[i].checked) {
                new_task_input[i].removeAttribute("checked", "checked")
            }
        }
    })

})
function PrioriyColor(id, ticket) {
    let current_ticket_color = ticket.querySelector(".ticket_color")
    current_ticket_color.classList.remove(clr)
    let current_checked_priority;
    for (let i = 0; i < new_task_input.length; i++) {
        if (new_task_input[i].checked) {
            current_checked_priority = new_task_input[i].nextElementSibling.innerHTML
        }
    }
    for (let i = 0; i < color_box.length; i++) {
        let mtched_pri = color_box[i].nextElementSibling.innerHTML;
        if (current_checked_priority == mtched_pri) {
            current_ticket_color.classList.add(color_box[i].classList[0])
            clr = color_box[i].classList[0]
            // let idx = ticketArray.findIndex(function(ticket){
            //     return ticket.ticket_id=== id;
            // })

            // ticketArray[idx].clr=color_box[i].classList[0]
            updateStorage()
        }

    }
}

delete_btn.addEventListener("click", function () {
    is_delete_clicked = !is_delete_clicked
    if (is_delete_clicked == true) {
        alert("Delete Button Activated! please click on the tasks you would like to delete!!")
        delete_btn.style.fontSize = "3rem"
    } else {
        alert("Delete Button De-Activated! You cannot Delete any tasks now")
        delete_btn.style.fontSize = "2rem"
    }
    deleteTicket()
})
function deleteTicket(id, ticket) {
    ticket.addEventListener("click", function () {
        if (is_delete_clicked == false) {
            return;
        } else {
            ticket.remove();
            ticketArray = ticketArray.filter(function (ticket) {
                return ticket.ticket_id != id
            })
            updateStorage()
        }

    })
}
function changePriorityColor(id, ticket) {
    let current_clr = ticket.querySelector(".ticket_color")
    current_clr.addEventListener("click", function () {
        let current_clr_val = current_clr.classList[1];
        let current_clr_val_idx = clr_array.findIndex(function (clr) {
            return current_clr_val == clr
        })
        current_clr_val_idx++;
        let new_clr_val_idx = current_clr_val_idx % clr_array.length
        let new_clr_val = clr_array[new_clr_val_idx]
        current_clr.classList.remove(current_clr_val)
        current_clr.classList.add(new_clr_val)


        let idx = ticketArray.findIndex(function (ticket) {
            return ticket.ticket_id === id
        })
        ticketArray[idx].clr = new_clr_val
        updateStorage()
    })
}
function filterPriority(ticket) {
    priority_filter.addEventListener("change", function (e) {
        let filter_val = e.target.value;
        for (let i = 0; i < color_box.length; i++) {
            let pre = color_box[i].nextElementSibling.innerHTML;
            if (filter_val == pre) {
                let clr = color_box[i].classList[0]
                let ticket_clr = ticket.querySelector(".ticket_color")
                let ticket_color = ticket_clr.classList[1];
                if (clr == ticket_color) {
                    ticket.style.display = "block";
                } else {
                    ticket.style.display = "none";
                }
            }
        }
    })
    filter_removal.addEventListener("click", function () {
        ticket.style.display = "initial"
        priority_filter.value = "";
    })
}



function updateStorage() {
    localStorage.setItem("ticketArray", JSON.stringify(ticketArray))
}
