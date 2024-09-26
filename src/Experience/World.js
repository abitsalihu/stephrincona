import * as THREE from "three";
import Experience from "./Experience";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;
    this.size = this.experience.size;
    this.time = this.experience.time;

    this.scene = this.experience.scene;
    this.sizes = this.experience.size;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    this.debugSettings = {
      objectActive: true,
      myProperty: () => {
        if (this.scene.background) {
          this.scene.background = false;
        } else {
          this.scene.background = this.environmentTexture;
        }
      },

      stopObjectRotation: () => {
        if (this.debugSettings.objectActive) {
          this.debugSettings.objectActive = false;
        } else {
          this.debugSettings.objectActive = true;
        }

        console.log(this.objectActive);
      },
    };

    this.setUpScene();
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      this.environmentTexture = this.resources.items.environmentTexture;
      this.environmentTexture.SRGBColorSpace = THREE.SRGBColorSpace;
      this.scene.environment = this.environmentTexture;
      this.scene.background = this.environmentTexture;
      this.scene.backgroundBlurriness = 0.7;
      console.log((this.scene.environment.rotation = 10));

      this.cube = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshStandardMaterial({ metalness: 1, roughness: 0.2 })
      );
      this.cube.rotation.y = Math.PI * 1.25;
      this.scene.add(this.cube);
    });
  }

  setUpLoadingScreen(video) {
    this.monitor = document.createElement("video");

    this.monitor.muted = true;
    this.monitor.controls = true;
    this.monitor.playsInline = true;
    // this.monitor.autoplay = true;
    this.monitor.loop = true;
    this.monitor.currentTime = 1;
    this.monitor.allowsFullscreen = false;
    this.monitor.preload = "metadata";

    this.monitor.controlsList = "nofullscreen";
    this.monitor.src = video;
    document.querySelector("body").append(this.monitor);

    this.monitor.style.position = "fixed";
    this.monitor.style.top = 0;
    this.monitor.style.right = 0;
    this.monitor.style.zIndex = 0;
    this.monitor.style.maxWidth = "5px";
    this.monitor.style.maxHeight = "5px";
    this.monitor.style.opacity = 0;
    this.monitor.style.pointerEvents = "none";

    this.monitorTexture = new THREE.VideoTexture(this.monitor);
    this.monitorTexture.colorSpace = THREE.SRGBColorSpace;

    this.monitorTexture.flipY = false;

    return new THREE.MeshBasicMaterial({
      map: this.monitorTexture,
    });
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");

      this.worldFolder
        .add(this.cube.material, "metalness")
        .min(0)
        .max(1)
        .step(0.05);
      this.worldFolder
        .add(this.cube.material, "roughness")
        .min(0)
        .max(1)
        .step(0.05);

      this.worldFolder
        .add(this.scene, "backgroundBlurriness")
        .min(0)
        .max(1)
        .step(0.05);

      // this.worldFolder
      //   .add(this.scene, "environmentIntensity")
      //   .min(0)
      //   .max(10)
      //   .step(0.05);

      this.worldFolder
        .add(this.debugSettings, "myProperty")
        .name("Background-Opacity");

      this.worldFolder
        .add(this.debugSettings, "stopObjectRotation")
        .name("ObjectRotation");
    }
  }

  update() {
    if (this.debugSettings.objectActive) {
      if (this.cube) {
        console.log(this.debugSettings.objectActive);
        this.cube.rotation.y += 0.01;
        this.cube.rotation.z -= 0.01;
        this.cube.rotation.x += 0.005;
      }
    }
    //? updating points inside the scene
  }
}
