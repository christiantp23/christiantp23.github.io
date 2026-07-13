# Manual Técnico – Trespa Store

## Descripción General

Este manual describe la estructura, configuración y funcionamiento del catálogo virtual de **Trespa Store**. La aplicación funciona como una plataforma web optimizada para dispositivos móviles, diseñada para facilitar la visualización del catálogo de zapatillas y la gestión de consultas de disponibilidad directamente por WhatsApp.

## Tecnologías del Proyecto

El sistema fue desarrollado utilizando las siguientes tecnologías:

* **React 19** para la construcción de la interfaz de usuario.
* **Vite** como herramienta de desarrollo y compilación, ofreciendo tiempos de carga rápidos.
* **TypeScript** para proporcionar tipado estático y mejorar la calidad y mantenibilidad del código.
* **Tailwind CSS** para el diseño responsivo y la personalización de la interfaz.
* **Motion** para implementar animaciones fluidas e interacciones dinámicas.

## Funcionalidades Principales

* Búsqueda de referencias mediante texto.
* Filtrado avanzado por marca, género y estilo de calzado.
* Tarjetas de producto con:

  * Selección dinámica de color y talla.
  * Carrusel de imágenes.
  * Visor con función de zoom adaptado para dispositivos táctiles.
* Sistema de favoritos persistente mediante **Local Storage**.
* Carrito de compras persistente para conservar la selección del usuario incluso después de cerrar el navegador.
* Formulario de checkout adaptado al mercado colombiano, con validación de:

  * Número de cédula.
  * Número de celular de diez (10) dígitos que inicia con el número **3**.
* Generación automática de un mensaje de pedido y envío directo a WhatsApp con los datos del cliente y las referencias seleccionadas.

## Instalación y Ejecución

### Requisitos

* Node.js instalado.
* npm.

### Instalación de dependencias

```bash
npm install
```

### Iniciar el servidor de desarrollo

```bash
npm run dev
```

## Estructura General

El proyecto está organizado siguiendo una arquitectura basada en componentes de React, permitiendo una separación clara entre la interfaz, la lógica de negocio y los datos del catálogo, lo que facilita su mantenimiento y escalabilidad.

## Autor

**Christian**

Desarrollado para **Trespa Store**.
