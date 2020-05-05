class Cargo_on_planet extends BaseModel {
  constructor () {
    super('cargo_on_planets')

    this.fields = this.fields.concat(['planet', 'cargo'])
  }
}
