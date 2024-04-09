import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

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
})

const mousePoints = [] //This array stores the 3D coordinates of all the points that make up the line being drawn.
const linesArray = []
let isMouseDown = false
let is3DView = false
let currentWidth = parseFloat(document.getElementById('wallWidthRange').value)
let currentAlignment = 'Center'

function addLineData(startPoint, endPoint, lineWidth, alignment) {
  linesArray.push({
    start: startPoint,
    end: endPoint,
    width: lineWidth,
    alignment: alignment,
  })
}

function clearScene() {
  scene.children.length = 0
}

const mouseClickActivity = {
  onMouseDown: function (event) {
    isMouseDown = true
    this.addPoint(event)
  },
  onMouseUp: function (event) {
    isMouseDown = false
    this.addPoint(event)
    mousePoints.length = 0
  },
  addPoint: function (event) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    )

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
    const intersection = new THREE.Vector3()
    raycaster.ray.intersectPlane(
      new THREE.Plane(
        new THREE.Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld),
        0
      ),
      intersection
    )

    mousePoints.push(intersection)

    if (mousePoints.length >= 2 && !is3DView) {
      addLineData(
        mousePoints[mousePoints.length - 2],
        mousePoints[mousePoints.length - 1],
        currentWidth,
        currentAlignment
      )
      clearScene()
      console.log(linesArray)

      linesArray.forEach((line) => drawWalls(line))
    }
  },
}

function switchTo3DView() {
  clearScene()

  if (is3DView) {
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
    camera.position.z = 5
    controls = null
    linesArray.forEach(drawWalls)

    document.getElementById('threeDToggleBtn').textContent = 'Change to 3D View'
    document.getElementById('threeDOutlineBtn').style.display = 'none'
    document.getElementById('correctedWallTaskBtn').style.display = 'none'
    document.getElementById('wallWidth').style.display = 'block'
    document.getElementById('clearAllBtn').style.display = 'block'
    document.getElementById('alignments').style.display = 'block'

    material.wireframe = false
  } else {
    if (linesArray.length === 0) {
      alert('Draw something to see in 3D View')
      return
    }
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000)
    // camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)

    camera.position.z = 3
    controls = new OrbitControls(camera, renderer.domElement)
    document.getElementById('threeDToggleBtn').textContent = 'Change to 2D View'
    linesArray.forEach((e) => drawWalls(e))

    document.getElementById('threeDOutlineBtn').style.display = 'block'
    document.getElementById('correctedWallTaskBtn').style.display = 'block'
    document.getElementById('wallWidth').style.display = 'none'
    document.getElementById('clearAllBtn').style.display = 'none'
    document.getElementById('alignments').style.display = 'none'

    document.getElementById('threeDOutlineBtn').textContent = `Wall Outline - ${
      material.wireframe ? 'ON' : 'OFF'
    }`
  }

  is3DView = !is3DView
}

function switchTo3DOutline() {
  if (is3DView) {
    material.wireframe = !material.wireframe
    document.getElementById('threeDOutlineBtn').textContent = `Wall Outline - ${
      material.wireframe ? 'ON' : 'OFF'
    }`
  }
}

