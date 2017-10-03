const defaultGridBasis = 200

const imageLoaded = (elm, image, gridBasis) => {
  // We'll be using the ratio to shrink each image
  const ratio = image.width / image.height

  // This is the basis for our object.
  elm.style.flexBasis = gridBasis * ratio + 'px'

  // We'll then let each element grow dependent on it's width/height ratio.
  elm.style.flexGrow = ratio

  // We're ready to show the photo to the public.
  elm.classList.add('photo-grid-loaded')
}

const imageRatio = gridBasis => elm => {
  const image = elm.querySelector(':scope img')
  if (image.complete) {
    imageLoaded(elm, image, gridBasis)
  } else {
    image.onload = () => imageLoaded(elm, image, gridBasis)
  }
}

const buildGrid = grid => {
  const gridBasis = grid.dataset.gridBasis || defaultGridBasis
  Array.from(grid.children).forEach(imageRatio(gridBasis))

  // The fake elements are used to make the last few images get decent sized.
  appendFakeElement(grid, gridBasis)
}

const findGrids = () => Array.from(document.querySelectorAll('.photo-grid')).forEach(buildGrid)

const appendFakeElement = (grid, gridBasis) => {
  const li = document.createElement('li')
  li.classList.add('photo-grid-fake')
  li.style.flexBasis = gridBasis * (4 / 3) + 'px'
  li.style.flexGrow = 4 / 3
  Array.from(Array(10)).forEach(() => grid.appendChild(li.cloneNode(true)))
}

const addCss= () => {
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

  const sheet = document.createElement('style')
  sheet.innerHTML = css
  document.head.appendChild(sheet)
}

document.addEventListener(
  'DOMContentLoaded',
  () => {
    addCss() 
    findGrids()
  },
  false,
)
