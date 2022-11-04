import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const usePlayerStore = defineStore("player", () => {
  const player = ref();
  let isLoading = ref(false)

  async function getPlayerDetail(playerId: number) {
    isLoading.value = true
    await axios
      .get(
        `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
          `${import.meta.env.VITE_BASE_URL}/persons/${playerId}`
        )}`,
        {
          headers: {
            "X-Auth-Token": import.meta.env.VITE_TOKEN,
          },
        }
      )
      .then((res) => {
        player.value = res.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => [
        isLoading.value = false
      ]);
  }

  return { player, getPlayerDetail, isLoading };
});
