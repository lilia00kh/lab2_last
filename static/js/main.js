'use strict'

function initMainMenu () {
  const mainMenu = document.querySelector('#main_menu')
  const oldActiveElement = mainMenu.querySelector('ul.navbar li.active')
  if (oldActiveElement) {
    oldActiveElement.classList.remove('active')
  }
  const newActiveElement = mainMenu.querySelector(`ul.nav li a[href^="${location.pathname}"]`)
  newActiveElement.parentElement.classList.add('active')
}
// додати слухача події, коли користувач натискає кноп
window.addEventListener('DOMContentLoaded', e => {
  initMainMenu()
})
