# Simple Berlin Map

## Setup

This repository contains submodules; to fetch them run

``` bash
git clone --recursive --depth=1 $CLONE_URL
# or if you already cloned the repository
git submodule init
git submodule update
```

This is a [node.js](https://nodejs.org/en/) project so you need node and [npm](https://www.npmjs.com/) installed. Then you can run:

``` bash
npm install
```

## Run
``` bash
npm run dev   # runs in dev mode with hot reloading
              # at: `http://localhost:8080/`
npm run build # builds app and stores it in '/dst'
```

## Data

You can provide data as `.geo.json` or you can convert to `.geo.json` from `.csv` with the script [described below.](#data-conversion)

Each marker needs to have the following properties:

- id
- title
- description

When provinfing a csv you also need to specify:

- lat
- lng

When you supply a `.geo.json` file you have to encode those as a [Point](http://geojson.org/geojson-spec.html#point)

## Folder Structure

This app is composed out of *Components* that live in `src/components`. Every *Component* has its own folder containing the .js file, the *Components* styles and it's tests.

The `src/entryPoints` folder has a subfolder for each entry point specified in the `/webpack.config.js`.
This is also a good point to start exploring the app.

Global styles and shared functions live in the git submodule under `src/rbb-data-shared`

There are some aliases setup in `/webpack.config.js` that make it easier to import *Components* or other files.

- `@root` points to `/src`
- `@components` points to `/src/components`
- `@shared` points to `/src/rbb-data-shared`
- `@data` points to `/data`

E.g. `@shared/styles/colors.sass` will always give you the sass file with the color variables independent of the location of your file.

**Note:** when importing inside .sass files you have to prepend your paths with `~` to use the webpack resolver. E.g: `@import "~@shared/styles/colors.sass"`

## Libraries

### [React Leaflet](https://github.com/PaulLeCam/react-leaflet)

used to render the map.

**Important:** You will not be able to use the standard marker icon without further configuration (you also shouldn't want to use it) as the image will not be found. Use a dummy image or the image provided for your project instead.

### [Hover](https://github.com/jesseskinner/hover)

for state management

### [Webpack](https://webpack.js.org/)

to bunde the js files

## [CSS Modules](https://github.com/css-modules/css-modules)

used to encapsulate the styles of a *Component*.

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

## Data conversion
### (OS X) with [Homebrew](https://brew.sh/)

The CSV needs to have the

#### Prerequisites
``` bash
brew install miller
brew install jq
```

#### Transform geocoded data in CSV to GeoJSON:
``` bash
mlr --icsv --ifs comma --ojson cat data/markers.csv | jq '.' --slurp | node data/to-geojson.js > data/markers.geo.json
```
