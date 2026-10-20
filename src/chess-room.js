import {Chess} from 'chess.js';
export function newChessState(){return {fen:new Chess().fen(),moves:[],status:'playing'}}
export function chessMove(state,from,to,promotion='q'){const game=new Chess(state.fen);let move;try{move=game.move({from,to,promotion})}catch{throw Error('Illegal chess move')}if(!move)throw Error('Illegal chess move');return {fen:game.fen(),moves:[...state.moves,move.san],status:game.isCheckmate()?'checkmate':game.isDraw()?'draw':'playing'}}
export function turnOf(state){return new Chess(state.fen).turn()==='w'?'white':'black'}
