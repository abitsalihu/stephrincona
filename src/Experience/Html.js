import Experience from "./Experience";
import gsap from "gsap";

export default class HTML {
  constructor() {
    this.experience = new Experience();
    this.body = document.querySelector("body");
    this.canvas = this.experience.canvas;
    this.resources = this.experience.resources;
    this.mobile = this.experience.size.mobileSize;

    //! html

    //? animate background
    this.bg = document.createElement("div");
    this.bg.classList.add("bg");
    this.bgContent = `
    <div class="img-con">
      <img src="/textures/logo1.png" alt="logo">

      </div>
      <svg
  class="container" 
  x="0px" 
  y="0px"
  viewBox="0 0 55 23.1"
  height="23.1"
  width="55"
  preserveAspectRatio='xMidYMid meet'
>
  <path
    class="track" 
    fill="none" 
    stroke-width="4" 
    pathlength="100"
    d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
  />
  <path
    class="car" 
    fill="none" 
    stroke-width="4" 
    pathlength="100"
    d="M26.7,12.2c3.5,3.4,7.4,7.8,12.7,7.8c5.5,0,9.6-4.4,9.6-9.5C49,5,45.1,1,39.8,1c-5.5,0-9.5,4.2-13.1,7.8l-3.4,3.3c-3.6,3.6-7.6,7.8-13.1,7.8C4.9,20,1,16,1,10.5C1,5.4,5.1,1,10.6,1c5.3,0,9.2,4.5,12.7,7.8L26.7,12.2z"
  />
</svg>


      `;
    this.bg.innerHTML = this.bgContent;
    this.body.appendChild(this.bg);

    this.navImage = document.createElement("div");
    this.navImage.classList.add("nav-con");
    this.navImage.innerHTML = `
           <img src="/textures/navigation.png" alt="" />

    `;

    this.body.append(this.navImage);

    //? info icon
    this.infoIcon = document.createElement("div");

    this.infoIcon.innerHTML = `
      <img src="/textures/info-icon1.png"/>
     `;

    this.infoIcon.classList.add("info-icon");

    this.body.append(this.infoIcon);

    //? info elements
    this.infoMainContainer = document.createElement("div");
    this.infoMainContainer.classList.add("info-main-con");

    this.infoMainContainer.innerHTML = `

    <div class="info-inner-con credits">

      <div class="dflex"> 
        <h3></h3>
        <div class="close-btn">
          <svg class="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.21794 9.45711C7.60846 9.06659 7.60846 8.43342 7.21794 8.0429L1.75 2.57496C1.5222 2.34716 1.5222 1.97781 1.75 1.75V1.75C1.97781 1.5222 2.34716 1.5222 2.57496 1.75L8.0429 7.21794C8.43342 7.60846 9.06659 7.60846 9.45711 7.21794L14.925 1.75C15.1529 1.5222 15.5222 1.5222 15.75 1.75V1.75C15.9778 1.97781 15.9778 2.34716 15.75 2.57496L10.2821 8.0429C9.89154 8.43342 9.89154 9.06659 10.2821 9.45711L15.75 14.925C15.9778 15.1529 15.9778 15.5222 15.75 15.75V15.75C15.5222 15.9778 15.1529 15.9778 14.925 15.75L9.45711 10.2821C9.06659 9.89154 8.43342 9.89154 8.0429 10.2821L2.57496 15.75C2.34716 15.9778 1.97781 15.9778 1.75 15.75V15.75C1.5222 15.5222 1.5222 15.1529 1.75 14.925L7.21794 9.45711Z" fill="white" stroke="white" stroke-width="1.5"/>
          </svg>
        </div>
      </div>

      <div class="credits-con">
        <div class="credits-p">
          <p>
            Projects, 3D models & Web Design:
          </p>
          <p class="credits-name">
            Stephany Rincón
          </p>
        </div>

        <div class="credits-p">
          <p>
           Photography Director:
          </p>
          <p class="credits-name">
            Sofía Montero
          </p>
        </div>

        <div class="credits-p">
          <p>
           Web 3D Developer:
          </p>
          <p class="credits-name">
            Abit Salihu
          </p>
        </div>

        <div class="credits-p">
          <p>
            Biggest Supporters:
          </p>
          <p class="credits-name">
            Mom and Dad :)
          </p>
        </div>

        <div class="credits-p">
          <p>
            Special Thanks:
          </p>
          <p class="credits-name">
            Venezuela💛💙❤️
          </p>
        </div>

      </div>
    </div>

    <div class="info-inner-con info">

      <div class="dflex"> 
        <h3></h3>
        <div class="close-btn">
          <svg class="icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.21794 9.45711C7.60846 9.06659 7.60846 8.43342 7.21794 8.0429L1.75 2.57496C1.5222 2.34716 1.5222 1.97781 1.75 1.75V1.75C1.97781 1.5222 2.34716 1.5222 2.57496 1.75L8.0429 7.21794C8.43342 7.60846 9.06659 7.60846 9.45711 7.21794L14.925 1.75C15.1529 1.5222 15.5222 1.5222 15.75 1.75V1.75C15.9778 1.97781 15.9778 2.34716 15.75 2.57496L10.2821 8.0429C9.89154 8.43342 9.89154 9.06659 10.2821 9.45711L15.75 14.925C15.9778 15.1529 15.9778 15.5222 15.75 15.75V15.75C15.5222 15.9778 15.1529 15.9778 14.925 15.75L9.45711 10.2821C9.06659 9.89154 8.43342 9.89154 8.0429 10.2821L2.57496 15.75C2.34716 15.9778 1.97781 15.9778 1.75 15.75V15.75C1.5222 15.5222 1.5222 15.1529 1.75 14.925L7.21794 9.45711Z" fill="white" stroke="white" stroke-width="1.5"/>
          </svg>
        </div>
      </div>

      <div class="rflex">
        <p>
          ¡Bienvenidos a mi portafolio!
        </p>

         <p>
          Estoy muy emocionada de compartir contigo una selección de mis trabajos más representativos. Cada proyecto que verás aquí es el resultado de un proceso creativo que refleja mi pasión por el diseño y mi constante deseo de mejorar.
        </p>

         <p>
    Esta página web interactiva es más que un simple portafolio; es una representación visual y conceptual de mi hogar, en especial de mi sala, que es el corazón de mi espacio creativo. Aquí es donde han nacido y evolucionado todos los proyectos que estás por descubrir. He cuidado hasta el más mínimo detalle para que esta experiencia te transporte a mi mundo, para que no solo veas mi trabajo, sino también entiendas el entorno donde ocurre la magia del diseño.
        </p>

         <p>
    He querido hacer de esta página una puerta abierta a mi proceso creativo, donde puedas explorar, de manera interactiva, cómo y dónde surgen las ideas, desde el concepto inicial hasta la ejecución final. Es una invitación a adentrarte en mi vida creativa, a sentir de cerca el ambiente en el que vivo y trabajo, y a experimentar de primera mano "dónde nacen los proyectos".
        </p>

        <p>
    Espero que disfrutes de esta experiencia interactiva tanto como yo disfruté creando cada uno de los proyectos que verás aquí. ¡Gracias por visitar mi espacio y bienvenido a mi mundo!
        </p>
      </div>

    </div>

    
    `;

    this.body.append(this.infoMainContainer);

    //? email btn

    this.emailButton = document.createElement("a");
    this.emailButton.href = "mailto:stephanyrincona@gmail.com";

    this.body.append(this.emailButton);

    //! end HTML

    this.resources.on("resourcesReady", () => {
      gsap.to(".bg", {
        duration: 2,
        opacity: 0,
        y: 0,
        ease: "ease-out",
        display: "none",
        // delay: 2,
        onComplete: () => {
          gsap.to(this.navImage, {
            duration: 0.5,
            opacity: 1,
            delay: 2,
          });

          gsap.to(this.infoIcon, {
            opacity: 1,
            duration: 1,
            delay: 2,
          });
        },
      });
    });
  }

  update() {}
}
