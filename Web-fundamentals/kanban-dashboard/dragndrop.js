let draggables = document.querySelectorAll(".ticket_area")
let droppables = document.querySelectorAll(".sections")

draggables.forEach(function (ticket) {

    ticket.addEventListener("dragstart", () => {
        ticket.classList.add("isdragging")
    })
    ticket.addEventListener("dragend", () => {
        ticket.classList.remove("isdragging")

    })
})
droppables.forEach(function (zone) {

    zone.addEventListener("dragover", e => {
        e.preventDefault();
        const afterEle = dragAfter(zone, e.clientY)
        let ticket = document.querySelector(".isdragging")

        if (afterEle == null) {
            zone.appendChild(ticket)
        } else {
            zone.insertBefore(ticket, afterEle)
        }
    });

})


function dragAfter(zone, y) {
    let draggbleEle = [...zone.querySelectorAll(".ticket_area:not(.isdragging)")]
    // console.log(draggbleEle)

    return draggbleEle.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child }

        } else {
            return closest
        }

    }, { offset: Number.NEGATIVE_INFINITY }).element

}

