import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'login', renderMode: RenderMode.Prerender },
  { path: 'homes', renderMode: RenderMode.Prerender },
  { path: 'menu', renderMode: RenderMode.Prerender },
  { path: 'dashboard', renderMode: RenderMode.Prerender },
  { path: 'cantidadincidentextipo', renderMode: RenderMode.Prerender },
  { path: 'ContarPorTipoIncidente', renderMode: RenderMode.Prerender },
  { path: 'reporte-contar-por-nivel', renderMode: RenderMode.Prerender },
  { path: 'DistritoPeligroso', renderMode: RenderMode.Prerender },

  { path: 'distritos/news', renderMode: RenderMode.Prerender },
  { path: 'distritos/edits/:id', renderMode: RenderMode.Server },

  { path: 'roles/news', renderMode: RenderMode.Prerender },
  { path: 'roles/edits/:id', renderMode: RenderMode.Server },

  { path: 'niveles/news', renderMode: RenderMode.Prerender },
  { path: 'niveles/edits/:id', renderMode: RenderMode.Server },

  { path: 'BotonPanico/news', renderMode: RenderMode.Prerender },
  { path: 'BotonPanico/edits/:id', renderMode: RenderMode.Server },
  { path: 'BotonPanico/interactuar', renderMode: RenderMode.Server },

  { path: 'tiponotificacion/news', renderMode: RenderMode.Prerender },
  { path: 'tiponotificacion/edits/:id', renderMode: RenderMode.Server },

  { path: 'tipoincidente/news', renderMode: RenderMode.Prerender },
  { path: 'tipoincidente/edits/:id', renderMode: RenderMode.Server },

  { path: 'usuarios/news', renderMode: RenderMode.Prerender },
  { path: 'usuarios/edits/:id', renderMode: RenderMode.Server },
  { path: 'usuarios/ver/:id', renderMode: RenderMode.Server },

  { path: 'reporteincidente/news', renderMode: RenderMode.Prerender },
  { path: 'reporteincidente/edits/:id', renderMode: RenderMode.Server },

  { path: 'Incidente/news', renderMode: RenderMode.Prerender },
  { path: 'Incidente/edits/:id', renderMode: RenderMode.Server },
  { path: 'Incidente/ver/:id', renderMode: RenderMode.Server },
  { path: 'Incidente/heatmap', renderMode: RenderMode.Server },

  { path: 'Busqueda/news', renderMode: RenderMode.Prerender },
  { path: 'Busqueda/edits/:id', renderMode: RenderMode.Server },

  { path: 'distritofavorito/news', renderMode: RenderMode.Prerender },
  { path: 'distritofavorito/edits/:id', renderMode: RenderMode.Server },

  { path: 'Notificacion/news', renderMode: RenderMode.Prerender },
  { path: 'Notificacion/edits/:id', renderMode: RenderMode.Server },

  { path: '**', renderMode: RenderMode.Server },
];
