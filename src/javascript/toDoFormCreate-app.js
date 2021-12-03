class ToDoFormCreate {
  constructor(formElement) {
    this.formElement = formElement
    this.#init()
  }

  #init() {
    this.handleSubmit = this.#handleSubmit.bind(this)

    this.formElement.addEventListener('submit', this.handleSubmit)
  }

  #handleSubmit(event) {
    event.preventDefault()

    const toDo = {
      id: new Date().getTime(),
      isChecked: false,
      index: selectPriorityElement.options.selectedIndex,
    }

    const fromData = new FormData(this.formElement)
    for (let [name, value] of fromData.entries()) {
      toDo[name] = value
    }

    data.push(toDo)
    this.formElement.reset()

    const eventRenderNeed = new Event('render:need')
    window.dispatchEvent(eventRenderNeed)
  }
}

new ToDoFormCreate(formElement)
