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

  return {
    fetchBitacora,
    getBitacora,
  }
}

export default useBitacora