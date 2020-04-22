const path = require('path')

// встановлюємо express
const express = require('express')
const app = express()

// встановлюємо директорію для віддачі статичного контенту (каталог проекту)
app.use(express.static(__dirname))

// налаштовуємо роботу із шаблонізаотором
app.set('views', path.join(__dirname, '/static/views'))
app.set('view engine', 'pug')

// налаштовуємо маршрутизацію
app.get('/', function (request, response) {
  response.render('pages/index', { title: 'Home' })
})

app.get('/cargo', function (request, response) {
  response.render('pages/cargo', { title: 'Вантаж' })
})

app.get('/stationsOnOrbits', function (request, response) {
  response.render('pages/stationsOnOrbits', { title: 'Станції на орбітах' })
})

app.get('/planets', function (request, response) {
  response.render('pages/planets', { title: 'Планети' })
})

app.get('/spaceStations', function (request, response) {
  response.render('pages/spaceStations', { title: 'Космічні станції' })
})

// запускаємо аплікацію
app.listen(process.env.PORT || 8000)
