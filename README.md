# ArenaPlay

## Current state
- Chess: local two-player chess board with chess.js legal moves.
- Ludo: simplified two-player dice-and-token race prototype; **not full classic Ludo**.
- Multiplayer, login, matchmaking, chat and Supabase are **not yet implemented**.

## Development

```bash
npm install
npm run dev
```

Build: `npm run build`.

## Next steps
1. Implement proper classic Ludo board, four colors, captures, safe cells, and home entry.
2. Implement Supabase authenticated rooms and secure server-validated dice and moves.
3. Add realtime chess synchronization, reconnect handling and matchmaking.
4. Test both games on two separate devices before claiming online multiplayer.
