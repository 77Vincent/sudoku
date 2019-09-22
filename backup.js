  board = board.map(row => row.map(su => su))
  const groupedBySu = [ [], [], [], [], [], [], [], [], [] ]
  const blockCors = [
    [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
    [[3, 0], [3, 1], [3, 2], [4, 0], [4, 1], [4, 2], [5, 0], [5, 1], [5, 2]],
    [[6, 0], [6, 1], [6, 2], [7, 0], [7, 1], [7, 2], [8, 0], [8, 1], [8, 2]],
    [[0, 3], [0, 4], [0, 5], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5]],
    [[3, 3], [3, 4], [3, 5], [4, 3], [4, 4], [4, 5], [5, 3], [5, 4], [5, 5]],
    [[6, 3], [6, 4], [6, 5], [7, 3], [7, 4], [7, 5], [8, 3], [8, 4], [8, 5]],
    [[0, 6], [0, 7], [0, 8], [1, 6], [1, 7], [1, 8], [2, 6], [2, 7], [2, 8]],
    [[3, 6], [3, 7], [3, 8], [4, 6], [4, 7], [4, 8], [5, 6], [5, 7], [5, 8]],
    [[6, 6], [6, 7], [6, 8], [7, 6], [7, 7], [7, 8], [8, 6], [8, 7], [8, 8]],
  ]

  const pick = (...args) => {
    const seed = 1 + Math.floor(Math.random() * args.length)
    return args[seed - 1]
  }

  // Actual solving
  let undo = 0 
  let stuckAt = [] 
  for (let suIndex = 0; suIndex < 9; suIndex += 1) {
    const su = suIndex + 1

    for (let blockIndex = 0; blockIndex < 9; blockIndex += 1) {
      // Skip blocks where su is already filled in
      // And fill the su into the groupedBySu
      const blockCor = blockCors[blockIndex]
      let isExisting = false
      for (let i = 0; i < blockCor.length; i++) {
        const cor = blockCor[i]
        if (board[cor[1]][cor[0]] === su) {
          groupedBySu[suIndex][blockIndex] = cor
          isExisting = true
          break
        }
      }

      if (isExisting) {
        continue
      }

      // Brute force
      const availables =  blockCors[blockIndex] 
        // Check occupation
        .filter(cor => board[cor[1]][cor[0]] === 0)
        // Check column conflict
        .filter(cor => !board.map(row => row[cor[0]]).includes(su))
        // Check row conflict
        .filter(cor => !board[cor[1]].includes(su))

      if (availables.length === 0) {
        const currentSuGroup = groupedBySu[suIndex]
        const previousSuGroup = groupedBySu[suIndex - 1]

        undo = (stuckAt[0] === suIndex && stuckAt[1] === blockIndex) ? undo + 1 : 1 

        // Directly retry from the beginning of the previous su
        if (undo > 4 && suIndex >= 1) {
          currentSuGroup.forEach(cor => {
            board[cor[1]][cor[0]] = 0
          })
          previousSuGroup.forEach(cor => {
            board[cor[1]][cor[0]] = 0
          })
          groupedBySu[suIndex] = []
          groupedBySu[suIndex - 1] = []
          suIndex -= 2
          stuckAt = []
          undo = 0
          break
        }

        stuckAt = [suIndex, blockIndex]

        // Undo on the current su
        const undoOnPreviousSuTo = undo - blockIndex 
        const undoOnCurrentSuTo = undoOnPreviousSuTo > 0 ? 0 : -undoOnPreviousSuTo 

        for (let i = blockIndex - 1; i > undoOnCurrentSuTo - 1; i--) {
          const cor = currentSuGroup[i]
          board[cor[1]][cor[0]] = 0
        }
        groupedBySu[suIndex] = currentSuGroup.slice(0, blockIndex - undo)
        blockIndex = blockIndex - undo - 1 

        // Undo on the previous su
        if (undoOnPreviousSuTo > 0) {
          for (let i = 8; i > 8 - undoOnPreviousSuTo; i--) {
            const cor = previousSuGroup[i]
            board[cor[1]][cor[0]] = 0
          }
          groupedBySu[suIndex - 1] = previousSuGroup.slice(0, 9 - undoOnPreviousSuTo)
          suIndex -= 2
          break
        }
      } else {
        const cor = pick(...availables)
        groupedBySu[suIndex][blockIndex] = cor
        board[cor[1]][cor[0]] = su
      }
    }
  }
