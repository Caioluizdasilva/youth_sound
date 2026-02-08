import { supabase } from "./supabase.js";

const songsList = document.getElementById("songs-list");

async function loadSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("id, title, artist, category, song_key")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    songsList.innerHTML = "<p>Erro ao carregar músicas.</p>";
    return;
  }

  if (!data || data.length === 0) {
    songsList.innerHTML = "<p>Nenhuma música cadastrada ainda.</p>";
    return;
  }

  songsList.innerHTML = "";

  data.forEach((song) => {
    const card = document.createElement("div");
    card.className = "song-card";

    card.innerHTML = `
      <h3>${song.title}</h3>
      <p><strong>Artista:</strong> ${song.artist}</p>
      <p><strong>Categoria:</strong> ${song.category}</p>
      <p><strong>Tom:</strong> ${song.song_key || "-"}</p>
      <a href="music.html?id=${song.id}">Ver cifra</a>
    `;

    songsList.appendChild(card);
  });
}

loadSongs();
