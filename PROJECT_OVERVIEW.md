### Visión general del proyecto

VVS Motors es una aplicación web construida con Next.js (App Router) para la publicación y administración de inventario de vehículos, promociones y mensajes de contacto. Integra una base de datos Postgres administrada por Supabase y se despliega en Vercel.

Este documento describe en detalle la estructura del proyecto, el stack tecnológico, los flujos principales, y cómo está desplegado y configurado el entorno.

---

### Tecnologías y dependencias clave

- Framework: Next.js `16.x` (App Router en `app/`), React `19.x` y React DOM `19.x`.
- Lenguaje: TypeScript `^5`.
- Estilos: Tailwind CSS `^4` con PostCSS.
- UI/Componentes:
  - Radix UI (varios paquetes `@radix-ui/*`).
  - Shadcn UI (patrón de componentes; p. ej., `@/components/ui/card`).
  - `lucide-react` para iconografía.
- Formularios/validación: `react-hook-form`, `zod`, `@hookform/resolvers`.
- Gráficos: `recharts` (reservado para posibles visualizaciones).
- Utilidades: `clsx`, `class-variance-authority`, `tailwind-merge`.
- Backend BaaS: Supabase
  - Librerías: `@supabase/supabase-js`, `@supabase/ssr`.
  - Base de datos: PostgreSQL administrado.
  - Uso en este proyecto: lecturas desde API Routes y Server Components mediante cliente de servidor (SSR) con cookies.
- Analytics (opcional): `@vercel/analytics`.

Scripts disponibles (`package.json`):
- `dev`: inicia el entorno de desarrollo de Next.js.
- `build`: genera el build de producción.
- `start`: inicia el servidor de producción.
- `lint`: ejecuta ESLint (si hay reglas configuradas).

---

### Estructura de carpetas (nivel superior)

- `app/`
  - Directorio base del App Router de Next.js. Contiene páginas, layouts y rutas API (en `app/api`).
- `components/`
  - Componentes reutilizables de UI (incluye componentes estilo shadcn). Ej.: `@/components/ui/card`.
- `lib/`
  - Funciones de soporte y clientes de servicios externos. Ej.: `lib/supabase-server.ts`.
- `public/`
  - Archivos estáticos (imágenes, fuentes, etc.).
- `styles/`, `postcss.config.mjs`, `tailwind` y configuración relacionada a estilos.
- `scripts/`
  - Scripts auxiliares (si aplica).
- `README.md`
  - Descripción mínima del repo (puede enlazar a este documento).
- `DEPLOYMENT_GUIDE.md`
  - Guía de despliegue (documento existente, complementario a este overview).

Archivos de configuración relevantes:
- `next.config.mjs`: configuración de Next.js.
- `tsconfig.json`: configuración de TypeScript.
- `components.json`: configuración de generación/estilo de componentes (shadcn).
- `pnpm-lock.yaml`: bloqueo de dependencias (se usa pnpm).

---

### Rutas y módulos principales

Páginas (App Router):
- `app/admin/dashboard/page.tsx`
  - Server Component asíncrono.
  - Realiza `fetch` a `/api/admin/stats` (con `cache: 'no-store'`) para mostrar métricas en tiempo real:
    - Total de vehículos (`totalCars`).
    - Vehículos disponibles (`availableCars`).
    - Vehículos vendidos (`soldCars`).
    - Mensajes pendientes (`pendingMessages`).
    - Ingresos totales calculados como suma de `price` de autos disponibles (`totalRevenue`).
  - UI construida con componentes de `@/components/ui` y `lucide-react`.

- `app/nosotros/page.tsx`
  - Página informativa (contenido estático/SSR, según implementación actual).

- `app/promociones/page.tsx`
  - Página de promociones; puede consumir `/api/promotions` para listar promociones activas.

API Routes (App Router):
- `app/api/admin/stats/route.ts`
  - Método: `GET`.
  - Usa `getSupabaseServerClient()` para obtener un cliente SSR autenticado por cookies.
  - Consultas a Supabase:
    - Conteo total de autos (`cars`).
    - Conteo de autos disponibles (`status = 'available'`).
    - Conteo de autos vendidos (`status = 'sold'`).
    - Conteo de mensajes pendientes en `contact_messages` (`status = 'pending'`).
    - Lectura de `price` de autos disponibles y acumulado en memoria para `totalRevenue`.
  - Respuesta JSON con las métricas anteriores.

- `app/api/promotions/route.ts`
  - Método: `GET`.
  - Retorna lista de promociones activas (`promotions.active = true`), ordenadas por `created_at` desc.

Clientes/librerías:
- `lib/supabase-server.ts`
  - `getSupabaseServerClient()`: crea un cliente de Supabase (SSR) con `createServerClient(...)` y manejo de cookies vía `next/headers`.
  - Provee alias `createClient` para el mismo export.

---

### Esquema de base de datos (Supabase/Postgres)

