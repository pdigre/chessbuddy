import { Chess } from 'https://cdn.jsdelivr.net/npm/chess.js@1.0.0/+esm';

export function loadData(url) {
  fetch(url)
    .then(response => response.json())
    .then(userData => loadJson(userData));
}

export function loadJson(userData) {
  // Pre-process data to calculate final FENs
  if (userData.games) {
    userData.games.forEach(game => {
      if (game.fen && game.log) {
        const finalFen = calculateFinalFen(game.fen, game.log);
        game.fen = `${game.fen}___FINAL___${finalFen}`;
      }
    });
  }

  const data = userData;
  renderjson.set_show_to_level(2);
  renderjson.set_replacer((key, value) => {
    if (key === 'log' && Array.isArray(value)) {
      return value.join(' ');
    }
    return value;
  });

  document.getElementById('data-tree').appendChild(renderjson(data));

  // Observe DOM changes
  const observer = new MutationObserver(mutations => {
    setTimeout(() => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            // Element node

            // Process FEN keys (for board injection)
            const fenKeys = [];
            if (node.classList.contains('key') && node.textContent.includes('fen'))
              fenKeys.push(node);
            if (node.querySelectorAll)
              node.querySelectorAll('.key').forEach(k => {
                if (k.textContent.includes('fen')) fenKeys.push(k);
              });

            fenKeys.forEach(keyNode => {
              const valueNode = keyNode.nextElementSibling;
              if (valueNode && valueNode.parentNode.querySelector('.chess-container')) return;

              let fullValue = '';
              let tempNode = keyNode.nextElementSibling;
              while (tempNode) {
                if (tempNode.classList.contains('string')) {
                  fullValue = tempNode.textContent.replace(/^"|"$/g, '');
                  break;
                }
                tempNode = tempNode.nextElementSibling;
              }

              if (!fullValue) return;

              const parts = fullValue.split('___FINAL___');
              const originalFen = parts[0];
              const finalFen = parts.length > 1 ? parts[1] : originalFen;

              if (parts.length > 1 && tempNode) {
                tempNode.textContent = `"${originalFen}"`;
              }

              if (valueNode) {
                const container = document.createElement('div');
                container.className = 'chess-container';
                container.dataset.startFen = originalFen; // Store start FEN
                container.style.marginTop = '10px';

                const infoDiv = document.createElement('div');
                infoDiv.className = 'chess-info';
                infoDiv.style.fontFamily = 'monospace';
                infoDiv.style.fontSize = '12px';
                infoDiv.style.color = '#555';
                infoDiv.style.marginBottom = '5px';
                infoDiv.innerHTML = `<strong>EndFEN:</strong> ${finalFen}`;
                container.appendChild(infoDiv);

                const boardDiv = createChessboard(finalFen);
                container.appendChild(boardDiv);

                valueNode.parentNode.appendChild(container);
              }
            });

            // Process LOG keys (for clickable moves)
            const logKeys = [];
            if (node.classList.contains('key') && node.textContent.includes('log'))
              logKeys.push(node);
            if (node.querySelectorAll)
              node.querySelectorAll('.key').forEach(k => {
                if (k.textContent.includes('log')) logKeys.push(k);
              });

            logKeys.forEach(keyNode => {
              let valueNode = keyNode.nextElementSibling;
              while (valueNode && !valueNode.classList.contains('string')) {
                valueNode = valueNode.nextElementSibling;
              }

              if (valueNode && !valueNode.querySelector('.move')) {
                const movesStr = valueNode.textContent.replace(/^"|"$/g, '');
                const moves = movesStr.trim().split(/\s+/);

                valueNode.textContent = ''; // Clear text
                valueNode.className = 'string moves-container'; // Add class for styling

                // Add Start button
                const startSpan = document.createElement('span');
                startSpan.className = 'move start-move';
                startSpan.textContent = '[Start]';
                startSpan.dataset.index = -1;
                startSpan.onclick = e => handleMoveClick(e, -1, moves);
                valueNode.appendChild(startSpan);
                valueNode.appendChild(document.createTextNode(' '));

                moves.forEach((move, index) => {
                  const span = document.createElement('span');
                  span.className = 'move';
                  span.textContent = move;
                  span.dataset.index = index;
                  span.onclick = e => handleMoveClick(e, index, moves);

                  valueNode.appendChild(span);
                  if (index < moves.length - 1) {
                    valueNode.appendChild(document.createTextNode(' '));
                  }
                });
              }
            });

            // Process email keys (for adding buttons next to gmail addresses)
            const emailKeys = [];
            if (node.classList.contains('key') && node.textContent.includes('email'))
              emailKeys.push(node);
            if (node.querySelectorAll)
              node.querySelectorAll('.key').forEach(k => {
                if (k.textContent.includes('email')) emailKeys.push(k);
              });

            emailKeys.forEach(keyNode => {
              const valueNode = keyNode.nextElementSibling;
              if (valueNode && !valueNode.parentNode.querySelector('.human-actions')) {
                const emailValue = valueNode.textContent.replace(/^"|"$/g, '');
                if (emailValue.endsWith('@gmail.com')) {
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'human-actions';
                    
                    const submitBtn = document.createElement('button');
                    submitBtn.textContent = 'Submit Selected Games';
                    submitBtn.onclick = () => submitSelectedGames(keyNode);
                    actionsDiv.appendChild(submitBtn);

                    valueNode.parentNode.appendChild(actionsDiv);
                }
              }
            });

            // Process white/black keys (for adding checkboxes)
            const playerKeys = [];
             if (node.classList.contains('key') && (node.textContent.includes('white') || node.textContent.includes('black')))
              playerKeys.push(node);
            if (node.querySelectorAll)
              node.querySelectorAll('.key').forEach(k => {
                if (k.textContent.includes('white') || k.textContent.includes('black')) playerKeys.push(k);
              });

            playerKeys.forEach(keyNode => {
                // Check if this is inside a game object (simple heuristic: parent has 'fen' or 'log' sibling keys, or we are deep enough)
                // A better check: check if the parent object seems to be a game.
                // For now, let's assume if we see 'white' or 'black' keys, we add a checkbox next to the value.
                
                const valueNode = keyNode.nextElementSibling;
                if (valueNode && !valueNode.querySelector('.game-checkbox')) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.className = 'game-checkbox';
                    checkbox.style.marginLeft = '10px';
                    valueNode.appendChild(checkbox);
                }
            });

          }
        });
      });
    }, 0);
  });

  observer.observe(document.getElementById('data-tree'), { childList: true, subtree: true });
}

