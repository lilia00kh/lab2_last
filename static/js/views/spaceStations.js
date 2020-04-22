'use strict'

const spaceStationsModel = new SpaceStations() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#spaceStations-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const spaceStationsData = {}
    formData.forEach((value, key) => {
      spaceStationsData[key] = value
    })

    spaceStationsModel.Create(spaceStationsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#spaceStations-list').DataTable({
    data: spaceStationsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Name', data: 'name' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('spaceStationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#spaceStations-list').DataTable()

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
