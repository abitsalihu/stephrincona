import * as THREE from "three";
import Experience from "./Experience";
import { Reflector } from "three/addons/objects/Reflector.js";
import rayFragment from "/shaders/rayGod/rayFragment.glsl";
import rayVertex from "/shaders/rayGod/rayVertex.glsl";
import firefliesVertexShader from "/shaders/fireflies/firefliesVertexShader.glsl";
import firefliesFragmentShader from "/shaders/fireflies/firefliesFragmentShader.glsl";

import FakeGlowMaterial from "./FakeGlowMaterial.js";

import gsap from "gsap";

export default class World {
  constructor() {
    this.experience = new Experience();

    this.debug = this.experience.debug;
    this.size = this.experience.size;
    this.mobileSize = this.size.mobileSize;
    this.time = this.experience.time;

    this.scene = this.experience.scene;
    this.sizes = this.experience.size;
    this.resources = this.experience.resources;
    this.camera = this.experience.camera.instance;
    this.controls = this.experience.camera.controls;
    this.html = this.experience.html;
    this.fakeGlowMaterial = new FakeGlowMaterial({
      glowInternalRadius: 22.0,
      glowColor: new THREE.Color("#FEFAE0"),
      glowSharpness: 20,
      opacity: 0,
      side: THREE.FrontSide,
      depthTest: true,
    });

    this.group = new THREE.Group();

    //? html
    this.informationButton = this.html.infoIcon;
    this.infoMainContainer = this.html.infoMainContainer;

    //? 3d buttons
    this.homeBtn = null;
    this.aboutBtn = null;
    this.projectsBtn = null;
    this.cvBtn = null;
    this.creditsBtn = null;
    this.moreInforamtionBtn = null;
    this.laptop = null;
    this.laptopScreen = null;
    this.projectorScreen = null;

    //? projects btn
    this.projectBtns = [];
    this.projectorHomeBtn = null;
    this.projectorCreditsBtn = null;

    //? outline

    this.outline = null;
    //? raycaster

    // this.screenActive = false;
    this.monitorOn = false;
    this.informationOpen = false;
    this.creditsOpen = false;
    this.projectOpen = false;
    this.homeOpen = false;
    this.currentProject = 1;

    this.rayCaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();

    this.intersectObjects = [];
    this.currentIntersects = null;
    this.clicked = false;

    document.addEventListener("click", (e) => {
      this.clicked = true;
    });

    window.addEventListener("mousemove", (event) => {
      this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

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
      },
    };

    this.setUpScene();
  }

