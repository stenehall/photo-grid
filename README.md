# Photo Grid

This is a fully responsive lightweight photo grid plugin. 


## What it does

It will fill up each row with just as many photos as will fit. After rendering
it won't need to recalculate anything, making it very responsive. (Compared to
old solutions that would require recalculations when the browser window changes
size.)


## Install

__NPM__
```
npm install photo-grid
```


__CDN__
```
<script
src="http://cdnjs.cloudflare.com/ajax/libs/../../photo-grid.min.js">

```

## Usage

Photo-grid looks for `.photo-grid` and expects this to be a list (`ul`) of
images.

```
<ul class="photo-grid">
  <li><img src="image1.jpg"></li>
  ...
  <li><img src="imageN.jpg"></li>
</ul>
```

By default the images base height will be `200px` this can be changed using the
data attribute `data-gridBasis`.

## Demo

[Here's a demo of what this could look like](https://stenehall.github.io/photo-grid)
