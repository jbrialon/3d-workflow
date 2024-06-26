import * as THREE from "three";
import { gsap } from "gsap";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import Experience from "./Experience";
export default class Camera {
  constructor() {
    this.experience = new Experience();

    this.canvas = this.experience.canvas;
    this.sizes = this.experience.sizes;
    this.inputEvents = this.experience.inputEvents;
    this.scene = this.experience.scene;

    // Setup
    this.isAnimated = false;
    this.scrollProgress = 0;
    this.targetPosition = new THREE.Vector3();

    this.setInstance();
    this.initEvents();
    // this.setOrbitControls();
  }

  initEvents() {
    this.inputEvents.on("mousemove", this.onMouseMove.bind(this));
    // this.inputEvents.on("wheel", this.onMouseWheel.bind(this));
  }

  setInstance() {
    this.cameraParent = new THREE.Group();
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.cameraParent.position.set(
      34.06100082397461,
      1.6516000032424927,
      0.059365998953580856
    );
    this.instance.lookAt(0, 0, 0);
    this.scene.add(this.cameraParent);
    this.cameraParent.add(this.instance);
  }

  setTarget(targetPosition) {
    if (targetPosition) {
      this.targetPosition = targetPosition;
      console.log(this.targetPosition);
      this.instance.lookAt(
        this.targetPosition.x,
        this.targetPosition.y,
        this.targetPosition.z
      );
    }
  }

  setPaths(cameraPathPoint) {
    this.cameraCurve = new THREE.CatmullRomCurve3(cameraPathPoint);
    this.cameraPoints = this.cameraCurve.getPoints(50);
  }

  onMouseWheel() {
    if (this.scrollProgress >= 0) {
      let delta = 0.05;
      if (this.inputEvents.mouse.z < 0) {
        delta = -0.05;
      }

      const targetScrollProgress = this.scrollProgress + delta;
      const clampedScrollProgress = Math.max(
        0,
        Math.min(targetScrollProgress, 1)
      );

      gsap.to(this, {
        duration: 1.5,
        scrollProgress: clampedScrollProgress,
        ease: "power2.EaseInOut",
        onUpdate: () => {
          const newPosition = this.cameraCurve.getPointAt(this.scrollProgress);
          // const newPosition2 = this.targetCurve.getPointAt(this.scrollProgress);
          // this.fakeTarget.position.copy(newPosition2);
          this.cameraParent.position.copy(newPosition);
          this.instance.lookAt(
            this.targetPosition.x,
            this.targetPosition.y,
            this.targetPosition.z
          );
        },
        onComplete: () => {
          // this.manager.goToTutorialStep(3);
        },
      });

      console.log(clampedScrollProgress);
    }
  }

  onMouseMove() {
    // calculate the position of the mouse based with center as origin
    const mouse = new THREE.Vector2(
      this.inputEvents.mouse.x - this.sizes.width / 2,
      this.inputEvents.mouse.y - this.sizes.height / 2
    );

    // normalize the mouse position
    const position = new THREE.Vector2(
      mouse.x / (this.sizes.width / 2),
      mouse.y / (this.sizes.height / 2)
    );

    // Create a movement vector based on the mouse position
    const movementVector = new THREE.Vector3(
      position.x / 8,
      position.y / -8,
      0
    );

    // Apply the camera's current rotation to the movement vector
    movementVector.applyQuaternion(this.instance.quaternion);

    // Update the camera's position by adding the transformed movement vector
    gsap.to(this.instance.position, {
      delay: 0.1,
      x: movementVector.x,
      y: movementVector.y,
      z: movementVector.z,
      duration: 2,
      ease: "power4.easeInOut",
    });
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;

    this.controls.minPolarAngle = THREE.MathUtils.degToRad(30);
    this.controls.maxPolarAngle = THREE.MathUtils.degToRad(90);
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.instance.lookAt(0, 0, 0);
    // this.controls.update();
  }
}
