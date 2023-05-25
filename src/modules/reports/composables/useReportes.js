const api_url = import.meta.env.VITE_APIURL

const useReportes = () => {

  const getCargasDiarias = (fecha, tipo) => {
    try {
      open(`${api_url}/reportes/cargas-diarias/${fecha}/tipo/${tipo}`, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getListaLlegada = (fecha, tipo) => {
    try {
      open(`${api_url}/reportes/lista-llegada/${fecha}/tipo/${tipo}`, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getDespachoDiario = (fecha, tipo) => {
    try {
      open(`${api_url}/reportes/despacho-diario/${fecha}/tipo/${tipo}`, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getLlenaderas = (llenadera, fecha, tipo) => {
    try {
      open(`${api_url}/reportes/llenaderas/${llenadera}/fecha/${fecha}/tipo/${tipo}`, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getUltimasCargas = (fecha, tipo) => {
    try {
      open(`${api_url}/reportes/ultimas-cargas/${fecha}/tipo/${tipo}`, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReportEsferas = (fecha, esfera, tipo) => {
    // esfera a ó b
    try {
      const url = `${api_url}/reportes/esferas/${esfera}/fecha/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReportPatines = (fecha, patin, tipo) => {
    // patín 401A, 401B, 402A ó 402B
    try {
      const url = `${api_url}/reportes/patines/${patin}/fecha/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReportCromatografo = (fecha, croma, tipo) => {
    // Croma de 1 al 4
    try {
      const url = `${api_url}/reportes/cromatografo/${croma}/fecha/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReportBombas = (fecha) => {
    try {
      const url = `${api_url}/reportes/bombas/${fecha}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getBitacora = (fecha, tipo) => {
    try {
      const url = `${api_url}/reportes/bitacora/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getBalanceDiario = (fecha, tipo) => {
    try {
      const url = `${api_url}/reportes/balance-diario/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getReciboPatin = (fecha, tipo, patin) => {
    try {
      const url = `${api_url}/reportes/patin-pares/${fecha}/tipo/${tipo}/patin/${patin}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  const getDensidades = (fecha, tipo, patin) => {
    try {
      const url = `${api_url}/reportes/densidades/${fecha}/tipo/${tipo}`
      open(url, 'Download')  
      return true
    } catch (error) {
      return false
    }
  }

  return {
    getCargasDiarias,
    getUltimasCargas,
    getDespachoDiario,
    getReportEsferas,
    getReportPatines,
    getReportCromatografo,
    getReportBombas,
    getListaLlegada,
    getLlenaderas,
    getBitacora,
    getBalanceDiario,
    getReciboPatin,
    getDensidades,
  }
}

export default useReportes