import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import WallDrawer from './wallDrawer.js'
import StaticComponents from './staticComponents.js'
import { MouseClickActivity } from './controls.js'

const scene = new THREE.Scene()
const aspect = window.innerWidth / window.innerHeight
let camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('white')

camera.position.z = 5
let controls = null

const material = new THREE.MeshBasicMaterial({
  color: 'grey',
  wireframe: false,
  //   wireframeLinewidth: 1,
})
// material.setDrawMode('lines', false)

const mousePoints = []
const linesArray = []
let isMouseDown = false
let is3DView = false
let currentWidth = parseFloat(document.getElementById('wallWidthRange').value)
let currentAlignment = 'Center'

const wallDrawer = new WallDrawer(scene, material)

const staticComponents = new StaticComponents(
  material,
  scene,
  linesArray,
  aspect,
  renderer,
  wallDrawer
)
const mouseClickActivity = new MouseClickActivity(
  camera,
  scene,
  is3DView,
  mousePoints,
  linesArray,
  currentWidth,
  currentAlignment,
  staticComponents.addLineData,
  staticComponents.clearScene,
  wallDrawer,
  material,
  staticComponents.switchTo3DOutline,
  aspect,
  renderer
)

mouseClickActivity.addEventListeners()

export function switchTo3DView() {
  console.log(scene.children)
  staticComponents.clearScene(scene)
  console.log(scene.children)

  if (is3DView) {
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
    camera.position.z = 5
    controls = null
    linesArray.forEach((line) => wallDrawer.drawWalls(line))

    document.getElementById('threeDToggleBtn').textContent = 'Change to 3D View'

    document.getElementById(
      'threeDOutlineBtn'
    ).textContent = `Wall Outline - OFF`
    document.getElementById('correctedWallTaskBtn').style.display = 'none'
    document.getElementById('wallWidth').style.display = 'block'
    document.getElementById('clearAllBtn').style.display = 'block'
    document.getElementById('alignments').style.display = 'block'
    document.getElementById('wallPatterns').style.display = 'block'

    material.wireframe = false
  } else {
    if (linesArray.length === 0) {
      alert('Draw something to see in 3D View')
      return
    }

    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    camera.position.z = 3
    controls = new OrbitControls(camera, renderer.domElement)
    document.getElementById('threeDToggleBtn').textContent = 'Change to 2D View'
    linesArray.forEach((e) => wallDrawer.drawWalls(e))

    // document.getElementById('threeDOutlineBtn').style.display = 'block'
    document.getElementById('correctedWallTaskBtn').style.display = 'block'
    document.getElementById('wallWidth').style.display = 'none'
    document.getElementById('clearAllBtn').style.display = 'none'
    document.getElementById('alignments').style.display = 'none'
    document.getElementById('wallPatterns').style.display = 'none'

    material.wireframe = false
    document.getElementById('threeDOutlineBtn').textContent = `Wall Outline - ${
      material.wireframe ? 'ON' : 'OFF'
    }`
  }

  is3DView = !is3DView

  // Update the is3DView value in the MouseClickActivity module
  mouseClickActivity.updateIs3DView(is3DView)
}
function animate() {
  requestAnimationFrame(animate)
  if (controls) controls.update()
  renderer.render(scene, camera)
}
animate()
