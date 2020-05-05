class BaseModel {// eslint-disable-line no-unused-vars
  constructor (collectionName) {
    this.collectionName = collectionName
    this.fields = ['id']
  }
  /**
   * @returns {Number}
   */
  getNextId (collection) {
    return collection.length + 1
  }
  /**
   * @returns {Object}
   */
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  /**
   * @returns {Array}
   */
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : [] //  let result = условие ? значение1 : значение2; Сначала вычисляется условие: если оно истинно, тогда возвращается значение1, в противном случае – значение2.
    // JSON.parse():
    // const json = '{"result":true, "count":42}';
    // const obj = JSON.parse(json);
    // console.log(obj.count);
    // expected output: 42
    return collection
  }
  Select2 () {
    const stored = localStorage.getItem(this.collectionName)
    //const collection = stored ? JSON.parse(stored) : [] //  let result = условие ? значение1 : значение2; Сначала вычисляется условие: если оно истинно, тогда возвращается значение1, в противном случае – значение2.
    const collection = []
    // const newCollection = {}
    // let j = 0
    // //console.log(stored)
    // for(let i = 0; i < collection.length; i++)
    // {
    //   //console.log(collection[i].capacity)
    //   if(+collection[i].capacity > 30)
    //   {
    //     collection.splice(i, 1)
    //     i--
    //   }
    //
    // }
    let allGoodsOnStation = JSON.parse(localStorage.getItem('cargo_on_planets'));
    let result = {};

    allGoodsOnStation.forEach((value) => {

      console.log(value.planet);
      result[value.planet] = result[value.planet] + 1 || 1;

    });
    console.log(result);
    let allPlanets = JSON.parse(localStorage.getItem('planets'));
    allPlanets.forEach((value)=>{
      for (let key in result){
        console.log(+value.capacity,result[key]);
        if(value.name == key && +value.capacity*0.3 > result[key])
        {
          console.log(22);
          collection.push(value)
          break;
        }
      }
    })
    console.log(collection);

    //console.log(collection[1].capacity)
    // JSON.parse():
    // const json = '{"result":true, "count":42}';
    // const obj = JSON.parse(json);
    // console.log(obj.count);
    // expected output: 42
    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  /**
   * @param {Number} id
   * @returns {BaseModel|undefined}
   */
  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  /**
   * @param {Number} id
   * @returns {Number}
   */
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id === id)
  }
  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    entry.id = this.getNextId(collection)
    for (const key in row) {
      if (entry.hasOwnProperty(key) &&
          entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    collection.push(entry)

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  Create2 (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    console.log(row);
    if(this.collectionName === 'cargo_on_planets') {
      let all = JSON.parse(localStorage.getItem('planets'))
      //console.log(all);
      let allCag = JSON.parse(localStorage.getItem('cargo'))
      //console.log(allCag);

      let starALL = allCag.filter((value, index) =>{
        return value.name == row.cargo
      })

      let star = all.filter((value, index) =>{
        return value.name == row.planet
      })
      if(star.length===0 || starALL.length === 0) {
        alert("Cargo or planet not found!")
      } else {

        for (const key in row) {
          if (key!=='id'&& row[key] ==='' ) {
            document.getElementById('error-text').innerHTML = "Empty object is invalid"
            return;
          }
        }
        document.getElementById('error-text').innerText = ""

        for (const key in row) {
          if (entry.hasOwnProperty(key) &&
              entry.key !== 'id') {
            entry[key] = row[key]
          }
        }

        entry.id = this.getNextId(collection)

        collection.push(entry)

        this.Commit(collection)

        const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
        document.dispatchEvent(event)

      }
    }
    else if(this.collectionName === 'cargo_on_stations'){
      let all = JSON.parse(localStorage.getItem('spaceStations'))
      //console.log(all);
      let allCag = JSON.parse(localStorage.getItem('cargo'))
      //console.log(allCag);

      let starALL = allCag.filter((value, index) =>{
        return value.name == row.cargo
      })

      console.log(+row.space_station);
      let star = all.filter((value, index) =>{
        console.log(value.number);
        return value.number == row.space_station
      })
      if(star.length===0 || starALL.length === 0) {
        alert("Cargo or space station not found!")
      } else {

        for (const key in row) {
          if (key !== 'id' && row[key] === '') {
            document.getElementById('error-text').innerHTML = "Empty object is invalid"
            return;
          }
        }
        document.getElementById('error-text').innerText = ""

        for (const key in row) {
          if (entry.hasOwnProperty(key) &&
              entry.key !== 'id') {
            entry[key] = row[key]
          }
        }

        entry.id = this.getNextId(collection)

        collection.push(entry)

        this.Commit(collection)

        const event = new CustomEvent(`${this.collectionName}ListDataChanged`, {detail: collection})
        document.dispatchEvent(event)

        // let allGoodsOnStation = JSON.parse(localStorage.getItem('cargo_on_stations'));
        // let result = {};
        //
        // let all = JSON.parse(localStorage.getItem('spaceStations'));
        // console.log("spaceStations ");
        // console.log(all);
        //
        // let allCag = JSON.parse(localStorage.getItem('cargo_on_stations'))
        // console.log("cargo_on_stations");
        // console.log(allCag);
        // let starALL = allCag.filter((value, index) =>{
        //   return value.name == row.cargo
        // })
        //
        // let star = all.filter((value, index) =>{
        //   return value.number == row.spaceStations
        // })
        // console.log("star");
        // console.log(star);
        // if(star.length===0 || starALL.length === 0) {
        //   alert("Station or cargo not found!")
        // } else {
        //
        //   for (const key in row) {
        //     if (key!=='id'&& row[key] ==='' ) {
        //       document.getElementById('error-text').innerHTML = "Empty object is invalid"
        //       return;
        //     }
        //   }
        //   document.getElementById('error-text').innerText = ""
        //
        //   for (const key in row) {
        //     if (entry.hasOwnProperty(key) &&
        //         entry.key !== 'id') {
        //       entry[key] = row[key]
        //     }
        //   }
        //
        //   entry.id = this.getNextId(collection)
        //
        //   collection.push(entry)
        //
        //   this.Commit(collection)
        //
        //   const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
        //   document.dispatchEvent(event)
        // }
        //
      }
    }
    else{
      for (const key in row) {
        if (key!=='id'&& row[key] ==='' ) {
          document.getElementById('error-text').innerHTML = "Empty object is invalid"
          return;
        }
      }
      document.getElementById('error-text').innerText = ""

      for (const key in row) {
        if (entry.hasOwnProperty(key) &&
            entry.key !== 'id') {
          entry[key] = row[key]
        }
      }
      entry.id = this.getNextId(collection)

      collection.push(entry)

      this.Commit(collection)

      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }





  }
  Delete (id) {
    const collection = this.Select()

    for(let i = 0; i < collection.length; ++i) {
      let item = collection[i];
      if(item['id'] == id) {
        collection.splice(i, 1);
        break;
      }
    }

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  Update (row, id) {
    const collection = this.Select();
    let entry = {};
    for(let i = 0; i < collection.length; ++i) {
      let item = collection[i];
      if(item['id'] == id) {
        entry = item;
        break;
      }
    }

    for (const key in row) {
      if (entry.hasOwnProperty(key) && // Метод hasOwnProperty() повертає булеве значення, яке вказує, чи є задана властивість особистою властивістю об'єкта (тобто, не успадкованою).
          entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
}
