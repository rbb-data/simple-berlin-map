# Weiterfuehrende Schulen Berlin

## Setup

This is a [node.js](https://nodejs.org/en/) project so you need node and [npm](https://www.npmjs.com/) installed. Then you can run:

``` bash
npm install
```

## Develop

### Run
``` bash
npm run dev   # runs in dev mode with hot reloading
              # at: `http://localhost:8080/`
npm run build # builds app and stores it in '/dst'
```

### Folder Structure

This app is composed out of *Components* that live in `src/components`. Every *Component* has its own folder containing the .js file, the *Components* styles and it's tests.

Global styles and shared functions live in `src/shared`

There are some aliases setup in `/webpack.config.js` that make it easier to import *Components* or other files.

- `@root` points to `/src`
- `@components` points to `/src/components`
- `@shared` points to `/src/rbb-data-shared`
- `@data` points to `/data`

E.g. `@shared/styles/colors.sass` will always give you the sass file with the color variables independent of the location of your file.

**Note:** when importing inside .sass files you have to prepend your paths with `~` to use the webpack resolver. E.g: `@import "~@shared/styles/colors.sass"`

### Styles (CSS Modules)

[CSS Modules](https://github.com/css-modules/css-modules) are used to encapsulate the styles of a *Component*.

The basic idea is that you can import your styles in your js file and get an object with all classNames of the file.

E.g. the file `styles.sass`:
``` sass
  .heading
    font-weight: bold

    .colored
      color: blue

  .text
    font-size: 14px

    strong
      font-weight: bold

    .colored
      color: red
```

Can be imported like this:
``` js
import c from './styles.sass'

<h1 class={c.heading}>Lorem<span class={c.colored}>ipsum</span></h1>
<p class={c.text}>
  Lorem <span class={c.colored}>ipsum</span>
  dolor <strong>sit</strong> amnet.
</p>
```

**Note:** that nesting of the classNames does not matter when importing them. And also only classNames are exported. This is just a mapping of the classNames to a unique global name.

`c` will look something like this:

``` js
{
  heading: 'ComponentName__heading__dj389',
  text: 'ComponentName__text__8zas8',
  colored: 'ComponentName__colored__da7e8',
}
```

And the generated css like this:

``` css
.ComponentName__heading__dj389 {
  font-weight: bold; }

  .ComponentName__heading__dj389 .ComponentName__colored__da7e8 {
    color: blue; }

.ComponentName__text__8zas8 {
  font-size: 14px; }

  .ComponentName__text__8zas8 strong {
    font-weight: bold; }

  .ComponentName__text__8zas8 .ComponentName__colored__da7e8 {
    color: red; }
```

## React Leaflet

[React Leaflet](https://github.com/PaulLeCam/react-leaflet) is used to render the map.

**Important:** You will not be able to use the standard marker icon without further configuration (you also shouldn't want to use it) as the image will not be found. Use a dummy image or the image provided for your project instead.

## Data conversion (OS X) with [Homebrew](https://brew.sh/)

### Prerequisites
``` bash
brew install miller
brew install jq
```

### Transform geocoded data in CSV to GeoJSON:
``` bash
mlr --icsv --ifs comma --ojson cat data/data-with-latlng.csv | jq '.' --slurp | node data/to-geojson.js > data/stations.geo.json
```
