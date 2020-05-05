'use strict'

const planetsModel = new Planets() // eslint-disable-line no-undef
const planetsModel2 = planetsModel // eslint-disable-line no-undef

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
  const updateButton = window.document.querySelector('#update')
  updateButton.addEventListener('click', function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    const planetsData = {}
    formData.forEach((value, key) => {
      planetsData[key] = value
    })

    planetsModel.Update(planetsData, getSelectedItemId())

    e.target.reset()
  })
  const deleteButton = window.document.querySelector('#delete')
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault()

    planetsModel.Delete(getSelectedItemId())
    showButton(['submit'])
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
  initSelection()
}

function initListEvents () {
  document.addEventListener('planetsListDataChanged', function (e) {
    const dataTable = window.jQuery('#planets-list').DataTable()

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

function initList2 () {
  window.jQuery('#planets2-list').DataTable({
    data: planetsModel2.Select2(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Mass', data: 'mass' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
  // initSelection2()
}

function initSelection() {
  let table = document.getElementById('planets-list')
  let tbody = table.tBodies[0]
  for (let i = 0; i < tbody.rows.length; ++i) {
    tbody.rows[i].addEventListener('click', function() {
      let cells = this.getElementsByTagName('td')
      let id = +cells[0].innerText
      let planet = planetsModel.FindById(id)
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
        let form = document.getElementById('planets-add-form');
        let formInputs = {
          name: document.getElementById('name'),
          mass: document.getElementById('mass'),
          capacity: document.getElementById('capacity')
        }
        formInputs.name.value = planet.name
        formInputs.mass.value = +planet.mass
        formInputs.capacity.value = +planet.capacity
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
  initList2()
})
