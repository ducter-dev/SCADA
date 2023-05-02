import { useDark, useToggle } from "@vueuse/core"
import { ref ,onBeforeUnmount, onMounted} from "vue"

export const isDark = useDark()
export const sidebarOpen = ref(false)
export const isCollapse = ref(false)
export const toggleSidebar = useToggle(sidebarOpen)
export const toggleDarkMode = useToggle(isDark)
export const toggleCollapsableMode = useToggle(isCollapse)


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

function replacePattern(c) {
    // Random hexadecimal number
    const r = (Math.random() * 16) | 0

    // If 'x' return hexadecimal number,
    // if 'y' return [8-11] randomly
    const v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
}

// Returns a random Universally Unique Identifier (UUID)
export function useUUID(pattern) {
    // Accept any desired pattern. If no pattern is provided
    // default to a RFC4122 UUID pattern.
    const _pattern = pattern ? pattern : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'

    // Replace each character in the pattern
    // leaving any non x|y character alone.
    return _pattern.replace(/[xy]/g, replacePattern)
}
