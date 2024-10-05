export default [
  {
    name: "environmentTexture",
    type: "cubeTextureLoader",
    path: [
      "/textures/envTexture/px.png",
      "/textures/envTexture/nx.png",
      "/textures/envTexture/py.png",
      "/textures/envTexture/ny.png",
      "/textures/envTexture/pz.png",
      "/textures/envTexture/nz.png",
    ],
  },

  {
    name: "room",
    type: "gltfLoader",
    path: "/models/room.glb",
  },

  //? TEXTURES

  //? baked textures

  {
    name: "firstBakedTexture",
    type: "textureLoader",
    path: "/textures/first_baked.webp",
  },

  {
    name: "secondBakedTexture",
    type: "textureLoader",
    path: "/textures/second_baked.webp",
  },

  {
    name: "wallsBakedTexture",
    type: "textureLoader",
    path: "/textures/walls_baked.webp",
  },

  {
    name: "floorBaked",
    type: "textureLoader",
    path: "/textures/floor_baked.webp",
  },

  {
    name: "magazinesTextures",
    type: "textureLoader",
    path: "/textures/magazine_textures.webp",
  },

  //? monitor textures

  {
    name: "homeTexture",
    type: "textureLoader",
    path: "/textures/screen_first.webp",
  },

  {
    name: "aboutMeTexture",
    type: "textureLoader",
    path: "/textures/aboutMe.webp",
  },

  {
    name: "projectsTexture",
    type: "textureLoader",
    path: "/textures/projects_texture.webp",
  },

  {
    name: "cvTexture",
    type: "textureLoader",
    path: "/textures/cv_texture.webp",
  },

  {
    name: "project_1",
    type: "textureLoader",
    path: "/textures/project_1.png",
  },

  {
    name: "project_2",
    type: "textureLoader",
    path: "/textures/project_2.png",
  },

  {
    name: "project_3",
    type: "textureLoader",
    path: "/textures/project_3.png",
  },

  {
    name: "project_4",
    type: "textureLoader",
    path: "/textures/project_4.png",
  },

  {
    name: "project_5",
    type: "textureLoader",
    path: "/textures/project_5.png",
  },
];
