import * as THREE from 'three'

class WallDrawer extends THREE.Object3D {
  constructor() {
    super()
    this.wallEdge3DMesh = new THREE.Mesh(new THREE.BufferGeometry())

    // Add the wall to the scene
    this.add(this.wallEdge3DMesh)
  }

  drawCurrentWall(){

  }

  draw2DWall(line) {
    const direction = new THREE.Vector3()
      .copy(line.end)
      .sub(line.start)
      .normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    const wallWidth = 0.025 * line.width

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
      if (wallEditor.currentWallPattern === 'solidFill') {
        this.createSolidFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'whiteFill') {
        this.createWhiteFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'crissCross') {
        this.createCrissCross(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(p1, p2, p3, p4, line.color)
      }
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

      if (wallEditor.currentWallPattern === 'solidFill') {
        this.createSolidFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'whiteFill') {
        this.createWhiteFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'crissCross') {
        this.createCrissCross(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(p1, p2, p3, p4, line.color)
      }
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
      if (wallEditor.currentWallPattern === 'solidFill') {
        this.createSolidFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'whiteFill') {
        this.createWhiteFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'crissCross') {
        this.createCrissCross(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(p1, p2, p3, p4, line.color)
      }
    }
  }

  draw3DWall(line) {
    const direction = new THREE.Vector3()
      .copy(line.end)
      .sub(line.start)
      .normalize()

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
    const wallWidth = 0.025 * line.width
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

      this.createSolidFill(p1, p2, p3, p4, line.color)
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

      this.createSolidFill(p1, p2, p3, p4, line.color)
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

      this.createSolidFill(p1, p2, p3, p4, line.color)
    }
  }

  createSolidFill(p1, p2, p3, p4, color) {
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
      // (Vertex 0 to Vertex 3) forms the bottom face of the solid fill

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
      // These lines define the coordinates of the same four vertices (Vertex 4 to Vertex 7) but with a z-coordinate of 0.5.
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
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    })
    // console.log(line)
    // Create a Mesh
    const wall = new THREE.Mesh(geometry, material)

    // // Add the wall to the scene
    wallEditor.scene.add(wall)
  }
  createWhiteFill(p1, p2, p3, p4, color) {
    // Define vertices for the wall outline
    const vertices = [
      p1.x,
      p1.y,
      p1.z, // Vertex 0
      p2.x,
      p2.y,
      p2.z, // Vertex 1
      p3.x,
      p3.y,
      p3.z, // Vertex 2
      p4.x,
      p4.y,
      p4.z, // Vertex 3
    ]

    // Define indices for the wall outline
    const indices = [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0, // Outline indices
    ]

    //diagonal lines
    // Add diagonals to create a cage-like appearance
    //   indices.push(0, 2, 1, 3) // Diagonal from p1 to p3 and p2 to p4

    //diagonal lines

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setIndex(indices)
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    })

    // Create a LineSegments object
    const wall = new THREE.Line(geometry, material)

    // Add the wall to the scene
    wallEditor.scene.add(wall)
  }
  createCrissCross(p1, p2, p3, p4, color) {
    // Define vertices for the wall outline
    const vertices = [
      p1.x,
      p1.y,
      p1.z, // Vertex 0
      p2.x,
      p2.y,
      p2.z, // Vertex 1
      p3.x,
      p3.y,
      p3.z, // Vertex 2
      p4.x,
      p4.y,
      p4.z, // Vertex 3
    ]

    // Define indices for the wall outline
    const indices = [
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0, // Outline indices
    ]

    //diagonal lines
    // Add diagonals to create a cage-like appearance
    indices.push(0, 2, 1, 3) // Diagonal from p1 to p3 and p2 to p4

    //diagonal lines

    // Create buffer geometry
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setIndex(indices)
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    })

    // Create a LineSegments object
    const wall = new THREE.LineSegments(geometry, material)

    // Add the wall to the scene
    wallEditor.scene.add(wall)
  }
  createLinesPattern(p1, p2, p3, p4, color, numLines = 20) {
    // Define vertices for the wall outline
    const vertices = [
      p1.x,
      p1.y,
      p1.z, // Vertex 0 (p1)
      p2.x,
      p2.y,
      p2.z, // Vertex 1 (p2)
      p3.x,
      p3.y,
      p3.z, // Vertex 2 (p3)
      p4.x,
      p4.y,
      p4.z, // Vertex 3 (p4)
    ]

    // Add vertices for the internal lines
    for (let i = 0; i <= numLines; i++) {
      const t = i / numLines // Interpolation factor
      const p5 = p1.clone().lerp(p2, t)
      const p6 = p4.clone().lerp(p3, t)

      // Add vertices for the line segment
      vertices.push(p5.x, p5.y, p5.z, p6.x, p6.y, p6.z)
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    const material = new THREE.MeshBasicMaterial({
      color: color,
      side: THREE.DoubleSide,
    })

    const line = new THREE.Line(geometry, material)
    wallEditor.scene.add(line)
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
    const wall = new THREE.Mesh(geometry, wallEditor.material)
    wallEditor.scene.add(wall)
  }
}

export default WallDrawer
