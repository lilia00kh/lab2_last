class SpaceStations extends BaseModel {
  constructor () {
    super('spaceStations')
    this.fields = this.fields.concat(['number', 'necessity', 'capacity'])
  }
}
