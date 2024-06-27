import * as THREE from "three";
import { gsap } from "gsap";

import Experience from "../Experience";

export default class Scene {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.inputEvents = this.experience.inputEvents;
    this.resources = this.experience.resources;

    // Options
    this.options = {};
    this.actions = {};
    this.scrollProgress = 0;

    // Setup
    this.resource = this.resources.items.sceneModel;

    this.setModel();
    this.setAnimations();
    // Debug
    this.setDebug();

    this.inputEvents.on("wheel", this.onMouseWheel.bind(this));
  }

  onMouseWheel() {
    if (this.scrollProgress >= 0) {
      let delta = 0.1;
      if (this.inputEvents.mouse.z < 0) {
        delta = -0.1;
      }
      console.log(this.scrollProgress);
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
          // TODO: animate here
          if (this.activeAction) {
            this.activeAction.paused = false;
            const duration = this.activeAction.getClip().duration - 0.1;
            const progress = this.scrollProgress * duration;
            const time = Math.max(0, Math.min(progress, duration));
            this.animation.mixer.setTime(time);
            this.camera.cameraParent.position.copy(this.cameraModel.position);
            this.camera.instance.rotation.copy(this.cameraModel.rotation);
            this.activeAction.paused = true;
          }
        },
      });
    }
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.name.includes("trigger")) {
          child.visible = false;
        }
      } else if (child instanceof THREE.Camera) {
        this.cameraModel = child;
        this.camera.setPositionAndRotation(
          this.cameraModel.position,
          this.cameraModel.rotation
        );
      }
    });
    this.scene.add(this.model);
  }

  setAnimations() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.resource.animations.forEach((clip) => {
      const action = this.animation.mixer.clipAction(clip);
      this.actions[clip.name] = action;
      this.actions[clip.name].loop = THREE.LoopOnce;
    });

    this.activeAction = this.actions["CameraAction"];
    this.activeAction.play();
    this.activeAction.paused = true;
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Scene");
    }
  }

  update() {
    if (this.animation) this.animation.mixer.update(this.time.delta * 0.0001);
  }
}
