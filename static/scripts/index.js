import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

const loader = new GLTFLoader();

loader.load('static/models/vgc.glb', (gltf) => {
    const model = gltf.scene;
    model.position.set(0, 0, 0);
    model.scale.set(0.05, 0.05, 0.05);
    model.rotation.x = THREE.MathUtils.degToRad(90);
    scene.add(model);

    function animate() {
        requestAnimationFrame(animate);
        
        model.rotation.z += 0.01;

        renderer.render(scene, camera);
    }

    animate();
});

// Adding text
const fontLoader = new FontLoader();
fontLoader.load('static/fonts/coolvetica.json', function (font) {
    const textGeometry = new TextGeometry('chili game', {
        font: font,
        size: 0.5,      // Size of the text
        height: 0.01,    // Depth of the text
        curveSegments: 10,
        bevelEnabled: false,
    });

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    textMesh.position.set(-3, 2.5, 0);  // Set position of the text
    scene.add(textMesh);
});

camera.position.z = 5;
