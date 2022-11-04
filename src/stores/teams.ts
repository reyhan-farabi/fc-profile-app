import { defineStore } from "pinia"
import { ref } from "vue"
import { useCompetitionStore } from "./competition";

const competitionStore = useCompetitionStore()

export const useTeamStore = defineStore('team', () => {
  const team = ref()
  let isLoading = ref()

  async function getTeam(id: number) {
    isLoading.value = true
    const res = competitionStore.competitionTeams.filter((item) => item.id === id)
    team.value = res[0]
    isLoading.value = false
  }

  return { team, getTeam, isLoading }
})
