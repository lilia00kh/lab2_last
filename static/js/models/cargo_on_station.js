class Cargo_on_station extends BaseModel {
  constructor () {
    super('cargo_on_stations')
    this.fields = this.fields.concat(['space_station', 'cargo'])
  }
}
