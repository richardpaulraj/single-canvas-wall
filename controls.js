//3 forloops with lines array
//1- corrected wall
// 2 - 3d toggle
// 3- 2d toggle
import * as THREE from "three";
import WallDrawer from "./wallDrawer.js";
import StaticComponents from "./staticComponents.js";
import TemporaryLine from "./tempLine.js";

const wallDrawer = new WallDrawer();
const staticComponents = new StaticComponents();
const temporaryLine = new TemporaryLine();

class MouseClickActivity {
  constructor() {}

  toggleBtns3D() {
    document.getElementById("threeDToggleBtn").textContent =
      "Change to 2D View";
    document.getElementById("correctedWallTaskBtn").style.display = "block";
    document.getElementById("wallWidth").style.display = "none";
    document.getElementById("clearAllBtn").style.display = "none";
    document.getElementById("alignments").style.display = "none";
    document.getElementById("wallPatterns").style.display = "none";
    document.getElementById("colors").style.display = "none";
    document.getElementById("spaceBetweenLines").style.display = "none";
    document.getElementById("subAreaBtn").style.display = "none";
    document.getElementById("tempBtn").style.display = "none";
  }
  toggleBtns2D() {
    document.getElementById("threeDToggleBtn").textContent =
      "Change to 3D View";
    document.getElementById("correctedWallTaskBtn").style.display = "none";
    document.getElementById("wallWidth").style.display = "block";
    document.getElementById("clearAllBtn").style.display = "block";
    document.getElementById("alignments").style.display = "block";
    document.getElementById("wallPatterns").style.display = "block";
    document.getElementById("colors").style.display = "block";
    document.getElementById("spaceBetweenLines").style.display = "block";
    document.getElementById("subAreaBtn").style.display = "block";
    document.getElementById("tempBtn").style.display = "block";
  }

  onMouseDown(event) {
    wallEditor.isMouseDown = true;
    // temporaryLine.clearTemporaryLine()
    temporaryLine.handleTemporaryLine(event);
    wallEditor.lastMouseDownPosition = { x: event.clientX, y: event.clientY };
    if (wallEditor.isSubAreaActivated) {
      wallEditor.wallType = "subArea";
    } else {
      wallEditor.wallType = "wall";
    }
  }
  onMouseMove(event) {
    // console.log(event)
    //   const mouse = new THREE.Vector2(
    //     (event.clientX / window.innerWidth) * 2 - 1,
    //     -(event.clientY / window.innerHeight) * 2 + 1
    //   )
    //   const raycaster = new THREE.Raycaster()
    //   raycaster.setFromCamera(mouse, wallEditor.camera)

    //   const intersects = raycaster.intersectObjects(wallEditor.scene.children, true);

    // // If there are intersections, handle them
    // if (intersects.length > 0) {
    //     // Log information about the intersected object(s)
    //     intersects.forEach(intersect => {
    //         const object = intersect.object;
    //         console.log('Intersected object:', object);
    //     });
    // }

    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, wallEditor.camera);

    const intersects = raycaster.intersectObjects(
      wallEditor.scene.children,
      true
    );

