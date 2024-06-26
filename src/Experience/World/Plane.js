import * as THREE from "three";
import Experience from "../Experience";

export default class Plane {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Setup
    this.resource = this.resources.items.planeModel;

    this.setModel();
    this.setAnimation();

    // Debug
    this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene;

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name === "Cylinder_1") {
          this.yellowMaterial = child.material;
          // Three.js is converting the colors to linear sRGB color space,
          // we need to convert them to sRGB to display them correctly in the debug UI
          this.options.yellowMaterial = child.material.color
            .clone()
            .convertLinearToSRGB();
        }
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    this.scene.add(this.model);
  }

  setAnimation() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);

    const planeAction = this.animation.mixer.clipAction(
      this.resource.animations[0]
    );
    const propellerAction = this.animation.mixer.clipAction(
      this.resource.animations[1]
    );

    planeAction.play();
    propellerAction.play();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("✈️ Plane");
      this.debugFolder
        .addColor(this.options, "yellowMaterial")
        .onChange(() => {
          this.yellowMaterial.color = this.options.yellowMaterial;
        })
        .name("Plane Tips");
    }
  }

  update() {
    // Airplane animation
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
