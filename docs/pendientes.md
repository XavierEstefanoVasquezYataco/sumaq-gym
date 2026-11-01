# Lista de Pendientes y Hoja de Ruta: Sumaq Center Gym

Este documento organiza los pendientes del proyecto, distinguiendo claramente entre el estado técnico local, los datos comerciales pendientes que debe confirmar el gimnasio y las ideas opcionales fuera del alcance actual.

---

## 1. Estado Técnico de Despliegue

- **Diagnóstico**: **Sin bloqueos locales identificados; despliegue remoto pendiente.**
- **Evidencias Locales**:
  - Compilación de producción (`npm run build`) completada con 0 errores de TypeScript y 10 rutas generadas.
  - Análisis estático (`npm run lint`) sin advertencias.
  - Suite de 31 pruebas de software de fórmulas nutricionales (`npm test`) pasando con éxito.
  - Historial de Git limpio de secretos o archivos `.env*`.
- **Condición Remota**: El prototipo está preparado para ser conectado a Netlify en **Modo Demostración** (`NEXT_PUBLIC_IS_DEMO="true"`), estando pendiente su verificación en la infraestructura remota de Netlify.

---

## 2. Pendientes que NO Impiden Mostrar el Prototipo

Estos puntos están resueltos mediante mecanismos de contingencia (*fallbacks*) en código y permiten presentar el prototipo para revisión:

1. **Ubicación en Mapa por Vista General**: Al no contar con coordenadas verificadas de la entrada, el mapa muestra el encuadre general del Centro Histórico de Lima sin colocar un marcador falso.
2. **Acción de Contacto por Navegación Interna**: Los botones de llamada a la acción y WhatsApp guían a `/ubicacion` en lugar de abrir chats hacia números no confirmados.
3. **Planes y Disciplinas con Identificador de Muestra**: Las tarjetas de precios muestran "Consultar precio" y etiquetas discretas `[DEMO]` para no engañar al usuario.
4. **Almacenamiento Local de Demostración**: Sanity Studio compila y está disponible en `/studio`, operando con datos de fallback local; el contenido remoto en Sanity Cloud no ha sido verificado.

---

## 3. Datos y Confirmaciones Pendientes del Gimnasio

Para dar de alta el sitio oficial definitivo, la administración de Sumaq Center Gym debe suministrar y autorizar formalmente los siguientes datos:

| Elemento Requerido | Situación Actual en el Prototipo | Acción Requerida del Gimnasio |
| :--- | :--- | :--- |
| **Pin y entrada exacta** | Coordenadas anteriores (-12.043818, -77.034510) descartadas. El mapa muestra vista general orientativa. | Confirmar el punto geográfico exacto (latitud y longitud) de la puerta de ingreso peatonal en Jr. Callao 126. |
| **Teléfono verificado** | Número provisional 933 596 324 desactivado para navegación externa. | Confirmar la línea telefónica oficial con WhatsApp Business habilitado para atención al público. |
| **Piso y referencia interna** | Figura como "7.º piso (Por confirmar)". | Confirmar en qué piso o niveles opera el gimnasio dentro del edificio de Jr. Callao 126. |
| **Planes, precios y condiciones** | Tarifas bajo "Consultar precio"; servicios con etiqueta `[DEMO]`. | Entregar tarifario oficial vigente (mensual, trimestral, anual), costo de matrícula, promociones vigentes y métodos de pago aceptados en sede. |
| **Clases reales** | Muestra musculación y cardio como disponibles en sala; funcional y spinning como "Por confirmar". | Definir el listado real de disciplinas grupales que se dictan, requisitos y cupos. |
| **Horarios de fin de semana** | El pie de página indica "Por confirmar" para sábados, domingos y feriados. | Proveer los horarios exactos de apertura y cierre de sábados, domingos y días festivos. |
| **Logo y fotografías autorizadas** | Se utilizan iconos vectoriales e imágenes de muestra generales. | Proveer archivo vectorial oficial del logotipo (SVG o PNG en alta resolución) y fotografías reales de las instalaciones, máquinas y entrenadores con autorización expresa de uso. |

---

## 4. Tareas de Integración y Revisión Previa a Producción

Acciones a ejecutar una vez que los datos del gimnasio sean aprobados:

1. **Integración de Contenido con Sanity**:
   - Crear el proyecto en Sanity Cloud (o conectar el existente si ya fue creado).
   - Configurar los orígenes autorizados en CORS (`manage.sanity.io`) con el dominio de Netlify.
   - Poblar los esquemas de planes, entrenadores y testimonios desde el panel `/studio`.
   - Verificar que el contenido remoto se refleje correctamente en las páginas públicas sustituyendo al fallback local.
2. **Activación de Navegación Externa**:
   - Registrar las coordenadas confirmadas en `lib/data/site-data.ts`.
   - Activar el marcador exacto en Leaflet y habilitar los enlaces directos a Waze y Google Maps punto a punto.
   - Activar los enlaces externos hacia el WhatsApp oficial verificado.
3. **Revisión Final Antes de Habilitar Indexación**:
   - Validar textos legales de términos y condiciones y política de privacidad conforme a la normativa peruana (Ley N.° 29733 - Ley de Protección de Datos Personales).
   - Desactivar el modo demo (`NEXT_PUBLIC_IS_DEMO="false"`) en Netlify.
   - Verificar la retirada de la directiva `noindex` en las cabeceras HTTP.
   - Enviar el archivo `sitemap.xml` a Google Search Console.

---

## 5. Ideas Opcionales Fuera del Alcance (Sin Compromiso de Implementación)

Las siguientes funciones son conceptos adicionales para evaluación futura, no forman parte del alcance del prototipo actual y no existe compromiso de implementación sobre ellas:

- **Pasarela de Pagos en Línea**: Integración con procesadores de pago (ej. Culqi, Niubiz o Mercado Pago) para venta directa y recurrente de membresías por la web.
- **Portal de Socios**: Área privada para miembros con reserva de horarios para clases grupales, seguimiento de rutinas de entrenamiento y estado de pagos.
- **Control de Accesos Físico**: Integración con torniquetes o lectores de código QR en la entrada de la sede.