  setUpScene() {
    this.resources.on("resourcesReady", () => {
      this.room = this.resources.items.room;

      //? baked Textures

      this.floorBaked = this.resources.items.floorBaked;
      this.floorBaked.colorSpace = THREE.SRGBColorSpace;
      this.floorBaked.flipY = false;

      this.firstBakedTexture = this.resources.items.firstBakedTexture;
      this.firstBakedTexture.colorSpace = THREE.SRGBColorSpace;
      this.firstBakedTexture.flipY = false;

      this.firstBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.firstBakedTexture,
      });

      this.secondBakedTexture = this.resources.items.secondBakedTexture;
      this.secondBakedTexture.colorSpace = THREE.SRGBColorSpace;
      this.secondBakedTexture.flipY = false;

      this.secondBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.secondBakedTexture,
      });

      this.wallsBakedTexture = this.resources.items.wallsBakedTexture;
      this.wallsBakedTexture.colorSpace = THREE.SRGBColorSpace;
      this.wallsBakedTexture.flipY = false;

      this.wallsBakedMaterial = new THREE.MeshBasicMaterial({
        map: this.wallsBakedTexture,
      });

      this.magazinesTextures = this.resources.items.magazinesTextures;
      this.magazinesTextures.colorSpace = THREE.SRGBColorSpace;
      this.magazinesTextures.flipY = false;

      this.magazinesMaterial = new THREE.MeshBasicMaterial({
        map: this.magazinesTextures,
      });

      this.boardTexture = this.resources.items.boardTexture;
      this.boardTexture.colorSpace = THREE.SRGBColorSpace;
      this.boardTexture.flipY = false;

      this.boardMaterial = new THREE.MeshBasicMaterial({
        map: this.boardTexture,
      });

      //?monitor textures

      this.homeTexture = this.resources.items.homeTexture;
      this.homeTexture.colorSpace = THREE.SRGBColorSpace;
      this.homeTexture.flipY = false;

      this.aboutMeTexture = this.resources.items.aboutMeTexture;
      this.aboutMeTexture.colorSpace = THREE.SRGBColorSpace;
      this.aboutMeTexture.flipY = false;

      this.projectsTexture = this.resources.items.projectsTexture;
      this.projectsTexture.colorSpace = THREE.SRGBColorSpace;
      this.projectsTexture.flipY = false;

      this.cvTexture = this.resources.items.cvTexture;
      this.cvTexture.colorSpace = THREE.SRGBColorSpace;
      this.cvTexture.flipY = false;

      //? project_textures
      this.project_1 = this.resources.items.project_1;
      this.project_1.colorSpace = THREE.SRGBColorSpace;
      this.project_1.flipY = false;

      this.project_2 = this.resources.items.project_2;
      this.project_2.colorSpace = THREE.SRGBColorSpace;
      this.project_2.flipY = false;

      this.project_3 = this.resources.items.project_3;
      this.project_3.colorSpace = THREE.SRGBColorSpace;
      this.project_3.flipY = false;

      this.project_4 = this.resources.items.project_4;
      this.project_4.colorSpace = THREE.SRGBColorSpace;
      this.project_4.flipY = false;

      this.project_5 = this.resources.items.project_5;
      this.project_5.colorSpace = THREE.SRGBColorSpace;
      this.project_5.flipY = false;

      //? project_textures

      this.project_1_projector = this.resources.items.project_1_projector;
      this.project_1_projector.colorSpace = THREE.SRGBColorSpace;
      this.project_1_projector.flipY = false;

      this.project_2_projector = this.resources.items.project_2_projector;
      this.project_2_projector.colorSpace = THREE.SRGBColorSpace;
      this.project_2_projector.flipY = false;

      this.project_3_projector = this.resources.items.project_3_projector;
      this.project_3_projector.colorSpace = THREE.SRGBColorSpace;
      this.project_3_projector.flipY = false;

      this.project_4_projector = this.resources.items.project_4_projector;
      this.project_4_projector.colorSpace = THREE.SRGBColorSpace;
      this.project_4_projector.flipY = false;

      this.project_5_projector = this.resources.items.project_5_projector;
      this.project_5_projector.colorSpace = THREE.SRGBColorSpace;
      this.project_5_projector.flipY = false;

      //?

      this.btnMaterial = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
      });

      this.screenMaterial = new THREE.MeshBasicMaterial({
        map: this.homeTexture,
      });

      this.projectMaterial = new THREE.MeshBasicMaterial({
        map: this.project_1,
      });

      this.projectBtnMaterial = new THREE.MeshBasicMaterial({
        map: this.projectsTexture,
      });

      this.dummyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

      this.video_1 = this.setUpLoadingScreen("/textures/projector_video.mp4");

      this.video_2 = this.setUpLoadingScreen("/textures/monitor_video.mp4");

      this.room.scene.traverse((child) => {
        if (child.name.startsWith("first_baked")) {
          child.material = this.firstBakedMaterial;
        }

        if (child.name.startsWith("second_baked")) {
          child.material = this.secondBakedMaterial;
        }

        if (child.name.startsWith("walls_baked")) {
          child.material = this.wallsBakedMaterial;
        }

        if (child.name.startsWith("board")) {
          child.material = this.boardMaterial;
        }

        if (child.name.startsWith("floor")) {
          child.material = new THREE.MeshBasicMaterial({
            map: this.floorBaked,
          });
        }

        if (child.name.startsWith("magazine")) {
          child.material = this.magazinesMaterial;
        }

        //? outline

        if (child.name.startsWith("outline")) {
          child.material = new THREE.MeshBasicMaterial({
            color: "#ffffff",
            transparent: true,
            opacity: 0.3,
          });

          this.outline = child;
        }
        //? animated
        if (child.name === "screen") {
          child.material = this.screenMaterial;

          this.laptopScreen = child;
          this.intersectObjects.push(child);
        }

        if (child.name === "ray") {
          child.material = this.fakeGlowMaterial;
        }

        //? project texture

        if (child.name.startsWith("laptop")) {
          child.material = this.secondBakedMaterial;
          this.laptop = child;
          this.intersectObjects.push(child);
        }

        if (child.name === "second_screen") {
          if (!this.mobileSize) {
            child.material = this.video_2;
          }
        }

        if (child.name.startsWith("project_screen")) {
          child.material = this.dummyMaterial;
          this.projectorScreen = child;
        }

        //? BUTTONS
        if (child.name.startsWith("btn")) {
          child.material = this.btnMaterial;
        }

        if (child.name === "btn_home") {
          this.homeBtn = child;
        }
        if (child.name === "btn_about") {
          child.material = this.screenMaterial;
          this.aboutBtn = child;
        }
        if (child.name === "btn_projects") {
          child.material = this.screenMaterial;
          this.projectsBtn = child;
        }

        if (child.name === "btn_cv") {
          child.material = this.screenMaterial;

          this.cvBtn = child;
        }
        if (child.name === "btn_credits") {
          this.creditsBtn = child;
        }

        if (child.name === "btn_more_information") {
          this.moreInforamtionBtn = child;
        }

        if (child.name.startsWith("project_btn")) {
          this.projectBtns.push(child);
          child.material = this.btnMaterial;
        }
        //? projector buttons
        if (child.name === "btn_home_projector") {
          this.projectorHomeBtn = child;
        }

        if (child.name === "btn_credits_projector") {
          this.projectorCreditsBtn = child;
        }

        if (child.isGroup) {
          this.group.add(child);
        }

        //? mirror

        if (child.name === "mirror") {
          child.material = this.btnMaterial;
          child.material.dispose();

          this.mirrorGeometry = child.geometry;
          this.mirror = new Reflector(this.mirrorGeometry, {
            clipBias: 0.0025,
            textureWidth: this.size.width * this.size.pixelRatio,
            textureHeight: this.size.height * this.size.pixelRatio,
            color: 0xb5b5b5,
          });
          this.mirror.position.set(-0.667233, 0.652447, -1.19418);
          this.mirror.rotation.x = -0.22;
          this.group.add(this.mirror);
        }
      });

      if (!this.mobileSize) {
        this.setUpFireflies();
      }
      // ? website animation
      this.group.scale.set(0, 0, 0);
      gsap.to(this.group.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 5,
        delay: 1,
        ease: "back.out(2)",
        onComplete: () => {
          gsap.to(this.fakeGlowMaterial.uniforms.opacity, {
            value: 0.21,
            duration: 2,
            ease: "back.out(2.5)",
            onComplete: () => {},
          });

          this.projectorScreen.material = this.video_1;

          if (this.fireflies) {
            gsap.to(this.firefliesMaterial.uniforms.opacity, {
              value: 1,
              duration: 3,
              delay: 1.5,
              ease: "back.out(2)",
            });
          }
        },
      });

      gsap.to(this.group.rotation, {
        y: Math.PI * 2,
        duration: 5,
        delay: 1,
        ease: "back.out(2)",
      });

      this.scene.add(this.group);

      //? default camera position
      this.camera.position.set(-3.43, 1.73, 4.728);
      this.controls.target.set(0.375967, 0.913637, -1.16198);

      this.informationButton.addEventListener("click", () => {
        this.infoMainContainer.style.display = "flex";
        document.querySelector(".info").style.display = "flex";
        this.informationOpen = true;
      });

      this.infoMainContainer.addEventListener("click", (e) => {
        if (e.target.className === "close-btn") {
          this.infoMainContainer.style.display = "none";
          document.querySelector(".credits").style.display = "none";
          document.querySelector(".info").style.display = "none";
          this.creditsOpen = false;
          this.informationOpen = false;
        }
      });

      this.debugActive();
    });
  }

  setUpFireflies() {
    this.firefliesGeometry = new THREE.BufferGeometry();
    this.firefliesCount = 250;
    this.positionArray = new Float32Array(this.firefliesCount * 3);
    this.scaleArray = new Float32Array(this.firefliesCount * 1);

    for (let i = 0; i < this.firefliesCount; i++) {
      this.positionArray[i * 3 + 0] = 25 * Math.random() - 12.5;
      this.positionArray[i * 3 + 1] = 10 * Math.random();
      this.positionArray[i * 3 + 2] = -25 * Math.random() + 5;

      this.scaleArray[i] = Math.random();
    }

    this.firefliesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positionArray, 3)
    );

    this.firefliesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(this.positionArray, 3)
    );

    this.firefliesMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uSize: { value: 12.5 },
        opacity: { value: 0.0 },
      },

      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexShader: firefliesVertexShader,
      fragmentShader: firefliesFragmentShader,
    });

    this.fireflies = new THREE.Points(
      this.firefliesGeometry,
      this.firefliesMaterial
    );

    this.fireflies.position.set(0, -1, 0);
    this.scene.add(this.fireflies);
  }

  setUpLoadingScreen(video) {
    this.monitor = document.createElement("video");

    this.monitor.muted = true;
    this.monitor.controls = true;
    this.monitor.playsInline = true;
    this.monitor.autoplay = true;
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

  monitorAmination() {
    gsap.to(this.controls.target, {
      x: 0.188471,
      y: 0.913637,
      z: -1.30683,
      duration: 2,
      ease: "power2.out",
    });

    if (this.mobileSize) {
      gsap.to(this.camera.position, {
        x: 0.185,
        y: 1.1411,
        z: -0.207,
        duration: 2,
        ease: "power2.out",
      });
    } else {
      gsap.to(this.camera.position, {
        x: 0.1874,
        y: 0.9914,
        z: -0.931,
        duration: 2,
        ease: "power2.out",
      });
    }
  }

  fakeGodRays(objectToBeChanged, camera) {
    let changedMaterial = new THREE.MeshBasicMaterial({
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    });

    changedMaterial.onBeforeCompile = function (shader) {
      shader.uniforms.c = { type: "f", value: 1 };
      shader.uniforms.p = { type: "f", value: 1.94 };
      shader.uniforms.glowColor = {
        type: "c",
        value: new THREE.Color("#fcfcdd"),
      };
      shader.uniforms.viewVector = { type: "v3", value: camera.position };
      shader.uniforms.op = { type: "f", value: 0.03 };
      shader.vertexShader = rayVertex;
      shader.fragmentShader = rayFragment;
      changedMaterial.userData.shader = shader;
    };
    objectToBeChanged.material = changedMaterial;
    objectToBeChanged.needsUpdate = true;
  }

  projectorAnimation() {
    this.projectorHomeBtn.material = this.btnMaterial;
    this.projectorCreditsBtn.material = this.btnMaterial;
    gsap.to(this.controls.target, {
      x: 1.64691,
      y: 1.53646,
      z: 0.272698,

      duration: 4,
      ease: "power2.out",
    });

    if (this.mobileSize) {
      gsap.to(this.camera.position, {
        x: -3.942,
        y: 1.46963,
        z: 0.0803,
        duration: 3,
        ease: "power2.out",
        onComplete: () => {
          this.intersectObjects.push(
            this.projectorHomeBtn,
            this.projectorCreditsBtn
          );
        },
      });
    } else {
      gsap.to(this.camera.position, {
        x: -0.1566,
        y: 1.48038,
        z: 0.281,
        duration: 3,
        ease: "power2.out",
        onComplete: () => {
          this.intersectObjects.push(
            this.projectorHomeBtn,
            this.projectorCreditsBtn
          );
        },
      });
    }

    // -0.15665290698040213 7102057411 0.2814406133203044
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");
      this.worldFolder
        .add(this.fakeGlowMaterial.uniforms.falloff, "value")
        .min(0)
        .max(5)
        .step(0.01)
        .name("fallOff");

      this.worldFolder
        .add(this.fakeGlowMaterial.uniforms.glowInternalRadius, "value")
        .min(0)
        .max(50)
        .step(0.01)
        .name("glowInternalRadius");

      this.worldFolder
        .add(this.fakeGlowMaterial.uniforms.glowSharpness, "value")
        .min(0)
        .max(50)
        .step(0.01)
        .name("glowSharpness");

      this.worldFolder
        .add(this.fakeGlowMaterial.uniforms.opacity, "value")
        .min(0)
        .max(1)
        .step(0.01)
        .name("opacity");
    }
  }

  update() {
    if (this.fireflies) {
      this.fireflies.material.uniforms.uTime.value = this.time.elapsed * 0.0002;
    }

    if (!this.monitorOn) {
      if (this.mobileSize) {
        if (this.outline) {
          this.outline.material.opacity =
            (0.7 + Math.sin(this.time.elapsed / 250)) / 1.5;
        }
      }
    }
    if (this.rayCaster) {
      this.rayCaster.setFromCamera(this.pointer, this.camera);
      this.intersects = this.rayCaster.intersectObjects(this.intersectObjects);

      if (this.intersects.length) {
        if (!this.informationOpen) {
          if (!this.currentIntersect) {
          }

          if (!this.monitorOn) {
            if (!this.mobileSize) {
              if (this.outline) {
                this.outline.material.opacity =
                  (0.7 + Math.sin(this.time.elapsed / 250)) / 1.5;
              }
            }
          }
          this.currentIntersect = this.intersects[0];

          if (
            this.currentIntersect.object.name === "screen" ||
            this.currentIntersect.object.name === "laptop"
          ) {
            if (this.clicked) {
              gsap.to(this.outline.material, {
                opacity: 0,
                duration: 1,
              });
              this.monitorOn = true;
              this.monitorAmination();

              this.intersectObjects = [];
              this.intersectObjects.push(
                this.aboutBtn,
                this.creditsBtn,
                this.projectsBtn,
                this.cvBtn,
                this.homeBtn
              );
            }
          }

          if (!this.creditsOpen) {
            document.body.style.cursor = "pointer";

            if (this.currentIntersect.object.scale.x < 0.062) {
              gsap.to(this.currentIntersect.object.scale, {
                x: 0.062,
                y: 0.062,
                z: 0.062,
                duration: 1,
                ease: "ease-out",
              });
            }
          }
          if (this.currentIntersect.object.name === "btn_about") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.aboutMeTexture;
                this.aboutBtn.material = this.btnMaterial;
                this.projectsBtn.material = this.btnMaterial;
                this.cvBtn.material = this.btnMaterial;

                this.intersectObjects = [];
                this.intersectObjects.push(this.homeBtn, this.creditsBtn);
                this.homeBtn.material = this.btnMaterial;

                this.homeOpen = true;
              }
            }
          }

          if (this.currentIntersect.object.name === "btn_home") {
            document.body.style.cursor = "pointer";

            if (this.clicked) {
              if (this.projectOpen) {
                this.screenMaterial.map = this.projectsTexture;
                this.aboutBtn.material = this.btnMaterial;
                this.projectsBtn.material = this.btnMaterial;
                this.cvBtn.material = this.btnMaterial;

                this.projectBtns.forEach((e) => {
                  e.material = this.projectBtnMaterial;
                });

                this.homeBtn.material = this.btnMaterial;
                this.creditsBtn.material = this.btnMaterial;

                this.intersectObjects = this.projectBtns;
                this.intersectObjects.push(this.homeBtn, this.creditsBtn);
                this.creditsOpen = false;
                this.projectOpen = false;
              } else if (this.homeOpen) {
                this.screenMaterial.map = this.homeTexture;
                this.aboutBtn.material = this.screenMaterial;
                this.projectsBtn.material = this.screenMaterial;
                this.cvBtn.material = this.screenMaterial;

                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.creditsBtn,
                  this.aboutBtn,
                  this.projectsBtn,
                  this.cvBtn,
                  this.homeBtn
                );

                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.infoMainContainer.style.display = "none";
                document.querySelector(".credits").style.display = "none";
                document.querySelector(".info").style.display = "none";
                this.creditsOpen = false;
                this.homeOpen = false;
              } else {
                gsap.to(this.controls.target, {
                  x: 0.375,
                  y: 0.913637,
                  z: -1.161,
                  duration: 2.5,
                  ease: "power2.out",
                });

                gsap.to(this.camera.position, {
                  x: -3.43,
                  y: 1.73,
                  z: 4.72,
                  duration: 2.5,
                  ease: "power2.out",
                });

                this.monitorOn = false;

                this.intersectObjects = [];
                this.intersectObjects.push(this.laptop, this.laptopScreen);
                this.projectorScreen.material = this.video_1;
              }
            }
          }

          if (this.currentIntersect.object.name === "btn_projects") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.projectsTexture;
                this.aboutBtn.material = this.btnMaterial;
                this.projectsBtn.material = this.btnMaterial;
                this.cvBtn.material = this.btnMaterial;

                this.projectBtns.forEach((e) => {
                  e.material = this.projectBtnMaterial;
                });

                this.homeBtn.material = this.btnMaterial;
                this.creditsBtn.material = this.btnMaterial;

                this.intersectObjects = this.projectBtns;
                this.intersectObjects.push(this.homeBtn, this.creditsBtn);
                this.homeOpen = true;
              }
            }
          }

          if (this.currentIntersect.object.name === "btn_credits") {
            if (this.clicked) {
              this.infoMainContainer.style.display = "flex";
              document.querySelector(".credits").style.display = "flex";
              this.creditsOpen = true;
              this.homeOpen = true;
            }
          }

          if (this.currentIntersect.object.name === "btn_cv") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.cvTexture;
                this.aboutBtn.material = this.btnMaterial;
                this.projectsBtn.material = this.btnMaterial;
                this.cvBtn.material = this.btnMaterial;
                this.intersectObjects = [];
                this.intersectObjects.push(this.homeBtn, this.creditsBtn);
                this.homeOpen = true;
              }
            }
          }

          if (this.currentIntersect.object.name === "project_btn1") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.project_1;
                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.homeBtn,

                  this.moreInforamtionBtn
                );
                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.projectOpen = true;
                this.currentProject = 1;
              }
            }
          }

          if (this.currentIntersect.object.name === "project_btn2") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.project_2;
                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.homeBtn,

                  this.moreInforamtionBtn
                );

                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.projectOpen = true;
                this.currentProject = 2;
              }
            }
          }

          if (this.currentIntersect.object.name === "project_btn3") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.project_3;
                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.homeBtn,

                  this.moreInforamtionBtn
                );

                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.projectOpen = true;
                this.currentProject = 3;
              }
            }
          }

          if (this.currentIntersect.object.name === "project_btn4") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.project_4;
                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.homeBtn,

                  this.moreInforamtionBtn
                );

                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.projectOpen = true;
                this.currentProject = 4;
              }
            }
          }

          if (this.currentIntersect.object.name === "project_btn5") {
            if (this.clicked) {
              if (!this.creditsOpen) {
                this.screenMaterial.map = this.project_5;

                this.intersectObjects = [];
                this.intersectObjects.push(
                  this.homeBtn,

                  this.moreInforamtionBtn
                );

                this.projectBtns.forEach((e) => {
                  e.material = this.btnMaterial;
                });

                this.projectOpen = true;
                this.currentProject = 5;
              }
            }
          }

          if (this.currentIntersect.object.name === "btn_more_information") {
            if (this.clicked) {
              this.projectorScreen.material = this.projectMaterial;
              if (this.currentProject === 1) {
                this.projectMaterial.map = this.project_1_projector;
              } else if (this.currentProject === 2) {
                this.projectMaterial.map = this.project_2_projector;
              } else if (this.currentProject === 3) {
                this.projectMaterial.map = this.project_3_projector;
              } else if (this.currentProject === 4) {
                this.projectMaterial.map = this.project_4_projector;
              } else if (this.currentProject === 5) {
                this.projectMaterial.map = this.project_5_projector;
              }

              this.projectorAnimation();
            }
          }

          //? projector buttons
          if (this.currentIntersect.object.name === "btn_home_projector") {
            document.body.style.cursor = "pointer";

            if (this.clicked) {
              this.monitorAmination();
              this.infoMainContainer.style.display = "none";
              document.querySelector(".credits").style.display = "none";
              document.querySelector(".info").style.display = "none";
              this.creditsOpen = false;
            }
          }

          //? projector buttons
          if (this.currentIntersect.object.name === "btn_credits_projector") {
            if (this.clicked) {
              this.infoMainContainer.style.display = "flex";
              document.querySelector(".credits").style.display = "flex";
              this.creditsOpen = true;
            }
          }
        }

        //? drawer
      } else if (!this.intersects.length) {
        this.currentIntersect = null;
        if (!this.mobileSize) {
          if (this.room) {
            if (this.aboutBtn.scale.x > 0.061) {
              gsap.to(this.aboutBtn.scale, {
                x: 0.0585,
                y: 0.0585,
                z: 0.0585,
                duration: 1,
                ease: "ease-out",
              });
            }
            if (this.projectsBtn.scale.x > 0.061) {
              gsap.to(this.projectsBtn.scale, {
                x: 0.0585,
                y: 0.0585,
                z: 0.0585,
                duration: 1,
                ease: "ease-out",
              });
            }
            if (this.cvBtn.scale.x > 0.061) {
              gsap.to(this.cvBtn.scale, {
                x: 0.0585,
                y: 0.0585,
                z: 0.0585,
                duration: 1,
                ease: "ease-out",
              });
            }
          }
        }
        document.body.style.cursor = "auto";
        if (!this.currentIntersect) {
          if (this.outline) {
            if (!this.mobileSize) {
              gsap.to(this.outline.material, {
                opacity: 0,
                duration: 1,
              });
            }
          }
        }
      }
    }

    this.clicked = false;

    //? updating points inside the scene
  }
}
