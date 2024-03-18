const boxes = document.querySelectorAll(".box")
const resetBtn = document.querySelector(".reset-btn")
const newGameBtn = document.querySelector(".new-btn")
const msgContainer = document.querySelector(".msg-container")
const msg = document.querySelector(".msg")

let turnO = true
let count = 0

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
]

const resetGame = () => {
  turnO = true
  count = 0
  enableBoxes()
  hideMessage()
}

const hideMessage = () => {
  msgContainer.classList.add("hide")
}

const handleBoxClick = (box) => {
  const currentPlayer = turnO ? "O" : "X"
  box.innerText = currentPlayer
  box.disabled = true
  count++

  if (checkWinner() || count === 9) {
    endGame()
  } else {
    switchPlayer()
  }
}

const endGame = () => {
  if (count === 9) {
    showMessage("Game was a Draw")
  }
  disableBoxes()
}

const showMessage = (message) => {
  msg.innerText = message
  msgContainer.classList.remove("hide")
}

const switchPlayer = () => {
  turnO = !turnO
}

const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true
  }
}

const enableBoxes = () => {
  for (const box of boxes) {
    box.disabled = false
    box.innerText = ""
  }
}

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [pos1, pos2, pos3] = pattern
    const pos1val = boxes[pos1].innerText
    const pos2val = boxes[pos2].innerText
    const pos3val = boxes[pos3].innerText

    if (pos1val !== "" && pos1val === pos2val && pos2val === pos3val) {
      showWinner(pos1val)
      return true
    }
  }
  return false
}

const showWinner = (winner) => {
  showMessage(`Congratulations, Winner is ${winner}`)
  disableBoxes()
}

boxes.forEach((box) => {
  box.addEventListener("click", () => handleBoxClick(box))
})

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)