function submitSelectedGames(humanKeyNode) {
    // Find the parent object of the human key.
    // The structure is usually: 
    // <li> <span class=key>"human"</span> <span class=object>...</span> </li>
    // But we need to find the games associated with this human.
    // Assuming the structure is:
    // { human: {...}, games: [...] }
    // We need to traverse up to find the container that holds both 'human' and 'games'.
    
    // Actually, looking at the request: "For each human in treeview add a button."
    // And "For each black and white property on the games add a checkbox."
    // "The buttons should submit all the checked checkboxes."
    
    // This implies the button is associated with a scope (maybe the whole user data or a specific section).
    // If the button is added "For each human", it suggests the button is near the human object.
    
    // Let's collect ALL checked checkboxes in the document for now, or try to scope it if possible.
    // If the button is inside a specific container, we can scope the search to that container's parent.
    
    let scope = document;
    // Try to find a common ancestor if possible. 
    // If the human key is inside an object that also contains the games list, we can use that.
    // However, renderjson structure is flat <li> elements nested in <ul>.
    
    const checked = scope.querySelectorAll('.game-checkbox:checked');
    const selectedGames = [];
    
    checked.forEach(cb => {
        // Traverse up to find the game object
        // checkbox -> span (value) -> li -> ul (object properties) -> li (parent key/obj) ...
        // This is tricky with renderjson's DOM.
        
        // Alternative: When adding the checkbox, store a reference to the game data if possible.
        // But we only have DOM nodes here.
        
        // Let's try to extract data from the DOM relative to the checkbox.
        // We need to find the 'fen' or 'log' or 'white'/'black' values of the SAME game object.
        
        const valueSpan = cb.parentNode; // The span containing the value "Player Name"
        const keySpan = valueSpan.previousElementSibling; // The key "white" or "black"
        const li = valueSpan.parentNode; // The li containing key and value
        const ul = li.parentNode; // The ul containing all properties of the game object
        
        // Now iterate over the ul's children (li elements) to find other properties
        let gameData = {};
        
        for (const child of ul.children) {
            const k = child.querySelector('.key');
            const v = child.querySelector('.string, .number, .boolean, .array, .object');
            
            if (k && v) {
                const key = k.textContent.replace(/^"|"$/g, '');
                let value = v.textContent;
                
                if (v.classList.contains('string')) {
                    value = value.replace(/^"|"$/g, '');
                }
                // Handle the special moves container we created
                if (v.classList.contains('moves-container')) {
                     // We might want to reconstruct the moves or just ignore for now.
                     // The original text content was cleared.
                     // We can try to grab the moves from the spans.
                     const moves = [];
                     v.querySelectorAll('.move:not(.start-move)').forEach(m => moves.push(m.textContent));
                     value = moves;
                }
                
                gameData[key] = value;
            }
        }
        selectedGames.push(gameData);
    });
    
    console.log('Submitting games:', selectedGames);
    alert(`Submitting ${selectedGames.length} games (check console for details)`);
    
    // Here you would typically send the data to the server
    /*
    fetch('/api/submit-games', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(selectedGames)
    });
    */
}

