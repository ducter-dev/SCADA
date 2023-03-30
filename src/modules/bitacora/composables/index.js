import { useBitacoraStore } from '../store/bitacora'


const useBitacora = () => {

  const store = useBitacoraStore()

  const fetchBitacora = async () => {
    const res = await store.fetchBitacoras()
    return res
  }

  const getBitacora = () => {
    return store.records
  }

  return {
    fetchBitacora,
    getBitacora,
  }
}

export default useBitacora