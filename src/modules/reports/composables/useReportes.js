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

  const getReportEsferas = (fecha, esfera) => {
    // esfera a ó b
    try {
      const url = `${api_url}/reportes/esferas/${esfera}/fecha/${fecha}`
      open(url, '_blank')  
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getCargasDiarias,
    getReportEsferas,
  }
}

export default useReportes