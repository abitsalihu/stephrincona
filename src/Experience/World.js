import * as THREE from "three";
import Experience from "./Experience";
import { Reflector } from "three/addons/objects/Reflector.js";
import gsap from "gsap";

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
    this.html = this.experience.html;

    //? html
    this.infoMainContainer = this.html.infoMainContainer;
    this.homeBtn = null;
    this.aboutBtn = null;
    this.projectsBtn = null;
    this.cvBtn = null;
    this.creditsBtn = null;

    //? projects btn
    this.projectBtns = [];

    this.projectorHomeBtn = null;
    this.projectorCreditsBtn = null;

    //? raycaster

    this.infoOpen = false;

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

      this.room = this.resources.items.room;

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

      this.room.scene.traverse((child) => {
        if (child.name === "screen") {
          child.material = this.screenMaterial;
          console.log(child.position.x);
        }

        //? project texture

        if (child.name.startsWith("project")) {
          child.material = this.projectMaterial;
          this.controls.target.set(
            child.position.x,
            child.position.y,
            child.position.z
          );
        }

        //?

        if (child.name.startsWith("btn")) {
          child.material = this.btnMaterial;
        }

        if (child.name === "btn_home") {
          this.homeBtn = child;
        }
        if (child.name === "btn_about") {
          child.material = this.screenMaterial;
          this.aboutBtn = child;
          console.log(child.scale.x);
          this.intersectObjects.push(child);
        }
        if (child.name === "btn_projects") {
          child.material = this.screenMaterial;

          this.projectsBtn = child;
          this.intersectObjects.push(child);
        }
        if (child.name === "btn_cv") {
          child.material = this.screenMaterial;

          this.cvBtn = child;
          this.intersectObjects.push(child);
        }
        if (child.name === "btn_credits") {
          this.creditsBtn = child;
          this.intersectObjects.push(child);
        }

        if (child.name.startsWith("project_btn")) {
          this.projectBtns.push(child);
          child.material = this.btnMaterial;
          // child.material = new THREE.MeshBasicMaterial({ color: "red" });
        }
        //? projector buttons
        if (child.name === "btn_home_projector") {
          this.projectorHomeBtn = child;
        }

        if (child.name === "btn_credits_projector") {
          this.projectorCreditsBtn = child;
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

          // this.mirror.position.set(
          //   child.position.x,
          //   child.position.y,
          //   child.position.z
          // );

          // this.mirror.position.set(
          //   -0.5254805088043213,
          //   0.6485477685928345,
          //   -1.0672026872634888
          // );

          console.log(child.position.x, child.position.y, child.position.z);

          this.debugActive();

          this.mirror.rotation.x = -0.22;
        }
      });

      // this.room.scene.scale.set(0, 0, 0);

      // gsap.to(this.room.scene.scale, {
      //   x: 1,
      //   y: 1,
      //   z: 1,
      //   duration: 3,
      //   delay: 1,
      //   ease: "linear",
      // });

      // gsap.to(this.room.scene.rotation, {
      //   y: Math.PI * 2,
      //   duration: 3,
      //   delay: 1,
      //   ease: "linear",
      // });

      this.scene.add(this.room.scene);
      this.scene.add(this.mirror);

      // this.controls.target.set(1.8344, 1.5365, 0.41755);
      // this.camera.position.set(0.856, 1.54, 0.4106);

      this.controls.target.set(0.25219, 0.913636, -1.16198);
      this.camera.position.set(
        0.2527391698472012,
        0.9582415233999753,
        -0.9810956584553856
      );

      // this.camera.position.set(
      //   -2.672396368986411,
      //   1.5513777436793132,
      //   2.3745987383675415
      // );

      // -2.672396368986411 1.5513777436793132 2.3745987383675415

      this.infoMainContainer.addEventListener("click", (e) => {
        console.log(e.target.className);
        if (e.target.className === "close-btn") {
          this.infoMainContainer.style.display = "none";
          document.querySelector(".credits").style.display = "none";
          document.querySelector(".info").style.display = "none";
          this.infoOpen = false;
        }
      });
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

  monitorAmination() {
    gsap.to(this.controls.target, {
      x: 0.25,
      y: 0.91,
      z: -1.16,

      duration: 3.5,
      ease: "ease-in",
    });

    gsap.to(this.camera.position, {
      x: 0.252,
      y: 0.958,
      z: -0.981,
      duration: 3.5,
      ease: "ease-in",
    });
  }

  projectorAnimation() {
    this.projectorHomeBtn.material = this.btnMaterial;
    this.projectorCreditsBtn.material = this.btnMaterial;
    gsap.to(this.controls.target, {
      x: 1.8344,
      y: 1.5365,
      z: 0.41755,

      duration: 4,
      ease: "ease-out",
    });

    gsap.to(this.camera.position, {
      x: 0.856,
      y: 1.54,
      z: 0.4106,
      duration: 4,
      ease: "ease-out",
      onComplete: () => {
        this.intersectObjects.push(
          this.projectorHomeBtn,
          this.projectorCreditsBtn
        );
      },
    });
  }

  debugActive() {
    if (this.experience.debug.active) {
      this.worldFolder = this.experience.debug.gui.addFolder("world-Debug");
    }
  }

  update() {
    if (this.debugSettings.objectActive) {
      if (this.cube) {
        this.cube.rotation.y += 0.01;
        this.cube.rotation.z -= 0.01;
        this.cube.rotation.x += 0.005;
      }
    }

    if (this.rayCaster) {
      this.rayCaster.setFromCamera(this.pointer, this.camera);
      this.intersects = this.rayCaster.intersectObjects(this.intersectObjects);

      if (this.intersects.length) {
        if (!this.currentIntersect) {
        }
        this.currentIntersect = this.intersects[0];

        //? what happens when certain object is clicked

        if (!this.infoOpen) {
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
            if (!this.infoOpen) {
              this.screenMaterial.map = this.aboutMeTexture;
              this.aboutBtn.material = this.btnMaterial;
              this.projectsBtn.material = this.btnMaterial;
              this.cvBtn.material = this.btnMaterial;

              this.intersectObjects = [];
              this.intersectObjects.push(this.homeBtn, this.creditsBtn);
              this.homeBtn.material = this.btnMaterial;

              console.log(this.intersectObjects);
            }
          }
        }

        if (this.currentIntersect.object.name === "btn_home") {
          document.body.style.cursor = "pointer";

          if (this.clicked) {
            this.screenMaterial.map = this.homeTexture;
            this.aboutBtn.material = this.screenMaterial;
            this.projectsBtn.material = this.screenMaterial;
            this.cvBtn.material = this.screenMaterial;

            this.intersectObjects = [];
            this.intersectObjects.push(
              this.creditsBtn,
              this.aboutBtn,
              this.projectsBtn,
              this.cvBtn
            );

            this.projectBtns.forEach((e) => {
              e.material = this.btnMaterial;
            });

            this.infoMainContainer.style.display = "none";
            document.querySelector(".credits").style.display = "none";
            document.querySelector(".info").style.display = "none";
            this.infoOpen = false;
          }
        }

        if (this.currentIntersect.object.name === "btn_projects") {
          if (this.clicked) {
            if (!this.infoOpen) {
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
            }
          }
        }

        if (this.currentIntersect.object.name === "btn_credits") {
          if (this.clicked) {
            this.infoMainContainer.style.display = "flex";
            document.querySelector(".credits").style.display = "flex";
            this.infoOpen = true;
          }
        }

        if (this.currentIntersect.object.name === "btn_cv") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.screenMaterial.map = this.cvTexture;
              this.aboutBtn.material = this.btnMaterial;
              this.projectsBtn.material = this.btnMaterial;
              this.cvBtn.material = this.btnMaterial;
              this.intersectObjects = [];
              this.intersectObjects.push(this.homeBtn, this.creditsBtn);
            }
          }
        }

        if (this.currentIntersect.object.name === "project_btn1") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.projectMaterial.map = this.project_1;

              this.projectorAnimation();
            }
          }
        }

        if (this.currentIntersect.object.name === "project_btn2") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.projectMaterial.map = this.project_2;
              this.projectorAnimation();
            }
          }
        }

        if (this.currentIntersect.object.name === "project_btn3") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.projectMaterial.map = this.project_3;
              this.projectorAnimation();
            }
          }
        }

        if (this.currentIntersect.object.name === "project_btn4") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.projectMaterial.map = this.project_4;
              this.projectorAnimation();
            }
          }
        }

        if (this.currentIntersect.object.name === "project_btn5") {
          if (this.clicked) {
            if (!this.infoOpen) {
              this.projectMaterial.map = this.project_5;
              this.projectorAnimation();
            }
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
            this.infoOpen = false;
          }
        }

        //? projector buttons
        if (this.currentIntersect.object.name === "btn_credits_projector") {
          if (this.clicked) {
            this.infoMainContainer.style.display = "flex";
            document.querySelector(".credits").style.display = "flex";
            this.infoOpen = true;
          }
        }

        //? drawer
      } else if (!this.intersects.length) {
        this.currentIntersect = null;
        if (this.size.mobileSize) {
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
      }
    }

    this.clicked = false;

    //? updating points inside the scene
  }
}
