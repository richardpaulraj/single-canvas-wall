import * as THREE from 'three'

class WallDrawer {
  constructor(scene, material) {
    this.scene = scene
    this.material = material
  }

  drawWalls(line, nextLine) {
    //nextLine is created to check the intersection point for miter join
    const direction = new THREE.Vector3()
      .copy(line.end)
      .sub(line.start)
      .normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    const wallWidth = 0.025 * line.width

    // // Calculate intersection point if next line exists
    // if (nextLine) {
    //   const intersection = this.calculateIntersection(
    //     line.start,
    //     line.end,
    //     nextLine.start,
    //     nextLine.end
    //   )
    //   if (intersection) {
    //     console.log('Intersection Point:', intersection)
    //   } else {
    //     console.log('Lines are parallel or do not intersect.')
    //   }
    // }

    //This code is used to check endpoints
    // if (nextLine && line.end.distanceTo(nextLine.start) < Number.EPSILON) {
    //   console.log('Endpoints overlap')
    // }
    if (line.alignment === 'Top') {
      const p1 = new THREE.Vector3()
        .copy(line.start)
        .addScaledVector(perpendicular, -wallWidth)
      const p2 = new THREE.Vector3()
        .copy(line.end)
        .addScaledVector(perpendicular, -wallWidth)
      const p3 = new THREE.Vector3().copy(line.end)
      // .addScaledVector(perpendicular, -wallWidth / 2)
      const p4 = new THREE.Vector3().copy(line.start)
      // .addScaledVector(perpendicular, -wallWidth / 2)
      const shape = new THREE.Shape([p1, p2, p3, p4])
      const extrudeSettings = { depth: 0.5, bevelEnabled: false }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const wall = new THREE.Mesh(geometry, this.material)
      this.scene.add(wall)
    } else if (line.alignment === 'Bottom') {
      const p1 = new THREE.Vector3().copy(line.start)
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p2 = new THREE.Vector3().copy(line.end)
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p3 = new THREE.Vector3()
        .copy(line.end)
        .addScaledVector(perpendicular, wallWidth)
      const p4 = new THREE.Vector3()
        .copy(line.start)
        .addScaledVector(perpendicular, wallWidth)

      const shape = new THREE.Shape([p1, p2, p3, p4])

      const extrudeSettings = { depth: 0.5, bevelEnabled: false }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
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

      const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: false,
      }
      const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
      const wall = new THREE.Mesh(geometry, this.material)
      this.scene.add(wall)
    }
  }
  correctedWallIn3DView(line) {
    const direction = new THREE.Vector3()
      .copy(line.end)
      .sub(line.start)
      .normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
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
    const wall = new THREE.Mesh(geometry, this.material)
    this.scene.add(wall)
  }

  //   calculateIntersection(P1, P2, Q1, Q2) {
  //     const v1 = new THREE.Vector2().copy(P2).sub(P1)
  //     const v2 = new THREE.Vector2().copy(Q2).sub(Q1)

  //     const D = v1.x * v2.y - v1.y * v2.x

  //     if (Math.abs(D) < Number.EPSILON) {
  //       return null
  //     }

  //     const D1 = (Q1.x - P1.x) * v2.y - (Q1.y - P1.y) * v2.x
  //     const D2 = v1.x * (Q1.y - P1.y) - v1.y * (Q1.x - P1.x)

  //     const t1 = D1 / D
  //     const t2 = D2 / D

  //     if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
  //       const intersection = new THREE.Vector2(P1.x + t1 * v1.x, P1.y + t1 * v1.y)
  //       return intersection
  //     } else {
  //       return null
  //     }
  //   }
}

export default WallDrawer
