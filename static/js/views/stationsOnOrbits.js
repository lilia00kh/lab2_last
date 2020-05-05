'use strict'

const stationsOnOrbitsModel = new StationsOnOrbits()

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
  const form = window.document.querySelector('#stationsOnOrbits-add-form')
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const stationsOnOrbitsData = {}
    formData.forEach((value, key) => {
      stationsOnOrbitsData[key] = value
    })
    if (document.getElementById("form-button").innerHTML === "Save") {
      stationsOnOrbitsModel.Edit(stationsOnOrbitsData)
    } else {
      stationsOnOrbitsModel.Create2(stationsOnOrbitsData)
    }

    e.target.reset()
  })
}


/*//TODO
//Звіт станції на яких менше 30% вантажів.()
function reportStationsCapacity(stationsCollection, cargoOnTheStationCollection) {

  //cargoOnStation
  for(let i = 0; i < stationsCollection.length; i++)
  {
  // місткість
    let currentCapacity = 0;
    let currentSpaceStation = stationsCollection[i];

    for(let j = 0; j < cargoOnTheStationCollection.length; j++)
    {
      let currCargo = cargoOnTheStationCollection[j];

      if (currCargo.station == currentSpaceStation.id)
      {
        currentCapacity += currCargo.weight;
      }
    }

    if(currentCapacity / currentSpaceStation.capacity < 0.3)
    {
      console.log(currentSpaceStation);
    }
  }
}*/

function initList () {
  window.jQuery('#stationsOnOrbits-list').DataTable({
    data: stationsOnOrbitsModel.Select(),
    columns: [
      { title: 'ID', data: 'id' },
      { title: 'Space Station',
        data: 'station',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="cargo_on_station/'+ row['id']  + '"  > '+row['space_station'] +' </a>'
          }
          return data
        }
      },
      { title: 'Planets', data: 'planet',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<a href="cargo_on_station/'+ row['id']  + '"  > '+row['cargo'] +' </a>'
          }
          return data
        }
      },
      { title: 'Edit', data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="cargoOnStationModel.startEdit(' + data + ')"> Edit </button>'
          }
          return data
        }
      },
      {
        title: 'Delete',
        data: 'id',
        render: function (data, type, row, meta) {
          if (type === 'display') {
            data = '<button type="button" onclick="cargoOnStationModel.DeleteById(' + row['id'] + ')"> Delete </button>'
          }
          return data
        }
      },
    ]
  })
}


/////////////////////////////////////////////////////////////
/*function topPaidRoutes(amount){
  let routes = [];
  let routeObject ={};
  JSON.parse(localStorage.getItem("sold_ticket")).forEach(function (route) {

    if (routeObject[route['train']]){
      routeObject[route['train']] = Number(routeObject[route['train']]) + Number(route['ticket'])
    }
    else{
      routeObject[route['train']] =  Number(route['ticket'])
    }
  })
  for (var route in routeObject) {
    routes.push([route, routeObject[route]]);
  }

  routes.sort(function(a, b) {
    return b[1] - a[1];
  });
  console.log(routes)
  let top_routes = []

  for (var i =0; i < routes.length; i++){
    let route={}
    route['route'] =  routes[i][0]
    route['amount'] = Number(routes[i][1])
    top_routes.push(route)
  }
  return top_routes.slice(0,3);
}*/

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