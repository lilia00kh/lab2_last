'use strict'

const planetsModel = new Planets() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#planets-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const planetsData = {}
    formData.forEach((value, key) => {
      planetsData[key] = value
    })

    planetsModel.Create(planetsData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#planets-list').DataTable({
    data: planetsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Mass', data: 'mass' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('planetsListDataChanged', function (e) {
    const dataTable = window.jQuery('#planets-list').DataTable()

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
