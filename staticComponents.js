class StaticComponents {
  constructor(material) {
    this.material = material
  }

  switchTo3DOutline() {
    this.material.wireframe = !this.material.wireframe
    const threeDOutlineBtn = document.getElementById('threeDOutlineBtn')
    if (threeDOutlineBtn) {
      threeDOutlineBtn.textContent = `Wall Outline - ${
        this.material.wireframe ? 'ON' : 'OFF'
      }`
    }
  }

  clearScene(scene) {
    scene.children.length = 0
  }
}

export default StaticComponents

///Checkpoint

//Checkpoint
