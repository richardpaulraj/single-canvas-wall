class StaticComponents {
  constructor() {}

  clearScene(scene) {
    scene.children.length = 0
  }

  addLineData() {
    wallEditor.linesArray.push({
      start: wallEditor.mousePoints[wallEditor.mousePoints.length - 2],
      end: wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
      width: wallEditor.currentWidth,
      alignment: wallEditor.currentAlignment,
      color: wallEditor.color,
      wallPatternSpaceBetweenLines: wallEditor.spaceBetweenLines,
      wallPattern : wallEditor.currentWallPattern
    })
  }

  animate() {
    const animate = () => {
      requestAnimationFrame(animate)
      if (wallEditor.controls) {
        wallEditor.controls.update()
      }
      wallEditor.renderer.render(wallEditor.scene, wallEditor.camera)
    }
    animate()
  }
}

export default StaticComponents
