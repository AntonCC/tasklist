const form = document.querySelector("#task-form")
const userInput = document.querySelector("#task")

form.addEventListener("submit", handleSubmit)

function handleSubmit(e) {
  e.preventDefault()
  console.log(userInput.value)
}