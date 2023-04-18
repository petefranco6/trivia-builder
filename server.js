const io = require("socket.io")(3001, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  // When the host clicks start run this function
  socket.on("start", (_, room) => {
    // Tell everyone in the room to start the game
    socket.to(room).emit("start-game");
  });

  // When a new player wants to start a new lobby this function will be triggered
  // lobbyInfo contains a lobbyName and a quizId.
  socket.on("start-lobby", (lobbyInfo) => {
    // Adds the connected client to the room
    socket.data.playerName = lobbyInfo.playerName;
    socket.data.lobbyName = lobbyInfo.lobbyName;
    socket.data.isHost = true;
    socket.join(lobbyInfo.lobbyName);
    socket.to(socket.id).emit("started-lobby", lobbyInfo);
    console.log(
      `I just started ${lobbyInfo.lobbyName} for quiz ${lobbyInfo.quizId}`
    );
  });

  socket.on("start-game", (gameInfo) => {
    socket.emit("started-game")
  })

  // When a player wants to join a lobby this function will be triggered
  // joinLobbyInfo contains lobbyName and playerName
  socket.on("join-lobby", async (joinLobbyInfo) => {
    socket.data.playerName = joinLobbyInfo.playerName;
    socket.data.isHost = false;
    socket.data.lobbyName = joinLobbyInfo.lobbyName;
    // Adds the connected client to the room
    socket.join(joinLobbyInfo.lobbyName);

    const socketsInRoom = await io.in(joinLobbyInfo.lobbyName).fetchSockets();
    const playerData = socketsInRoom.map((s) => {
      return {
        playerName: s.data.playerName,
        isHost: s.data.isHost,
        socketId: s.id,
        lobbyName: s.data.lobbyName,
      };
    });
    socket.to(joinLobbyInfo.lobbyName).emit("player-joined", playerData);
    console.log(
      `${joinLobbyInfo.playerName} just joined the ${joinLobbyInfo.lobbyName} lobby!`
    );
  });

  socket.on("get-self-data", async (cb) => {
    const socketsInRoom = await io.fetchSockets();
    const playerData = socketsInRoom
      .filter((s) => s.id == socket.id)
      .map((s) => {
        return {
          playerName: s.data.playerName,
          isHost: s.data.isHost,
          socketId: s.id,
          lobbyName: s.data.lobbyName
        };
      })[0];
    cb(playerData);
  });
});
