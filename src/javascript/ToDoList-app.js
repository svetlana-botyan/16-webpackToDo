import data from './todo-formcreate-app'
// let module = require('./modified-todolist-app');
// let data = module.data;
const formElement = document.querySelector("#form");
const listParentElement = document.querySelector("#listParent");
const selectPriorityElement = formElement.querySelector("#priority");

const listElements = {
  commonGroup: document.querySelector("#commonGroup"),
  workGroup: document.querySelector("#workGroup"),
  personalGroup: document.querySelector("#personalGroup"),
  educationGroup: document.querySelector("#educationGroup"),
};

console.log(data)


class TodoList{
  constructor(listParentElement) {
    this.listParentElement = listParentElement
    this.#init()
  }

  #init() {
    this.handleChange = this.#handleChange.bind(this)
    this.handleEventNeed = this.#handleEventNeed.bind(this)
    this.handleBeforeUnload = this.#handleBeforeUnload.bind(this)
    this.handleDOMReady = this.#handleDOMReady.bind(this)

    this.listParentElement.addEventListener('change', this.handleChange)
    window.addEventListener('render:need', this.handleEventNeed)
    window.addEventListener('beforeunload', this.handleBeforeUnload)
    window.addEventListener('DOMContentLoaded', this.handleDOMReady)
  }

  #handleChange(event) {
    const { target } = event
    const { id, checked, type } = target

    if (type !== 'checkbox') return

    data.forEach((item) => {
      if (item.id == id) {
        item.isChecked = checked
      }
    })

    this.render()
  }

  #handleEventNeed() {
    this.render()
  }

  createToDoTemplate({ id, textContent, isChecked, index }) {
    const checkedAttr = isChecked ? 'checked' : '' // если уже чекнули то он останется
    const icon =
      index == 1
        ? `<svg class="pe-none hourglassSplit" width="16" height="16"> <use style="color:red" href="#hourglassSplit" /></svg>`
        : `<svg class="pe-none hourglass" width="16" height="16"> <use style="color:green" href="#hourglass" /></svg>`

    const template = `
        <div class="new-task col-12 align-items-start d-flex ${checkedAttr} " >    
          <div class="form-check" >
            <input class="form-check-input" ${checkedAttr} type="checkbox" value="" id="${id}">
            ${icon}
            <label class="form-check-label " for="${id}">
            ${textContent}
            </label>
          </div> 
          <button class="btn btn-outline-success" data-role="edit" data-id="${id}" ><svg class="pe-none " width="16" height="16">
          <use href="#pencil" /></svg></button>
  
          <button  class="btn  btn-outline-danger" data-role="remove" data-id="${id}" ><svg class="pe-none " width="16" height="16">
          <use href="#trash" /></svg></button>
        </div>`

    return template
  }

  render() {
    this.clearLists()

    data.forEach((toDo) => {
      const { group } = toDo
      const listElement = listElements[group]

      const result = this.createToDoTemplate(toDo)
      listElement.innerHTML += result
    })
  }

  // ф-ция очищает в свойстве group innerHTML у всех div-ов объектa listElements
  clearLists() {
    for (let group in listElements) {
      listElements[group].innerHTML = ''
    }
  }

  // сохрание перед перезагрузкой
  #handleBeforeUnload() {
    const json = JSON.stringify(data)
    //console.log(json)
    localStorage.setItem('information', json)
  }

  // забираем данные из localStorage
  #handleDOMReady() {
    const informationFromStorage = localStorage.getItem('information')

    if (informationFromStorage) {
      data = JSON.parse(informationFromStorage)

      this.render()
    }
  }
}


new TodoList(listParentElement)

