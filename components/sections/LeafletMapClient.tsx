"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITE_DATA, MAP_CONFIG, NAVIGATION_LINKS } from "@/lib/data/site-data";
import { Navigation2, AlertCircle, Compass, ExternalLink, MapPin } from "lucide-react";

interface LeafletMapClientProps {
  className?: string;
}

export default function LeafletMapClient({ className = "" }: LeafletMapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isLocating, setIsLocating] = useState(false);
  const [locationStatusMessage, setLocationStatusMessage] = useState<string | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [tileError, setTileError] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Determinar centro y zoom inicial según estado de verificación
    const initialCenter: [number, number] =
      SITE_DATA.coordsVerified && SITE_DATA.coordinates
        ? [SITE_DATA.coordinates.lat, SITE_DATA.coordinates.lng]
        : MAP_CONFIG.generalCenter;

    const initialZoom =
      SITE_DATA.coordsVerified && SITE_DATA.coordinates ? 16 : MAP_CONFIG.generalZoom;

    const map = L.map(mapContainerRef.current, {
      center: initialCenter,
      zoom: initialZoom,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Control de zoom en esquina superior derecha para no interferir con botones inferiores
    L.control.zoom({ position: "topright" }).addTo(map);

    // Capa estándar de OpenStreetMap para evitar requerimientos de API keys privadas
    const tileLayer = L.tileLayer(MAP_CONFIG.tileUrl, {
      attribution: MAP_CONFIG.tileAttribution,
      maxZoom: MAP_CONFIG.maxZoom,
    });

    tileLayer.on("tileerror", () => {
      setTileError(true);
    });

    tileLayer.addTo(map);

    // Solo colocar marcador si las coordenadas han sido formalmente verificadas
    if (SITE_DATA.coordsVerified && SITE_DATA.coordinates) {
      const gymCoords: [number, number] = [
        SITE_DATA.coordinates.lat,
        SITE_DATA.coordinates.lng,
      ];

      const gymIcon = L.divIcon({
        className: "sumaq-gym-pin",
        html: `
          <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 40px; height: 40px; background: rgba(23, 107, 72, 0.25); border-radius: 50%; animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="width: 32px; height: 32px; background: #176B48; border: 2.5px solid #FFFFFF; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.3); z-index: 2;">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12"/>
              </svg>
            </div>
          </div>
        `,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
        popupAnchor: [0, -20],
      });

      const gymMarker = L.marker(gymCoords, { icon: gymIcon }).addTo(map);
      gymMarker.bindPopup(`
        <div style="font-family: inherit; padding: 4px; color: #17211D;">
          <strong style="display: block; font-size: 14px; font-weight: 800; text-transform: uppercase; color: #176B48; margin-bottom: 2px;">
            Sumaq Center Gym
          </strong>
          <span style="display: block; font-size: 12px; color: #526159; margin-bottom: 4px;">
            ${SITE_DATA.address}
          </span>
          <span style="display: block; font-size: 11px; font-weight: 600; color: #1E3A8A;">
            ${SITE_DATA.reference}
          </span>
        </div>
      `);
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      setLocationError("Tu navegador no soporta geolocalización.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);
    setLocationStatusMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const map = mapInstanceRef.current;
        if (!map) return;

        // Marcador discreto del visitante
        const userIcon = L.divIcon({
          className: "user-loc-pin",
          html: `
            <div style="width: 22px; height: 22px; background: #1E3A8A; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.35);"></div>
          `,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        });

        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([userLat, userLng]);
        } else {
          userMarkerRef.current = L.marker([userLat, userLng], {
            icon: userIcon,
          }).addTo(map);
          userMarkerRef.current.bindPopup(
            '<div style="font-size: 12px; font-weight: 600; color: #17211D;">Tu ubicación aproximada</div>'
          );
        }

        // Si no hay coordenadas verificadas del gimnasio, centrar la vista en el usuario sin inventar distancias
        if (!SITE_DATA.coordsVerified || !SITE_DATA.coordinates) {
          map.setView([userLat, userLng], 15);
          setLocationStatusMessage(
            "Tu ubicación ha sido situada en el mapa. La distancia exacta hacia el gimnasio estará disponible una vez se confirme el pin oficial de la sede."
          );
        } else {
          // Si están verificadas, calcular distancia en línea recta estricta
          const R = 6371;
          const dLat = ((SITE_DATA.coordinates.lat - userLat) * Math.PI) / 180;
          const dLon = ((SITE_DATA.coordinates.lng - userLng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((userLat * Math.PI) / 180) *
              Math.cos((SITE_DATA.coordinates.lat * Math.PI) / 180) *
              Math.sin(dLon / 2) *
              Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const dist = Math.round(R * c * 10) / 10;

          const bounds = L.latLngBounds([
            [userLat, userLng],
            [SITE_DATA.coordinates.lat, SITE_DATA.coordinates.lng],
          ]);
          map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
          setLocationStatusMessage(`Distancia aproximada en línea recta: ${dist} km.`);
        }
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Permiso denegado para acceder a tu ubicación.");
        } else if (error.code === error.TIMEOUT) {
          setLocationError("Tiempo de espera agotado al consultar la ubicación.");
        } else {
          setLocationError("No se pudo obtener tu ubicación actual.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  return (
    <div className={`relative w-full h-full flex flex-col ${className}`}>
      {/* Contenedor del Mapa Leaflet */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[420px] rounded-xl overflow-hidden z-0"
        aria-label="Mapa interactivo del Centro Histórico de Lima"
      />

      {/* Barra de herramientas accesible superpuesta sobre el mapa */}
      <div className="absolute top-4 left-4 right-14 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Identificador de Sede y Estado de Verificación */}
        <div className="pointer-events-auto px-3.5 py-2 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE3DD] text-xs font-bold text-[#17211D] flex items-center gap-2 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#176B48]"></span>
          <span>
            {SITE_DATA.coordsVerified
              ? "Jr. Callao 126 • Cercado de Lima"
              : "Centro de Lima • Ubicación exacta por confirmar"}
          </span>
        </div>

        {/* Botón de Geolocalización del Visitante */}
        <div className="pointer-events-auto">
          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="px-3.5 py-2 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all min-h-[44px] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
          >
            <Navigation2
              className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`}
            />
            <span>{isLocating ? "Detectando..." : "Ver mi ubicación"}</span>
          </button>
        </div>
      </div>

      {/* Notificación informativa de ubicación */}
      {locationStatusMessage && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-lg bg-[#17211D]/90 backdrop-blur-md text-[#F8F9F6] text-xs flex items-center gap-2.5 shadow-lg border border-[#263730]">
            <Compass className="w-4 h-4 text-[#176B48] shrink-0" />
            <span className="leading-snug">{locationStatusMessage}</span>
          </div>
        </div>
      )}

      {/* Alerta si falla la geolocalización */}
      {locationError && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto z-10 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-lg bg-[#FFFFFF] text-[#991B1B] text-xs flex items-center gap-2 shadow-md border border-[#FCA5A5]">
            <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0" />
            <span>{locationError}</span>
          </div>
        </div>
      )}

      {/* Estado alternativo si falla el proveedor de mapas */}
      {tileError && (
        <div className="absolute inset-0 bg-[#F8F9F6] flex flex-col items-center justify-center p-6 text-center z-20">
          <MapPin className="w-8 h-8 text-[#176B48] mb-2" />
          <h3 className="text-sm font-bold text-[#17211D] uppercase">
            Sumaq Center Gym
          </h3>
          <p className="text-xs text-[#526159] mt-1 mb-4">
            {SITE_DATA.address} (A pasos de la Plaza de Armas)
          </p>
          <a
            href={NAVIGATION_LINKS.googleMapsSearch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#176B48] text-white text-xs font-bold uppercase tracking-wider"
          >
            <span>Buscar dirección en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
