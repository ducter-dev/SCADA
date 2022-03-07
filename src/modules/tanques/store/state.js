export default () => ({
  tanquesInEspera: [
    { id: 1, posicion: 1, numAt: 'PG-0150', tipo: 1, clave: 150, embarque: 0, capacidad: 40500, conector: 3, hora: '08:40', fecha: '2022-01-31' },
    { id: 2, posicion: 2, numAt: 'PG-0151A', tipo: 2, clave: 151, embarque: 0, capacidad: 39800, conector: 3, hora: '09:20', fecha: '2022-01-31' },
    { id: 3, posicion: 3, numAt: 'PG-0151B', tipo: 3, clave: 151, embarque: 0, capacidad: 38700, conector: 3, hora: '09:20', fecha: '2022-01-31' },
    { id: 4, posicion: 4, numAt: 'PG-0153', tipo: 1, clave: 153, embarque: 0, capacidad: 40500, conector: 3, hora: '09:40', fecha: '2022-01-31' },
  ],

  tanqueInEspereaSel: {},

  tanquesInServicio: [
    { id: 1, numAt: 'PG-0150', tipo: 1, capacidad: 40500, llenadera: 5, hora: '08:40', fecha: '2022-01-31' },
    { id: 2, numAt: 'PG-0151A', tipo: 2, capacidad: 39800, llenadera: 6, hora: '09:20', fecha: '2022-01-31' },
    { id: 3, numAt: 'PG-0151B', tipo: 3, capacidad: 38700, llenadera: 7, hora: '09:20', fecha: '2022-01-31' },
    { id: 4, numAt: 'PG-0153', tipo: 1, capacidad: 40500, llenadera: 8, hora: '09:40', fecha: '2022-01-31' },
  ],

  tanqueInServicioSel: {},

  llenaderas: [
    { id: 1, llenadera: 5, libre: false, pg: 'PG-1501A' },
    { id: 2, llenadera: 6, libre: false, pg: 'PG-1501B' },
    { id: 3, llenadera: 7, libre: false, pg: 'PG-1505A' },
    { id: 4, llenadera: 8, libre: false, pg: 'PG-1505B' },
    { id: 5, llenadera: 9, libre: false, pg: 'PG-1600A' },
    { id: 6, llenadera: 10, libre: false, pg: 'PG-1600B' },
    { id: 7, llenadera: 11, libre: true, pg: 'PG-2100' },
    { id: 8, llenadera: 12, libre: true, pg: 'PG-3600' },
    { id: 9, llenadera: 13, libre: true, pg: 'PG-4500' },
    { id: 10, llenadera: 14, libre: true, pg: 'PG-5005' },
  ],

  tanques: [],
  tanqueSelect: {},
})