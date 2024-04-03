import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene()
const aspect = window.innerWidth / window.innerHeight
console.log(window.innerWidth)
let camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('white')

const material = new THREE.MeshBasicMaterial({
  color: 'grey',
  wireframe: false,
})
const lineMaterial = new THREE.MeshBasicMaterial({
  color: 'red',
  wireframe: false,
})

const mousePoints = [] //This array stores the 3D coordinates of all the points that make up the line being drawn.
const linesArray = []
let isMouseDown = false
let is3DView = false

function addLineData(startPoint, endPoint) {
  linesArray.push({ start: startPoint, end: endPoint })
}

function clearScene() {
  scene.children.length = 0
}

function onMouseDown(event) {
  isMouseDown = true
  addPoint(event)
}

function onMouseUp(event) {
  isMouseDown = false
  addPoint(event)
  mousePoints.length = 0

  console.log(linesArray)
}

function addPoint(event) {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1, //These coordinates are normalized to a range of -1 to 1,
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
    intersection //A Vector3 where the intersection point will be stored.
  )

  mousePoints.push(intersection)

  if (mousePoints.length >= 2 && !is3DView) {
    addLineData(
      mousePoints[mousePoints.length - 2],
      mousePoints[mousePoints.length - 1]
    )
    const geometry = new THREE.BufferGeometry().setFromPoints(mousePoints)
    const line = new THREE.Line(geometry, lineMaterial)
    scene.add(line)
  }
}