Tablas principales (según definición proporcionada):
- `cars`
  - Campos: `id (uuid)`, `brand`, `model`, `year`, `price numeric(12,2)`, `transmission`, `fuel_type`, `engine`, `description`, `image_url`, `mileage`, `color`, `status` (`available|sold|reserved`), `featured (boolean)`, `created_at`, `updated_at`.
  - Índices: `idx_cars_status`, `idx_cars_featured`, `idx_cars_price`.
  - Trigger: `update_cars_updated_at` para mantener `updated_at`.

- `contact_messages`
  - Campos: `id (uuid)`, `name`, `email`, `phone`, `message`, `car_id (fk -> cars.id)`, `status` (`pending|replied|archived`), `created_at`.
  - Índice: `idx_contact_messages_status`.
  - FK: `contact_messages_car_id_fkey` con `ON DELETE SET NULL`.

- `promotions`
  - Campos: `id (uuid)`, `title`, `description`, `discount_value`, `icon`, `active (boolean)`, `start_date`, `end_date`, `created_at`, `updated_at`.
  - Índice: `idx_promotions_active`.
  - Trigger: `update_promotions_updated_at` para mantener `updated_at`.

Notas:
- El cálculo de ingresos totales en el dashboard se hace sumando `price` de autos con `status = 'available'`. Puede migrarse a una vista/función SQL para optimización.
- Si se requieren métricas adicionales (p. ej., “Más vistos” o “Crecimiento mensual”), sería conveniente añadir columnas específicas (p. ej., `views`) o tablas de eventos, y endpoints dedicados.

---

### Flujo de datos principal (sin diagramas)

1) Un usuario admin abre `/admin/dashboard`.
2) El Server Component hace `fetch` a `/api/admin/stats` con `cache: 'no-store'` para evitar respuestas cacheadas.
3) El API Route crea un cliente SSR de Supabase, ejecuta las consultas de conteo y precio, y retorna el JSON agregado.
4) El dashboard renderiza las tarjetas con los valores recibidos.

---

### Despliegue e infraestructura

- Plataforma: Vercel.
- Origen: Repositorio (Git) conectado a Vercel para builds automáticos por rama (generalmente `main`).
- Runtime: Next.js 16 en Vercel (Edge/Node según ruta; estas rutas usan Node.js runtime por Supabase client SSR).
- Variables de entorno (Vercel → Project Settings → Environment Variables):
  - `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto Supabase.
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: clave pública (anon) de Supabase.
  - `NEXT_PUBLIC_SITE_URL`: URL pública del sitio (usada para construir el `fetch` absoluto del dashboard a la API en SSR; puede ser opcional si se usa ruta relativa en ejecución del servidor).

Sugerencias de configuración:
- Configurar variables para los entornos `Development`, `Preview` y `Production` de Vercel.
- Revisar políticas de RLS (Row Level Security) en Supabase si se expone lectura/escritura desde el cliente. En este proyecto, las lecturas se realizan desde el servidor (API/SSR), mitigando exposición de la `anon key` en operaciones sensibles.
- Considerar la creación de una clave de servicio (SERVER role) para operaciones administrativas en API Routes protegidas (si en el futuro se agregan mutaciones/admin).

Build y CI/CD:
- Vercel construye automáticamente al hacer push a la rama conectada.
- Comandos de build: `pnpm install` (o el gestor configurado), luego `next build`.
- Salida: artefactos optimizados por Vercel (incl. soporte para ISR/SSR; en este proyecto, el dashboard usa `no-store`).

---

### Desarrollo local

Requisitos previos:
- Node.js acorde a Next 16 (Vercel usa versiones actuales; localmente se recomienda Node 20+).
- pnpm o npm/yarn (el lockfile es `pnpm-lock.yaml`).

Pasos:
1. Configurar `.env.local` con:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
   - `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
2. Instalar dependencias: `pnpm install`.
3. Ejecutar en desarrollo: `pnpm dev`.
4. Abrir `http://localhost:3000`.

---

### Consideraciones de seguridad y buenas prácticas

- Mantener las claves y URLs en variables de entorno. No commitear `.env*`.
- Para endpoints que realicen operaciones sensibles (crear/editar/eliminar), implementar autenticación/autorización y, de ser necesario, usar la Service Role Key de Supabase en el servidor (nunca en el cliente).
- Validar inputs con `zod`/`react-hook-form` en formularios del lado cliente y revalidar en el servidor.
- Limitar datos retornados por las queries (`select` solo de columnas que se necesitan).

---

### Extensiones futuras sugeridas

- Métricas de “Actividad reciente” reales: ordenar `cars` y `contact_messages` por `created_at` y mostrar los últimos registros.
- “Más vistos”: añadir columna `views` a `cars` o una tabla de eventos para ranking.
- “Crecimiento mensual”: definir una métrica (p. ej., autos publicados o ventas por mes) y calcularla en SQL o en un endpoint.
- Panel de administración con CRUD de autos y promociones (rutas protegidas).

---

### Referencias rápidas de código

- Dashboard Admin: `app/admin/dashboard/page.tsx`
- API Stats: `app/api/admin/stats/route.ts`
- API Promotions: `app/api/promotions/route.ts`
- Cliente Supabase SSR: `lib/supabase-server.ts`
