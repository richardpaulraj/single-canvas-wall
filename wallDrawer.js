import * as THREE from 'three'

class WallDrawer {
  constructor(scene, material) {
    this.scene = scene
    this.material = material
  }

  drawWalls(line) {
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
      const wall = new THREE.Mesh(geometry, this.material)
      this.scene.add(wall)
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
      const wall = new THREE.Mesh(geometry, this.material)
      this.scene.add(wall)
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
      const wall = new THREE.Mesh(geometry, this.material)
      this.scene.add(wall)
    }
  }
}

export default WallDrawer