function switchTo3DView() {
  clearScene()

  if (is3DView) {
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
    camera.position.z = 5
    controls = null
    document.getElementById('threeDToggleBtn').textContent = 'Change to 3D View'
    linesArray.forEach(drawLineIn2DView)
    document.getElementById('threeDOutlineBtn').style.display = 'none'
    document.getElementById('bottomRightTaskBtn').style.display = 'none'
    document.getElementById('topLeftTaskBtn').style.display = 'none'
    document.getElementById('correctedWallTaskBtn').style.display = 'none'
    document.getElementById('wallWidth').style.display = 'block'

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
    linesArray.forEach((e) => drawWallIn3DView(e))
    linesArray.forEach((e) => drawLineIn2DView(e))
    document.getElementById('threeDOutlineBtn').style.display = 'block'
    document.getElementById('bottomRightTaskBtn').style.display = 'block'
    document.getElementById('topLeftTaskBtn').style.display = 'block'
    document.getElementById('correctedWallTaskBtn').style.display = 'block'
    document.getElementById('wallWidth').style.display = 'none'

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

function drawLineIn2DView(line) {
  const geometry = new THREE.BufferGeometry().setFromPoints([
    line.start,
    line.end,
  ])
  const lineObject = new THREE.Line(geometry, lineMaterial)
  scene.add(lineObject)
}
function drawWallIn3DView(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0) // In 2D space, a perpendicular vector to a vector (x, y) is (-y, x) or (y, -x)
  const wallWidth = 0.05 //predefined width

  const p1 = new THREE.Vector3()
    .copy(line.start)
    .addScaledVector(perpendicular, wallWidth / 2) //addScaledVector is used to position each corner of the wall based on the direction of the perpendicular vector and the wallWidth.
  const p2 = new THREE.Vector3()
    .copy(line.end)
    .addScaledVector(perpendicular, wallWidth / 2)
  const p3 = new THREE.Vector3()
    .copy(line.end)
    .addScaledVector(perpendicular, -wallWidth / 2)
  const p4 = new THREE.Vector3()
    .copy(line.start)
    .addScaledVector(perpendicular, -wallWidth / 2) //addScaledVector is used to position each corner of the wall based on the direction of the perpendicular vector and the wallWidth.

  const shape = new THREE.Shape([p1, p2, p3, p4])
  const extrudeSettings = { depth: 0.5, bevelEnabled: false } //depth => wall height
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const wall = new THREE.Mesh(geometry, material)
  scene.add(wall)
}

function bottomRightTaskBtnFunction() {
  if (is3DView) {
    clearScene()
    linesArray.forEach((e) => drawWallIn3DViewBottomRightTask(e))
    linesArray.forEach((e) => drawLineIn2DView(e))
  }
}
function topLeftTaskBtnFunction() {
  if (is3DView) {
    clearScene()
    linesArray.forEach((e) => drawWallIn3DViewTopLeftTask(e))
    linesArray.forEach((e) => drawLineIn2DView(e))
  }
}
function correctedWallTaskBtnFunction() {
  if (is3DView) {
    clearScene()
    linesArray.forEach((e) => correctedWallIn3DView(e))
    linesArray.forEach((e) => drawLineIn2DView(e))
  }
}

function correctedWallIn3DView(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0) // In 2D space, a perpendicular vector to a vector (x, y) is (-y, x) or (y, -x)
  const wallWidth = 0.05 //predefined width

  let p1, p2, p3, p4
  if (Math.abs(line.start.y - line.end.y) < 0.1) {
    // Check if the line is horizontal (difference in y-coordinate is negligible)
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

function drawWallIn3DViewBottomRightTask(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(direction.y, -direction.x, 0) // In 2D space, a perpendicular vector to a vector (x, y) is (-y, x) or (y, -x)
  const wallWidth = 0.05 // predefined width
  // const offset = new THREE.Vector3(0, 0.025, 0) // Offset for the bottom position

  // Calculate the position to start drawing the wall
  // const startOffset = direction.clone().multiplyScalar(-wallWidth / 2)

  const p1 = new THREE.Vector3().copy(line.start)
  const p2 = new THREE.Vector3().copy(line.end)
  const p3 = new THREE.Vector3()
    .copy(line.end)
    .addScaledVector(perpendicular, -wallWidth)
  // .add(offset)
  const p4 = new THREE.Vector3()
    .copy(line.start)
    .addScaledVector(perpendicular, -wallWidth)
  // .add(offset)

  const shape = new THREE.Shape([p1, p2, p3, p4])
  const extrudeSettings = { depth: 0.5, bevelEnabled: false } //depth => wall height
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const wall = new THREE.Mesh(geometry, material)
  scene.add(wall)
}

function drawWallIn3DViewTopLeftTask(line) {
  const direction = new THREE.Vector3()
    .copy(line.end)
    .sub(line.start)
    .normalize()

  const perpendicular = new THREE.Vector3(direction.y, -direction.x, 0) // In 2D space, a perpendicular vector to a vector (x, y) is (-y, x) or (y, -x)
  const wallWidth = 0.05 // predefined width
  // const offset = new THREE.Vector3(0, 0.025, 0) // Offset for the bottom position

  // Calculate the position to start drawing the wall
  // const startOffset = direction.clone().multiplyScalar(-wallWidth / 2)

  const p1 = new THREE.Vector3()
    .copy(line.start)
    .addScaledVector(perpendicular, wallWidth)

  const p2 = new THREE.Vector3()
    .copy(line.end)
    .addScaledVector(perpendicular, wallWidth)

  const p3 = new THREE.Vector3().copy(line.end)
  // .addScaledVector(perpendicular, wallWidth)
  // .add(offset)
  const p4 = new THREE.Vector3().copy(line.start)
  // .addScaledVector(perpendicular, wallWidth)
  // .add(offset)

  const shape = new THREE.Shape([p1, p2, p3, p4])
  const extrudeSettings = { depth: 0.5, bevelEnabled: false } //depth => wall height
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  const wall = new THREE.Mesh(geometry, material)
  scene.add(wall)
}

renderer.domElement.addEventListener('mousedown', onMouseDown)
renderer.domElement.addEventListener('mouseup', onMouseUp)

camera.position.z = 5
let controls = null

document
  .getElementById('threeDToggleBtn')
  .addEventListener('click', switchTo3DView)
document
  .getElementById('threeDOutlineBtn')
  .addEventListener('click', switchTo3DOutline)

document
  .getElementById('bottomRightTaskBtn')
  .addEventListener('click', bottomRightTaskBtnFunction)
document
  .getElementById('topLeftTaskBtn')
  .addEventListener('click', topLeftTaskBtnFunction)
document
  .getElementById('correctedWallTaskBtn')
  .addEventListener('click', correctedWallTaskBtnFunction)

document.getElementById('wallWidthRange').addEventListener('input', () => {
  console.log(`Width is ${document.getElementById('wallWidthRange').value}`)
})

function animate() {
  requestAnimationFrame(animate)
  if (controls) controls.update()
  renderer.render(scene, camera)
}

animate()
