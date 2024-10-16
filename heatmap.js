import { map } from "./app.js";
import { clearRoutes } from "./route.js"; // Asegúrate de que el nombre del archivo y la ruta son correctos
import { loadTrayectos } from "./route.js"; // Importa loadTrayectos desde route.js
import { parseWKT } from "./route.js"; // Asegúrate de que 'route.js' tenga definida esta función

// Agregar el proveedor de Heatmap y la capa de Heatmap
let heatmapProvider = new H.data.heatmap.Provider({
  colors: new H.data.heatmap.Colors(
    {
      0: "rgba(0, 255, 0, 1)", // Verde - Baja densidad
      0.5: "rgba(255, 255, 0, 1)", // Amarillo - Densidad media
      0.9: "rgba(255, 0, 0, 1)", // Rojo - Alta densidad
    },
    true // Activar interpolación
  ),
  bandwidth: 10, // Ajusta este valor para modificar el tamaño de las zonas de calor
});

let heatmapLayer = new H.map.layer.TileLayer(heatmapProvider);
let heatmapVisible = false; // Estado del mapa de calor

// Función para agregar un punto al mapa de calor
export function addPointToHeatmap(coordinates) {
  console.log("Agregando punto al mapa de calor:", coordinates);
  heatmapProvider.addData([{ lat: coordinates.lat, lng: coordinates.lng }]);
}

// Función para limpiar el mapa de calor
export function clearHeatmap() {
  heatmapProvider.clear();
  map.removeLayer(heatmapLayer);
}

// Función para mostrar y ocultar el mapa de calor
export async function showHeatmap() {
  console.log("Ejecutando showHeatmap...");

  if (heatmapVisible) {
    clearHeatmap();
    heatmapVisible = false;
    return;
  }

  clearRoutes();
  try {
    const trayectos = await loadTrayectos();
    if (trayectos && trayectos.length > 0) {
      trayectos.forEach((trayecto) => {
        const pointsArray = parseWKT(trayecto.ruta);
        pointsArray.forEach((points) => {
          points.forEach((point) => {
            if (point.lat && point.lng) {
              addPointToHeatmap(point);
            }
          });
        });
      });
      map.addLayer(heatmapLayer);
      heatmapVisible = true;
    } else {
      console.warn("No se encontraron trayectos para el mapa de calor.");
    }
  } catch (error) {
    console.error("Error al cargar trayectos para el mapa de calor:", error);
  }
}
