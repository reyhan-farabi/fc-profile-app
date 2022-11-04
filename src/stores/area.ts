import axios from "axios";
import { defineStore } from "pinia"
import { computed, ref } from "vue"

interface IArea {
  id: number,
  name: string,
  countryCode: string,
  flag?: string,
  parentAreaId: number,
  parentArea: string
}

export const useAreaStore = defineStore('area', () => {
  const areas = ref<IArea[]>([])
  const areaList = computed(() => areas.value)
  let isLoading = ref(false)

  async function getAreaList() {
    isLoading.value = true
    await axios.get(
      `https://cors-hijacker.vercel.app/api?url=${encodeURIComponent(`${import.meta.env.VITE_BASE_URL}/areas/`)}`,
      {
        headers: {
          'X-Auth-Token': import.meta.env.VITE_TOKEN
        },
      }
    )
    .then((res) => {
      areas.value = res.data.areas
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      isLoading.value = false
    });
  }

  return { areas, areaList, getAreaList, isLoading }
})
