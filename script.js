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
const aspect = window.innerWidth / window.innerHeight
wallEditor.aspect = aspect //wallEditor
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

camera.position.z = 5
wallEditor.spaceBetweenLines = 1

let controls = null

const material = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: false,
  side: THREE.DoubleSide,
})

const mousePoints = []
const linesArray = []
let isMouseDown = false
let is3DView = false
let currentWidth = parseFloat(document.getElementById('wallWidthRange').value)
let currentAlignment = 'Center'
let currentWallPattern = 'solidFill'
let color = 'red'
wallEditor.isLineConnected = false
wallEditor.previousEndPoints = []
wallEditor.wallLines = []

wallEditor.currentWallPattern = currentWallPattern
wallEditor.color = color
wallEditor.is3DView = is3DView
wallEditor.linesArray = linesArray
wallEditor.currentWidth = currentWidth
wallEditor.material = material
wallEditor.renderer = renderer
wallEditor.scene = scene
wallEditor.controls = controls
wallEditor.camera = camera

const wallDrawer = new WallDrawer()
const staticComponents = new StaticComponents()
const mouseClickActivity = new MouseClickActivity(
  mousePoints,
  currentAlignment,
  staticComponents.addLineData,
  staticComponents.clearScene,
  wallDrawer
)

mouseClickActivity.addEventListeners()
staticComponents.animate()
