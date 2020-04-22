// eslint-disable-line no-unused-vars, no-undef
class SpaceStations extends BaseModel {
  constructor () {
    super('spaceStations')
    this.fields = this.fields.concat(['number', 'name', 'capacity'])
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
      if (entry.hasOwnProperty(key) &&
          entry.key !== 'id') {
        entry[key] = row[key]
      }
    }

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
}
