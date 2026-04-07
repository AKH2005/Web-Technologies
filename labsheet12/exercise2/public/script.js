async function callAPI(route) {
  const res = await fetch(route);
  const data = await res.json();

  document.getElementById("result").innerText = data.message;
}