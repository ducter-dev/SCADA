<script>
import toastInterface from "../../store/toastStore";
import ToastListItem from "../toast/item.vue";
export default {
  components: {
    ToastListItem,
  },
  data() {
    return {
      toast: toastInterface,
    };
  },
  methods: {
    remove(index) {
      this.toast.remove(index);
    },
  },
};
</script>
<template>
    <TransitionGroup tag="div" enter-from-class="translate-x-full opacity-0" enter-active-class="duration-500"
        leave-active-class="duration-500" leave-to-class="translate-x-full opacity-0"
        class="fixed top-4 right-4 z-50 w-full max-w-xs space-y-4">
        <ToastListItem v-for="(item, index) in toast.items" :key="item.key" :message="item.message" :duration="4000"
            @remove="remove(index)" />
    </TransitionGroup>
</template>
 