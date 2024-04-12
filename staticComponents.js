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
  toggleBtns3D() {
    document.getElementById('threeDToggleBtn').textContent = 'Change to 2D View'
    document.getElementById('correctedWallTaskBtn').style.display = 'block'
    document.getElementById('wallWidth').style.display = 'none'
    document.getElementById('clearAllBtn').style.display = 'none'
    document.getElementById('alignments').style.display = 'none'
    document.getElementById('wallPatterns').style.display = 'none'
    document.getElementById('colors').style.display = 'none'
    document.getElementById('spaceBetweenLines').style.display = 'none'
  }
  toggleBtns2D() {
    document.getElementById('threeDToggleBtn').textContent = 'Change to 3D View'
    document.getElementById('correctedWallTaskBtn').style.display = 'none'
    document.getElementById('wallWidth').style.display = 'block'
    document.getElementById('clearAllBtn').style.display = 'block'
    document.getElementById('alignments').style.display = 'block'
    document.getElementById('wallPatterns').style.display = 'block'
    document.getElementById('colors').style.display = 'block'
    document.getElementById('spaceBetweenLines').style.display = 'block'
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
