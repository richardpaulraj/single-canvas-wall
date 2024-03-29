import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Initialize Three.js scene
const scene = new THREE.Scene()

// Use an OrthographicCamera initially
const aspect = window.innerWidth / window.innerHeight
let camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
})
renderer.setSize(window.innerWidth, window.innerHeight)

// Create a material for the lines
const material = new THREE.LineBasicMaterial({ color: 'black' })

// Initialize array to store mouse points
const mousePoints = []
let isMouseDown = false

// Add a flag to track the current state of the view (2D or 3D)
let is3DView = false

// Function to handle mouse down event
function onMouseDown(event) {
  isMouseDown = true
  if (!is3DView) addPoint(event) // Add point on mouse down only in 2D view
}

// Function to handle mouse up event
function onMouseUp(event) {
  isMouseDown = false
  if (!is3DView) {
    addPoint(event) // Add point on mouse up only in 2D view
    // If mouse is released, clear the mousePoints array
    mousePoints.length = 0
  }
}

// Function to handle mouse move event
function onMouseMove(event) {
  if (isMouseDown) {
    // Only add points on mouse down and mouse up, not on mouse move
  }
}

// Function to add point
function addPoint(event) {
  // Calculate mouse position in normalized device coordinates (-1 to 1)
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  )

  // Cast a ray from the camera to the mouse position
  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)

  // Get the intersection point with the plane representing the drawing surface
  const intersection = new THREE.Vector3()
  raycaster.ray.intersectPlane(
    new THREE.Plane(
      new THREE.Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld),
      0
    ),
    intersection
  )
  console.log(
    'Intersection point:',
    intersection.x,
    intersection.y,
    intersection.z
  )

  // Add the intersection point to the mousePoints array
  mousePoints.push(intersection)

  // If we have at least two points, draw a line in 2D view or a wall in 3D view
  if (mousePoints.length >= 2) {
    if (is3DView) {
      // Create a shape from the points
      const shape = new THREE.Shape(
        mousePoints.map((p) => new THREE.Vector2(p.x, p.y))
      )

      // Define extrusion settings
      const extrudeSettings = {
        depth: 0.1, // This is the thickness of your wall
        bevelEnabled: false,
      }

      // Create an extruded geometry from the shape
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)

      // Create a mesh from the geometry and material
      const wall = new THREE.Mesh(geometry, material)

      // Add the wall to the scene
      scene.add(wall)
    } else {
      // Create a line geometry from the points
      const geometry = new THREE.BufferGeometry().setFromPoints(mousePoints)

      // Create a line from the geometry and material
      const line = new THREE.Line(geometry, material)

      // Add the line to the scene
      scene.add(line)
    }
  }
}

// Add event listeners for mouse down, move, and up
renderer.domElement.addEventListener('mousedown', onMouseDown)
renderer.domElement.addEventListener('mouseup', onMouseUp)
renderer.domElement.addEventListener('mousemove', onMouseMove)
renderer.setClearColor('white')

// Position the camera
camera.position.z = 5

// Initialize OrbitControls
let controls = null

// Function to switch to PerspectiveCamera and enable OrbitControls
function switchTo3DView() {
  if (is3DView) {
    // Switch back to OrthographicCamera and disable OrbitControls
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000)
    camera.position.z = 5
    controls = null
    document.getElementById('3DToggleBtn').textContent = 'Change to 3D View'
  } else {
    // Switch to PerspectiveCamera and enable OrbitControls
    camera = new THREE.PerspectiveCamera(22.56, aspect, 0.1, 1000)
    camera.position.z = 5
    controls = new OrbitControls(camera, renderer.domElement)
    document.getElementById('3DToggleBtn').textContent = 'Change to 2D View'
  }
  // Toggle the state of the view
  is3DView = !is3DView
}

// Add event listener for button click
document.getElementById('3DToggleBtn').addEventListener('click', switchTo3DView)

// Animation loop
function animate() {
  requestAnimationFrame(animate)
  if (controls) controls.update() // Update OrbitControls only if they exist
  renderer.render(scene, camera)
}

animate()
