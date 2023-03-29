const api_url = import.meta.env.VITE_APIURL

const useReportes = () => {

  const getCargasDiarias = (fecha) => {
    try {
      open(`${api_url}/reportes/cargas-diarias/${fecha}`, '_blank')  
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getCargasDiarias,
  }
}

export default useReportes