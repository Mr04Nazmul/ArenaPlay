// Classic-style Ludo movement engine (pure functions).
// Four colors; four tokens each; six required to leave yard.
// Track has 52 squares; each color has a six-cell home lane.
export const COLORS=['red','green','yellow','blue'];
export const START={red:0,green:13,yellow:26,blue:39};
export const SAFE=new Set([0,8,13,21,26,34,39,47]);
export const initialLudo=()=>({turn:0,phase:'roll',dice:null,players:COLORS.slice(),tokens:Object.fromEntries(COLORS.map(c=>[c,[-1,-1,-1,-1]])),winner:null});
export function legalMoves(s,color,dice){if(!Number.isInteger(dice)||dice<1||dice>6)return[];return s.tokens[color].flatMap((p,i)=>{const n=p===-1?(dice===6?0:-1):p+dice;return n>=0&&n<=57?[i]:[]})}
export function moveToken(s,color,index,dice){if(s.winner||s.phase!=='move'||s.players[s.turn]!==color||s.dice!==dice||!legalMoves(s,color,dice).includes(index))throw Error('Illegal move');const next=structuredClone(s),old=next.tokens[color][index];const dest=old===-1?0:old+dice;next.tokens[color][index]=dest;
if(dest<51){const global=(START[color]+dest)%52;if(!SAFE.has(global)){for(const other of next.players){if(other===color)continue;next.tokens[other]=next.tokens[other].map(p=>p>=0&&p<51&&(START[other]+p)%52===global?-1:p)}}}
if(next.tokens[color].every(p=>p===57))next.winner=color;
next.dice=null;next.phase='roll';if(dice!==6&&!next.winner)next.turn=(next.turn+1)%next.players.length;return next}
export function rollDice(s,dice){if(s.winner||s.phase!=='roll'||!Number.isInteger(dice)||dice<1||dice>6)throw Error('Invalid roll');const next=structuredClone(s),color=next.players[next.turn];if(legalMoves(next,color,dice).length){next.phase='move';next.dice=dice}else{next.turn=(next.turn+1)%next.players.length;next.dice=null}return next}
