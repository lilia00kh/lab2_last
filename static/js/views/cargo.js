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
  const updateButton = window.document.querySelector('#update')
  updateButton.addEventListener('click', function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    const cargoData = {}
    formData.forEach((value, key) => {
      cargoData[key] = value
    })

    cargoModel.Update(cargoData, getSelectedItemId())

    e.target.reset()
  })
  const deleteButton = window.document.querySelector('#delete')
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault()

    cargoModel.Delete(getSelectedItemId())
    showButton(['submit'])
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
  initSelection()
}

function initListEvents () {
  document.addEventListener('cargoListDataChanged', function (e) {
    const dataTable = window.jQuery('#cargo-list').DataTable()

    dataTable.clear()
    dataTable.rows.add(e.detail)
    dataTable.draw()
    initSelection()
  }, false)
}

function getSelectedItemId() {
  return +document
    .getElementsByClassName('selected')[0]
    .getElementsByTagName('td')[0]
    .innerText
}
function initSelection() {
  let table = document.getElementById('cargo-list')
  let tbody = table.tBodies[0]
  for (let i = 0; i < tbody.rows.length; ++i) {
    tbody.rows[i].addEventListener('click', function() {
      let cells = this.getElementsByTagName('td')
      let id = +cells[0].innerText
      let cargo = cargoModel.FindById(id)
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
        let form = document.getElementById('cargo-add-form');
        let formInputs = {
          code: document.getElementById('code'),
          name: document.getElementById('name'),
          mass: document.getElementById('mass')
        }
        formInputs.code.value = +cargo.code
        formInputs.name.value = cargo.name
        formInputs.mass.value = +cargo.mass
        showButton(['update', 'delete'])
      }
    }, false);
  }
}


function showButton (buttonIdArray) {
  let btnArray = [...document.getElementsByTagName('button')]
  btnArray = btnArray.filter(item => item.type == 'submit')
  for (let i = 0; i < btnArray.length; ++i) {
    btnArray[i].classList.add('hidden')
  }
  for (let i = 0; i < buttonIdArray.length; ++i) {
    let id = buttonIdArray[i]
    let button = document.getElementById(id)
    button.classList.remove('hidden')
  }
}


function getShownButton () {
  let btnArray = [...document.getElementsByTagName('button')]
  btnArray = btnArray.filter(item => item.type == 'submit')
  btnArray = btnArray.filter(item => !item.classList.contains('hidden'))
  return btnArray[0]
}


window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
