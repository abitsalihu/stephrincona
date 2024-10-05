import * as THREE from "three";
import Experience from "./Experience";

import gsap from "gsap";

export default class Renderer {
  constructor() {
    this.experience = new Experience();

    this.sizes = this.experience.size;
    this.canvas = this.experience.canvas;
    this.scene = this.experience.scene;
    this.mobileSize = this.experience.size.mobileSize;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;

    //? form from html
    this.setUpRenderer();

    this.setDebugger();

    //? after resources are ready
    this.experience.resources.on("resourcesReady", () => {});
  }

  setUpRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      // enableThreeShaderIntegration: false,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
    this.renderer.setClearColor("#000000");
    // this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    // this.renderer.toneMapping = THREE.ReinhardToneMapping;
    // this.renderer.toneMapping = THREE.CineonToneMapping;
    // this.renderer.toneMappingExposure = 1.1;
  }

  resize() {
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(this.sizes.pixelRatio);
  }

  setDebugger() {
    if (this.experience.debug.active) {
      this.rendererDebug =
        this.experience.debug.gui.addFolder("renderer-Debug");

      this.rendererDebug
        .add(this.renderer, "toneMappingExposure")
        .min(0)
        .max(10)
        .step(0.05)
        .onChange(() => {});

      this.rendererDebug.add(this.renderer, "toneMapping", {
        NoToneMapping: THREE.NoToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        Linear: THREE.LinearToneMapping,
      });
    }
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }
}
