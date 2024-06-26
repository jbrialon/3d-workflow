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
    this.targetPosition = null;
    this.cameraPathPoint = [];
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
      let delta = 0.05;
      if (this.inputEvents.mouse.z < 0) {
        delta = -0.05;
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
            console.log(this.scrollProgress);
            const clip = this.activeAction.getClip();
            const duration = clip.duration;
            this.animation.mixer.setTime(this.scrollProgress * duration);
          }
        },
      });
    }
  }

  setModel() {
    this.model = this.resource.scene;
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // console.log(child.name);
        // child.castShadow = true;
        // child.receiveShadow = true;
        // if (child.name.includes("path_")) {
        //   this.cameraPathPoint.push(child.position);
        //   child.visible = false;
        // } else if (child.name.includes("target")) {
        //   console.log(child.position);
        //   this.targetPosition = child.position;
        //   child.visible = false;
        // } else if (child.name.includes("pillar_")) {
        //   // child.castShadow = true;
        //   console.log(child.name);
        // }
      } else if (child instanceof THREE.Camera) {
        // console.log(child);
      }
    });
    // this.camera.setTarget(this.targetPosition);
    // this.camera.setPaths(this.cameraPathPoint);
    this.scene.add(this.model);
  }

  setAnimations() {
    this.animation = {};
    this.animation.mixer = new THREE.AnimationMixer(this.model);
    this.resource.animations.forEach((clip) => {
      const action = this.animation.mixer.clipAction(clip);
      this.actions[clip.name] = action;
      console.log(clip.name);
    });

    this.activeAction = this.actions["CameraAnimation"];
    this.activeAction.play();
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Scene");
    }
  }

  update() {
    if (this.animation) this.animation.mixer.update(this.time.delta);
  }
}
