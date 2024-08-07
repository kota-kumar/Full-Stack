let add_btn = document.querySelector(".add_btn")
let delete_btn = document.querySelector(".delete_btn")
let tick_cont = document.querySelector(".task_container")
let textarea = document.querySelector(".text_area")
let ticket_cont = document.querySelector(".ticket_cont")
let priority_clr = document.querySelectorAll(".color")
let filter_field = document.querySelector("#Priority_filter")
let filter_priorirty = document.querySelectorAll(".priority_color>p")
let color_box = document.querySelectorAll(".color_box");
let filter_removal = document.querySelector(".filter_removal")
let is_click = false;
let is_delete_clicked = false;
let unlockClass = 'fa-lock-open'
let ticket_array = []
let lockClass = 'fa-lock'
let isclicked = false;
let default_clr = "yellow";
let clrArray = ['yellow', 'green', 'lightblue', 'grey']
let tickets_from_storage =JSON.parse(localStorage.getItem("ticket_array"))
if(tickets_from_storage){
    ticket_array=tickets_from_storage
    ticket_array.forEach(function(ticket){
        createticket(ticket.id, ticket.ticket_text, ticket.ticket_clr)
    })
}
add_btn.addEventListener("click", function(){
is_click=!is_click
if(is_click==true){
    tick_cont.style.display="flex";
}else{
    tick_cont.style.display="none";
}
})
tick_cont.addEventListener("keydown", function(e){
    let key=e.key;
    if(key=="Shift"){
        let text=textarea.value
        createticket(null, text, default_clr);
        textarea.value="";
    }
})


function createticket(ticket_id ,ticket_text, ticket_clr){
    
    let id;
    if(ticket_id){
        id=ticket_id
    }else{
        id=shortid();
    }
    let new_tick = document.createElement("div");
    new_tick.setAttribute("class", "ticket_area")
    new_tick.innerHTML=`<div class="ticket_color ${ticket_clr}"></div>
                <div class="ticket_id">${id}</div>
                <div class="ticket_task">${ticket_text}</div>
                <div class="lock_icon"><i class="fa-solid fa-lock"></i></div>
            </div>`
            ticket_cont.appendChild(new_tick);
            tick_cont.style.display="none";
         
           
            changeColor(id, new_tick);
            lockIcon(id, new_tick);
            deleteTask(id,new_tick);
            filter_pri(new_tick);
         if(!ticket_id){
            ticket_array.push({id, ticket_text, ticket_clr})
            localStorage.setItem("ticket_array", JSON.stringify(ticket_array))
         }  
         console.log(ticket_array)
            

}
priority_clr.forEach(function(colr_ele){
    colr_ele.addEventListener("click", function(){
    priority_clr.forEach(function(clr_attr){
           clr_attr.classList.remove("active")
        })
        colr_ele.classList.add("active")
        let selected_clr = colr_ele.classList[1]
        default_clr=selected_clr;

    })
})
function changeColor(id, ticket){
  let curr_clr = ticket.querySelector(".ticket_color");
  curr_clr.addEventListener("click", function(){
    let curr_clr_val = curr_clr.classList[1];
    let curr_clr_val_idx = clrArray.findIndex(function(clr){
        return curr_clr_val==clr;
    })
    curr_clr_val_idx++;
    let new_clr_val_idx = curr_clr_val_idx%clrArray.length;
    let new_clr_val = clrArray[new_clr_val_idx]
    curr_clr.classList.remove(curr_clr_val)
    curr_clr.classList.add(new_clr_val)
    let idx = ticket_array.findIndex(function(ticket){
        return ticket.id==id;
    })
  ticket_array[idx].ticket_clr=new_clr_val;
  updatelocalStorage();
    })
    
  
}
function lockIcon(id, ticket){
    let lock_icon_class= ticket.querySelector(".lock_icon")
    let new_class = lock_icon_class.children[0];
    let task_area = ticket.querySelector(".ticket_task")
    lock_icon_class.addEventListener("click", function(){
        if(new_class.classList.contains(lockClass)){
            task_area.setAttribute("contenteditable", "true");
            new_class.classList.remove(lockClass)
            new_class.classList.add(unlockClass)
        }else{
            task_area.setAttribute("contenteditable", "false");
            new_class.classList.remove(unlockClass)
            new_class.classList.add(lockClass)

        let idx=ticket_array.findIndex(function(ticket){
            return ticket.id=id;
        })
        ticket_array[idx].ticket_text=task_area.textContent;
        //   localStorage.setItem("ticket_array", JSON.stringify(ticket_array))
        updatelocalStorage();
        }
        
    })
}
delete_btn.addEventListener("click", function(){
    is_delete_clicked=!is_delete_clicked
    if(is_delete_clicked==true){
        alert("Delete button activated! please click on the task you would like delete")
        delete_btn.style.fontSize = "3rem"
    }else{
        alert("Delete button deactivation! now you cannot delete any tasks")
        delete_btn.style.fontSize = "2rem"
    }
    deleteTask();

})
function deleteTask(id, ticket){
    ticket.addEventListener("click", function(e){
        if(is_delete_clicked==false){
            return;
        }else{
            ticket.remove();
            ticket_array= ticket_array.filter(function(ticket){
                return ticket.id!=id;
            })
            updatelocalStorage();
        }
    })

 
}
function filter_pri(ticket){
    filter_field.addEventListener("change", function(){
        let curr_val = filter_field.value;
        for(let i =0;i<color_box.length;i++){
        let pre = color_box[i].nextSibling.innerText;
        if(curr_val==pre){
let curr_clr_filter = color_box[i].classList[0];
let current_clr  = ticket.querySelector(".ticket_color")
let current_clr_class=current_clr.classList[1]
                if(curr_clr_filter==current_clr_class){
                    ticket.style.display="block";
                }else{
                    ticket.style.display="none";
                }
        }
        
        }
    })

filter_removal.addEventListener("click", function(){
    ticket.style.display="initial";
    filter_field.value="";
})
}
function updatelocalStorage(){
    localStorage.setItem("ticket_array", JSON.stringify(ticket_array))
}