/**
 * This transforms a geocoded csv into a GeoJSON FeatureSet, where each Feature
 * is one row in the csv.
 * The csv is expected to have a `lat` and a `lng` column to hold each point's
 * coordinates.
 */

const { stdin, stdout } = process

stdin.resume()
stdin.setEncoding('utf8')

// read from stdin
const input = []
stdin.on('data', chunk => input.push(chunk))

const isNumeric = /^\d+,\d+$/

// write to stdout
stdin.on('end', chunk => {
  const features = JSON.parse(input.join(''))
  const output = {
    type: 'FeatureCollection',
    features: features
      // convert numbers into real numbers
      .map(feature => {
        for (let k in feature) {
          if (feature.hasOwnProperty(k)) {
            feature[k] = isNumeric.test(feature[k])
              ? parseFloat(feature[k].replace(',', '.'))
              : feature[k]
          }
        }
        return feature
      })
      // normalize latitude and longitude; errors often happen when commas get
      // lost, e.g latitude 52.34565 gets 5234565
      .map(feature => {
        if (feature.lat < -90 || feature.lat > 90) {
          console.error('Correcting invalid latitude of ' + feature.lat)
          feature.lat /= (feature.lat < 0 ? -1 : 1) * Math.pow(10, Math.floor(Math.log10(Math.abs(feature.lat)) - 1))
        }

        if (feature.lng < -180 || feature.lng > 180) {
          console.error('Correcting invalid longitude of ' + feature.lng)
          feature.lng /= (feature.lng < 0 ? -1 : 1) * Math.pow(10, Math.floor(Math.log10(Math.abs(feature.lng)) - 1))
        }

        return feature
      })
      // spit it out as a GeoJSON feature
      .map(feature => ({
        type: 'Feature',
        properties: feature,
        geometry: {
          type: 'Point',
          coordinates: [feature.lng, feature.lat]
        }
      }))
  }

  stdout.write(JSON.stringify(output))
  stdout.write('\n')
})
