class SpaceStations extends BaseModel { // eslint-disable-line no-unused-vars, no-undef
  constructor () {
    super('spaceStations')
    this.fields = this.fields.concat(['number', 'name', 'capacity'])
  }
}
