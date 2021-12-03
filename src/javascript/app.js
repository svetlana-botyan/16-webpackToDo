import '../scss/app.scss';

//ToDoApp
import {Form} from './form';
import {List} from './list';
//import './modified-todolist-app';


let data = [];
const formElement = document.querySelector("#form");
const listParentElement = document.querySelector("#listParent");
const selectPriorityElement = formElement.querySelector("#priority");

const listElements = {
  commonGroup: document.querySelector("#commonGroup"),
  workGroup: document.querySelector("#workGroup"),
  personalGroup: document.querySelector("#personalGroup"),
  educationGroup: document.querySelector("#educationGroup"),
};

new Form(data,formElement)
new List(data,listParentElement )
