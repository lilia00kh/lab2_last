'use strict'

const cargoOnStationModel = new Cargo_on_station()

// Перевезення вантажу з станції на станцію(зміна квитка з одного потяга на інший)
function deliverCargoFromStationToStation(cargo, newStation) {
  if(cargo != null) {
    cargo.station = newStation;
  }

  return cargo;
}

//Ініціалізація форми для Космічної станції
function initAddForm () {
  //TODO
  const form = window.document.querySelector('#cargo_on_station-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const cargoOnStationData = {}
    formData.forEach((value, key) => {
      cargoOnStationData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      cargoOnStationModel.Edit(cargoOnStationData)
    } else {
      cargoOnStationModel.Create2(cargoOnStationData)
    }

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#cargo_on_station-list').DataTable({
    data: cargoOnStationModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Space Station', data: 'space_station' },
      { title: 'Cargo', data: 'cargo' }
    ]
  })
}


function initListEvents () {
  document.addEventListener('cargo_on_stationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#cargo_on_station-list').DataTable()

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
//TODO
//deliverCargoFromStationToStation()
/*reportStationsCapacity()*/