import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface Area {
  id: number;
  name: string;
  code: string;
  flag: string;
}

export interface RunningCompetition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
}

export interface Contract {
  start?: any;
  until?: any;
}

export interface Coach {
  id?: any;
  firstName?: any;
  lastName?: any;
  name?: any;
  dateOfBirth?: any;
  nationality?: any;
  contract: Contract;
}

export interface Squad {
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Teams {
  area: Area;
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: RunningCompetition[];
  coach: Coach;
  squad: Squad[];
  staff: any[];
  lastUpdated: Date;
}

export const useCompetitionStore = defineStore("competition", () => {
  const competitions = ref([]);
  const competitionTeams = ref<Teams[]>([]);
  const competitionList = computed(() => competitions.value);
  const competitionTeamList = computed(() => competitionTeams.value);
  let isLoading = ref(false)

  async function getCompetitionIdList(areaId: number) {
    isLoading.value = true
    const resp = await axios
      .get(
        `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
          `${import.meta.env.VITE_BASE_URL}/competitions/?areas=${areaId}`
        )}`,
        {
          headers: {
            "X-Auth-Token": import.meta.env.VITE_TOKEN,
          },
        }
      )
      .then((res) => {
        competitions.value = res.data.competitions
        return res.data.competitions.map((item: Teams) => item.id)
      })
      .catch((err) => {
        console.log(err)
        return []
      })
      .finally(() => {
        isLoading.value = false
      });

    return resp
  }

  async function getCompetitionTeamsList(areaId: number) {
    isLoading.value = true
    competitionTeams.value = []

    const list = await getCompetitionIdList(areaId)

    list.forEach(async (id: number) => {
      await axios
        .get(
          `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(
            `${import.meta.env.VITE_BASE_URL}/competitions/${id}/teams`
          )}`,
          {
            headers: {
              "X-Auth-Token": import.meta.env.VITE_TOKEN,
            },
          }
        )
        .then((res) => {
          competitionTeams.value.push(...res.data.teams);
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => [
          isLoading.value = false
        ]);
    });
  }

  return {
    competitions,
    competitionTeams,
    competitionList,
    competitionTeamList,
    getCompetitionIdList,
    getCompetitionTeamsList,
    isLoading
  };
});
