import { supabase } from "./supabase.js";

async function testarBusca() {
  const { data, error } = await supabase
    .from("songs")
    .select("*");

  if (error) {
    console.error("Erro ao buscar músicas:", error);
    return;
  }

  console.log("Músicas encontradas:", data);
}

testarBusca();
