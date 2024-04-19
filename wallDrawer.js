//1 forloop
import * as THREE from 'three'

import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';


class WallDrawer extends THREE.Object3D {
  constructor() {
    super()
    this.wallEdge3DMesh = new THREE.Mesh(new THREE.BufferGeometry())
    this.add(this.wallEdge3DMesh)
    
  }

  draw2DWall(line) {
    console.log(line)
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
      if (line.wallPattern === 'solidFill') {
        this.createSolidFill(p1, p2, p3, p4, line.color);
       this.createWallOutline(p1, p2, p3, p4, line.color);
      } else if (line.wallPattern === 'whiteFill') {
        this.createWhiteFill(p1, p2, p3, p4, line.color);
      } else if (line.wallPattern === 'crissCross') {
        this.createCrissCross(p1, p2, p3, p4, line);
      } else if (line.wallPattern === 'lines') {
        this.createLinesPattern(p1, p2, p3, p4, line);
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

        if (line.wallPattern === 'solidFill') {
          this.createSolidFill(p1, p2, p3, p4, line.color);
          this.createWallOutline(p1, p2, p3, p4, line.color);
        } else if (line.wallPattern === 'whiteFill') {
          this.createWhiteFill(p1, p2, p3, p4, line.color);
        } else if (line.wallPattern === 'crissCross') {
          this.createCrissCross(p1, p2, p3, p4, line);
        } else if (line.wallPattern === 'lines') {
          this.createLinesPattern(p1, p2, p3, p4, line);
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
        if (line.wallPattern === 'solidFill') {
          this.createSolidFill(p1, p2, p3, p4, line.color);
          // wallEditor.tempArr.push(this.createSolidFill(p1, p2, p3, p4, line.color))

          // console.log(this.createSolidFill(p1, p2, p3, p4, line.color))
          this.createWallOutline(p1, p2, p3, p4, line.color);
        } else if (line.wallPattern === 'whiteFill') {
          this.createWhiteFill(p1, p2, p3, p4, line.color);
        } else if (line.wallPattern === 'crissCross') {
          this.createCrissCross(p1, p2, p3, p4, line);
        } else if (line.wallPattern === 'lines') {
          this.createLinesPattern(p1, p2, p3, p4, line);
        }
    }
    // console.log(wallEditor.tempArr)
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

    // this.createWallOutline(p1, p2, p3, p4, color)
    return wall
  }

  // createWhiteFill(p1, p2, p3, p4, color) {
  //   // Define vertices for the wall outline
  //   const vertices = [
  //     p1.x,
  //     p1.y,
  //     p1.z, // Vertex 0
  //     p2.x,
  //     p2.y,
  //     p2.z, // Vertex 1
  //     p3.x,
  //     p3.y,
  //     p3.z, // Vertex 2
  //     p4.x,
  //     p4.y,
  //     p4.z, // Vertex 3
  //   ]

  //   // Define indices for the wall outline
  //   const indices = [
  //     0,
  //     1, // Line segment from Vertex 0 to Vertex 1
  //     1,
  //     2, // Line segment from Vertex 1 to Vertex 2
  //     2,
  //     3,
  //     3,
  //     0,
  //   ]

  //   const geometry = new THREE.BufferGeometry()
  //   geometry.setAttribute(
  //     'position',
  //     new THREE.Float32BufferAttribute(vertices, 3)
  //   )
  //   geometry.setIndex(indices)
  //   const material = new THREE.MeshBasicMaterial({
  //     color: color,
  //     side: THREE.DoubleSide,
      
  //   })

  //   const wall = new THREE.Line(geometry, material)
  //   wallEditor.scene.add(wall)
  // }

  createWhiteFill(p1, p2, p3, p4, color) {
    this.createWallOutline(p1, p2, p3, p4, color)
  }
  createCrissCross(p1, p2, p3, p4,line) {
    const FIXED_TEXTURE_SIZE = 8 // Fixed texture size
    const TEXTURE_SCALE_FACTOR = 5 // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - line.wallPatternSpaceBetweenLines) // Factor to increase line spacing for top , bottom remove minus
    if (line.alignment !== 'Center') {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR)
    }

    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(`/textures/${line.color}Cross.jpg`)
    texture.colorSpace = THREE.SRGBColorSpace

    const colorTexture = textureLoader.load(`/textures/${line.color}Cross.jpg`)
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
    const wallWidth = 0.025 * line.width

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
    })

    const wall = new THREE.Mesh(geometry, material)

    wallEditor.scene.add(wall)

    // Create wall outline
    this.createWallOutline(p1,p2,p3,p4, line.color)
  
  }

  
  createWallOutline(p1, p2, p3, p4, color) {
    // Define the four corner points of the wall
    const cornerPoints = [
      { x: p1.x, y: p1.y },
      { x: p2.x, y: p2.y },
      { x: p3.x, y: p3.y },
      { x: p4.x, y: p4.y }
    ];
  
    // Calculate center points
    const centerPoints = [
      {
        x: (cornerPoints[0].x + cornerPoints[1].x) / 2,
        y: (cornerPoints[0].y + cornerPoints[1].y) / 2
      },
      {
        x: (cornerPoints[1].x + cornerPoints[2].x) / 2,
        y: (cornerPoints[1].y + cornerPoints[2].y) / 2
      },
      {
        x: (cornerPoints[2].x + cornerPoints[3].x) / 2,
        y: (cornerPoints[2].y + cornerPoints[3].y) / 2
      },
      {
        x: (cornerPoints[3].x + cornerPoints[0].x) / 2,
        y: (cornerPoints[3].y + cornerPoints[0].y) / 2
      },
    ];
  
    const outlineVertices = [
      cornerPoints[0].x, cornerPoints[0].y, 0,
      cornerPoints[1].x, cornerPoints[1].y, 0,
      cornerPoints[1].x, cornerPoints[1].y, 0,
      cornerPoints[2].x, cornerPoints[2].y, 0,
      cornerPoints[2].x, cornerPoints[2].y, 0,//bottom line
      cornerPoints[3].x, cornerPoints[3].y, 0,
      cornerPoints[3].x, cornerPoints[3].y, 0,//left Line
      cornerPoints[0].x, cornerPoints[0].y, 0,

    ];
  
    // Indices for outline
    const outlineIndices = [
      0, 1, 2, 3, 4, 5, 6, 7,  
    ];
  
    const outlineGeometry = new THREE.BufferGeometry();
    outlineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(outlineVertices, 3));
    outlineGeometry.setIndex(outlineIndices);
  
    const outlineMaterial = new THREE.LineBasicMaterial({ color: color });
  
    const outlineMesh = new THREE.LineSegments(outlineGeometry, outlineMaterial);
  
    // Add corner points as spheres
    const sphereGeometry = new THREE.SphereGeometry(0.01, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: '#9BCF53', depthTest:false }); //This ensures that the dots will be rendered on top of other objects, irrespective of their depth in the scene.
    
  

    // Create a group to hold the spheres

    [...cornerPoints, ...centerPoints].forEach((point) => {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(point.x, point.y, 0);
      wallEditor.dotsGroup.add(sphere);
    });

    wallEditor.dotsGroup.visible = true; // Initially hide the dots
    wallEditor.scene.add(wallEditor.dotsGroup); // Add the dotsGroup to the scene
    wallEditor.scene.add(outlineMesh);
  }

  createLinesPattern(p1, p2, p3, p4, line) {
    const FIXED_TEXTURE_SIZE = 8
    const TEXTURE_SCALE_FACTOR = 5 // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - line.wallPatternSpaceBetweenLines) // Factor to increase line spacing for top , bottom remove minus
    if (line.alignment !== 'Center') {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR)
    }

    const textureLoader = new THREE.TextureLoader()

    const texture = textureLoader.load(`/textures/${line.color}Stripe.jpg`)
    texture.colorSpace = THREE.SRGBColorSpace

    const colorTexture = textureLoader.load(`/textures/${line.color}Stripe.jpg`)
    colorTexture.colorSpace = THREE.SRGBColorSpace

    texture.minFilter = THREE.LinearFilter //minFilter means when the texture is displayed at a size smaller than its original resolution  and THREE.LinearFilter produces smoother texture
    texture.magFilter = THREE.LinearFilter //magFilter means when the texture is displayed at a size larger than its original resolution 

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
    //UV coordinates define how the texture is wrapped around the geometry,
    //the renderer uses these UV coordinates to figure out which part of the texture should be mapped to each vertex of the geometry.

    const wallLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2) 
    //this uses Pythagorean theorem to find distance between two points
    //a2 + b2 = c2  ---> c === wallLength
    const wallWidth = 0.025 * line.width

    // Calculate texture repeat based on fixed texture size and scale factor
    const textureRepeatX =
      (wallLength / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR
    const textureRepeatY =
      (wallWidth / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR

    colorTexture.repeat.set(textureRepeatX, textureRepeatY) //The repeat property determines how many times the texture should be repeated along each axis of the geometry.
    colorTexture.wrapS = THREE.RepeatWrapping //horizontal axis (S)
    colorTexture.wrapT = THREE.RepeatWrapping //vertical axis (T)

    //From this part of the code is mostly related to geometry creation

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

    this.createWallOutline(p1, p2, p3, p4, line.color)
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
