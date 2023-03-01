import { useDark, useToggle } from "@vueuse/core";
import { ref ,onBeforeUnmount, onMounted} from "vue";

export const isDark = useDark();
export const sidebarOpen = ref(false);
export const isCollapse = ref(false);
export const toggleSidebar = useToggle(sidebarOpen);
export const toggleDarkMode = useToggle(isDark);
export const toggleCollapsableMode = useToggle(isCollapse);


export default function useDetectOutsideClick(component, callback) {
    if (!component) return
    const listener = (event) => {
        if (event.target !== component.value && event.composedPath().includes(component.value)) {
            return
        }
        if (typeof callback === 'function') {
            callback()
        }
    }
    onMounted(() => { window.addEventListener('click', listener) })
    onBeforeUnmount(() => {window.removeEventListener('click', listener)})

    return {listener}
}