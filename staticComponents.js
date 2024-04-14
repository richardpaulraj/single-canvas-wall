class StaticComponents {
  constructor() {}

  clearScene(scene) {
    scene.children.length = 0
  }

  addLineData(startPoint, endPoint, lineWidth, alignment, color) {
    wallEditor.linesArray.push({
      start: startPoint,
      end: endPoint,
      width: lineWidth,
      alignment: alignment,
      color: color,
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
