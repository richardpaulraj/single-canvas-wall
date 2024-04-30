import * as THREE from "three";

import WallDrawer from "./wallDrawer.js";
const wallDrawer = new WallDrawer();

class TemporaryLine {
  constructor() {
    this.textureCache = {}; //textureCache is an object that acts as a cache to store loaded textures.
  }

  loadTextureLine(color) {
    const texturePath = `/textures/${color}Stripe.jpg`;

    if (this.textureCache[texturePath]) {
      return this.textureCache[texturePath];
    }

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    this.textureCache[texturePath] = texture;
    return texture;
  }
  loadTextureCross(color) {
    const texturePath = `/textures/${color}Cross.jpg`;

    if (this.textureCache[texturePath]) {
      return this.textureCache[texturePath];
    }

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(texturePath);

    this.textureCache[texturePath] = texture;
    return texture;
  }

  handleTemporaryLine(event) {
    if (
      !wallEditor.is3DView &&
      wallEditor.isMouseDown &&
      !wallEditor.isSubAreaActivated

      // (!wallEditor.is3DView && wallEditor.isSubAreaActivated) ||
      // !wallEditor.is3DView &&
      // wallEditor.isMouseDown
    ) {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, wallEditor.camera);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(
        new THREE.Plane(
          new THREE.Vector3(0, 0, 1).applyMatrix4(
            wallEditor.camera.matrixWorld
          ),
          0
        ),
        intersection
      );

      if (wallEditor.mousePoints.length === 0) {
        wallEditor.mousePoints.push(intersection);
      } else {
        this.clearTemporaryLine();
        this.clearTemporaryOutline();
        this.clearTempDots();
        this.createTemporaryLine(
          wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
          intersection
        );
      }
    }
  }
  clearTemporaryLine() {
    if (wallEditor.temporaryLine) {
      wallEditor.scene.remove(wallEditor.temporaryLine);
      wallEditor.temporaryLine.geometry.dispose();
      wallEditor.temporaryLine.material.dispose();
      wallEditor.temporaryLine = null;
    }
  }
  clearTemporaryOutline() {
    if (wallEditor.temporaryOutline) {
      wallEditor.scene.remove(wallEditor.temporaryOutline);
      wallEditor.temporaryOutline.geometry.dispose();
      wallEditor.temporaryOutline.material.dispose();
      wallEditor.temporaryOutline = null;
    }
  }
  clearTempDots() {
    if (wallEditor.tempDotsGroup) {
      wallEditor.scene.remove(wallEditor.tempDotsGroup);
      wallEditor.tempDotsGroup.children.forEach((dot) => {
        dot.geometry.dispose();
        dot.material.dispose();
      });
      wallEditor.tempDotsGroup = new THREE.Group();
    }
  }
  createTemporaryLine(start, end) {
    this.clearTemporaryLine(); // Ensure any previous temporary line is cleared
    this.clearTemporaryOutline();
    this.clearTempDots();

    const direction = new THREE.Vector3().copy(end).sub(start).normalize();

    const perpendicular = new THREE.Vector3(-direction.y, direction.x, 0);
    const wallWidth = 0.025 * wallEditor.currentWidth;
    wallEditor.material.color.set(wallEditor.color);

    // if (wallEditor.isSubAreaActivated) {
    //   let newP1 = new THREE.Vector3().copy(start)
    //   let newP2 = new THREE.Vector3().copy(end)

    //   const cornerPoints = [{ x: newP2.x, y: newP2.y }]
    //   const outlineVertices = [newP1.x, newP1.y, 0, newP2.x, newP2.y, 0]

    //   const outlineGeometry = new THREE.BufferGeometry()
    //   outlineGeometry.setAttribute(
    //     'position',
    //     new THREE.Float32BufferAttribute(outlineVertices, 3)
    //   )
    //   const outlineMaterial = new THREE.LineBasicMaterial({
    //     color: wallEditor.color,
    //   })
    //   wallEditor.temporaryLine = new THREE.LineSegments(
    //     outlineGeometry,
    //     outlineMaterial
    //   )

    //   const sphereGeometry = new THREE.SphereGeometry(0.01, 32, 32)
    //   const sphereMaterial = new THREE.MeshBasicMaterial({ color: '#9BCF53' })

    //   ;[...cornerPoints].forEach((point) => {
    //     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
    //     sphere.position.set(point.x, point.y, 0)
    //     wallEditor.tempDotsGroup.add(sphere)
    //   })
    //   wallEditor.scene.add(wallEditor.tempDotsGroup)

    //   // wallEditor.temporaryLine = new THREE.Mesh(geometry, material)
    //   wallEditor.scene.add(wallEditor.temporaryLine)
    // }
    if (wallEditor.currentAlignment === "Top") {
      const p1 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, -wallWidth);
      const p2 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, -wallWidth);
      const p3 = new THREE.Vector3().copy(end);
      // .addScaledVector(perpendicular, -wallWidth / 2)
      const p4 = new THREE.Vector3().copy(start);
      // .addScaledVector(perpendicular, -wallWidth / 2)

      // this.createSolidFill(p1, p2, p3, p4)
      // this.createWallOutline(p1, p2, p3, p4)
      if (wallEditor.currentWallPattern === "solidFill") {
        wallDrawer.createSolidFill(p1, p2, p3, p4, wallEditor.color);
      } else if (wallEditor.currentWallPattern === "whiteFill") {
        wallDrawer.createTempWallOutline(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "crissCross") {
        // wallDrawer.createCrissCross(p1, p2, p3, p4)
        this.createCrissCross(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "lines") {
        this.createLinesPattern(p1, p2, p3, p4);
      }
    } else if (wallEditor.currentAlignment === "Bottom") {
      const p1 = new THREE.Vector3().copy(start);
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p2 = new THREE.Vector3().copy(end);
      // .addScaledVector(perpendicular, wallWidth / 2)
      const p3 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, wallWidth);
      const p4 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, wallWidth);

      if (wallEditor.currentWallPattern === "solidFill") {
        wallDrawer.createSolidFill(p1, p2, p3, p4, wallEditor.color);
      } else if (wallEditor.currentWallPattern === "whiteFill") {
        wallDrawer.createTempWallOutline(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "crissCross") {
        // wallDrawer.createCrissCross(p1, p2, p3, p4)
        this.createCrissCross(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "lines") {
        this.createLinesPattern(p1, p2, p3, p4);
      }
    } else if (wallEditor.currentAlignment === "Center") {
      const p1 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, wallWidth / 2);
      const p2 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, wallWidth / 2);
      const p3 = new THREE.Vector3()
        .copy(end)
        .addScaledVector(perpendicular, -wallWidth / 2);
      const p4 = new THREE.Vector3()
        .copy(start)
        .addScaledVector(perpendicular, -wallWidth / 2);

      if (wallEditor.currentWallPattern === "solidFill") {
        wallDrawer.createSolidFill(p1, p2, p3, p4, wallEditor.color);
      } else if (wallEditor.currentWallPattern === "whiteFill") {
        wallDrawer.createTempWallOutline(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "crissCross") {
        // wallDrawer.createCrissCross(p1, p2, p3, p4)
        this.createCrissCross(p1, p2, p3, p4);
      } else if (wallEditor.currentWallPattern === "lines") {
        this.createLinesPattern(p1, p2, p3, p4);
      }
    }
  }

  createCrissCross(p1, p2, p3, p4) {
    const FIXED_TEXTURE_SIZE = 8; // Fixed texture size
    const TEXTURE_SCALE_FACTOR = 5; // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - wallEditor.spaceBetweenLines); // Factor to increase line spacing for top , bottom remove minus
    if (wallEditor.currentAlignment !== "Center") {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR);
    }

    const colorTexture = this.loadTextureCross(wallEditor.color);

    // Calculate UV scale based on fixed texture size and scale factor
    const uvScale = (FIXED_TEXTURE_SIZE / 10) * TEXTURE_SCALE_FACTOR;

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
    ];

    // Calculate wall length and width
    const wallLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const wallWidth = 0.025 * wallEditor.currentWidth;

    // Calculate texture repeat based on fixed texture size and scale factor
    const textureRepeatX =
      (wallLength / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR;
    const textureRepeatY =
      (wallWidth / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR;

    colorTexture.repeat.set(textureRepeatX, textureRepeatY);
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;

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
    ];

    const indices = [
      // Top face
      4, 5, 6, 4, 6, 7,

      // Bottom face
      0, 1, 2, 0, 2, 3,

      // Side faces
      0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3, 3, 7, 0, 7, 4,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: colorTexture,
    });

    // this.createWallOutline(p1, p2, p3, p4)
    wallDrawer.createTempWallOutline(p1, p2, p3, p4);

    wallEditor.temporaryLine = new THREE.Mesh(geometry, material);
    wallEditor.scene.add(wallEditor.temporaryLine);
  }
  createLinesPattern(p1, p2, p3, p4) {
    const FIXED_TEXTURE_SIZE = 8; // Fixed texture size
    const TEXTURE_SCALE_FACTOR = 5; // Texture scale factor to zoom out
    let LINE_SPACING_FACTOR = -(15 - wallEditor.spaceBetweenLines); // Factor to increase line spacing for top , bottom remove minus
    if (wallEditor.currentAlignment !== "Center") {
      LINE_SPACING_FACTOR = Math.abs(LINE_SPACING_FACTOR);
    }

    const colorTexture = this.loadTextureLine(wallEditor.color);

    // Calculate UV scale based on fixed texture size and scale factor
    const uvScale = (FIXED_TEXTURE_SIZE / 10) * TEXTURE_SCALE_FACTOR;

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
    ];

    // Calculate wall length and width
    const wallLength = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const wallWidth = 0.025 * wallEditor.currentWidth;

    // Calculate texture repeat based on fixed texture size and scale factor
    const textureRepeatX =
      (wallLength / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR;
    const textureRepeatY =
      (wallWidth / FIXED_TEXTURE_SIZE) * TEXTURE_SCALE_FACTOR;

    colorTexture.repeat.set(textureRepeatX, textureRepeatY);
    colorTexture.wrapS = THREE.RepeatWrapping;
    colorTexture.wrapT = THREE.RepeatWrapping;

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
    ];

    const indices = [
      // Top face
      4, 5, 6, 4, 6, 7,

      // Bottom face
      0, 1, 2, 0, 2, 3,

      // Side faces
      0, 4, 1, 4, 5, 1, 1, 5, 2, 5, 6, 2, 2, 6, 3, 6, 7, 3, 3, 7, 0, 7, 4,
    ];

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geometry.setIndex(indices);

    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      map: colorTexture,
    });

    // Create wall outline
    // this.createWallOutline(p1,p2,p3,p4)
    // this.createWallOutline(p1, p2, p3, p4)
    wallDrawer.createTempWallOutline(p1, p2, p3, p4);

    wallEditor.temporaryLine = new THREE.Mesh(geometry, material);
    wallEditor.scene.add(wallEditor.temporaryLine);
  }
}

export default TemporaryLine;
