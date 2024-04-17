// controls.js

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class MouseClickActivity {
  static isMouseDownVar = false

  constructor(
    mousePoints,
    currentAlignment, //This can't be general for all
    addLineData,
    clearScene,
    wallDrawer
  ) {
    this.mousePoints = mousePoints
    this.currentAlignment = currentAlignment
    this.addLineData = addLineData
    this.clearScene = clearScene
    this.wallDrawer = wallDrawer

    // Declare temporaryLine as a class property and initialize it as null
    this.temporaryLine = null
    this.lastMouseDownPosition = null // Store the position of last mouse down
  }

  toggleBtns3D() {
    document.getElementById('threeDToggleBtn').textContent = 'Change to 2D View'
    document.getElementById('correctedWallTaskBtn').style.display = 'block'
    document.getElementById('wallWidth').style.display = 'none'
    document.getElementById('clearAllBtn').style.display = 'none'
    document.getElementById('alignments').style.display = 'none'
    document.getElementById('wallPatterns').style.display = 'none'
    document.getElementById('colors').style.display = 'none'
    document.getElementById('spaceBetweenLines').style.display = 'none'
  }
  toggleBtns2D() {
    document.getElementById('threeDToggleBtn').textContent = 'Change to 3D View'
    document.getElementById('correctedWallTaskBtn').style.display = 'none'
    document.getElementById('wallWidth').style.display = 'block'
    document.getElementById('clearAllBtn').style.display = 'block'
    document.getElementById('alignments').style.display = 'block'
    document.getElementById('wallPatterns').style.display = 'block'
    document.getElementById('colors').style.display = 'block'
    document.getElementById('spaceBetweenLines').style.display = 'block'
  }

  onMouseDown(event) {
    MouseClickActivity.isMouseDownVar = true
    this.clearTemporaryLine()
    // this.addPoint(event)
    this.handleTemporaryLine(event)
    // Store the position of mouse down
    this.lastMouseDownPosition = { x: event.clientX, y: event.clientY }
  }

  onMouseUp(event) {
    MouseClickActivity.isMouseDownVar = false
    this.clearTemporaryLine()

    // Check if the mouse has moved between mousedown and mouseup
    if (
      this.lastMouseDownPosition &&
      (this.lastMouseDownPosition.x !== event.clientX ||
        this.lastMouseDownPosition.y !== event.clientY)
    ) {
      // Call addPoint only if the mouse has moved
      this.addPoint(event)
      this.mousePoints.length = 0
    }

    // Reset the last mouse down position
    this.lastMouseDownPosition = null

    this.mousePoints.length = 0
    console.log(wallEditor.linesArray)
  }

  addPoint(event) {
    if (!wallEditor.is3DView) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, wallEditor.camera)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(
        new THREE.Plane(
          new THREE.Vector3(0, 0, 1).applyMatrix4(
            wallEditor.camera.matrixWorld
          ),
          0
        ),
        intersection
      )

      if (this.mousePoints.length === 0) {
        //   this.createTemporaryPoint(intersection)
        this.mousePoints.push(intersection)
      } else {
        this.clearTemporaryLine()
        this.createTemporaryLine(
          this.mousePoints[this.mousePoints.length - 1],
          intersection
        )
      }

      this.mousePoints.push(intersection)

      if (this.mousePoints.length >= 2 && !wallEditor.is3DView) {
        // this.clearTemporaryPoint()
        this.addLineData(
          this.mousePoints[this.mousePoints.length - 2],
          this.mousePoints[this.mousePoints.length - 1],
          wallEditor.currentWidth,
          this.currentAlignment,
          wallEditor.color
        )
        console.log(wallEditor.linesArray[wallEditor.linesArray.length - 1])
        const latestLine =
          wallEditor.linesArray[wallEditor.linesArray.length - 1]

        //without using forEach method
        // this.wallDrawer.draw2DWall(latestLine)

        this.clearScene(wallEditor.scene)
        wallEditor.linesArray.forEach((line) =>
          this.wallDrawer.draw2DWall(line)
        )
      }
    }
  }
  handleTemporaryLine(event) {
    if (!wallEditor.is3DView && MouseClickActivity.isMouseDownVar) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, wallEditor.camera)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(
        new THREE.Plane(
          new THREE.Vector3(0, 0, 1).applyMatrix4(
            wallEditor.camera.matrixWorld
          ),
          0
        ),
        intersection
      )

      if (this.mousePoints.length === 0) {
        this.mousePoints.push(intersection)
      } else {
        this.clearTemporaryLine()
        this.createTemporaryLine(
          this.mousePoints[this.mousePoints.length - 1],
          intersection
        )
      }
    }
  }

  clearTemporaryLine() {
    if (this.temporaryLine) {
      wallEditor.scene.remove(this.temporaryLine)
      this.temporaryLine.geometry.dispose()
      this.temporaryLine.material.dispose()
      this.temporaryLine = null
    }
  }
  createTemporaryLine(start, end) {
    const direction = new THREE.Vector3().copy(end).sub(start).normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    const wallWidth = 0.025 * wallEditor.currentWidth
    wallEditor.material.color.set(wallEditor.color)

    if (this.currentAlignment === 'Top') {
      const p1 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, -wallWidth)
      const p2 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, -wallWidth)
      const p3 = new THREE.Vector3().copy(end)
      // .addScaledVector(perpendicular, -wallWidth / 2)
      const p4 = new THREE.Vector3().copy(start)
      // .addScaledVector(perpendicular, -wallWidth / 2)
      this.createSolidFill(p1, p2, p3, p4)
    } else if (this.currentAlignment === 'Bottom') {
      const p1 = new THREE.Vector3().copy(start)
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p2 = new THREE.Vector3().copy(end)
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p3 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, wallWidth)
      const p4 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, wallWidth)
      this.createSolidFill(p1, p2, p3, p4)
    } else if (this.currentAlignment === 'Center') {
      const p1 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, wallWidth / 2)
      const p2 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, wallWidth / 2)
      const p3 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, -wallWidth / 2)
      const p4 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, -wallWidth / 2)
      this.createSolidFill(p1, p2, p3, p4)
    }
  }
  createSolidFill(p1, p2, p3, p4) {
    // Define vertices for the wall outline, top, and sides
    const vertices = [
      p1.x,
      p1.y,
      0, // Vertex 0
      p2.x,
      p2.y,
      0, // Vertex 1
      p3.x,
      p3.y,
      0, // Vertex 2
      p4.x,
      p4.y,
      0, // Vertex 3

      p1.x,
      p1.y,
      0.5, // Vertex 4
      p2.x,
      p2.y,
      0.5, // Vertex 5
      p3.x,
      p3.y,
      0.5, // Vertex 6
      p4.x,
      p4.y,
      0.5, // Vertex 7
    ]

    // Define indices for the wall
    const indices = [
      // Top face
      4, 5, 6, 4, 6, 7,
      // Bottom face
      0, 1, 2, 0, 2, 3,
      // Side faces
      0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3, 3, 7, 0, 7, 4, 0,
    ]

    // Create buffer geometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setIndex(indices)

    // Create a Mesh
    this.temporaryLine = new THREE.Mesh(geometry, wallEditor.material)
    wallEditor.scene.add(this.temporaryLine)
  }
  addEventListeners() {
    if (!wallEditor.is3DView) {
      document.addEventListener('mousemove', (event) =>
        this.handleTemporaryLine(event)
      )
      document.addEventListener('mousedown', this.onMouseDown.bind(this))
      document.addEventListener('mouseup', this.onMouseUp.bind(this))
    }
    document.getElementById('threeDToggleBtn').addEventListener('click', () => {
      this.switchTo3DView()
    })

    document
      .getElementById('correctedWallTaskBtn')
      .addEventListener('click', () => {
        if (wallEditor.is3DView) {
          this.clearScene(wallEditor.scene)
          wallEditor.linesArray.forEach((line) =>
            this.wallDrawer.correctedWallIn3DView(line)
          )
        }
      })

    document
      .getElementById('wallWidthRange')
      .addEventListener('input', (event) => {
        wallEditor.currentWidth = parseFloat(event.target.value)
      })

    document.getElementById('clearAllBtn').addEventListener('click', () => {
      if (!wallEditor.is3DView) {
        wallEditor.linesArray.length = 0
        this.clearScene(wallEditor.scene)
      }
    })

    document
      .querySelectorAll('input[name="alignmentsRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener('change', (e) => {
          const selectedAlignment = e.target.value
          this.currentAlignment = selectedAlignment
          console.log('Selected alignment:', selectedAlignment)
        })
      })
    document
      .querySelectorAll('input[name="wallPatternRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener('change', (e) => {
          wallEditor.currentWallPattern = e.target.value
          this.clearScene(wallEditor.scene)
          wallEditor.linesArray.forEach((line) =>
            this.wallDrawer.draw2DWall(line)
          )
        })
      })
    document
      .querySelectorAll('input[name="colorRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener('change', (e) => {
          wallEditor.color = e.target.value
          console.log('Selected color:', wallEditor.color)
        })
      })

    document
      .getElementById('spaceBetweenLinesRange')
      .addEventListener('input', (event) => {
        wallEditor.spaceBetweenLines = parseInt(event.target.value)
        console.log(wallEditor.spaceBetweenLines)
      })
  }
  switchTo3DView() {
    this.clearScene(wallEditor.scene)

    if (wallEditor.is3DView) {
      wallEditor.camera = new THREE.OrthographicCamera(
        -wallEditor.aspect,
        wallEditor.aspect,
        1,
        -1,
        0.1,
        1000
      )

      wallEditor.camera.position.z = 5
      wallEditor.controls.enableRotate = false // Disable rotation
      wallEditor.linesArray.forEach((line) => this.wallDrawer.draw2DWall(line))
      this.toggleBtns2D()
    } else {
      if (wallEditor.linesArray.length === 0) {
        alert('Draw something to see in 3D View')
        return
      }
      wallEditor.camera = new THREE.PerspectiveCamera(
        45,
        wallEditor.aspect,
        0.1,
        1000
      )
      wallEditor.camera.position.z = 3
      wallEditor.controls = new OrbitControls(
        wallEditor.camera,
        wallEditor.renderer.domElement
      )
      wallEditor.controls.enableRotate = true // Enable rotation
      wallEditor.linesArray.forEach((line) => this.wallDrawer.draw3DWall(line))
      this.toggleBtns3D()
    }

    wallEditor.is3DView = !wallEditor.is3DView
  }
}

export { MouseClickActivity }
