async function loadData() {
  const response = await fetch("/api/list");
  const data = await response.json();
  const tbody = document.querySelector("#recordsTable tbody");
  tbody.innerHTML = "";
  data.forEach((zaznam, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${zaznam.name}</td>
      <td>${zaznam.date}</td>
      <td>${zaznam.location}</td>
      <td>${zaznam.description}</td>
      <td>
        <button onclick="edit(${index})">Upravit</button>
        <button onclick="remove(${index})">Smazat</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}
function edit(index) {
  alert("Úprava není zatím implementována.");
}
async function remove(index) {
  if (confirm("Opravdu chcete smazat tento záznam?")) {
    await fetch("/api/delete", { method: "POST", body: JSON.stringify({ index }) });
    loadData();
  }
}
function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Seznam úrazů", 10, 10);
  doc.autoTable({ html: "#recordsTable", startY: 20 });
  doc.save("urazy.pdf");
}
function exportExcel() {
  const wb = XLSX.utils.table_to_book(document.getElementById("recordsTable"), { sheet: "Úrazy" });
  XLSX.writeFile(wb, "urazy.xlsx");
}
loadData();