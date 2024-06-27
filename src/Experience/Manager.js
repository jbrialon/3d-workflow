import Experience from "./Experience.js";
import EventEmitter from "./Utils/EventEmitter.js";

export default class Manager extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.debug = this.experience.debug;
    this.renderer = this.experience.renderer;
    this.camera = this.experience.camera;
    this.inputEvents = this.experience.inputEvents;

    // App State

    // Setup

    // Debug
    this.setDebug();
  }

  setDebug() {
    if (this.debug.active) {
      // this.debugFolder = this.debug.ui.addFolder("View Manager");
      // this.debugFolder.close();
    }
  }

  update() {}
}
