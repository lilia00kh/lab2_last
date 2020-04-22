'use strict'

const cargoModel = new Cargo() // eslint-disable-line no-undef

function initAddForm () {
  const form = window.document.querySelector('#cargo-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const cargoData = {}
    formData.forEach((value, key) => {
      cargoData[key] = value
    })

    cargoModel.Create(cargoData)

    e.target.reset()
  })
}

function initList () {
  window.jQuery('#cargo-list').DataTable({
    data: cargoModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Code', data: 'code' },
      { title: 'Name', data: 'name' },
      { title: 'Mass', data: 'mass' }
    ]
  })
}

function initListEvents () {
  document.addEventListener('cargoListDataChanged', function (e) {
    const dataTable = window.jQuery('#cargo-list').DataTable()

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
