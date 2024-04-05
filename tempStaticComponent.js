import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class StaticComponents {
  constructor(
    scene,
    camera,
    renderer,
    wallDrawer,
    material,
    aspect,
    linesArray
  ) {
    this.scene = scene
    this.camera = camera
    this.renderer = renderer
    this.wallDrawer = wallDrawer
    this.material = material
    this.aspect = aspect
    this.linesArray = linesArray
    this.is3DView = false
    this.controls = null
  }

  clearScene() {
    this.scene.children.length = 0
  }
  switchTo3DOutline() {
    console.log(this.is3DView)
    if (this.is3DView) {
      this.material.wireframe = !this.material.wireframe
      const threeDOutlineBtn = document.getElementById('threeDOutlineBtn')
      if (threeDOutlineBtn) {
        threeDOutlineBtn.textContent = `Wall Outline - ${
          this.material.wireframe ? 'ON' : 'OFF'
        }`
      }
    }
  }

  switchTo3DView() {
    this.clearScene()
    if (this.is3DView) {
      this.camera = new THREE.OrthographicCamera(
        -this.aspect,
        this.aspect,
        1,
        -1,
        0.1,
        1000
      )
      this.camera.position.z = 5
      this.controls = null
      this.linesArray.forEach((line) => this.wallDrawer.drawWalls(line))

      document.getElementById('threeDToggleBtn').textContent =
        'Change to 3D View'
      document.getElementById('threeDOutlineBtn').style.display = 'none'
      document.getElementById('correctedWallTaskBtn').style.display = 'none'
      document.getElementById('wallWidth').style.display = 'block'
      document.getElementById('clearAllBtn').style.display = 'block'
      document.getElementById('alignments').style.display = 'block'

      this.material.wireframe = false
    } else {
      if (this.linesArray.length === 0) {
        alert('Draw something to see in 3D View')
        return
      }
      this.camera = new THREE.PerspectiveCamera(45, this.aspect, 0.1, 1000)
      this.camera.position.z = 3
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      document.getElementById('threeDToggleBtn').textContent =
        'Change to 2D View'
      this.linesArray.forEach((e) => this.wallDrawer.drawWalls(e))

      document.getElementById('threeDOutlineBtn').style.display = 'block'
      document.getElementById('correctedWallTaskBtn').style.display = 'block'
      document.getElementById('wallWidth').style.display = 'none'
      document.getElementById('clearAllBtn').style.display = 'none'
      document.getElementById('alignments').style.display = 'none'

      document.getElementById(
        'threeDOutlineBtn'
      ).textContent = `Wall Outline - ${this.material.wireframe ? 'ON' : 'OFF'}`
    }

    this.is3DView = !this.is3DView
  }
}

export default StaticComponents
