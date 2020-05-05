'use strict'


const spaceStationsModel = new SpaceStations() // eslint-disable-line no-undef

function initList2 () {
    window.jQuery('#spaceStations2-list').DataTable({
        data: spaceStationsModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Number', data: 'number' },
            { title: 'Necessity', data: 'necessity' },
            { title: 'Capacity', data: 'capacity' }
        ]
    })
    initSelection2()
}

function initSelection2() {
    let table = document.getElementById('spaceStations2-list')
    let tbody = table.tBodies[0]
    for (let i = 0; i < tbody.rows.length; ++i) {
        tbody.rows[i].addEventListener('click', function() {
            let cells = this.getElementsByTagName('td')
            let id = +cells[0].innerText
            let station = spaceStationsModel.FindById(id)
            let s = 'selected'
            if (this.classList.contains(s)) {
                this.classList.remove(s)
                showButton(['submit'])
            }
            else {
                let tbody = this.parentNode
                for (let i = 0; i < tbody.rows.length; ++i) {
                    tbody.rows[i].classList.remove(s)
                }
                this.classList.add(s)
                let form = document.getElementById('spaceStations-add-form')
                let formInputs = {
                    number: document.getElementById('number'),
                    necessity: document.getElementById('necessity'),
                    capacity: document.getElementById('capacity')
                }
                formInputs.number.value = +station.number
                formInputs.necessity.value = station.necessity
                formInputs.capacity.value = +station.capacity
                showButton(['update', 'delete'])
            }
        }, false)
    }
}
window.addEventListener('DOMContentLoaded', e => {
    initList2()
})