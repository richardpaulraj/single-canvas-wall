// controls.js

import * as THREE from 'three'
import { switchTo3DView } from './script.js'

class MouseClickActivity {
  static isMouseDownVar = false

  constructor(
    camera,
    scene,
    is3DView,
    mousePoints,
    linesArray,
    currentWidth,
    currentAlignment,
    addLineData,
    clearScene,
    wallDrawer,
    material,
    switchTo3DOutline,
    aspect,
    renderer
  ) {
    this.camera = camera
    this.scene = scene
    this.is3DView = is3DView
    this.mousePoints = mousePoints
    this.linesArray = linesArray
    this.currentWidth = currentWidth
    this.currentAlignment = currentAlignment
    this.addLineData = addLineData
    this.clearScene = clearScene
    this.wallDrawer = wallDrawer
    this.material = material // Assign material here
    this.switchTo3DOutline = switchTo3DOutline

    // Declare temporaryLine as a class property and initialize it as null
    this.temporaryLine = null
    this.lastMouseDownPosition = null // Store the position of last mouse down
  }
  updateIs3DView(newValue) {
    this.is3DView = newValue
  }

  onMouseDown(event) {
    MouseClickActivity.isMouseDownVar = true
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
    console.log(this.linesArray)
  }

  addPoint(event) {
    if (!this.is3DView) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.camera)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(
        new THREE.Plane(
          new THREE.Vector3(0, 0, 1).applyMatrix4(this.camera.matrixWorld),
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

      if (this.mousePoints.length >= 2 && !this.is3DView) {
        // this.clearTemporaryPoint()
        this.addLineData(
          this.mousePoints[this.mousePoints.length - 2],
          this.mousePoints[this.mousePoints.length - 1],
          this.currentWidth,
          this.currentAlignment
        )
        this.clearScene(this.scene)

        // this.linesArray.forEach((line) => this.wallDrawer.drawWalls(line))

        //temp check
        for (let i = 0; i < this.linesArray.length; i++) {
          const line = this.linesArray[i]
          const nextLine = this.linesArray[i + 1]

          this.wallDrawer.drawWalls(line, nextLine)
        }

        //temp check
      }
    }
  }
  handleTemporaryLine(event) {
    if (!this.is3DView && MouseClickActivity.isMouseDownVar) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      const raycaster = new THREE.Raycaster()
      raycaster.setFromCamera(mouse, this.camera)
      const intersection = new THREE.Vector3()
      raycaster.ray.intersectPlane(
        new THREE.Plane(
          new THREE.Vector3(0, 0, 1).applyMatrix4(this.camera.matrixWorld),
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

  //   createTemporaryLine(start, end) {
  //     const geometry = new THREE.BufferGeometry().setFromPoints([start, end])
  //     const lineMaterial = new THREE.LineBasicMaterial({
  //       color: 'grey',
  //     })
  //     this.temporaryLine = new THREE.LineSegments(geometry, lineMaterial)
  //     this.scene.add(this.temporaryLine)
  //   }

  clearTemporaryLine() {
    if (this.temporaryLine) {
      this.scene.remove(this.temporaryLine)
      this.temporaryLine.geometry.dispose()
      this.temporaryLine.material.dispose()
      this.temporaryLine = null
    }
  }
  createTemporaryLine(start, end) {
    const direction = new THREE.Vector3().copy(end).sub(start).normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    const wallWidth = 0.025 * this.currentWidth
    // const direction = new THREE.Vector3().copy(end).sub(start).normalize()

    // const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    // const wallWidth = 0.025 * this.currentWidth
    // const p1 = new THREE.Vector3()
    //   .copy(start)
    //   .addScaledVector(perpendicular, wallWidth / 2)
    // const p2 = new THREE.Vector3()
    //   .copy(end)
    //   .addScaledVector(perpendicular, wallWidth / 2)
    // const p3 = new THREE.Vector3()
    //   .copy(end)
    //   .addScaledVector(perpendicular, -wallWidth / 2)
    // const p4 = new THREE.Vector3()
    //   .copy(start)
    //   .addScaledVector(perpendicular, -wallWidth / 2)

    // const shape = new THREE.Shape([p1, p2, p3, p4])

    // const extrudeSettings = {
    //   depth: 0.5,
    //   bevelEnabled: false,
    // }
    // const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    // this.temporaryLine = new THREE.Mesh(geometry, this.material)
    // this.scene.add(this.temporaryLine)

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
      const shape = new THREE.Shape([p1, p2, p3, p4])
      const extrudeSettings = { depth: 0.5, bevelEnabled: false }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      this.temporaryLine = new THREE.Mesh(geometry, this.material)
      this.scene.add(this.temporaryLine)
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

      const shape = new THREE.Shape([p1, p2, p3, p4])

      const extrudeSettings = { depth: 0.5, bevelEnabled: false }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      this.temporaryLine = new THREE.Mesh(geometry, this.material)
      this.scene.add(this.temporaryLine)
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

      const shape = new THREE.Shape([p1, p2, p3, p4])

      const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: false,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      this.temporaryLine = new THREE.Mesh(geometry, this.material)
      this.scene.add(this.temporaryLine)
    }
  }

  addEventListeners() {
    if (!this.is3DView) {
      document.addEventListener('mousemove', (event) =>
        this.handleTemporaryLine(event)
      )
      document.addEventListener('mousedown', this.onMouseDown.bind(this))
      document.addEventListener('mouseup', this.onMouseUp.bind(this))
    }
    document.getElementById('threeDToggleBtn').addEventListener('click', () => {
      switchTo3DView()
    })

    document
      .getElementById('threeDOutlineBtn')
      .addEventListener('click', () => this.switchTo3DOutline())

    document
      .getElementById('correctedWallTaskBtn')
      .addEventListener('click', () => {
        if (this.is3DView) {
          this.clearScene(this.scene)
          this.linesArray.forEach((line) =>
            this.wallDrawer.correctedWallIn3DView(line)
          )
        }
      })

    document
      .getElementById('wallWidthRange')
      .addEventListener('input', (event) => {
        this.currentWidth = parseFloat(event.target.value)
      })

    document.getElementById('clearAllBtn').addEventListener('click', () => {
      if (!this.is3DView) {
        this.linesArray.length = 0
        this.clearScene(this.scene)
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
  }
}

export { MouseClickActivity }
