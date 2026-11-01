# Guía de Despliegue en Netlify: Sumaq Center Gym

Esta guía detalla el procedimiento técnico para conectar el repositorio de GitHub con Netlify, configurar el runtime de Node.js, gestionar variables de entorno y verificar el despliegue del prototipo.

---

## 1. Estado Previo: Sin Bloqueos Locales Identificados; Despliegue Remoto Pendiente

- **Estado Local**: La compilación de producción (`npm run build`), el linter (`npm run lint`) y las 31 pruebas de software (`npm test`) se completaron con código de salida 0 en el entorno local.
- **Estado Remoto**: Pendiente de desplegar en los servidores de Netlify y comprobar su comportamiento en red real.

---

## 2. Flujo de Integración Continua (GitHub ➔ Netlify)

El flujo de despliegue opera automáticamente vía Git:

```text
[Repositorio Local] 
       │
       ▼ (git push)
[GitHub: rama main] 
       │
       ▼ (Webhook automático de Netlify)
[Netlify Build Engine] 
       │ ──> Ejecuta: npm run build (Next.js Turbopack)
       │ ──> Genera: Artefactos optimizados en .next
       ▼
[Netlify CDN / Edge Network] 
       │
       ▼
[URL Pública: https://<sitio>.netlify.app]
```

---

## 3. Configuración del Proyecto y Runtime de Node.js

### Compatibilidad de Motores y Versión Recomendada
El proyecto local fue desarrollado y probado sobre **Node.js v24.16.0**. Al revisar los requisitos declarados por las dependencias (`engines`):
- `next`: Requiere `node: >=20.9.0`.
- `sanity`, `next-sanity`, `@sanity/image-url`: Requieren explícitamente `node: >=20.19 <22 || >=22.12`.

> [!WARNING]
> No se debe configurar genéricamente `NODE_VERSION=20` en Netlify sin verificar la subversión, ya que si la imagen remota resuelve una versión entre `20.9` y `20.18`, Sanity arrojará un error de incompatibilidad de motor.

**Recomendación de Runtime para Netlify**:
- **Opción recomendada**: `NODE_VERSION=22` (Active LTS). Netlify resolverá a versiones superiores a `22.12`, cumpliendo plenamente con Next.js y Sanity.
- **Opción alternativa**: Si se opta por Node 20, debe fijarse explícitamente en `20.19` o superior (ej. `20.19.0`).

### Parámetros de Compilación en Netlify
Al importar el repositorio (**Add new site** > **Import an existing project** > **GitHub**):
- **Base directory**: *(Dejar vacío)*
- **Build command**: `npm run build`
- **Publish directory**: `.next`

---

## 4. Variables de Entorno en Netlify

Configura estas variables en **Site configuration** > **Environment variables**:

> [!IMPORTANT]
> Nunca introduzcas contraseñas, secretos privados ni tokens confidenciales en variables públicas.

| Nombre de la Variable | Finalidad | Obligatoria en Demo | Valor Recomendado para Demostración |
| :--- | :--- | :--- | :--- |
| `NODE_VERSION` | Fija la versión del runtime en Netlify para compatibilidad con Sanity y Next.js. | **Sí** | `22` |
| `NEXT_PUBLIC_IS_DEMO` | Activa el cintillo de demo y la directiva `noindex, nofollow`. | **Sí** | `"true"` |
| `NEXT_PUBLIC_SITE_URL` | URL asignada por Netlify; resuelve sitemaps y rutas canónicas. | **Sí** | `https://<tu-sitio>.netlify.app` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Identificador del proyecto Sanity para montar `/studio`. | No *(el sitio opera en fallback local)* | ID provisto por Sanity o marcador |
| `NEXT_PUBLIC_SANITY_DATASET` | Nombre del conjunto de datos en Sanity. | No | `"production"` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versión de API para consultas GROQ. | No | `"2026-03-01"` |
| `SANITY_API_READ_TOKEN` | Token para datasets privados. | No | *(Dejar vacío si es dataset público)* |

---

## 5. Requisitos de Sanity y CORS (Solo si aplica)

En el prototipo actual, **los esquemas y consultas están presentes en código, pero el contenido remoto no ha sido verificado**. 

