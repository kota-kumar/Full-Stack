const plus_btn = document.querySelector(".add-btn")
const delete_btn=document.querySelector(".delete-btn")
const new_ticket_area=document.querySelector(".new-ticket-area")
const ticket_details = document.querySelector(".ticket-area")
new_ticket_area.style.display="none"
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
