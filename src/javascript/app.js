import '../scss/app.scss'


//ToDoApp
import './toDoFormCreate-app'
import './ToDoList-app'
import './ModifiedToDoList'


let data = []
const formElement = document.querySelector('#form')
const listParentElement = document.querySelector('#listParent')
const selectPriorityElement = formElement.querySelector('#priority')
const buttonNewListElement = formElement.querySelector('#addCategory')

const listElements = {
  commonGroup: document.querySelector('#commonGroup'),
  workGroup: document.querySelector('#workGroup'),
  personalGroup: document.querySelector('#personalGroup'),
  educationGroup: document.querySelector('#educationGroup'),
}
