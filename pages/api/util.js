const usuarios = [
  "Luis",
  "Enmanuel",
  "Douglas",
  "Ervin",
  "Gerardo",
  "Lester",
  "Christian",
];

const rol = [];

export default generateRol = () => {
  usuario.forEach((element) => {
    const usuario = usuarios[Math.floor(Math.random() * list.length)];
    !rol.includes(usuario) && rol.push(usuario);
  });
};

console.log(rol);
