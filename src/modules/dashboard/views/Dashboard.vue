<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import useEventsBus from "../../../layout/eventBus"
import useDashboard from '../composables/useDashboard'
import useTanqueEspera from '../../tanques/composables/useTanqueEspera'
import useLlenaderas from '../../tanques/composables/useLlenaderas'
import useAuth from '../../auth/composables/useAuth'

import WaitingList from '../components/WaitingList.vue'
import LastEntry from '../components/LastEntry.vue'
import InputAntenna from '../components/InputAntenna.vue'
import OutputAntenna from '../components/OutputAntenna.vue'
import LastOutput from '../components/LastOutput.vue'
import AntennaVerification from '../components/AntennaVerifcation.vue'
import TarjetaVerificacion from '../components/TarjetaVerificacion.vue'
import TarjetaSalida from '../components/TarjetaSalida.vue'
import TarjetaUltimasCargas from '../components/TarjetaUltimasCargas.vue'
import TarjetaUltimaEntrada from '../components/TarjetaUltimaEntrada.vue'
import TarjetaAsignacion from '../components/TarjetaAsignacion.vue'
import TarjetaUltimaSalida from '../components/TarjetaUltimaSalida.vue'
import TarjetaLlenaderas from '../components/TarjetaLlenaderas.vue'
import TablaEspera from '../../tanques/components/TableEspera.vue'

const router = useRouter()
const { emit } = useEventsBus()
const { getCurrentUser, getLocalUser } = useAuth()
const sessionUser = computed(() => getCurrentUser())
const showActionsCrud = ref(sessionUser.value.categoria != 4)
const { pause, resume, isActive } = useIntervalFn(() => {
  emit("reloadData", true)
}, 100000)

const { fetchLlenaderas } = useLlenaderas()

onMounted(() => {
  fetchLlenaderas()
})

</script>

<template>
  <div
    class="space-y-4 border-b sm:flex sm:items-center sm:justify-between sm:space-y-0 border-slate-200 dark:border-slate-700">
    <div class="flex-1 min-w-0">
      <h2 class="text-2xl font-bold leading-6 text-slate-900 dark:text-white sm:text-2xl sm:leading-9 sm:truncate ">
        Inicio
      </h2>
    </div>
  </div>
  <div class="mt-5 space-y-5 h-max">
    <div class="grid gap-5 grid-cols-15">
      <div class="flex flex-col col-span-3">
        <InputAntenna />
        <LastEntry />
      </div>
      <div class="flex flex-col col-span-3">
        <AntennaVerification />
        <WaitingList />
      </div>
      <div class="flex flex-col col-span-3">
        <OutputAntenna />
        <!--<TarjetaUltimaSalida :barrera="dataBarreraSalida" :data="dataLastExit" @toggleChange="toggleSalida" />-->
        <LastOutput />
      </div>
      <div v-show="showActionsCrud" class="col-span-2">
        <div class="max-w-sm p-1 bg-white border shadow border-slate-200 dark:bg-slate-800 dark:border-slate-700">
          <div class="p-2 border border-solid border-slate-300">
            <legend class="text-base font-medium text-slate-900 dark:text-white">Estatus Llenaderas</legend>
            <ul role="list" class="divide-y divide-slate-200 dark:divide-slate-700">
              <LCardListActionButton label-button="Desasignar" value-filler='5' />
              <LCardListActionButton label-button="Desasignar" value-filler='6' />
              <LCardListActionButton label-button="Desasignar" value-filler='7' />
              <LCardListActionButton label-button="Desasignar" value-filler='8' />
              <LCardListActionButton label-button="Desasignar" value-filler='9' />
              <LCardListActionButton label-button="Desasignar" value-filler='10' />
              <LCardListActionButton label-button="Desasignar" value-filler='11' />
              <LCardListActionButton label-button="Desasignar" value-filler='12' />
              <LCardListActionButton label-button="Desasignar" value-filler='13' />
              <LCardListActionButton label-button="Desasignar" value-filler='14' />
            </ul>
          </div>
        </div>
      </div>
      <div class="col-span-4">
        <TarjetaUltimasCargas />
      </div>
    </div>
    <div class="border-t border-slate-300 dark:border-slate-700"></div>
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12">
        <TablaEspera />
      </div>
    </div>
  </div>
</template>