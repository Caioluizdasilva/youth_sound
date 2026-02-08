import { supabase } from "./supabase.js";

const songsList = document.getElementById("songs-list");
const filterCategory = document.getElementById("filter-category");
const filterKey = document.getElementById("filter-key");
const filterTitle = document.getElementById("filter-title");
const filterArtist = document.getElementById("filter-artist");

const applyBtn = document.getElementById("apply-filters");
const clearBtn = document.getElementById("clear-filters");

async function loadSongs(filters = {}) {
  songsList.innerHTML = "<p>Carregando músicas...</p>";

  let query = supabase
    .from("songs")
    .select("id, title, artist, category, song_key")
    .order("created_at", { ascending: false });

  if (filters.category) query = query.eq("category", filters.category);
  if (filters.song_key) query = query.eq("song_key", filters.song_key);
  if (filters.title) query = query.ilike("title", `%${filters.title}%`);
  if (filters.artist) query = query.ilike("artist", `%${filters.artist}%`);

  const { data, error } = await query;

  if (error || !data.length) {
    songsList.innerHTML = "<p>Nenhuma música encontrada.</p>";
    return;
  }

  songsList.innerHTML = "";

  data.forEach(song => {
    songsList.innerHTML += `
      <div class="song-card">
        <h3>${song.title}</h3>
        <p><strong>Artista:</strong> ${song.artist}</p>
        <p><strong>Categoria:</strong> ${song.category}</p>
        <p><strong>Tom:</strong> ${song.song_key || "-"}</p>
        <a href="music.html?id=${song.id}">Ver cifra</a>
      </div>
    `;
  });
}

applyBtn.onclick = () => loadSongs({
  category: filterCategory.value,
  song_key: filterKey.value,
  title: filterTitle.value,
  artist: filterArtist.value
});

clearBtn.onclick = () => {
  filterCategory.value = "";
  filterKey.value = "";
  filterTitle.value = "";
  filterArtist.value = "";
  loadSongs();
};

loadSongs();
