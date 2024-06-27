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

    this.setInstance();
    this.initEvents();
    // this.setOrbitControls();
  }

  initEvents() {
    //this.inputEvents.on("mousemove", this.onMouseMove.bind(this));
  }

  setInstance() {
    this.cameraParent = new THREE.Group();
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );

    this.scene.add(this.cameraParent);
    this.cameraParent.add(this.instance);
  }

  setPositionAndRotation(position, rotation) {
    this.cameraParent.position.set(position.x, position.y, position.z);
    this.instance.rotation.set(rotation.x, rotation.y, rotation.z);
  }

  setTarget(targetPosition) {
    if (targetPosition) {
      this.targetPosition = targetPosition;
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
    const movementVector = new THREE.Vector3(position.x / 4, 0, 0);

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
    //this.instance.lookAt(0, 0, 0);
    // this.controls.update();
  }
}
