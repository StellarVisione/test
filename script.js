let page = 0;
const perPage = 5;
let messages = [];

async function fetchMessages() {
  const res = await fetch("messages.json");
  messages = await res.json();
  loadMore();
}

function renderMessages(start, end) {
  const container = document.getElementById("content");
  messages.slice(start, end).forEach(msg => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerText = msg.message;
    container.appendChild(card);
  });
}

function loadMore() {
  const start = page * perPage;
  const end = start + perPage;
  if (start >= messages.length) return;
  renderMessages(start, end);
  page++;
}

window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    loadMore();
  }
});

fetchMessages();
