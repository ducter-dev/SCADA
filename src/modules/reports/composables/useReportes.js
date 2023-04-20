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

  const getReportPatines = (fecha, patin) => {
    // patín 401A, 401B, 402A ó 402B
    try {
      const url = `${api_url}/reportes/patines/${patin}/fecha/${fecha}`
      open(url, '_blank')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReportCromatografo = (fecha, croma) => {
    // Croma de 1 al 4
    try {
      const url = `${api_url}/reportes/cromatografo/${croma}/fecha/${fecha}`
      open(url, '_blank')  
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getCargasDiarias,
    getReportEsferas,
    getReportPatines,
    getReportCromatografo,
  }
}

export default useReportes