import { supabase } from "./supabase.js";

const form = document.getElementById("song-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const artist = document.getElementById("artist").value;
  const moment = document.getElementById("moment").value;
  const key = document.getElementById("key").value;

  message.textContent = "Enviando música...";

  const { error } = await supabase
    .from("songs")
    .insert([
      {
        title: title,
        artist: artist,
        moment: moment,
        key: key
      }
    ]);

  if (error) {
    console.error(error);
    message.textContent = "Erro ao enviar música.";
    message.style.color = "red";
  } else {
    message.textContent = "Música cadastrada com sucesso!";
    message.style.color = "green";
    form.reset();
  }
});
