'use strict'

const spaceStationsModel = new SpaceStations() // eslint-disable-line no-undef
const spaceStationsModel2 = spaceStationsModel // eslint-disable-line no-undef


function initAddForm () {
  const form = window.document.querySelector('#spaceStations-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()// після натискання на кнопку не переходимо на нову сторінку

    const formData = new FormData(e.target)// e.target- на який елемент всередині форми був зроблений клік
    const spaceStationsData = {}
    formData.forEach((value, key) => {
      spaceStationsData[key] = value
    })

    spaceStationsModel.Create(spaceStationsData)
    e.target.reset()
  })
  const updateButton = window.document.querySelector('#update')
  updateButton.addEventListener('click', function (e) {
    e.preventDefault()

    const formData = new FormData(form)
    const spaceStationsData = {}
    formData.forEach((value, key) => {
      spaceStationsData[key] = value
    })

    spaceStationsModel.Update(spaceStationsData, getSelectedItemId());

    e.target.reset()
  })
  const deleteButton = window.document.querySelector('#delete')
  deleteButton.addEventListener('click', function (e) {
    e.preventDefault()

    spaceStationsModel.Delete(getSelectedItemId())
    showButton(['submit'])
  })
}

function initList () {
  window.jQuery('#spaceStations-list').DataTable({
    data: spaceStationsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Necessity', data: 'necessity' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
  initSelection()
}
function initList2 () {
  window.jQuery('#spaceStations2-list').DataTable({
    data: spaceStationsModel2.Select2(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Name', data: 'name' },
      { title: 'Mass', data: 'mass' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
  // initSelection2()
}



function initListEvents () {
  document.addEventListener('spaceStationsListDataChanged', function (e) {
    const dataTable = window.jQuery('#spaceStations-list').DataTable()

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
function initSelection() {
  let table = document.getElementById('spaceStations-list')
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
// слухач події,коли користувач натискає кнопку
window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
  initList2()
})