function handleMoveClick(event, index, allMoves) {
  // Highlight clicked move
  const container = event.target.parentNode;
  container.querySelectorAll('.move').forEach(m => m.classList.remove('active-move'));
  event.target.classList.add('active-move');

  // Find the board container
  // log key -> li -> ul -> find li with fen -> .chess-container
  const logLi = container.parentNode; // The li containing log key and value
  const ul = logLi.parentNode;

  let chessContainer = null;
  // Search siblings for the one containing the chess container
  // Note: The chess container is appended to the li containing the fen key
  for (const child of ul.children) {
    const cc = child.querySelector('.chess-container');
    if (cc) {
      chessContainer = cc;
      break;
    }
  }

  if (!chessContainer) {
    console.warn('Chess container not found');
    return;
  }

  const startFen = chessContainer.dataset.startFen;
  if (!startFen) {
    console.warn('Start FEN not found');
    return;
  }

  // Calculate new FEN
  const movesToPlay = index === -1 ? [] : allMoves.slice(0, index + 1);
  const newFen = calculateFinalFen(startFen, movesToPlay);

  // Update Info
  const infoDiv = chessContainer.querySelector('.chess-info');
  if (infoDiv) {
    infoDiv.innerHTML = `<strong>CurrentFEN:</strong> ${newFen}`;
  }

  // Update Board
  const oldBoard = chessContainer.querySelector('.chessboard');
  if (oldBoard) {
    oldBoard.remove();
  }
  const newBoard = createChessboard(newFen);
  chessContainer.appendChild(newBoard);
}

function calculateFinalFen(startFen, moves) {
  try {
    const chess = new Chess(startFen);
    for (const move of moves) {
      if (!move) continue;
      if (['1-0', '0-1', '1/2-1/2', '*'].includes(move)) continue;

      try {
        chess.move(move);
      } catch (e) {
        // console.warn('Invalid move:', move);
      }
    }
    return chess.fen();
  } catch (e) {
    console.error('Error calculating final FEN:', e);
    return startFen;
  }
}

function createChessboard(fen) {
  try {
    const chess = new Chess(fen);
    const board = chess.board();
    const container = document.createElement('div');
    container.className = 'chessboard';

    for (let r = 0; r < 8; r++) {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'board-row';
      for (let c = 0; c < 8; c++) {
        const squareDiv = document.createElement('div');
        const isLight = (r + c) % 2 === 0;
        squareDiv.className = `board-square ${isLight ? 'white-square' : 'black-square'}`;

        const piece = board[r][c];
        if (piece) {
          const symbol = getPieceSymbol(piece);
          squareDiv.textContent = symbol;
          squareDiv.style.color = piece.color === 'w' ? 'white' : 'black';
          if (piece.color === 'w') {
            squareDiv.style.textShadow = '0 0 2px black';
          }
        }
        rowDiv.appendChild(squareDiv);
      }
      container.appendChild(rowDiv);
    }
    return container;
  } catch (e) {
    console.error('Error creating chessboard:', e);
    return document.createElement('div');
  }
}

function getPieceSymbol(piece) {
  const symbols = {
    p: '♟',
    r: '♜',
    n: '♞',
    b: '♝',
    q: '♛',
    k: '♚',
  };
  return symbols[piece.type] || '';
}