function drawWalls(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
  const wallWidth = 0.025 * line.width

  if (line.alignment === 'Top') {
    const p1 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, wallWidth)
    const p2 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, wallWidth)
    const p3 = new THREE.Vector3().copy(line.end)
    // .addScaledVector(perpendicular, -wallWidth / 2)
    const p4 = new THREE.Vector3().copy(line.start)
    // .addScaledVector(perpendicular, -wallWidth / 2)
    const shape = new THREE.Shape([p1, p2, p3, p4])

    // Create a geometry by extruding the shape
    const extrudeSettings = { depth: 0.5, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Create a mesh using the extruded geometry
    const wall = new THREE.Mesh(geometry, material)
    scene.add(wall)
  } else if (line.alignment === 'Bottom') {
    const p1 = new THREE.Vector3().copy(line.start)
    // .addScaledVector(perpendicular, wallWidth / 2)
    const p2 = new THREE.Vector3().copy(line.end)
    // .addScaledVector(perpendicular, wallWidth / 2)
    const p3 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, -wallWidth)
    const p4 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, -wallWidth)

    const shape = new THREE.Shape([p1, p2, p3, p4])

    // Create a geometry by extruding the shape
    const extrudeSettings = { depth: 0.5, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Create a mesh using the extruded geometry
    const wall = new THREE.Mesh(geometry, material)
    scene.add(wall)
  } else if (line.alignment === 'Center') {
    const p1 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, wallWidth / 2)
    const p2 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, wallWidth / 2)
    const p3 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, -wallWidth / 2)
    const p4 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, -wallWidth / 2)

    const shape = new THREE.Shape([p1, p2, p3, p4])

    // Create a geometry by extruding the shape
    const extrudeSettings = { depth: 0.5, bevelEnabled: false }
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

    // Create a mesh using the extruded geometry
    const wall = new THREE.Mesh(geometry, material)
    scene.add(wall)
  }
}
function correctedWallIn3DView(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0) // In 2D space, a perpendicular vector to a vector (x, y) is (-y, x) or (y, -x)
  const wallWidth = 0.025 * line.width

  let p1, p2, p3, p4
  if (Math.abs(line.start.y - line.end.y) < 0.1) {
    // if horizontal
    p1 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, wallWidth / 2)

    p2 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, wallWidth / 2)
      .add(new THREE.Vector3(wallWidth / 2, 0, 0))

    p3 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, -wallWidth / 2)
      .sub(new THREE.Vector3(wallWidth / 2, 0, 0))

    p4 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, -wallWidth / 2)
  } else {
    p1 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, wallWidth / 2)
      .add(new THREE.Vector3(0, wallWidth / 2, 0))

    p2 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, wallWidth / 2)

    p3 = new THREE.Vector3()
      .copy(line.end)
      .addScaledVector(perpendicular, -wallWidth / 2)

    p4 = new THREE.Vector3()
      .copy(line.start)
      .addScaledVector(perpendicular, -wallWidth / 2)
      .sub(new THREE.Vector3(0, wallWidth / 2, 0))
  }

  const shape = new THREE.Shape([p1, p2, p3, p4])
  const extrudeSettings = { depth: 0.5, bevelEnabled: false } //depth => wall height
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const wall = new THREE.Mesh(geometry, material)
  scene.add(wall)
}
function allEventListeners() {
  renderer.domElement.addEventListener(
    'mousedown',
    mouseClickActivity.onMouseDown.bind(mouseClickActivity)
  )
  renderer.domElement.addEventListener(
    'mouseup',
    mouseClickActivity.onMouseUp.bind(mouseClickActivity)
  )

  document
    .getElementById('threeDToggleBtn')
    .addEventListener('click', switchTo3DView)
  document
    .getElementById('threeDOutlineBtn')
    .addEventListener('click', switchTo3DOutline)

  document
    .getElementById('correctedWallTaskBtn')
    .addEventListener('click', () => {
      if (is3DView) {
        clearScene()
        linesArray.forEach((e) => correctedWallIn3DView(e))
      }
    })

  document
    .getElementById('wallWidthRange')
    .addEventListener('input', (event) => {
      currentWidth = parseFloat(event.target.value)
    })
  document.getElementById('clearAllBtn').addEventListener('click', () => {
    if (!is3DView) {
      linesArray.length = 0
      clearScene()
    }
  })
  document
    .querySelectorAll('input[name="alignmentsRadioBtn"]')
    .forEach((radioBtn) => {
      radioBtn.addEventListener('change', (e) => {
        const selectedAlignment = e.target.value
        currentAlignment = selectedAlignment
        console.log('Selected alignment:', selectedAlignment)
      })
    })
}

function animate() {
  requestAnimationFrame(animate)
  if (controls) controls.update()
  renderer.render(scene, camera)
}

function init() {
  allEventListeners()
  animate()
}
init()
