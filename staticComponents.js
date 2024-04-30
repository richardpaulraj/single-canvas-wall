class StaticComponents {
  constructor() {}

  clearScene(scene) {
    scene.children.length = 0;
    wallEditor.dotsGroup.clear();
    wallEditor.firstNewP1 = null;
    wallEditor.lastEndPoint = null;
    wallEditor.subAreafirstLineDrawn = false;
    wallEditor.allVerticesofSubArea = [];

    wallEditor.isSubAreaActivated = false;
  }

  addLineData(object2D, object3D, visible2D, visible3D) {
    wallEditor.linesArray.push({
      subAreaGroupID: wallEditor.isSubAreaActivated
        ? wallEditor.subAreaGroupID
        : null,
      subAreaOutlineMesh: wallEditor.isSubAreaActivated
        ? wallEditor.subAreaOutlineMesh
        : null,
      
      subAreaDotsGroups: wallEditor.subAreaDotsGroups,

      start: wallEditor.mousePoints[wallEditor.mousePoints.length - 2],
      end: wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
      width: wallEditor.currentWidth,
      alignment: wallEditor.currentAlignment,
      color: wallEditor.color,
      wallPatternSpaceBetweenLines: wallEditor.spaceBetweenLines,
      wallPattern: wallEditor.currentWallPattern,
      wallType: wallEditor.wallType,

      object2D,
      object3D,
      visible2D,
      visible3D,
    });
  }

  animate() {
    const animate = () => {
      requestAnimationFrame(animate);
      if (wallEditor.controls) {
        wallEditor.controls.update();
      }
      wallEditor.renderer.render(wallEditor.scene, wallEditor.camera);
    };
    animate();
  }
}

export default StaticComponents;
