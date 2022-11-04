<template>
  <div class="border-r border-lime-200">
    <div class="p-4">
      <input
        class="w-full p-2 bg-neutral-700"
        type="text"
        placeholder="Search"
        v-model="search"
      >
    </div>
    <nav class="flex flex-col overflow-y-auto h-[calc(100vh_-_120px)]">
      <button
        v-for="(item, index) in listArea"
        :key="index"
        class="w-full p-4 hover:bg-lime-200/10"
        @click="() => onClickCountry(item.id)"
      >
        <span>{{ item.name }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useAreaStore } from "../stores/area";
import { useRouter } from "vue-router";
import { ref, computed } from "vue";

const areaStore = useAreaStore();
const router = useRouter();
const search = ref('')
const listArea = computed(() => {
  if (search.value) {
    return areaStore.areaList.filter((item) => item.name.toLowerCase().includes(search.value.toLowerCase()))
  }

  return areaStore.areaList
})

areaStore.getAreaList();

const onClickCountry = (areaId: number) => {
  router.push(`/club-list/${areaId}`)
};
</script>
