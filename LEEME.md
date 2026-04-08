# Premium Properties Guatemala - Guía de Uso

## Estructura del Proyecto

```
pagina web mama/
├── index.html          # Página principal
├── css/
│   └── styles.css     # Estilos (NO MODIFICAR variables manualmente)
├── js/
│   └── script.js      # Funcionalidad interactiva
└── assets/
    ├── logo.svg       # Logo de la empresa (reemplazar)
    ├── favicon.svg    # Icono para navegador
    ├── hero-bg.jpg   # Imagen de fondo del Hero (AGREGAR)
    ├── foto-perfil.jpg # Foto de perfil (AGREGAR)
    └── galeria/
        ├── propiedad-1.jpg
        ├── propiedad-2.jpg
        ├── propiedad-3.jpg
        ├── propiedad-4.jpg
        ├── propiedad-5.jpg
        └── propiedad-6.jpg
```

## Cómo Modificar Datos

### En index.html buscar y reemplazar:

1. **Nombre de la agente**: `[Nombre de la Agente]`
2. **Título profesional**: `Agente Inmobiliario Certificada`
3. **Teléfono**: `+502 XXXX-XXXX`
4. **Email**: `info@correo.com`
5. **Dirección**: `[Direccion de la oficina]`
6. **Redes sociales**: `#` por URLs reales

### En css/styles.css (líneas 8-81):

Colores principales - Solo modificar los valores HEX:
```css
--color-primary: #1a4d2e;      /* Verde principal */
--color-secondary: #c9a962;   /* Dorado/destacado */
```

## Imágenes Requeridas

| Archivo | Tamaño Recomendado | Descripción |
|---------|-------------------|-------------|
| logo.svg | 200x200px | Logo empresarial |
| hero-bg.jpg | 1920x1080px | Fondo del hero |
| foto-perfil.jpg | 600x800px | Foto profesional |
| propiedad-*.jpg | 800x600px | Fotos de propiedades |

## Personalización de Contenido

### Servicios (líneas 225-290 en HTML):
- Venta de Propiedades
- Renta de Propiedades  
- Administración de Propiedades
- Remodelaciones

### Testimonios (líneas 355-420 en HTML):
Agregar más testimonios copiando la estructura:
```html
<div class="testimonial-card">
    <!-- Contenido -->
</div>
```

## Cómo Agregar Imágenes a la Galería

1. Colocar imágenes en `assets/galeria/`
2. Nombrar como: `propiedad-1.jpg`, `propiedad-2.jpg`, etc.
3. Actualizar el atributo `alt` y textos en `index.html`

## Formulario de Contacto

El formulario está configurado para mostrar mensaje en consola.
Para conectar con un servicio real:
- Modificar `sendForm()` en `js/script.js`
- Integrar con Formspree, EmailJS, o servidor propio

## Despliegue

1. Subir todos los archivos al hosting
2. Asegurar que las rutas Relative funcionen
3. Probar en dispositivos móviles
