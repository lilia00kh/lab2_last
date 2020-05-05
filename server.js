const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

class Planet {
  constructor (name, mass, capacity) {
    this.name = name;
    this.mass = mass;
    this.capacity = capacity;
  }
}

let planets = [
  new Planet('Earth',10,10),
  new Planet('Mars',10,10),
  new Planet('Venera',10,10),
]

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})

app.get('/cargo', function (request, response) {
  response.render('pages/cargo', { title: 'Вантаж' })
})

app.get('/Delivery', function (request, response) {
  response.render('pages/Delivery', { title: 'Доставка' })
})

app.get('/stationsOnOrbits', function (request, response) {
  response.render('pages/stationsOnOrbits', { title: 'Станції на орбітах' })
})

app.get('/planets', function (request, response) {
  response.render('pages/planets', { title: 'Планети', title2: 'Звіт станції у на які доставлено вантажів менше 30% від потреби ' })
})

app.get('/spaceStations', function (request, response) {
  response.render('pages/spaceStations', { title: 'Космічні станції' })
})

app.post('/select', (req, res) => {
  res.render('pages/Delivery', { data: planets })
})
app.get('/cargo_on_station', function (request, response) {
  response.render('pages/cargo_on_station', { title: 'Cargo on Station' })
})
app.get('/cargo_on_planet', function (request, response) {
  response.render('pages/cargo_on_planet', { title: 'Cargo on Planet' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8000)