- **Páginas públicas (`/`, `/planes`, `/ubicacion`, `/calculadoras`)**: Operan de forma autónoma con el fallback local configurado, por lo que **no requieren configurar CORS ni credenciales de Sanity** para ser presentadas.
- **Panel administrativo (`/studio`)**: Si se desea iniciar sesión en Sanity Cloud desde la URL de Netlify:
  1. Ingresa a [Sanity Management](https://manage.sanity.io/).
  2. En tu proyecto, ve a **API** > **CORS Origins** > **Add CORS origin**.
  3. Introduce la URL de Netlify (ej. `https://sumaq-center-gym.netlify.app`).
  4. Marca la casilla **Allow credentials** y guarda.

---

## 6. Diferencia entre Entorno Demo y Producción

| Parámetro | Modo Demostración (`NEXT_PUBLIC_IS_DEMO="true"`) | Producción Aprobada (`NEXT_PUBLIC_IS_DEMO="false"`) |
| :--- | :--- | :--- |
| **Cintillo Superior** | Visible: advierte que es un prototipo comercial en revisión. | Oculto: navegación limpia. |
| **Etiqueta Meta Robots** | `noindex, nofollow` activa globalmente. | `index, follow` activa en las 4 rutas públicas. |
| **Archivo robots.txt** | `Disallow: /` (bloquea todo el rastreo web). | Permite rastreo general y bloquea únicamente `/studio`. |
| **Planes y Precios** | Muestra "Consultar precio" y etiquetas de demostración. | Muestra tarifas y condiciones oficiales validadas. |
| **Promociones** | Muestra campaña de muestra en fallback si no hay datos en CMS. | Muestra campañas reales activas o mensaje neutral elegante. |

---

## 7. Checklist Manual de Comprobación Tras el Despliegue

Una vez completado el despliegue remoto en Netlify, realiza las siguientes verificaciones manuales sobre la URL generada:

- [ ] **Página de Inicio (`/`)**:
  - Comprobar visibilidad del cintillo de demostración.
  - Verificar que los accesos rápidos a Planes, Calculadoras y Ubicación naveguen sin error.
  - Confirmar que los horarios de atención figuren exclusivamente en el pie de página.
- [ ] **Página de Planes (`/planes`)**:
  - Verificar que las membresías indiquen "Consultar precio" y la etiqueta de muestra.
  - Verificar que los botones de contacto guíen a `/ubicacion` (acción interna segura).
- [ ] **Página de Ubicación (`/ubicacion`)**:
  - Confirmar que el mapa cargue las teselas de OpenStreetMap sin requerir API Key.
  - Probar el botón *"Ver mi ubicación"* y verificar que solicite permisos en el navegador.
  - Probar el enlace *"Buscar dirección en Google Maps"* y verificar que abra la búsqueda en pestaña externa.
- [ ] **Página de Calculadoras (`/calculadoras`)**:
  - Probar la calculadora TDEE y comprobar que devuelva resultados numéricos esperados.
  - Probar la calculadora de Grasa Corporal y verificar la categorización orientativa.
  - Probar la calculadora de Macronutrientes y verificar la coherencia en gramos y calorías.
- [ ] **Panel de Gestión (`/studio`)**:
  - Acceder a `/studio` y verificar la carga de la interfaz de Sanity Studio.

---

## 8. Procedimiento para Habilitar Indexación en Producción

Cuando el gimnasio autorice formalmente la publicación comercial y los datos definitivos:

1. **Actualizar Datos en Código**: Modificar `lib/data/site-data.ts` asignando `phoneVerified: true`, `coordsVerified: true` y las coordenadas exactas confirmadas.
2. **Modificar Variables en Netlify**:
   - Cambiar `NEXT_PUBLIC_IS_DEMO` a `"false"`.
   - Asignar `NEXT_PUBLIC_SITE_URL` al dominio definitivo (ej. `https://sumaqcentergym.com`).
3. **Re-compilar**: En Netlify, ejecutar **Trigger deploy**.
4. **Verificación en Buscadores**:
   - Inspeccionar el código fuente (`Ctrl + U`) en la URL pública para confirmar la retirada de `noindex`.
   - Enviar el sitemap (`https://tudominio.com/sitemap.xml`) a Google Search Console.
