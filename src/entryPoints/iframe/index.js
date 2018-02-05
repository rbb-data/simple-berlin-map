import breakpoints from '@shared/styles/breakpoints.sass'

const scriptTag = document.querySelector('#rbb-datateam-iframeScript')
const iframeId = scriptTag.dataset.iframeId

const iframe = document.querySelector(`#${iframeId}`)
if (window.innerWidth <= breakpoints.small) {
  let newHeight = window.innerHeight
  const minHeight = 550
  if (newHeight < minHeight) newHeight = minHeight
  iframe.style.height = `${newHeight}px`
}
