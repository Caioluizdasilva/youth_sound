import { supabase } from "./supabase.js";

const songsList = document.getElementById("songs-list");
const filterCategory = document.getElementById("filter-category");
const filterKey = document.getElementById("filter-key");
const applyBtn = document.getElementById("apply-filters");
const clearBtn = document.getElementById("clear-filters");

async function loadSongs(filters = {}) {
  songsList.innerHTML = "<p>Carregando músicas...</p>";

  let query = supabase
    .from("songs")
    .select("id, title, artist, category, song_key")
    .order("created_at", { ascending: false });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.song_key) {
    query = query.eq("song_key", filters.song_key);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    songsList.innerHTML = "<p>Erro ao carregar músicas.</p>";
    return;
  }

  if (!data || data.length === 0) {
    songsList.innerHTML = "<p>Nenhuma música encontrada.</p>";
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

// aplicar filtros
applyBtn.addEventListener("click", () => {
  loadSongs({
    category: filterCategory.value,
    song_key: filterKey.value
  });
});

// limpar filtros
clearBtn.addEventListener("click", () => {
  filterCategory.value = "";
  filterKey.value = "";
  loadSongs();
});

// carregamento inicial
loadSongs();
