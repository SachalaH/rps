const selectionButtons = document.querySelectorAll("[data-selection]")
const finalColumn = document.querySelector("[data-final-column]")
const yourScoreSpan = document.querySelector("[data-your-score]")
const computerScoreSpan = document.querySelector("[data-computer-score]")

const SELECTIONS = [
    {
        name: "rock",
        emoji: "✊",
        beats: "scissor"
    },
    {
        name: "paper",
        emoji: "✋",
        beats: "rock"
    },
    {
        name: "scissor",
        emoji: "✌️",
        beats: "paper"
    }
]

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

const makeSelection = (selection) => {
    const yourSelection = selection
    const computerSelection = randomSelection()
    const yourResult = isWinner(yourSelection, computerSelection)
    const computerResult = isWinner(computerSelection, yourSelection)

    addSelectionResult(computerSelection, computerResult)
    addSelectionResult(yourSelection, yourResult)

    if(yourResult) incrementScore(yourScoreSpan)
    if(computerResult) incrementScore(computerScoreSpan)

}

const incrementScore = (scoreSpan) =>{
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

const addSelectionResult = (selection, result) => {
    const div = document.createElement("div")
    div.innerText = selection.emoji
    div.classList.add("result-selection")
    if(result) div.classList.add("winner")
    finalColumn.after(div)

}

const isWinner = (selection, opponentSelection) => {
    return selection.beats === opponentSelection.name
}

const randomSelection = () => {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}