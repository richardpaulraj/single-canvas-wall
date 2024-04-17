import * as THREE from 'three'

class TemporaryLine {

    constructor() {}

    handleTemporaryLine(event) {
        if (!wallEditor.is3DView && wallEditor.isMouseDown) {
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
    
          if (wallEditor.mousePoints.length === 0) {
            wallEditor.mousePoints.push(intersection)
          } else {
            this.clearTemporaryLine()
            this.createTemporaryLine(
              wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
              intersection
            )
          }
        }
    }
    clearTemporaryLine() {
        if (wallEditor.temporaryLine) {
          wallEditor.scene.remove(wallEditor.temporaryLine)
          wallEditor.temporaryLine.geometry.dispose()
          wallEditor.temporaryLine.material.dispose()
          wallEditor.temporaryLine = null
        }
    }
    createTemporaryLine(start, end) {
        const direction = new THREE.Vector3().copy(end).sub(start).normalize()
    
        const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
        const wallWidth = 0.025 * wallEditor.currentWidth
        wallEditor.material.color.set(wallEditor.color)
    
        if (wallEditor.currentAlignment === 'Top') {
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
        } else if (wallEditor.currentAlignment === 'Bottom') {
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
        } else if (wallEditor.currentAlignment === 'Center') {
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
        wallEditor.temporaryLine = new THREE.Mesh(geometry, wallEditor.material)
        wallEditor.scene.add(wallEditor.temporaryLine)
    }

}

export default TemporaryLine
