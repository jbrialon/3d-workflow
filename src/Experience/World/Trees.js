import * as THREE from "three";
import Experience from "../Experience";

export default class Trees {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.resources = this.experience.resources;

    // Options
    this.options = {};

    // Setup
    this.resource = this.resources.items.treesModel;
    this.bakedAoTexture = this.resources.items.bakedAoTexture;
    this.bakedShadowTexture = this.resources.items.bakedShadowTexture;

    this.bakedShadowTexture.flipY = false;
    this.bakedShadowTexture.colorSpace = THREE.SRGBColorSpace;

    this.greenTexture = this.resources.items.greenTexture;
    this.brownTexture = this.resources.items.brownTexture;

    this.bakedMaterial = new THREE.MeshBasicMaterial({
      aoMap: this.bakedAoTexture,
      side: THREE.DoubleSide,
    });

    this.setModel();

    // Debug
    this.setDebug();
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // const material = new THREE.MeshBasicMaterial({
        //   color: child.material.color,
        //   aoMap: this.bakedShadowTexture,
        //   side: THREE.DoubleSide,
        // });
        if (child.name === "Floor") {
          const material = new THREE.MeshBasicMaterial({
            color: child.material.color,
            aoMap: this.bakedShadowTexture,
            side: THREE.DoubleSide,
          });
          child.material = material;
        } else if (child.name.includes("top")) {
          const material = new THREE.MeshMatcapMaterial({
            color: child.material.color,
            matcap: this.greenTexture,
            // aoMap: this.bakedShadowTexture,
          });
          child.material = material;
        } else if (child.name.includes("bottom")) {
          const material = new THREE.MeshMatcapMaterial({
            color: child.material.color,
            matcap: this.brownTexture,
            // aoMap: this.bakedShadowTexture,
          });
          child.material = material;
        }
      }
    });

    this.scene.add(this.model);
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Trees");
    }
  }

  update() {}
}
