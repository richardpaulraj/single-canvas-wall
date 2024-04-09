// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import WallDrawer from './wallDrawer.js'
// const wallDrawer = new WallDrawer(scene, material)

class StaticComponents {
  constructor(material, scene, linesArray, aspect, renderer, wallDrawer) {
    this.material = material
    this.scene = scene
    this.linesArray = linesArray
    this.aspect = aspect
    this.renderer = renderer
    this.wallDrawer = wallDrawer

    this.is3DView = false
  }

  switchTo3DOutline() {
    console.log(this.scene.children)
    this.material.wireframe = !this.material.wireframe
    const threeDOutlineBtn = document.getElementById('threeDOutlineBtn')
    if (threeDOutlineBtn) {
      threeDOutlineBtn.textContent = `Wall Outline - ${
        this.material.wireframe ? 'ON' : 'OFF'
      }`
    }
  }
  //   switchTo3DView() {
  //     this.clearScene(this.scene)

  //     if (this.is3DView) {
  //       this.camera = new THREE.OrthographicCamera(
  //         -this.aspect,
  //         this.aspect,
  //         1,
  //         -1,
  //         0.1,
  //         1000
  //       )
  //       this.camera.position.z = 5
  //       this.controls = null
  //       //   let wallDrawer = new WallDrawer(this.scene, this.material)
  //       this.linesArray.forEach((line) => this.wallDrawer.drawWalls(line))

  //       document.getElementById('threeDToggleBtn').textContent =
  //         'Change to 3D View'

  //       document.getElementById(
  //         'threeDOutlineBtn'
  //       ).textContent = `Wall Outline - OFF`
  //       document.getElementById('correctedWallTaskBtn').style.display = 'none'
  //       document.getElementById('wallWidth').style.display = 'block'
  //       document.getElementById('clearAllBtn').style.display = 'block'
  //       document.getElementById('alignments').style.display = 'block'

  //       this.material.wireframe = false
  //     } else {
  //       if (this.linesArray.length === 0) {
  //         alert('Draw something to see in 3D View')
  //         return
  //       }

  //       this.camera = new THREE.PerspectiveCamera(45, this.aspect, 0.1, 1000)

  //       this.camera.position.z = 3
  //       this.controls = new OrbitControls(this.camera, this.renderer.domElement)

  //       document.getElementById('threeDToggleBtn').textContent =
  //         'Change to 2D View'
  //       //   let wallDrawer = new WallDrawer(this.scene, this.material)
  //       this.linesArray.forEach((line) => this.wallDrawer.drawWalls(line))

  //       document.getElementById('correctedWallTaskBtn').style.display = 'block'
  //       document.getElementById('wallWidth').style.display = 'none'
  //       document.getElementById('clearAllBtn').style.display = 'none'
  //       document.getElementById('alignments').style.display = 'none'

  //       this.material.wireframe = false
  //       document.getElementById(
  //         'threeDOutlineBtn'
  //       ).textContent = `Wall Outline - ${this.material.wireframe ? 'ON' : 'OFF'}`
  //     }

  //     this.is3DView = !this.is3DView
  //   }

  clearScene(scene) {
    scene.children.length = 0
  }

  addLineData(startPoint, endPoint, lineWidth, alignment) {
    this.linesArray.push({
      start: startPoint,
      end: endPoint,
      width: lineWidth,
      alignment: alignment,
    })
  }
}

export default StaticComponents
