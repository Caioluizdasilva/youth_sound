import { supabase } from "./supabase.js";

const container = document.getElementById("music-container");

const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

async function loadMusic() {
  if (!songId) {
    container.innerHTML = "<p>Música não encontrada.</p>";
    return;
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", songId)
    .single();

  if (error || !data) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar música.</p>";
    return;
  }

  container.innerHTML = `
    <h1>${data.title}</h1>
    <p><strong>Artist:</strong> ${data.artist}</p>
    <p><strong>Category:</strong> ${data.category}</p>
    <p><strong>Key:</strong> ${data.key}</p>

    <h3>Chords</h3>
    <pre>${data.chords}</pre>
  `;
}

loadMusic();
