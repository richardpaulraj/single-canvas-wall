import * as THREE from 'three'
import WallDrawer from './wallDrawer.js'
import StaticComponents from './staticComponents.js'
import { MouseClickActivity } from './controls.js'

window.wallEditor = {
  //scene
  //aspect
  //renderer
  //controls
  //camera
  //currentWallPattern
  //is3DView
  //linesArray
  //spaceBetweenLines
  //color
  //material
}

const scene = new THREE.Scene()
wallEditor.scene = scene
const aspect = window.innerWidth / window.innerHeight
wallEditor.aspect = aspect
let camera = new THREE.OrthographicCamera(
  -wallEditor.aspect,
  wallEditor.aspect,
  1,
  -1,
  0.1,
  1000
)
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('white')
wallEditor.renderer = renderer

camera.position.z = 5
let controls = null

wallEditor.controls = controls
wallEditor.camera = camera

const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: false,
  side: THREE.DoubleSide,
})

wallEditor.material = material

const mousePoints = []
const linesArray = []
let isMouseDown = false
let is3DView = false
let currentWidth = parseFloat(document.getElementById('wallWidthRange').value)
let currentAlignment = 'Center'
let currentWallPattern = 'solidFill'
wallEditor.currentWallPattern = currentWallPattern
let color = 'red'

wallEditor.color = color
wallEditor.is3DView = is3DView
wallEditor.linesArray = linesArray
wallEditor.currentWidth = currentWidth

const wallDrawer = new WallDrawer()
const staticComponents = new StaticComponents()
const mouseClickActivity = new MouseClickActivity(
  mousePoints,
  currentAlignment,
  staticComponents.addLineData,
  staticComponents.clearScene,
  wallDrawer,
  staticComponents.toggleBtns2D,
  staticComponents.toggleBtns3D
)

mouseClickActivity.addEventListeners()

staticComponents.animate()
