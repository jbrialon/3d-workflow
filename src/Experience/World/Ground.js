import * as THREE from "three";
import Experience from "../Experience";

export default class Ground {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;

    // Options
    this.options = {
      color: 0xffe8ba,
      flatShading: true,
    };

    // Setup
    this.setMaterial();
    this.setModel();

    // Debug
    this.setDebug();
  }

  setMaterial() {
    this.material = new THREE.MeshPhongMaterial({
      color: this.options.color,
      flatShading: this.options.flatShading,
    });
  }

  setModel() {
    this.geometry = new THREE.IcosahedronGeometry(25, 1);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = -27;
    this.mesh.receiveShadow = true;

    this.scene.add(this.mesh);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("🌍 Ground");
      this.debugFolder
        .addColor(this.options, "color")
        .onChange(() => {
          this.material.color.set(this.options.color);
        })
        .name("Ground Color");
      this.debugFolder
        .add(this.options, "flatShading")
        .name("Flat Shading")
        .onChange(() => {
          this.mesh.material.flatShading = this.options.flatShading;
          this.mesh.material.needsUpdate = true;
        });
    }
  }

  update() {
    this.mesh.rotation.x -= 0.0003 * this.time.delta;
  }
}
