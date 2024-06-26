import * as THREE from "three";
import Experience from "../Experience";

export default class Environment {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.debug = this.experience.debug;

    this.options = {
      ambientLightColor: 0xffffff,
      sunLightColor: 0xffffff,
    };

    // Setup
    this.setAmbientLight();
    this.setSunLight();

    // Debug
    this.setDebug();
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(
      this.options.ambientLightColor,
      0.8
    );
    this.scene.add(this.ambientLight);
  }
  setSunLight() {
    this.sunLight = new THREE.DirectionalLight(0xffffff, 2);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.set(2048, 2048);
    this.sunLight.shadow.camera.far = 45;
    this.sunLight.shadow.camera.left = -5;
    this.sunLight.shadow.camera.top = 5;
    this.sunLight.shadow.camera.right = 5;
    this.sunLight.shadow.camera.bottom = -5;
    this.sunLight.shadow.bias = -0.0001;
    this.sunLight.position.set(2, 8, 8);
    this.scene.add(this.sunLight);
  }

  setDebug() {
    // Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("🔆 Env");
      this.debugFolder
        .add(this.ambientLight, "intensity")
        .name("Light Intensity")
        .min(0)
        .max(10)
        .step(0.001);

      this.debugFolder
        .addColor(this.options, "ambientLightColor")
        .name("Light Color")
        .onChange(() => {
          this.ambientLight.color.set(this.options.ambientLightColor);
        });

      this.debugFolder
        .add(this.sunLight, "intensity")
        .name("Sun Intensity")
        .min(0)
        .max(10)
        .step(0.001);
      this.debugFolder
        .addColor(this.options, "sunLightColor")
        .name("Light Color")
        .onChange(() => {
          this.sunLight.color.set(this.options.sunLightColor);
        });

      this.helper = new THREE.DirectionalLightHelper(this.sunLight, 5);
      this.scene.add(this.helper);
    }
  }
}
