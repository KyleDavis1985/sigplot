let plot_options = {
  autohide_panbars: true,
  hide_note: true
}

const data = []
const amplitude = 10
const frequency = 0.05

for (let i = 0; i < 100; i++) {
  y = 1080 / 2 + amplitude * Math.sin((i + 0) / frequency)
  data[i] = y
}
let delta = 0.125
let xstart = 1228

let data_header = {
  xunits: 'Frequency',
  xstart: 1228, // the start of the x-axis
  xdelta: 0.125, // the x-axis step between each data point
  yunits: 'Power',
  type: 1000,
  format: 'SD',
  subsize: data.length
}
let layer_options = {
  name: 'Sample Data',
  layerType: sigplot.Layer1D
}
let plot = new sigplot.Plot(document.getElementById('plot'), plot_options)

plot.overlay_array(data, data_header, layer_options)

let mouseEventListener = (event) => {
  console.log('Evaluating Event ', event)
  let layer = plot.get_layer(0)
  console.log('The Layer ', layer)
  let width = event.target.width
  let xpoint = Math.round((event.xpos * layer.xpoint.length) / width)
  console.log(
    'X = ',
    xpoint,
    ' Y = ',
    layer.ypoint[xpoint],
    ' X point = ',
    layer.xpoint[xpoint]
  )
}

let onMarkerEvent = (event) => {
  console.log('Marker Event ', event)
  let layer = plot.get_layer(0)
  let width = event.target.width
  let pos = Math.round((event.location * layer.xpoint.length) / width)
  const yval = layer.ypoint[pos]

  console.info('Position ', pos, ' Y = ', yval)
}

plot.addListener('mtag', mouseEventListener)
let marker = new sigplot_plugins.SliderPlugin({ name: 'start' })

let xpos = Math.round(data.length / 2) * delta + xstart

plot.add_plugin(marker, 1)
marker.set_position(xpos)
marker.addListener('slidertag', onMarkerEvent)

plot.redraw()
