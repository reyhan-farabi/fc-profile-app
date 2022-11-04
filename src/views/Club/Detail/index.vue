<template>
  <div class="p-12 overflow-y-auto">
    <div v-if="teamStore.isLoading" class="flex justify-center">
      <Loading />
    </div>
    <div v-else class="flex flex-col gap-12">
      <div class="flex flex-col xl:flex-row gap-12 items-center">
        <img :src="teamStore.team.crest" alt="">
        <span class="text-6xl text-center">{{ teamStore.team.name }}</span>
      </div>
  
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div class="col-span-1 flex flex-col gap-2 p-6 bg-neutral-700 rounded-md drop-shadow-lg">
          <div class="flex gap-6">
            <span class="w-20 font-light">Address</span>
            <span>{{ teamStore.team.address }}</span>
          </div>
          <div class="flex gap-6">
            <span class="w-20 font-light">Website</span>
            <a class="hover:text-lime-500" :href="teamStore.team.website">{{ teamStore.team.website }}</a>
          </div>
          <div class="flex gap-6">
            <span class="w-20 font-light">Venue</span>
            <span>{{ teamStore.team.venue }}</span>
          </div>
        </div>
  
        <div class="col-span-1 flex items-center gap-6 p-6 bg-neutral-700 rounded-md drop-shadow-lg">
          <img class="w-[100px]" :src="teamStore.team.area.flag" alt="">
          <span>{{ teamStore.team.area.name }}</span>
        </div>
      </div>
  
      <div class="flex flex-col gap-6">
        <span>Player List</span>
        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <button
            class="flex flex-col p-6 gap-2 bg-neutral-600 rounded-md drop-shadow-lg hover:bg-neutral-500"
            v-for="(player, index) in teamStore.team.squad" :key="index"
            @click="() => onClickPlayer(player.id)"
          >
            <span class="self-start text-xl font-bold">{{ player.name }}</span>
            <div class="flex justify-between text-sm font-light">
              <span>{{ player.position }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import Loading from '../../../components/loading.vue';
import { useTeamStore } from '../../../stores/teams';

const route = useRoute()
const router = useRouter()
const teamStore = useTeamStore()

teamStore.getTeam(Number(route.params.id))

const onClickPlayer = (playerId: number) => {
  router.push(`/player/${playerId}`)
}
</script>
