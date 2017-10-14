/* @flow */
const defaultGridBasis = 200

const findGrids = () => effectAll(buildGrid)(document.querySelectorAll('.photo-grid'))
const effectAll = (func: (a: any) => void) => iterable => { for (const x of iterable) func(x) }

const imageLoaded = (elm, image, gridBasis) => {
  // We'll be using the ratio to shrink each image
  const ratio = image.width / image.height

  if (elm instanceof HTMLElement) {
    // This is the basis for our object.
    elm.style.flexBasis = gridBasis * ratio + 'px'

    // We'll then let each element grow dependent on it's width/height ratio.
    elm.style.flexGrow = ratio.toString()

    // We're ready to show the photo to the public.
    elm.classList.add('photo-grid-loaded')
  }
}

const imageRatio = (gridBasis: number) => (elm: HTMLElement) => {
  const image = elm.querySelector(':scope img')
  if(image instanceof HTMLImageElement) {
    if (image && image.complete) {
      imageLoaded(elm, image, gridBasis)
    } else {
      image.onload = () => imageLoaded(elm, image, gridBasis)
    }
  }
}

const buildGrid = (grid: HTMLElement) => {
  const gridBasis = parseInt(grid.dataset.gridBasis || defaultGridBasis, 10)
  effectAll(imageRatio(gridBasis))(grid.children)

  // The fake elements are used to make the last few images get decent sized.
  appendFakeElement(grid, gridBasis)
}

const appendFakeElement = (grid, gridBasis) => {
  const li = document.createElement('li')
  li.classList.add('photo-grid-fake')
  li.style.flexBasis = gridBasis * (4 / 3) + 'px'
  li.style.flexGrow = (4 / 3).toString()

  effectAll(() => {grid.appendChild(li.cloneNode(true))})(Array(10))
}

const addCss = () => {
  const css = `
.photo-grid {
  display: flex;
  flex-wrap: wrap;
  padding: 0;
  list-style:none;
}
.photo-grid img {
  width: 100%;
}
.photo-grid > li {
  position: relative;
  margin: 2px;
  line-height: 0;
  cursor: pointer;
  display: none;
}
.photo-grid > .photo-grid-fake {
  margin: 0 2px;
  display: initial;
}
.photo-grid > .photo-grid-loaded {
  display: initial;
}
`
    const sheet = Object.assign(document.createElement('style'), {innerHTML: css})
    if(document.head) {
      document.head.appendChild(sheet)
    }
}

// Add the css needed. This could potentially be broken out to a css file
addCss()

document.addEventListener(
  'DOMContentLoaded',
  () => {
    findGrids()
  },
  false
)
