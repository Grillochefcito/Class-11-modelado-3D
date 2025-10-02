import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x54AAFF); // azul cielo

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// Geometría del torus
const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

// 1) Material plano (color sólido)
const torus1 = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color: 0x00ff00 }) // verde sólido
);
torus1.position.x = -3;
scene.add(torus1);

// 2) Textura difusa (lava o agua)
const textureLoader = new THREE.TextureLoader();
const diffuseTexture = textureLoader.load('./assets/img/lava.jpg'); 
const torus2 = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ map: diffuseTexture })
);
torus2.position.x = 0;
scene.add(torus2);

// 3) Textura con relieve (normal map)
const diffuse2 = textureLoader.load('./assets/img/awa.jpg'); 
const normalMap = textureLoader.load('./assets/img/lava.jpg'); // usamos lava como normal map
const torus3 = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ map: diffuse2, normalMap: normalMap })
);
torus3.position.x = 3;
scene.add(torus3);

// Luces
scene.add(new THREE.AmbientLight(0xffffff, 0.4)); // luz ambiente

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
scene.add(dirLight);

camera.position.z = 6;

let angle = 0; // ángulo para rotar la luz

function animate() {
    // Rotación de los torus
    torus1.rotation.x += 0.01;
    torus1.rotation.y += 0.01;

    torus2.rotation.x += 0.01;
    torus2.rotation.y += 0.01;

    torus3.rotation.x += 0.01;
    torus3.rotation.y += 0.01;

    // Hacer rotar la luz alrededor de la escena
    angle += 0.01;
    dirLight.position.set(
        Math.cos(angle) * 5, // X
        5,                   // Y fijo
        Math.sin(angle) * 5  // Z
    );

    controls.update();
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
