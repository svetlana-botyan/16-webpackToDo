import "../scss/app.scss";

//ToDoApp
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

export { data, formElement, listParentElement, selectPriorityElement,listElements};

import "./todo-formcreate-app";
import  "./todolist-app";
import "./modified-todolist-app";

