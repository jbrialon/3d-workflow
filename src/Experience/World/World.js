import Experience from "../Experience";
import Environment from "./Environment";
import Loader from "./Loader";
import Scene from "./Scene";

export default class World {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.loader = new Loader();

    // Wait for resources to be loaded
    this.resources.on("ready", () => {
      // Setup
      this.environment = new Environment();
      this.theScene = new Scene();
      // Show Experience
      this.loader.hideLoader();
    });
  }

  update() {
    if (this.theScene) this.theScene.update();
  }
}
