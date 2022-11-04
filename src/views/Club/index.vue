<template>
  <div
    class="col-span-10 p-12 overflow-y-auto h-1/2"
  >
    <div v-if="competitionStore.isLoading" class="flex justify-center">
      <Loading />
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 ">
      <button
        v-for="(item, index) in competitionStore.competitionTeamList"
        :key="index"
        class="flex items-center gap-4 bg-neutral-700 p-6 rounded-md"
        @click="() => onClickClub(item.id)"
      >
        <img :src="item.crest" class="w-2/5" alt="logo" />
        <span>{{ item.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCompetitionStore } from "../../stores/competition";
import { useRoute, useRouter } from "vue-router";
import Loading from "../../components/loading.vue";

const competitionStore = useCompetitionStore();
const route = useRoute();
const router = useRouter();

competitionStore.getCompetitionTeamsList(Number(route.params.id));

const onClickClub = (id: number) => {
  router.push(`/club/${id}`);
};
</script>
