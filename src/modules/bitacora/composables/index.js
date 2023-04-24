import { useBitacoraStore } from '../store/bitacora'


const useBitacora = () => {

  const store = useBitacoraStore()

  const fetchBitacora = async (fecha) => {
    const res = await store.fetchBitacoras(fecha)
    return res
  }

  const getBitacora = () => {
    return store.records
  }

  const insertBitacora = async (bitacora) => {
    const res = await store.insertBitacora(bitacora)
    return res
  }

  return {
    fetchBitacora,
    getBitacora,
    insertBitacora,
  }
}

export default useBitacora