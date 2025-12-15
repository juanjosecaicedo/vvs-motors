# VVS Motors - Guía de Despliegue

## Estructura de la Aplicación

La aplicación VVS Motors está construida con Next.js 16 y consta de:

- **Frontend Público**: Páginas home, catálogo, contacto
- **Panel Administrativo**: Dashboard, gestión de vehículos, mensajes
- **Base de Datos**: Esquema SQL para PostgreSQL (Supabase/Neon)

## Pasos para Despliegue

### 1. Conectar Base de Datos

Para que la aplicación funcione completamente, necesitas conectar una base de datos:

1. Ve a la sección "Connect" en vercel
2. Selecciona **Supabase** o **Neon** como proveedor de base de datos
3. Sigue las instrucciones para conectar tu base de datos
4. Una vez conectada, ejecuta los scripts SQL ubicados en `/scripts`:
   - `001_create_tables.sql` - Crea las tablas necesarias
   - `002_seed_data.sql` - Agrega datos de ejemplo

### 2. Configurar Autenticación (Producción)

**Estado Actual**: La autenticación usa localStorage (solo para desarrollo)

**Para Producción**, debes implementar autenticación segura:

#### Opción A: Usar Supabase Auth (Recomendado)

Si elegiste Supabase como base de datos:

```typescript
// Reemplaza el código en app/admin/login/page.tsx con Supabase Auth
import { createBrowserClient } from '@supabase/ssr'

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const { data, error } = await supabase.auth.signInWithPassword({
  email: formData.email,
  password: formData.password,
})
```

#### Opción B: Implementar Autenticación Custom

Si usas Neon u otra base de datos:

1. Instala bcrypt para hash de contraseñas
2. Crea API routes para login/logout
3. Usa cookies HTTP-only para sesiones
4. Implementa middleware para proteger rutas admin

### 3. Variables de Entorno

Asegúrate de configurar las siguientes variables:

```env
# Base de Datos (Supabase o Neon)
DATABASE_URL=your_database_url

# Si usas Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Reemplazar Datos Mock

Los siguientes archivos usan datos de ejemplo que deben ser reemplazados con queries a la base de datos:

- `app/page.tsx` - Vehículos destacados y promociones
- `app/catalogo/page.tsx` - Lista completa de vehículos
- `app/catalogo/[id]/page.tsx` - Detalles de vehículos
- `app/admin/dashboard/page.tsx` - Estadísticas
- `app/admin/cars/page.tsx` - Gestión de vehículos
- `app/admin/messages/page.tsx` - Mensajes de contacto

Ejemplo de query con Supabase:

```typescript
import { createServerClient } from '@supabase/ssr'

// Obtener todos los vehículos
const { data: cars } = await supabase
  .from('cars')
  .select('*')
  .eq('status', 'available')
  .order('created_at', { ascending: false })
```

### 5. Seguridad en Producción

**IMPORTANTE**: Antes de desplegar en producción:

1. Cambia las credenciales de admin por defecto
2. Implementa hash de contraseñas con bcrypt
3. Usa HTTPS para todas las peticiones
4. Configura Row Level Security (RLS) en Supabase
5. Valida y sanitiza todas las entradas de usuario
6. Configura rate limiting en las API routes

### 6. Desplegar en Vercel

1. Conecta tu repositorio GitHub a Vercel
2. Configura las variables de entorno en Vercel
3. Despliega la aplicación
4. Verifica que todas las funcionalidades funcionan correctamente

## Credenciales de Prueba (Solo Desarrollo)

- **Email**: admin@vvsmotors.com
- **Contraseña**: admin123

**¡CAMBIA ESTAS CREDENCIALES EN PRODUCCIÓN!**

## Próximos Pasos

1. Conecta tu base de datos preferida (Supabase o Neon)
2. Ejecuta los scripts SQL
3. Implementa autenticación segura
4. Reemplaza datos mock con queries reales
5. Configura las medidas de seguridad
6. ¡Despliega tu aplicación!

## Soporte

Para más información sobre integraciones con Supabase o Neon, visita la documentación oficial o contacta al equipo de VVS Motors.
