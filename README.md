# Sumaq Center Gym - Plataforma Web Oficial

Plataforma web y prototipo digital para **Sumaq Center Gym**, centro de acondicionamiento físico y musculación ubicado en Jirón Callao 126, Cercado de Lima.

El proyecto está desarrollado con Next.js 16 (App Router), React 19, Tailwind CSS v4, Sanity Studio v5 y OpenStreetMap (Leaflet).

---

## 🎯 Objetivo y Estado Actual

- **Estado**: Prototipo navegable para revisión y validación de diseño y contenidos con los interesados.
- **Modo Demostración Activo**: Opera con `NEXT_PUBLIC_IS_DEMO="true"`, mostrando un cintillo informativo en la interfaz, aplicando `noindex, nofollow` para evitar la indexación en motores de búsqueda y empleando datos de muestra claramente identificados.
- **URL de Demostración**: Pendiente de despliegue remoto en Netlify; actualmente no existe una URL pública desplegada ni comprobada.

---

## 🛠️ Tecnologías y Versiones Comprobadas

A continuación se detallan las versiones declaradas en `package.json` y las efectivamente resueltas e instaladas en `package-lock.json` / `node_modules`:

| Dependencia | Versión Declarada (`package.json`) | Versión Instalada (`package-lock.json`) | Rol en el Proyecto |
| :--- | :--- | :--- | :--- |
| **Next.js** | `16.4.3` | `16.4.3` | Framework de React con App Router y Turbopack |
| **React** | `19.3.0` | `19.3.0` | Biblioteca de interfaz de usuario |
| **React DOM** | `19.3.0` | `19.3.0` | Renderizado para navegador de React |
| **Tailwind CSS** | `@tailwindcss/turbopack: ^4` | `4.3.3` (Tailwind `4.3.3`) | Motor de estilos utilitarios |
| **Sanity** | `^5.31.2` | `5.31.2` | CMS Headless y panel Studio (*versión 5.x instalada; no v6*) |
| **next-sanity** | `^13.4.0` | `13.4.0` | Integración de Sanity para Next.js App Router |
| **@sanity/vision** | `^5.31.2` | `5.31.2` | Herramienta de pruebas GROQ dentro del Studio |
| **@sanity/image-url** | `^2.1.1` | `2.1.1` | Generación de URLs de imágenes para Sanity |
| **Leaflet** | `^1.9.4` | `1.9.4` | Biblioteca de mapas interactivos |
| **@types/leaflet** | `^1.9.22` | `1.9.22` | Tipos TypeScript para Leaflet |
| **Lucide React** | `^1.66.0` | `1.66.0` | Iconografía vectorial |
| **Framer Motion** | `^14.9.0` | `14.9.0` | Animaciones de interfaz |
| **Styled Components** | `^6.6.0` | `6.6.0` | Requisito de renderizado para Sanity Studio |
| **TypeScript** | `^5` | `5.9.3` | Tipado estático y compilación |
| **ESLint** | `^9` | `9.39.5` | Análisis estático de código |

---

## 💻 Requisitos del Sistema y Runtime

- **Entorno Local de Ejecución**: Desarrollado y probado localmente bajo **Node.js v24.16.0** y **npm 11.13.0**.
- **Compatibilidad de Motores (`engines`)**:
  - `next`: Requiere `node: >=20.9.0`.
  - `sanity`, `next-sanity`, `@sanity/image-url`: Requieren explícitamente `node: >=20.19 <22 || >=22.12`.
- **Recomendación para Despliegues (Netlify u otros)**:
  - Se recomienda fijar **Node.js 22 LTS** (`NODE_VERSION=22`), dado que resuelve a versiones `>=22.12` que satisfacen sin conflicto las restricciones cruzadas de Next.js y Sanity.
  - Si se utiliza Node.js 20, debe asegurarse una subversión `>=20.19.0`.

---

## 📦 Instalación y Comandos

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Disponible en el navegador en [http://localhost:3000](http://localhost:3000).

3. **Ejecutar pruebas unitarias de software**:
   ```bash
   npm test
   ```
   Ejecuta 31 pruebas automatizadas de software sobre las funciones de cálculo matemático de nutrición y composición corporal (`lib/nutrition/formulas.test.ts`).

4. **Ejecutar análisis estático (linter)**:
   ```bash
   npm run lint
   ```

5. **Compilar para producción**:
   ```bash
   npm run build
   ```

---

## 🗺️ Resumen de Rutas

| Ruta | Descripción |
| :--- | :--- |
| `/` | **Inicio**: Propuesta de valor, presentación del centro y accesos directos; no duplica el catálogo completo de membresías. |
| `/planes` | **Planes y Membresías**: Modalidades de entrenamiento, campañas de promociones, disciplinas y beneficios (con datos de muestra identificados). |
| `/ubicacion` | **Ubicación y Contacto**: Dirección referencial en Jr. Callao 126, mapa OpenStreetMap con vista general del Centro de Lima y geolocalización en navegador. |
| `/calculadoras` | **Calculadoras Orientativas**: Herramientas de estimación personal para Gasto Energético (TDEE), Grasa Corporal (U.S. Navy) y Distribución de Macronutrientes. |
| `/studio` | **Sanity Studio**: Panel administrativo embebido. En el prototipo actual cuenta con esquemas y consultas en código, operando sobre datos de fallback local; el contenido remoto en Sanity Cloud no ha sido verificado. |

---

## ⚙️ Configuración del Entorno (.env.example)

El proyecto incluye la plantilla `.env.example` con los parámetros necesarios sin incluir credenciales reales:

```bash
cp .env.example .env.local
```

Parámetros configurables:
- `NEXT_PUBLIC_IS_DEMO`: Controla el modo prototipo (`"true"`) o producción (`"false"`).
- `NEXT_PUBLIC_SITE_URL`: URL base para sitemaps y metadatos canónicos.
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: ID del proyecto en Sanity.
- `NEXT_PUBLIC_SANITY_DATASET`: Nombre del dataset (por defecto `"production"`).
- `NEXT_PUBLIC_SANITY_API_VERSION`: Versión de API de Sanity (`"2026-03-01"`).
- `SANITY_API_READ_TOKEN`: Token opcional para datasets privados (dejar vacío si el dataset es de lectura pública).

---

## 📚 Documentación Técnica y Procedimientos

Para consultar detalles específicos de arquitectura, despliegue y estado de pendientes, revisa los documentos en la carpeta `docs/`:

- 📄 [Informe Técnico](docs/informe-tecnico.md): Arquitectura, estado de Sanity, calculadoras orientativas y alcance de las pruebas.
- 🚀 [Guía de Despliegue en Netlify](docs/despliegue-netlify.md): Configuración del runtime de Node, variables y verificación.
- 📋 [Lista de Pendientes y Hoja de Ruta](docs/pendientes.md): Datos comerciales que debe confirmar el gimnasio e ideas fuera de alcance.
