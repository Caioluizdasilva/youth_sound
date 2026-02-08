import { supabase } from "./supabase.js";

const container = document.getElementById("music-container");

// pega o ID da URL
const params = new URLSearchParams(window.location.search);
const songId = params.get("id");

if (!songId) {
  container.innerHTML = "<p>Música não encontrada.</p>";
  throw new Error("ID da música não informado");
}

async function loadSong() {
  const { data, error } = await supabase
    .from("songs")
    .select("title, artist, category, song_key, lyrics")
    .eq("id", songId)
    .single();

  if (error || !data) {
    console.error(error);
    container.innerHTML = "<p>Erro ao carregar música.</p>";
    return;
  }

  container.innerHTML = `
    <h2>${data.title}</h2>
    <p><strong>Artista:</strong> ${data.artist}</p>
    <p><strong>Categoria:</strong> ${data.category}</p>
    <p><strong>Tom:</strong> ${data.song_key || "-"}</p>

    <h3>Cifra</h3>
    <pre class="lyrics">${data.lyrics || "Cifra não cadastrada."}</pre>
  `;
}

loadSong();