    // If there are intersections, handle them
    if (intersects.length > 0) {
      // Log information about the intersected object(s)
      // Get the closest intersected object
      const closestIntersection = intersects[0];

      intersects.forEach((intersect) => {
        const object = intersect.object;
        // console.log('Intersected object:', object);
      });
    }
  }

  onMouseUp(event) {
    // console.log(wallEditor.tempDotsGroup)
    wallEditor.isMouseDown = false;

    if (!wallEditor.isMouseDown) {
    }

    if (wallEditor.isSubAreaActivated) {
      wallEditor.wallType = "subArea";
    } else {
      wallEditor.wallType = "wall";
    }

    // Check if the mouse has moved between mousedown and mouseup
    if (
      !wallEditor.is3DView &&
      wallEditor.lastMouseDownPosition &&
      (wallEditor.lastMouseDownPosition.x !== event.clientX ||
        wallEditor.lastMouseDownPosition.y !== event.clientY)
    ) {
      // Call addPoint only if the mouse has moved
      this.update(event);
      wallEditor.mousePoints.length = 0;
    }

    // Check if the mouse has moved between mousedown and mouseup
    else if (!wallEditor.is3DView && wallEditor.isSubAreaActivated) {
      // Call addPoint only if the SubAreaActivated
      this.update(event);
      wallEditor.mousePoints.length = 0;
    }

    // Reset the last mouse down position
    wallEditor.lastMouseDownPosition = null;
    temporaryLine.clearTemporaryLine();
    temporaryLine.clearTemporaryOutline();
    temporaryLine.clearTempDots();

    wallEditor.mousePoints.length = 0;
  }

  //Changed addpoints to update
  update(event) {
    const mouse = new THREE.Vector2(
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1
    );
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, wallEditor.camera);
    const intersection = new THREE.Vector3();
    raycaster.ray.intersectPlane(
      new THREE.Plane(
        new THREE.Vector3(0, 0, 1).applyMatrix4(wallEditor.camera.matrixWorld),
        0
      ),
      intersection
    );

    if (wallEditor.mousePoints.length === 0) {
      //   this.createTemporaryPoint(intersection)
      wallEditor.mousePoints.push(intersection);
    } else {
      temporaryLine.clearTemporaryLine();
      temporaryLine.clearTemporaryOutline();

      temporaryLine.clearTempDots();
      temporaryLine.createTemporaryLine(
        wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
        intersection
      );

      temporaryLine.createTemporaryLine(
        wallEditor.mousePoints[wallEditor.mousePoints.length - 1],
        intersection
      );
    }

    wallEditor.mousePoints.push(intersection);

    if (wallEditor.mousePoints.length >= 2 && !wallEditor.is3DView) {
      staticComponents.addLineData();
      const latestLine =
        wallEditor.linesArray[wallEditor.linesArray.length - 1];
      wallDrawer.draw2DWall(latestLine);
    }
  }

  addEventListeners() {
    if (!wallEditor.is3DView) {
      document.addEventListener("mousemove", (event) =>
        temporaryLine.handleTemporaryLine(event)
      );
      document.addEventListener("mousedown", this.onMouseDown.bind(this));
      document.addEventListener("mouseup", this.onMouseUp.bind(this));
      document.addEventListener("mousemove", this.onMouseMove.bind(this));
    }
    document.getElementById("threeDToggleBtn").addEventListener("click", () => {
      this.switchTo3DView();
    });

    document
      .getElementById("correctedWallTaskBtn")
      .addEventListener("click", () => {
        if (wallEditor.is3DView) {
          staticComponents.clearScene(wallEditor.scene);
          wallEditor.linesArray.forEach((line) =>
            //wallDrawer.correctedWallIn3DView(line)
            wallDrawer.correctedWallIn3DView(line)
          );
        }
      });

    document
      .getElementById("wallWidthRange")
      .addEventListener("input", (event) => {
        wallEditor.currentWidth = parseFloat(event.target.value);
      });

    document.getElementById("clearAllBtn").addEventListener("click", () => {
      if (!wallEditor.is3DView) {
        wallEditor.linesArray.length = 0;
        staticComponents.clearScene(wallEditor.scene);
      }
    });

    document
      .querySelectorAll('input[name="alignmentsRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener("change", (e) => {
          wallEditor.currentAlignment = e.target.value;
          console.log("Selected alignment:", wallEditor.currentAlignment);
        });
      });
    document
      .querySelectorAll('input[name="wallPatternRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener("change", (e) => {
          wallEditor.currentWallPattern = e.target.value;
        });
      });
    document
      .querySelectorAll('input[name="colorRadioBtn"]')
      .forEach((radioBtn) => {
        radioBtn.addEventListener("change", (e) => {
          wallEditor.color = e.target.value;
          // console.log('Selected color:', wallEditor.color)
        });
      });

    document
      .getElementById("spaceBetweenLinesRange")
      .addEventListener("input", (event) => {
        wallEditor.spaceBetweenLines = parseInt(event.target.value);
        // console.log(wallEditor.spaceBetweenLines)
      });

    document.getElementById("tempBtn").addEventListener("click", (event) => {
      console.log("temp clicked");
      console.log(wallEditor.subAreaGroupID);

      // To toggle visibility for a specific line's dots
      // const lineId = wallEditor.subAreaGroupID;
      // const lineId = '1';
      let lineId = wallEditor.subAreaGroupID;

      console.log(lineId);
      // console.log(lineId2)

      if (wallEditor.lineDots[lineId]) {
        wallEditor.lineDots[lineId].forEach((dot) => {
          dot.visible = !dot.visible;
        });
      }
    });
    document.getElementById("subAreaBtn").addEventListener("click", () => {
      wallEditor.wallType = "subArea";
      wallEditor.isSubAreaActivated = !wallEditor.isSubAreaActivated;
      wallEditor.isSubAreaCompleted = false;
      wallEditor.subAreafirstLineDrawn = false;
      wallEditor.firstNewP1 = null;
      wallEditor.lastEndPoint = null;

      console.log(wallEditor.subAreaGroupID);
      // if(wallEditor.subAreaGroupID === "1"){
      //   console.log('x')
      // }
      //   else{
      //     wallEditor.subAreaGroupID = `${parseInt(wallEditor.subAreaGroupID) + 1}`;
      //   }

      wallEditor.subAreaGroupID = `${parseInt(wallEditor.subAreaGroupID) + 1}`;

      console.log(wallEditor.subAreaGroupID);

      const lineId = wallEditor.subAreaGroupID;
      if (wallEditor.lineDots[lineId]) {
        wallEditor.lineDots[lineId].forEach((dot) => {
          dot.visible = !dot.visible;
        });
      }
    });

    function removeMeshAndDotsBySubAreaGroupId(id) {
      wallEditor.scene.children.forEach((eachChild) => {
        console.log(eachChild);

        if (eachChild.isLineSegments) {
          if (eachChild.geometry.userData.id === wallEditor.subAreaGroupID) {
            wallEditor.scene.remove(eachChild);
            eachChild.geometry.dispose();
            eachChild.material.dispose();
          }
        }
      });

      if (wallEditor.subAreaDotsGroups) {
        wallEditor.subAreaDotsGroups.forEach((sphere) => {
          if (sphere.userData.id === wallEditor.subAreaGroupID) {
            wallEditor.dotsGroup.remove(sphere); // Remove from dotsGroup

            sphere.geometry.dispose();
            sphere.material.dispose();
          }
        });
        delete wallEditor.subAreaDotsGroups[id]; // Remove from subAreaDotsGroups
      }

      for (let i = wallEditor.linesArray.length - 1; i >= 0; i--) {
        const line = wallEditor.linesArray[i];

        if (line.subAreaGroupID === wallEditor.subAreaGroupID) {
          // Remove mesh from the scene and dispose of it
          if (line.subAreaOutlineMesh) {
            wallEditor.scene.remove(line.subAreaOutlineMesh);

            line.subAreaOutlineMesh.geometry.dispose();
            line.subAreaOutlineMesh.material.dispose();
          }

          wallEditor.linesArray.splice(i, 1);
        }
      }
    }

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" || event.key === "Esc") {
        if (wallEditor.isSubAreaActivated) {
          if (!wallEditor.isSubAreaCompleted) {
            alert(
              "Lines are not completed. The current Sub Area group will be deleted."
            );

            removeMeshAndDotsBySubAreaGroupId(wallEditor.subAreaGroupID);

            wallEditor.subAreaGroupID = `${
              parseInt(wallEditor.subAreaGroupID) + 1
            }`;
          }

          wallEditor.isSubAreaActivated = false;
          wallEditor.subAreafirstLineDrawn = false;
          wallEditor.firstNewP1 = null;
          wallEditor.lastEndPoint = null;
        }
      }
    });
  }

  switchTo3DView() {
    if (wallEditor.is3DView) {
      // staticComponents.clearScene(wallEditor.scene)

      wallEditor.camera = wallEditor.orthographicCamera;
      wallEditor.controls.object = wallEditor.camera; //this updates the orbit control with the new camera
      wallEditor.controls.enableRotate = false;
      wallEditor.dotsGroup.visible = true;
      wallEditor.linesArray.forEach((line) => wallDrawer.draw2DWall(line));
      this.toggleBtns2D();

      // Hide the dots in 3D view
    } else {
      if (wallEditor.linesArray.length === 0) {
        alert("Draw something to see in 3D View");
        return;
      }
      wallEditor.camera = wallEditor.perspectiveCamera;
      wallEditor.controls.object = wallEditor.camera;
      wallEditor.controls.enableRotate = true;

      // Hide the dots in 3D view
      wallEditor.dotsGroup.visible = false;
      wallEditor.linesArray.forEach((line) => wallDrawer.draw3DWall(line));
      this.toggleBtns3D();
    }

    wallEditor.is3DView = !wallEditor.is3DView;
  }
}

export { MouseClickActivity };
