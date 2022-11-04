<template>
  <div class="p-12 overflow-y-auto h-[800px]">
    <div v-if="playerStore.isLoading" class="flex justify-center">
      <Loading />
    </div>
    <div v-else class="flex flex-col gap-12">
      <div class="flex gap-12 items-center">
        <div class="flex flex-col gap-2">
          <div class="flex gap-6">
            <span class="text-6xl">{{ playerStore.player.name }}</span>
            <img
              class="h-[20px]"
              :src="playerStore.player.currentTeam.area.flag"
              alt=""
            />
          </div>
          <div class="flex gap-2">
            <span class="font-bold">{{ playerStore.player.nationality }}</span>
            <span class="font-light">{{ playerStore.player.dateOfBirth }}</span>
          </div>
        </div>
      </div>
  
      <div
        class="col-span-1 flex p-6 gap-4 items-center bg-neutral-700 rounded-md drop-shadow-lg"
      >
        <img
          class="px-[50px] h-[100px] hidden xl:block"
          :src="playerStore.player.currentTeam.crest"
          alt=""
        />
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-24">
          <div class="col-span-1 flex flex-col gap-2">
            <img
              class="px-[50px] w-[300px] block xl:hidden"
              :src="playerStore.player.currentTeam.crest"
              alt=""
            />
            <div class="flex gap-6">
              <span class="w-28 font-light">Current Team</span>
              <span>
                {{ playerStore.player.currentTeam.name }}
                <strong>({{ playerStore.player.currentTeam.tla }})</strong>
              </span>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Founded</span>
              <span>{{ playerStore.player.currentTeam.founded }}</span>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Position</span>
              <span>{{ playerStore.player.position }}</span>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Shirt Number</span>
              <span>{{ playerStore.player.shirtNumber }}</span>
            </div>
          </div>
          <div class="col-span-1 flex flex-col gap-2">
            <div class="flex gap-6">
              <span class="w-28 font-light">Address</span>
              <span>{{ playerStore.player.currentTeam.address }}</span>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Website</span>
              <a class="hover:text-lime-500" :href="playerStore.player.currentTeam.website">
                {{ playerStore.player.currentTeam.website }}
              </a>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Venue</span>
              <span>{{ playerStore.player.currentTeam.venue }}</span>
            </div>
            <div class="flex gap-6">
              <span class="w-28 font-light">Contract</span>
              <span
                >{{ playerStore.player.currentTeam.contract.start }} -
                {{ playerStore.player.currentTeam.contract.until }}</span
              >
            </div>
          </div>
        </div>
      </div>
  
      <div class="flex flex-col gap-6">
        <span>Running Competitions</span>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in playerStore.player.currentTeam
              .runningCompetitions"
            :key="index"
            class="col-span-1 flex p-6 gap-8 items-center bg-neutral-600 rounded-md drop-shadow-md"
          >
            <img class="w-[100px]" :src="item.emblem" alt="" />
            <div class="flex flex-col">
              <span class="text-2xl font-light"
                >{{ item.name }} <strong>({{ item.code }})</strong></span
              >
              <strong class="font-bold">{{ item.type }}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import Loading from "../../components/loading.vue";
import { usePlayerStore } from "../../stores/player";

const route = useRoute();
const playerStore = usePlayerStore();

playerStore.getPlayerDetail(Number(route.params.id));
</script>
