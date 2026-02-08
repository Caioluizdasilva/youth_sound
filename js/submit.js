import { supabase } from "./supabase.js";

const form = document.getElementById("song-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "Enviando música...";
  message.style.color = "black";

  const title = document.getElementById("title").value.trim();
  const artist = document.getElementById("artist").value.trim();
  const category = document.getElementById("category").value;
  const song_key = document.getElementById("song_key").value.trim();

  if (!title || !artist || !category) {
    message.textContent = "Preencha todos os campos obrigatórios.";
    message.style.color = "red";
    return;
  }

  const { error } = await supabase
    .from("songs")
    .insert([
      {
        title: title,
        artist: artist,
        category: category,
        song_key: song_key,
        approved: false
      }
    ]);

  if (error) {
    console.error(error);
    message.textContent = "Erro ao enviar música.";
    message.style.color = "red";
  } else {
    message.textContent = "Música enviada com sucesso! 🎶";
    message.style.color = "green";
    form.reset();
  }
});
