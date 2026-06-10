# ProConnect - Plataforma de Conexión de Profesionales

Una plataforma moderna de marketplace que conecta clientes con profesionales verificados. Construida con Next.js 16, TypeScript, Tailwind CSS, Bun.js y PostgreSQL.

## Características Principales

### Para Clientes
- Búsqueda avanzada de profesionales con filtros (categoría, precio, rating)
- Página de "Top 10 Trabajadores" con los mejor calificados
- Perfiles detallados con portafolio de trabajos (carrusel de fotos)
- Sistema de mensajería en tiempo real
- Reseñas y calificaciones
- Guardado de favoritos

### Para Profesionales
- Perfil verificado con badge de verificación
- Portafolio interactivo con múltiples fotos
- Sistema de boost para destacar perfil
- Gestión de disponibilidad horaria
- Recepción de mensajes de clientes
- Panel de control personalizado

### Características Técnicas
- Autenticación JWT con refresh tokens
- Arquitectura de microservicios (Auth, Users, Professionals, Ratings, Files)
- Base de datos PostgreSQL relacional
- API REST completamente documentada
- Sistema de caché de clientes
- Toast notifications globales
- Responsive design (mobile-first)
- Dark/Light mode ready

## Stack Tecnológico

### Frontend
- **Next.js 16** - Framework React con App Router
- **TypeScript** - Type safety completo
- **Tailwind CSS v4** - Utilidades CSS
- **Lucide Icons** - Iconografía moderna
- **React Hooks** - State management

### Backend
- **Bun.js** - Runtime JavaScript rápido
- **PostgreSQL** - Base de datos relacional
- **JWT** - Autenticación segura
- **CORS** - Cross-origin resource sharing

### Herramientas de Desarrollo
- **ESLint** - Linting
- **Prettier** - Formatting
- **Git** - Control de versiones

## Estructura del Proyecto

```
proconnect/
├── app/                          # App router de Next.js
│   ├── layout.tsx               # Layout global con AuthProvider
│   ├── page.tsx                 # Página principal con navegación
│   ├── globals.css              # Estilos globales y theme
│   └── ...
├── backend/                      # Backend Bun.js
│   ├── src/
│   │   ├── index.ts             # Servidor principal
│   │   ├── db.ts                # Conexión PostgreSQL
│   │   ├── jwt.ts               # Utilities JWT
│   │   ├── middleware/
│   │   │   └── auth.ts          # Middleware de autenticación
│   │   └── services/
│   │       ├── auth.ts          # Servicio de autenticación
│   │       ├── user.ts          # Servicio de usuarios
│   │       ├── professional.ts  # Servicio de profesionales
│   │       ├── rating.ts        # Servicio de calificaciones
│   │       └── file.ts          # Servicio de archivos
│   ├── database/
│   │   ├── schema.sql           # Esquema PostgreSQL
│   │   ├── seed.sql             # Datos de prueba
│   │   └── README.md            # Instrucciones DB
│   └── README.md                # Documentación backend
├── components/
│   ├── navbar.tsx               # Barra de navegación
│   ├── pro-card.tsx             # Tarjeta de profesional mejorada
│   ├── pages/
│   │   ├── landing-page.tsx     # Página de inicio
│   │   ├── search-page.tsx      # Búsqueda de profesionales
│   │   ├── profile-page.tsx     # Perfil profesional
│   │   ├── top-workers-page.tsx # Top 10 trabajadores
│   │   ├── auth-page.tsx        # Login/Register
│   │   └── dashboard-page.tsx   # Panel de control
│   ├── ui/
│   │   ├── toast.tsx            # Toast notifications
│   │   ├── chat-modal.tsx       # Modal de chat
│   │   └── ...
│   └── examples/
│       └── search-page-with-api.tsx  # Ejemplo de integración API
├── lib/
│   ├── api.ts                   # Cliente API
│   ├── auth-context.tsx         # Context de autenticación
│   ├── mock-data.ts             # Datos de prueba
│   └── hooks/
│       └── use-professionals.ts # Hooks para APIs
├── public/                      # Assets estáticos
├── docs/
│   ├── INTEGRATION.md           # Guía de integración
│   └── ...
├── .env.example                 # Variables de entorno
└── package.json
```

