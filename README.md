# IE CAREER SUCCESS

Aplicación generada con [Fractal](http://fractal.build) como herramienta para crear la biblioteca de componentes que nos servirán a su vez para crear páginas, y [HUGO](https://gohugo.io/) como generador de estáticos multi-idioma para producción.

## Desarrollo

Tanto si vamos realizar modificaciones en los ficheros estáticos **HTML, CSS, JS o IMG** como si vamos a crear nuevos componentes, desde la carpeta del proyecto ejecutamos:

En carpeta raiz para instalar, ejecutar y compilar fractal:
1. `npm install`
2. `gulp`
3. `gulp build`

Para el servidor del IE: 
1. `npm install`
2. `.\node_modules\.bin\gulp hugo`
3. `cd integration`
4. `.npm install`
5. `..\node_modules\.bin\hugo`

## Integración

**NOTA:** Hay que instalar [HUGO-CLI](https://www.npmjs.com/package/hugo-cli) como dependencia del proyecto en el directorio de la integración para que posteriormentee se pueda añadir al Jenkinsfile la instrucción `sh './node_modules/.bin/hugo'` para compilar

En el directorio `integration/` está montado la arquitectura `HUGO`. Ante cualquier duda, consultar su [documentación](https://gohugo.io/getting-started/quick-start/)

Para realizar la integración con HUGO necesitamos generar primero la versión de producción de la librería de componentes, por lo que desde este directorio ejecutaremos el comando `gulp build` y nos generará una nueva carpeta llamada `build/`. En esta carpeta se habrán generado los estáticos (`css/`, `font/`, `img/`, `js/`, `subtitles/`, `pdf/`) y los tendremos que copiar a mano en la carpeta `integration/static`.

Si el cambio que hemos hecho ha sido en un fichero `.html` buscaremos el archivo modificado en la versión de producción en la carpeta `build/components/preview/{file-name}.html` y copiaremos el cambio en el `.html` que corresponda.

En este punto podemos arrancar el proyecto para desarrollar o para producción con los siguientes comandos:

De la lista de [comandos](https://gohugo.io/commands/) de HUGO haremos uso de dos básicos:

- `hugo server -D` arranca el proyecto y lo levanta en el puerto [:1313](http://localhost:1313) para la versión en inglés (EN) y en el [:1314](http://localhost:1314) para la versión en español (ES)
- `HUGO_ENV="production" hugo` genera la aplicación multidioma para producción creando la carpeta `public/` con cada idioma `public/en/` y `public/es/`

```
|-- public/
    |
    |-- en/
    |-- es/
```

### Estructura de directorios

```
|-- archetypes/
|
|-- content/ --> Aquí cada carpeta corresponde a una pantalla creada previamente en layouts. Deben tener el mismo nombre y dentro tenemos dos archivos md en los que vamos a hacer la traducción de ingles y español. 
    |
    |-- authors/
        |-- _index.es.md
        |-- _index.md
    |-- conclusion/
        |-- _index.es.md
        |-- _index.md
    |-- ...
    |
|
|-- layouts/
    |
    |-- _default_/
        |-- baseof.html --> Aquí encontramos la estructura base de un html, head, body y footer con las llamadas a los archivos javascript.
    |-- partials/ 
        |-- intro.html --> Aquí encontramos la página de inicio
    |-- section/ --> Aquí tenemos el resto de archivos html que corresponde al resto de pantallas y en cada archivo el contenido pertenece a lo que estaría dentro del body.
        |-- authors.html
        |-- conclusion.html
        |-- ...
    |-- index.html --> Aquí definimos el main que previamente hemos declarado en el body del baseof.html y llamamos al archivo intro.html que tenemos en partials
|
|-- resources/
|
|-- static/ --> Aquí hemos copiado las siguientes carpetas del build realizado sobre el fractal en la raiz del proyecto.
    |
    |-- css/
    |-- docs/
    |-- font/
    |-- images/
    |-- js/
|
|-- config.toml --> Aquí se encuentra la traducción en ingles y español del contenido de la página de inicio en `[languages.en.params.home]` y `[languages.es.params.home]`.




