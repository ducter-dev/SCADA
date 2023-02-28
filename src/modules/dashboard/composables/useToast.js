import toastStore  from '../store/toastStore'

const useToast = () => {

  const addToast = (toast) => {
    return toastStore.add(toast)
  }

  const removeToast = (index) => {
    return toastStore.remove(index)
  }

  return {
    addToast,
    removeToast,
  }

}
 
export default useToast