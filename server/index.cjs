const express = require("express");
const path = require("path");
const { app: apiApp } = require("./api.cjs");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve the built site from dist/, NOT from this directory. These server files
// used to be copied into dist/ and this served its own folder, which published
// api.cjs and index.cjs — and the credentials inside them — to anyone who asked.
const PUBLIC_DIR = path.join(__dirname, "..", "dist");

app.use(express.json());

app.use(apiApp);

app.use(express.static(PUBLIC_DIR, {
  maxAge: "1d",
  index: "index.html",
}));

app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
