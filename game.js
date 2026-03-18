const TOTAL_CELLS = 52
 
const safeSpots = [0,8,13,21,26,34,39,47]
 
const startPositions = {
red:0,
blue:13,
yellow:26,
green:39
}
 
let players = ["red","blue","yellow","green"]
 
let tokens = []
 
players.forEach(p=>{
for(let i=0;i<4;i++){
tokens.push({
player:p,
position:-1
})
}
})
 
let currentPlayer = 0
 
function createBoard(){
 
const board=document.getElementById("board")
 
for(let i=0;i<169;i++){
 
let cell=document.createElement("div")
cell.classList.add("cell")
 
board.appendChild(cell)
 
}
 
}
 
createBoard()
 
function rollDice(){
 
let dice=Math.floor(Math.random()*6)+1
 
document.getElementById("diceResult").innerText="Dice: "+dice
 
handleMove(players[currentPlayer],dice)
 
}
 
function handleMove(player,dice){
 
let playerTokens=tokens.filter(t=>t.player===player)
 
let token=playerTokens.find(t=>t.position!==-2)
 
if(!token)return
 
if(token.position===-1){
 
if(dice===6){
 
token.position=startPositions[player]
 
}
 
}else{
 
token.position=(token.position+dice)%TOTAL_CELLS
 
}
 
checkCapture(player,token.position)
 
renderTokens()
 
nextTurn()
 
}
 
function checkCapture(player,position){
 
if(safeSpots.includes(position))return
 
tokens.forEach(t=>{
 
if(t.player!==player && t.position===position){
 
t.position=-1
 
}
 
})
 
}
 
function renderTokens(){
 
const cells=document.querySelectorAll(".cell")
 
cells.forEach(c=>c.innerHTML="")
 
tokens.forEach(t=>{
 
if(t.position>=0){
 
let tokenDiv=document.createElement("div")
 
tokenDiv.classList.add("token")
tokenDiv.classList.add(t.player)
 
cells[t.position].appendChild(tokenDiv)
 
}
 
})
 
safeSpots.forEach(i=>{
cells[i].classList.add("safe")
})
 
}
 
function nextTurn(){
 
currentPlayer=(currentPlayer+1)%players.length
 
document.getElementById("turnInfo").innerText="Turn: "+players[currentPlayer]
 
}
 
renderTokens()
