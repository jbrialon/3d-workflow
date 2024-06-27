import Experience from "../Experience";
import Columns from "./Columns";
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
      //this.environment = new Environment();
      this.columns = new Columns();
      // Show Experience
      this.loader.hideLoader();
    });
  }

  update() {
    if (this.columns) this.columns.update();
  }
}
