import app from "./src/app";
import { Server } from "http";

const PORT: number = 3055;

const server: Server = app.listen(PORT, () => {
  console.log(`WSV start with: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Server Express`));
  // se gui notify o day neu server crash
});
