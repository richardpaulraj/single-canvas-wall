import * as THREE from 'three'

class WallDrawer extends THREE.Object3D {
  constructor() {
    super()
    this.wallEdge3DMesh = new THREE.Mesh(new THREE.BufferGeometry())

    // Add the wall to the scene
    this.add(this.wallEdge3DMesh)
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
        this.createCrissCross(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
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
        this.createCrissCross(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
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
        this.createSolidFill(p1, p2, p3, p4, line.color, line.width)
      } else if (wallEditor.currentWallPattern === 'whiteFill') {
        this.createWhiteFill(p1, p2, p3, p4, line.color)
      } else if (wallEditor.currentWallPattern === 'crissCross') {
        this.createCrissCross(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
      } else if (wallEditor.currentWallPattern === 'lines') {
        this.createLinesPattern(
          p1,
          p2,
          p3,
          p4,
          line.color,
          line.width,
          line.alignment
        )
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
    const wall = new THREE.Mesh(geometry, material)
    wallEditor.scene.add(wall)
  }

  // createSolidFillPreviousLine(previousLine) {
  //   const direction = new THREE.Vector3()
  //     .copy(previousLine.end)
  //     .sub(previousLine.start)
  //     .normalize()
  //   const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
  //   const wallWidth = 0.025 * previousLine.width

  //   let p1 = new THREE.Vector3()
  //     .copy(previousLine.start)
  //     .addScaledVector(perpendicular, wallWidth / 2)
  //   let p2 = new THREE.Vector3()
  //     .copy(previousLine.end)
  //     .addScaledVector(perpendicular, wallWidth / 2)
  //   let p3 = new THREE.Vector3()
  //     .copy(previousLine.end)
  //     .addScaledVector(perpendicular, -wallWidth / 2)
  //   let p4 = new THREE.Vector3()
  //     .copy(previousLine.start)
  //     .addScaledVector(perpendicular, -wallWidth / 2)

  //   if (Math.abs(previousLine.start.y - previousLine.end.y) < 0.1) {
  //     // if horizontal
  //     p2.add(new THREE.Vector3(wallWidth / 2, 0, 0))
  //     p3.sub(new THREE.Vector3(wallWidth / 2, 0, 0))
  //   } else if (Math.abs(previousLine.start.x - previousLine.end.x) < 0.05) {
  //     // If vertical
  //     p1.add(new THREE.Vector3(0, wallWidth / 2, 0))
  //     p4.sub(new THREE.Vector3(0, wallWidth / 2, 0))
  //   }

  //   const shape = new THREE.Shape([p1, p2, p3, p4])
  //   const extrudeSettings = {
  //     depth: 0.5, // wall height
  //     bevelEnabled: false,
  //   }
  //   const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  //   const material = new THREE.MeshBasicMaterial({
  //     color: color,
  //     side: THREE.DoubleSide,
  //     // wireframe: true,
  //   })
  //   const wall = new THREE.Mesh(geometry, material)
  //   wallEditor.scene.add(wall)
  // }

  // createSolidFill(line, color, previousLine) {
  //   const direction = new THREE.Vector3()
  //     .copy(line.end)
  //     .sub(line.start)
  //     .normalize()
  //   const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0)
  //   const wallWidth = 0.025 * line.width

  //   let p1 = new THREE.Vector3()
  //     .copy(line.start)
  //     .addScaledVector(perpendicular, wallWidth / 2)
  //   let p2 = new THREE.Vector3()
  //     .copy(line.end)
  //     .addScaledVector(perpendicular, wallWidth / 2)
  //   let p3 = new THREE.Vector3()
  //     .copy(line.end)
  //     .addScaledVector(perpendicular, -wallWidth / 2)
  //   let p4 = new THREE.Vector3()
  //     .copy(line.start)
  //     .addScaledVector(perpendicular, -wallWidth / 2)

  //   // Check if the new line's start point matches the end point of the previous line
  //   if (wallEditor.previousEndPoints.length > 0) {
  //     const prevEndPoint =
  //       wallEditor.previousEndPoints[wallEditor.previousEndPoints.length - 1]

  //     if (
  //       Math.abs(prevEndPoint.x - line.start.x) < 0.01 &&
  //       Math.abs(prevEndPoint.y - line.start.y) < 0.01
  //     ) {
  //       console.log('Lines drawn from endpoints of each other.')
  //       wallEditor.isLineConnected = true
  //     }
  //   }

  //   if (
  //     Math.abs(line.start.y - line.end.y) < 0.1 &&
  //     wallEditor.isLineConnected
  //   ) {
  //     // if horizontal
  //     p2.add(new THREE.Vector3(wallWidth / 2, 0, 0))
  //     p3.sub(new THREE.Vector3(wallWidth / 2, 0, 0))
  //   } else if (
  //     Math.abs(line.start.x - line.end.x) < 0.05 &&
  //     wallEditor.isLineConnected
  //   ) {
  //     // If vertical
  //     p1.add(new THREE.Vector3(0, wallWidth / 2, 0))
  //     p4.sub(new THREE.Vector3(0, wallWidth / 2, 0))
  //   }
  //   wallEditor.isLineConnected = false

  //   const shape = new THREE.Shape([p1, p2, p3, p4])
  //   const extrudeSettings = {
  //     depth: 0.5, // wall height
  //     bevelEnabled: false,
  //   }
  //   const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
  //   const material = new THREE.MeshBasicMaterial({
  //     color: color,
  //     side: THREE.DoubleSide,
  //     // wireframe: true,
  //   })
  //   const wall = new THREE.Mesh(geometry, material)
  //   wallEditor.scene.add(wall)

  //   // Add current line's end point to the previousEndPoints array
  //   wallEditor.previousEndPoints.push(line.end.clone())
  // }

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
      1, // Line segment from Vertex 0 to Vertex 1
      1,
      2, // Line segment from Vertex 1 to Vertex 2
      2,
      3,
      3,
      0,
    ]

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

    const wall = new THREE.Line(geometry, material)
    wallEditor.scene.add(wall)
  }
  createCrissCross(p1, p2, p3, p4, color, width, alignment) {
    console.log(alignment)
    const FIXED_TEXTURE_SIZE = 8 // Fixed texture size
    const TEXTURE_SCALE_FACTOR = 5 // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - wallEditor.spaceBetweenLines) // Factor to increase line spacing for top , bottom remove minus
    if (alignment !== 'Center') {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR)
    }

    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(`/textures/${color}Cross.jpg`)
    texture.colorSpace = THREE.SRGBColorSpace

    const colorTexture = textureLoader.load(`/textures/${color}Cross.jpg`)
    colorTexture.colorSpace = THREE.SRGBColorSpace

    // Adjust texture filtering
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    // Calculate UV scale based on fixed texture size and scale factor
    const uvScale = (FIXED_TEXTURE_SIZE / 10) * TEXTURE_SCALE_FACTOR

    const uvs = [
      0,
      0,
      uvScale,
      0,
      uvScale,
      LINE_SPACING_FACTOR,
      0,
      LINE_SPACING_FACTOR,

      0,
      0,
      uvScale,
      0,
      uvScale,
      LINE_SPACING_FACTOR,
      0,
      LINE_SPACING_FACTOR,
    ]

    // Calculate wall length and width
    const wallLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
    const wallWidth = 0.025 * width

    // Calculate texture repeat based on fixed texture size and scale factor
    const textureRepeatX =
      (wallLength / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR
    const textureRepeatY =
      (wallWidth / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR

    colorTexture.repeat.set(textureRepeatX, textureRepeatY)
    colorTexture.wrapS = THREE.RepeatWrapping
    colorTexture.wrapT = THREE.RepeatWrapping

    const vertices = [
      // Bottom face
      p1.x,
      p1.y,
      0,
      p2.x,
      p2.y,
      0,
      p3.x,
      p3.y,
      0,
      p4.x,
      p4.y,
      0,

      // Top face
      p1.x,
      p1.y,
      0.5,
      p2.x,
      p2.y,
      0.5,
      p3.x,
      p3.y,
      0.5,
      p4.x,
      p4.y,
      0.5,
    ]

    const indices = [
      // Top face
      4, 5, 6, 4, 6, 7,

      // Bottom face
      0, 1, 2, 0, 2, 3,

      // Side faces
      0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3, 3, 7, 0, 7, 4,
    ]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.setIndex(indices)

    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: colorTexture,
      // color: color,
    })

    const wall = new THREE.Mesh(geometry, material)

    wallEditor.scene.add(wall)
  }
  createLinesPattern(p1, p2, p3, p4, color, width, alignment) {
    const FIXED_TEXTURE_SIZE = 8
    const TEXTURE_SCALE_FACTOR = 5 // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - wallEditor.spaceBetweenLines) // Factor to increase line spacing for top , bottom remove minus
    if (alignment !== 'Center') {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR)
    }

    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(`/textures/${color}Stripe.jpg`)
    texture.colorSpace = THREE.SRGBColorSpace

