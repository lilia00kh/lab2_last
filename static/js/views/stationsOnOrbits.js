'use strict'

const stationsOnOrbitsModel = new StationsOnOrbits() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#stationsOnOrbits-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const stationsOnOrbitsData = {}
    formData.forEach((value, key) => {
      stationsOnOrbitsData[key] = value
    })

    stationsOnOrbitsModel.Create(stationsOnOrbitsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#stationsOnOrbits-list').DataTable({
    data: stationsOnOrbitsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Station', data: 'station' },
      { title: 'Planet', data: 'planet' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('stationsOnOrbitsListDataChanged', function (e) {
    const dataTable = window.jQuery('#stationsOnOrbits-list').DataTable()

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
