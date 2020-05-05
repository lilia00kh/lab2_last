'use strict'

const cargoOnPlanetModel = new Cargo_on_planet()

//Ініціалізація форми для Космічної станції
function initAddForm () {
    //TODO
    const form = window.document.querySelector('#cargo_on_planet-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        const cargoOnPlanetData = {}
        formData.forEach((value, key) => {
            cargoOnPlanetData[key] = value
        })
        if (document.getElementById("form-button").innerHTML === "Save") {
            cargoOnPlanetModel.Edit(cargoOnPlanetData)
        } else {
            cargoOnPlanetModel.Create2(cargoOnPlanetData)
        }

        e.target.reset()
    })
}

function initList () {
    window.jQuery('#cargo_on_planet-list').DataTable({
        data: cargoOnPlanetModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Planet', data: 'planet' },
            { title: 'Cargo', data: 'cargo' }
            ]
    })
}


function initListEvents () {
    document.addEventListener('cargo_on_planetsListDataChanged', function (e) {
        const dataTable = window.jQuery('#cargo_on_planet-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
