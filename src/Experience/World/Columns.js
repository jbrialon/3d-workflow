import * as THREE from "three";
import { gsap } from "gsap";
import Experience from "../Experience";

export default class Columns {
  constructor() {
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.scene = this.experience.scene;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.manager = this.experience.manager;
    this.inputEvents = this.experience.inputEvents;
    this.resources = this.experience.resources;

    // Options
    this.options = {};
    this.actions = {};
    this.scrollProgress = 0;
    this.colliders = [];
    this.isInsideCollider = false; // State flag
    this.currentCollider = null;

    // Setup
    this.resource = this.resources.items.roundModel;
    this.bakedColumnsTexture = this.resources.items.bakedRoundTexture;

    this.bakedColumnsTexture.flipY = false;
    this.bakedColumnsTexture.colorSpace = THREE.SRGBColorSpace;

    this.bakedMaterial = new THREE.MeshBasicMaterial({
      map: this.bakedColumnsTexture,
    });

    this.colliderMaterial = new THREE.MeshBasicMaterial({
      wireframe: true,
    });

    this.cameraBox = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.15, 0.15),
      new THREE.MeshNormalMaterial({
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
      })
    );
    this.cameraBox.visible = false;
    this.scene.add(this.cameraBox);

    this.initEvents();
    this.setModel();
    this.setAnimations();

    // Debug
    this.setDebug();
  }

  initEvents() {
    // wheel event
    this.inputEvents.on("wheel", this.onMouseWheel.bind(this));
    this.manager.on("columns-toggleDebug", this.toggleDebug.bind(this));
    this.manager.on("columns-show", () => {
      // Set initial state above the scene
      // this.model.position.y = 1; // Adjust the height as needed
      this.model.rotation.y = 0;

      // Animate to the final state
      gsap.to(this.model.rotation, {
        y: 2 * Math.PI, // 360 degrees rotation
        duration: 2.5,
        ease: "power2.inOut",
        delay: 0.5,
      });
    });
  }

  onMouseWheel() {
    if (this.scrollProgress >= 0) {
      let delta = 0.1;
      if (this.inputEvents.mouse.z < 0) {
        delta = -0.1;
      }
      const targetScrollProgress = this.scrollProgress + delta;
      const clampedScrollProgress = Math.max(
        0,
        Math.min(targetScrollProgress, 1)
      );

      gsap.to(this, {
        duration: 1.5,
        scrollProgress: clampedScrollProgress,
        ease: "power1.EaseOut",
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
            this.cameraBox.position.copy(this.cameraModel.position);
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
        if (child.name.includes("collider")) {
          child.visible = false;
          child.material = this.colliderMaterial;
          child.geometry.computeBoundsTree();

          this.colliders.push(child);
        } else if (child.name.includes("props")) {
          child.material = this.bakedMaterial;
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

    this.activeAction = this.actions["CameraAnimation"];
    this.activeAction.play();
    this.activeAction.paused = true; // Pause the action initially
  }

  toggleDebug() {
    this.colliders.forEach((collider) => {
      collider.visible = !collider.visible;
    });
  }

  setDebug() {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Scene");
    }
  }

  update() {
    if (this.animation) this.animation.mixer.update(this.time.delta * 0.0001);

    let isCurrentlyInside = false;
    this.colliders.forEach((collider) => {
      const transformMatrix = new THREE.Matrix4()
        .copy(collider.matrixWorld)
        .invert()
        .multiply(this.cameraBox.matrixWorld);

      const hit = collider.geometry.boundsTree.intersectsGeometry(
        this.cameraBox.geometry,
        transformMatrix
      );

      if (hit) {
        isCurrentlyInside = true;
        if (!this.isInsideCollider) {
          this.isInsideCollider = true;
          if (this.currentCollider?.name === collider.name) {
            // Trigger exit event here
            console.log("Exited collider", collider.name);
          } else {
            // Trigger enter event here
            console.log("Entered collider", collider.name);
            this.manager.trigger("content-update", collider.name);
          }
          this.currentCollider = collider;
        }
      }
    });

    if (!isCurrentlyInside && this.isInsideCollider) {
      this.isInsideCollider = false;
    }
  }
}
