'use strict'

const spaceStationsModel = new SpaceStations() // eslint-disable-line no-undef

function initAddForm() {
  const form = window.document.querySelector('#spaceStations-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const spaceStationsData = {}
    formData.forEach((value, key) => {
      spaceStationsData[key] = value
    })

    spaceStationsModel.Create(spaceStationsData);

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

    spaceStationsModel.Delete(getSelectedItemId());
    showButton(['submit']);
  })
}

function initList() {
  window.jQuery('#spaceStations-list').DataTable({
    data: spaceStationsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Number', data: 'number' },
      { title: 'Name', data: 'name' },
      { title: 'Capacity', data: 'capacity' }
    ]
  })
  initSelection();
}

function initListEvents() {
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
    .innerText;
}
function initSelection() {
  let table = document.getElementById('spaceStations-list');
  let tbody = table.tBodies[0];
  for(let i = 0; i < tbody.rows.length; ++i) {
    tbody.rows[i].addEventListener('click', function() {
      let cells = this.getElementsByTagName('td');
      let id = +cells[0].innerText;
      let station = spaceStationsModel.FindById(id);
      let s = 'selected';
      if(this.classList.contains(s)) {
        this.classList.remove(s);
        showButton(['submit']);
      }
      else {
        let tbody = this.parentNode;
        for(let i = 0; i < tbody.rows.length; ++i) {
          tbody.rows[i].classList.remove(s);
        }
        this.classList.add(s);
        let form = document.getElementById('spaceStations-add-form');
        let formInputs = {
          number: document.getElementById('number'),
          name: document.getElementById('name'),
          capacity: document.getElementById('capacity')
        };
        formInputs.number.value = +station.number;
        formInputs.name.value = station.name;
        formInputs.capacity.value = +station.capacity;
        showButton(['update', 'delete']);
      }
    }, false);
  }
}

function showButton(buttonIdArray) {
  let btnArray = [...document.getElementsByTagName('button')];
  btnArray = btnArray.filter(item => item.type == 'submit');
  for(let i = 0; i < btnArray.length; ++i) {
    btnArray[i].classList.add('hidden');
  }
  for(let i = 0; i < buttonIdArray.length; ++i) {
    let id = buttonIdArray[i];
    let button = document.getElementById(id);
    button.classList.remove('hidden');
  }
}

function getShownButton() {
  let btnArray = [...document.getElementsByTagName('button')];
  btnArray = btnArray.filter(item => item.type == 'submit');
  btnArray = btnArray.filter(item => !item.classList.contains('hidden'));
  return btnArray[0];
}

window.addEventListener('DOMContentLoaded', e => {
  initAddForm()
  initList()
  initListEvents()
})
