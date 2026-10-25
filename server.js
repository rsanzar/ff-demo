// In-memory store
const todos = [
  { id: "1", text: "Learn Fairyfly", done: true },
  { id: "2", text: "Build a server", done: false },
];

const json = (data, status = 200) => ({ status, body: JSON.stringify(data) });
const partsOf = (p) => p.split("/").filter((s) => s.length > 0);

// Handler signature the runtime actually uses: (url, method), both strings.
// url is the raw request-target, e.g. "/api/todos?search=x".
http.serve({ port: 3000 }, (url, method) => {
  const q = url.indexOf("?");
  const path = q === -1 ? url : url.slice(0, q);
  const query = q === -1 ? "" : url.slice(q + 1);
  const parts = partsOf(path);

  // --- status-code demos: /status/:code ------------------------------
  if (parts[0] === "status" && parts.length === 2) {
    const code = Number(parts[1]);
    if (code >= 100 && code <= 599) return { status: code, body: `status ${code}` };
    return json({ error: "invalid status code" }, 400);
  }

  // --- GET / ----------------------------------------------------------
  if (path === "/") {
    // console.detail("Fairyfly log ");
    return {
      status: 200, body:
        "hello from Fairyfly server\n"
    };
  }

});
