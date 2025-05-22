document.getElementById("injuryForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const data = {
    name: this.name.value,
    date: this.date.value,
    location: this.location.value,
    description: this.description.value,
  };
  await fetch("/api/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  alert("Záznam uložen.");
});