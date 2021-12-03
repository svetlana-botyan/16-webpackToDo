import { data, formElement, listParentElement, selectPriorityElement,listElements} from './app'

class ModifiedToDoList {
  isEdit = false
  currentEditedToDo = {}
  eventRenderNeed = new Event('render:need')

  constructor(listParentElement) {
    this.listParentElement = listParentElement
    this.#init()
  }

  #init() {
    this.handleClickButtonRemove = this.#handleClickButtonRemove.bind(this)
    this.handleClickButtonEdit = this.#handleClickButtonEdit.bind(this)
    this.handleClickButtonCancilEdit =
      this.#handleClickButtonCancilEdit.bind(this)
    this.handleFormEditSubmit = this.#handleFormEditSubmit.bind(this)

    this.listParentElement.addEventListener(
      'click',
      this.handleClickButtonRemove
    )
    this.listParentElement.addEventListener('click', this.handleClickButtonEdit)
    this.listParentElement.addEventListener(
      'click',
      this.handleClickButtonCancilEdit
    )
    this.listParentElement.addEventListener('submit', this.handleFormEditSubmit)
  }

  //удаление задачи
  #handleClickButtonRemove(event) {
    const { role, id } = event.target.dataset

    if (role == 'remove') {
      data = data.filter((item) => {
        if (item.id == id) {
          return false
        } else {
          return true
        }
      })

      window.dispatchEvent(this.eventRenderNeed)
    }
  }

  #handleClickButtonEdit(event) {
    const { target } = event
    const { role, id } = target.dataset

    if (role == 'edit') {
      // запрет на одновременное редактирование
      if (this.isEdit == true) {
        return
      }

      data.forEach((item) => {
        if (item.id == id) {
          const { parentElement } = target
          this.currentEditedToDo = item //значения исходные задачи
          console.log(item)
          const blockEditElement = this.blockEditTemplate(item) // item объект каждой toDo

          parentElement.outerHTML = blockEditElement
          this.isEdit = true
        }
      })
    }
  }

  blockEditTemplate({ textContent }) {
    const templateEdit = `
      <form data-role="editForm" id="formEdit" class="d-flex col-12">
    <input  value="${textContent}" name="textContent" class="form-control   " placeholder="Отредакрируйте задачу" type="text" required>
       <select name="priorityContent" class="form-select">
        <option selected value="urgent">срочно</option>
        <option value="non-urgent">несрочно</option>
      </select>
      <select   name="group" class=" form-select select-content" >
        <option selected value="commonGroup">Общее</option>
        <option value="workGroup">Работа</option>
        <option value="personalGroup">Личное</option>
        <option value="educationGroup">Обучение</option>
      </select>
      <button data-role="cancel" class="btn btn-outline-success" type="button"><svg class="pe-none" width="20" height="20">
          <use href="#Xcircle" />
        </svg></button>
      <button class="btn  btn-outline-primary" type="submit"><svg class="pe-none " width="20" height="20">
          <use href="#check" />
        </svg></button>
  </form>
  `

    return templateEdit
  }

  #handleClickButtonCancilEdit(event) {
    const { role } = event.target.dataset
    // console.log(role)

    if (role == 'cancel') {
      window.dispatchEvent(this.eventRenderNeed)
      this.isEdit = false
    }
  }

  #handleFormEditSubmit(event) {
    event.preventDefault()

    const { target } = event
    console.log(target)
    const { role, id } = target.dataset

    if (role == 'editForm') {
      const textContent = target.querySelector('[name="textContent"]').value
      const group = target.querySelector('[name="group"]').value
      const selectPriorityElement = target.querySelector(
        '[name="priorityContent"]'
      )

      //console.log(selectPriorityElement)
      const index = selectPriorityElement.options.selectedIndex

      this.currentEditedToDo.textContent = textContent
      this.currentEditedToDo.group = group
      this.currentEditedToDo.index = index

      window.dispatchEvent(this.eventRenderNeed)
      this.isEdit = false
    }
  }
}

new ModifiedToDoList(listParentElement)