## Guía Rápida de Inicio

### 1. Instalación del Frontend

```bash
# Clonar repositorio
git clone <repo-url>
cd proconnect

# Instalar dependencias
pnpm install

# Crear archivo .env.local
cp .env.example .env.local

# Iniciar servidor de desarrollo
pnpm run dev
```

Acceder a `http://localhost:3000`

### 2. Instalación del Backend

```bash
cd backend

# Instalar dependencias Bun
bun install

# Configurar base de datos PostgreSQL
# 1. Crear base de datos
createdb proconnect

# 2. Cargar esquema
psql proconnect < database/schema.sql

# 3. Cargar datos de prueba
psql proconnect < database/seed.sql

# Crear archivo .env
cp .env.example .env

# Iniciar servidor
bun run src/index.ts
```

El backend estará disponible en `http://localhost:3001`

### 3. Conectar Frontend y Backend

Actualizar `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_USE_MOCK_DATA=false
```

## Flujos Principales

### Flujo de Búsqueda
1. Usuario ingresa a `/search`
2. Busca por término, categoría o filtros
3. Se envía request a `GET /api/professionals`
4. Backend devuelve profesionales filtrados
5. Frontend muestra resultados con ProCard mejorado
6. Usuario puede clickear en tarjeta para ver perfil detallado

### Flujo de Top 10
1. Usuario clickea "Mejores Trabajadores"
2. Se navega a `/top-workers`
3. Página carga top 10 profesionales por rating
4. Muestra ranking con posición, rating, precio
5. Usuario puede ver perfil o contactar directamente

### Flujo de Autenticación
1. Usuario clickea "Registrarse"
2. Completa formulario (email, password, nombre, rol)
3. Se envía `POST /api/auth/register`
4. Backend valida y crea usuario
5. Frontend almacena JWT en localStorage
6. Usuario redirigido a dashboard

### Flujo de Portafolio
1. Profesional sube fotos de trabajos
2. Se guardan en backend (local o cloud)
3. ProCard muestra carrusel con navegación
4. Perfil profesional muestra galería completa
5. Clientes pueden ver trabajos previos

## Páginas Disponibles

| Página | Ruta | Descripción |
|--------|------|-------------|
| Landing | `/` | Página de inicio con hero y CTA |
| Búsqueda | `/search` | Búsqueda avanzada de profesionales |
| Top 10 | `/top-workers` | Profesionales mejor calificados |
| Perfil | `/profile/:id` | Perfil detallado de profesional |
| Login | `/auth/login` | Formulario de inicio de sesión |
| Registro | `/auth/register` | Formulario de registro |
| Dashboard | `/dashboard` | Panel de control personal |

