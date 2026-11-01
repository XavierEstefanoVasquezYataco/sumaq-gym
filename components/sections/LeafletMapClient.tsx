"use client";

import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SITE_DATA } from "@/lib/data/site-data";
import { Navigation2, RotateCcw, AlertCircle, Compass } from "lucide-react";

interface LeafletMapClientProps {
  className?: string;
}

const GYM_COORDS: [number, number] = [
  SITE_DATA.coordinates.lat,
  SITE_DATA.coordinates.lng,
];

function calculateHaversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export default function LeafletMapClient({ className = "" }: LeafletMapClientProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [isLocating, setIsLocating] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [hasLocated, setHasLocated] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Inicializar mapa centrado en Sumaq Center Gym
    const map = L.map(mapContainerRef.current, {
      center: GYM_COORDS,
      zoom: 16,
      zoomControl: false,
      scrollWheelZoom: false,
    });

    // Añadir controles de zoom accesibles en esquina inferior derecha
    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Azulejos CartoDB Voyager: limpios, de alta legibilidad y concordantes con la paleta cálida #F8F9F6
    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions" target="_blank" rel="noopener">CARTO</a>',
        maxZoom: 19,
        subdomains: "abcd",
      }
    ).addTo(map);

    // Marcador Corporativo SVG para Sumaq Center Gym
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
          <div style="position: absolute; bottom: -4px; width: 6px; height: 6px; background: #176B48; border-radius: 50%;"></div>
        </div>
      `,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      popupAnchor: [0, -20],
    });

    const gymMarker = L.marker(GYM_COORDS, { icon: gymIcon }).addTo(map);
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

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsLocating(false);
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateHaversineKm(
          userLat,
          userLng,
          GYM_COORDS[0],
          GYM_COORDS[1]
        );
        setDistanceKm(distance);
        setHasLocated(true);

        const map = mapInstanceRef.current;
        if (!map) return;

        // Marcador del usuario
        const userIcon = L.divIcon({
          className: "user-loc-pin",
          html: `
            <div style="width: 24px; height: 24px; background: #1E3A8A; border: 3px solid #FFFFFF; border-radius: 50%; box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.35);"></div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([userLat, userLng]);
        } else {
          userMarkerRef.current = L.marker([userLat, userLng], {
            icon: userIcon,
          }).addTo(map);
          userMarkerRef.current.bindPopup(
            '<div style="font-size: 12px; font-weight: 600; color: #17211D;">Tu ubicación actual</div>'
          );
        }

        // Ajustar encuadre para mostrar tanto al usuario como al gimnasio
        const bounds = L.latLngBounds([
          [userLat, userLng],
          GYM_COORDS,
        ]);
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 16 });
      },
      (error) => {
        setIsLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError("Permiso denegado para acceder a tu ubicación.");
        } else {
          setLocationError("No pudimos determinar tu ubicación actual.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleRecenterGym = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView(GYM_COORDS, 16);
    }
  };

  return (
    <div className={`relative w-full h-full flex flex-col ${className}`}>
      {/* Contenedor del Mapa Leaflet */}
      <div
        ref={mapContainerRef}
        className="w-full h-full min-h-[420px] rounded-xl overflow-hidden z-0"
        aria-label="Mapa interactivo con la ubicación de Sumaq Center Gym"
      />

      {/* Barra de herramientas accesible superpuesta sobre el mapa */}
      <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Identificador de Sede */}
        <div className="pointer-events-auto px-3.5 py-2 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE3DD] text-xs font-bold text-[#17211D] flex items-center gap-2 shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#176B48]"></span>
          <span>Jr. Callao 126 • Cercado de Lima</span>
        </div>

        {/* Botones de Control de Navegación y Geolocalización */}
        <div className="pointer-events-auto flex items-center gap-2">
          {hasLocated && (
            <button
              onClick={handleRecenterGym}
              className="px-3 py-2 rounded-lg bg-[#FFFFFF]/95 backdrop-blur-md border border-[#DCE3DD] hover:border-[#176B48] text-xs font-semibold text-[#17211D] flex items-center gap-1.5 shadow-sm transition-all min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#176B48]"
              title="Volver a enfocar el gimnasio"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#526159]" />
              <span className="hidden sm:inline">Centrar Gimnasio</span>
            </button>
          )}

          <button
            onClick={handleLocateMe}
            disabled={isLocating}
            className="px-3.5 py-2 rounded-lg bg-[#176B48] hover:bg-[#105236] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all min-h-[44px] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#176B48]"
          >
            <Navigation2
              className={`w-4 h-4 ${isLocating ? "animate-spin" : ""}`}
            />
            <span>{isLocating ? "Calculando..." : "Ver mi ubicación"}</span>
          </button>
        </div>
      </div>

      {/* Panel informativo de distancia si se obtuvo la geolocalización */}
      {distanceKm !== null && (
        <div className="absolute bottom-4 left-4 z-10 pointer-events-auto">
          <div className="px-4 py-2.5 rounded-lg bg-[#17211D]/90 backdrop-blur-md text-[#F8F9F6] text-xs flex items-center gap-2.5 shadow-lg border border-[#263730]">
            <Compass className="w-4 h-4 text-[#176B48]" />
            <div>
              <span className="font-bold text-white">
                Estás a aprox. {distanceKm} km del gimnasio
              </span>
              <span className="block text-[11px] text-[#A3B8AD]">
                Llegada estimada: {Math.max(2, Math.round(distanceKm * 3.5))} min en auto / transporte
              </span>
            </div>
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
    </div>
  );
}
