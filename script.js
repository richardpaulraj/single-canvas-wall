import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
let camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
});
renderer.setSize(window.innerWidth, window.innerHeight);

const material = new THREE.MeshBasicMaterial({ color: 'grey'});
const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });


// Initialize array to store mouse points
const mousePoints = [];
let isMouseDown = false;

let is3DView = false;
const linesArray = [];

// Function to add line data
function addLineData(startPoint, endPoint) {
  linesArray.push({ start: startPoint, end: endPoint });
}

// Function to clear the scene
function clearScene() {
  // Remove all children from the scene
  while (scene.children.length > 0) {
    scene.remove(scene.children[0]);
  }
}

function onMouseDown(event) {
  isMouseDown = true;
  addPoint(event);
}
function onMouseUp(event) {
  isMouseDown = false;
  addPoint(event);
  // If mouse is released, clear the mousePoints array
  mousePoints.length = 0;
}

// Function to handle mouse move event

function addPoint(event) {
  // Calculate mouse position in normalized device coordinates (-1 to 1)
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );

  // Cast a ray from the camera to the mouse position
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // Get the intersection point with the plane representing the drawing surface
  const intersection = new THREE.Vector3();
  raycaster.ray.intersectPlane(
    new THREE.Plane(
      new THREE.Vector3(0, 0, 1).applyMatrix4(camera.matrixWorld),
      0
    ),
    intersection
  );

  mousePoints.push(intersection);

  // If we have at least two points and we're in the 2D view, add line data to linesArray
  if (mousePoints.length >= 2 && !is3DView) {
    addLineData(mousePoints[mousePoints.length - 2], mousePoints[mousePoints.length - 1]);

    // Create a line geometry from the points
    const geometry = new THREE.BufferGeometry().setFromPoints(mousePoints);

    // Create a line from the geometry and material
    const line = new THREE.Line(geometry, lineMaterial);

    // Add the line to the scene
    scene.add(line);
  } else if (mousePoints.length >= 2 && is3DView) {
    // Don't do anything in the 3D view
  }
}

// Function to switch to PerspectiveCamera and enable OrbitControls
function switchTo3DView() {
  clearScene(); // Clear the scene before switching views

  if (is3DView) {
    // Switch back to OrthographicCamera and disable OrbitControls
    camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 1000);
    camera.position.z = 5;
    controls = null;
    document.getElementById('3DToggleBtn').textContent = 'Change to 3D View';

    // Draw lines in 2D view
    linesArray.forEach((line) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([line.start, line.end]);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 'black' });
      const lineObject = new THREE.Line(geometry, lineMaterial);
      scene.add(lineObject);
    });
  } else {
    // Switch to PerspectiveCamera and enable OrbitControls
    camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    camera.position.z = 5;
    controls = new OrbitControls(camera, renderer.domElement);
    document.getElementById('3DToggleBtn').textContent = 'Change to 2D View';

    // Draw walls in 3D view
// Draw walls in 3D view
linesArray.forEach((line) => {
  const direction = new THREE.Vector3().copy(line.end).sub(line.start).normalize();
  const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0); // Find a perpendicular vector

  const wallWidth = 0.05; // Adjust this value to change the thickness of the wall

  const p1 = new THREE.Vector3().copy(line.start).addScaledVector(perpendicular, wallWidth / 2);
  const p2 = new THREE.Vector3().copy(line.end).addScaledVector(perpendicular, wallWidth / 2);
  const p3 = new THREE.Vector3().copy(line.end).addScaledVector(perpendicular, -wallWidth / 2);
  const p4 = new THREE.Vector3().copy(line.start).addScaledVector(perpendicular, -wallWidth / 2);

  const shape = new THREE.Shape([p1, p2, p3, p4]);

  const extrudeSettings = {
    depth: 0.5, // Thickness of the wall
    bevelEnabled: false,
  };

  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  const wall = new THREE.Mesh(geometry, material);
  scene.add(wall);
});

  }

  // Toggle the state of the view
  is3DView = !is3DView;
}

// Add event listeners for mouse down, move, and up
renderer.domElement.addEventListener('mousedown', onMouseDown);
renderer.domElement.addEventListener('mouseup', onMouseUp);
renderer.setClearColor('white');

// Position the camera
camera.position.z = 5;

// Initialize OrbitControls
let controls = null;

// Add event listener for button click
document.getElementById('3DToggleBtn').addEventListener('click', switchTo3DView);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update(); // Update OrbitControls only if they exist
  renderer.render(scene, camera);
}

animate();