    const colorTexture = textureLoader.load(`/textures/${color}Stripe.jpg`)
    colorTexture.colorSpace = THREE.SRGBColorSpace

    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter

    const uvScale = (FIXED_TEXTURE_SIZE / 10) * TEXTURE_SCALE_FACTOR

    const uvs = [
      0,
      0,
      uvScale,
      0,
      uvScale,
      LINE_SPACING_FACTOR,
      0,
      LINE_SPACING_FACTOR,

      0,
      0,
      uvScale,
      0,
      uvScale,
      LINE_SPACING_FACTOR,
      0,
      LINE_SPACING_FACTOR,
    ]

    const wallLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
    const wallWidth = 0.025 * width

    // Calculate texture repeat based on fixed texture size and scale factor
    const textureRepeatX =
      (wallLength / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR
    const textureRepeatY =
      (wallWidth / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR

    colorTexture.repeat.set(textureRepeatX, textureRepeatY)
    colorTexture.wrapS = THREE.RepeatWrapping
    colorTexture.wrapT = THREE.RepeatWrapping

    const vertices = [
      // Bottom face
      p1.x,
      p1.y,
      0,
      p2.x,
      p2.y,
      0,
      p3.x,
      p3.y,
      0,
      p4.x,
      p4.y,
      0,

      // Top face
      p1.x,
      p1.y,
      0.5,
      p2.x,
      p2.y,
      0.5,
      p3.x,
      p3.y,
      0.5,
      p4.x,
      p4.y,
      0.5,
    ]

    const indices = [
      // Top face
      4, 5, 6, 4, 6, 7,

      // Bottom face
      0, 1, 2, 0, 2, 3,

      // Side faces
      0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3, 3, 7, 0, 7, 4,
    ]

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )
    geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
    geometry.setIndex(indices)

    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: colorTexture,
      // color: color,
    })

    const wall = new THREE.Mesh(geometry, material)

    wallEditor.scene.add(wall)
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

// // Assuming you have a DrawingManager class that handles user input and line drawing

// class DrawingManager {
//   constructor() {
//     this.vertices = [];
//     this.geometry = new THREE.BufferGeometry();
//   }

//   addVertex(x, y, z) {
//     const vertex = new THREE.Vector3(x, y, z);
//     if (this.vertices.length > 0) {
//       const lastVertex = this.vertices[this.vertices.length - 1];
//       this.vertices.push(vertex);
//       this.updateGeometry(lastVertex, vertex);
//     } else {
//       this.vertices.push(vertex);
//     }
//   }

//   updateGeometry(start, end) {
//     const positions = this.geometry.attributes.position.array;
//     positions.push(start.x, start.y, start.z);
//     positions.push(end.x, end.y, end.z);
//     this.geometry.attributes.position.needsUpdate = true;
//   }

//   // ... other methods for handling user input and rendering
// }
//this code  for the first line whihc create buffer Geometry//