## Endpoints API Disponibles

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/refresh` - Refrescar token
- `POST /api/auth/logout` - Cerrar sesión

### Profesionales
- `GET /api/professionals` - Buscar profesionales
- `GET /api/professionals/:id` - Obtener profesional
- `GET /api/professionals/top` - Top 10 profesionales
- `POST /api/professionals` - Crear perfil profesional
- `PATCH /api/professionals/:id` - Actualizar perfil

### Usuarios
- `GET /api/users/profile` - Perfil del usuario
- `PATCH /api/users/profile` - Actualizar perfil
- `POST /api/users/avatar` - Subir avatar

### Portafolio
- `GET /api/professionals/:id/portfolio` - Fotos del profesional
- `POST /api/professionals/:id/portfolio` - Subir foto
- `DELETE /api/professionals/:id/portfolio/:photoId` - Eliminar foto

### Mensajes
- `GET /api/messages/conversations` - Todas las conversaciones
- `GET /api/messages/conversation/:userId` - Conversación específica
- `POST /api/messages` - Enviar mensaje
- `PATCH /api/messages/:id/read` - Marcar como leído

### Reseñas
- `GET /api/professionals/:id/reviews` - Reviews del profesional
- `POST /api/reviews` - Crear review
- `GET /api/professionals/:id/rating-stats` - Estadísticas de rating

## Datos Mock Disponibles

El proyecto incluye 6 profesionales de ejemplo con:
- Información completa (nombre, bio, categoría, precio)
- Avatares y fotos de portafolio
- Ratings y reseñas
- Horarios de disponibilidad
- Badges de verificación y boost

Ver `lib/mock-data.ts` para más detalles.

## Guía de Integración

Para más detalles sobre la integración frontend-backend, ver `docs/INTEGRATION.md` que incluye:
- Configuración de variables de entorno
- Uso del cliente API
- Custom hooks para consultas
- Ejemplos de integración
- Checklist de migración
- Troubleshooting

## Características Implementadas

### UI/UX
- ✅ Navbar persistente con navegación fluida
- ✅ ProCard con carrusel de fotos
- ✅ Página Top 10 con ranking
- ✅ Perfil detallado con tabs
- ✅ Sistema de filtros avanzados
- ✅ Toast notifications
- ✅ Modal de confirmación
- ✅ Chat en tiempo real (simulado)

### Backend
- ✅ Schema PostgreSQL completo
- ✅ Seed data con 6 profesionales
- ✅ 5 microservicios funcionales
- ✅ Autenticación JWT
- ✅ Middleware de autenticación
- ✅ Manejo de errores centralizado

### Frontend-Backend
- ✅ Cliente API completamente tipado
- ✅ Custom hooks para datos
- ✅ Soporte para mock data y real API
- ✅ Autenticación persistente
- ✅ Manejo de tokens JWT
- ✅ Ejemplo de integración

## Próximos Pasos

### Corto Plazo
1. Integrar WebSocket para chat en vivo
2. Agregar pagos con Stripe
3. Implementar notificaciones en tiempo real
4. Mejorar búsqueda con full-text search

### Mediano Plazo
1. App móvil con React Native
2. Admin dashboard
3. Sistema de garantía/escrow
4. Reseñas verificadas post-contratación

### Largo Plazo
1. Marketplace de servicios adicionales
2. Suscripciones premium
3. Analytics y insights
4. Internacionalización

## Desarrollo

### Comandos Útiles

```bash
# Frontend
pnpm run dev        # Iniciar servidor de desarrollo
pnpm run build      # Compilar para producción
pnpm run lint       # Ejecutar linter
pnpm run format     # Formatear código

# Backend
bun run src/index.ts        # Iniciar servidor
bun run database/schema.sql # Cargar schema
```

### Testing

```bash
# Frontend
pnpm run test       # Ejecutar tests
pnpm run test:watch # Tests en modo observación

# Backend
bun test            # Ejecutar tests Bun
```

## Deployment

### Frontend (Vercel)
```bash
# Conectar GitHub repo
# Vercel auto-deploya en push a main
# Configurar env vars en Vercel dashboard
```

### Backend (Heroku/Railway)
```bash
# Usar Procfile existente
# Conectar PostgreSQL remoto
# Configurar env vars
```

## Contribuir

1. Fork el repositorio
2. Crear rama de feature (`git checkout -b feature/amazing`)
3. Commit cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing`)
5. Abrir Pull Request

## Licencia

MIT License - Ver LICENSE.md para más detalles

## Contacto

- Email: hello@proconnect.app
- Website: proconnect.app
- Twitter: @proconnect_app

---

**Construido con ❤️ para conectar profesionales confiables**

Última actualización: Junio 2026
