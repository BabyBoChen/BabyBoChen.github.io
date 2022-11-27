import * as THREE from '../lib/three.js/Three.js';
import { GLTFLoader } from '../lib/three.js/GLTFLoader.js';
import { GLTFObject3D } from '../scripts/GLTFObject3D.js';
import { radians_to_degrees, degrees_to_radians } from '../scripts/mathTool.js';

/** @type {THREE.WebGLRenderer}*/
let renderer = null;
const VIEWPORT_RATIO = 4 / 3;
/** @type {THREE.Scene}*/
let scene = null;
/** @type {THREE.PerspectiveCamera}*/
let camera = null;
/** @type {[THREE.AnimationMixer]} */
let animationMixers = [];
const clock = new THREE.Clock();
let isPlaying = true;
/** @type {[THREE.Group]} */
let rotatingGroups = [];
/** @type {[THREE.Mesh]} */
const meshes = [];

(function main() {
    renderer = createRenderer();
    let viewportSize = getViewportSize(VIEWPORT_RATIO);
    renderer.setSize(viewportSize.x, viewportSize.y);
    scene = createScene();
    scene.add(createAmbientLight());
    let pointLight = createPointLight();
    scene.add(pointLight.target);
    scene.add(pointLight);
    loadObject3D('king_tut_glb.glb').then(function (kingTut) {
        scene.add(kingTut.scene);
        kingTut.scene.position.x -= 5;
        rotatingGroups.push(kingTut.scene);
        kingTut.meshesToDispose.forEach(mesh => meshes.push(mesh));
    });
    loadObject3D('Nefertiti.glb').then(function (nefertiti) {
        scene.add(nefertiti.scene);
        nefertiti.scene.position.x += 5;
        rotatingGroups.push(nefertiti.scene);
        nefertiti.meshesToDispose.forEach(mesh => meshes.push(mesh));
    });
    createFloor().then(function (floor) {
        scene.add(floor.scene);
        floor.meshesToDispose.forEach(mesh => meshes.push(mesh));
    });
    camera = createCamera();
    camera.position.z = 15;
    camera.position.y = 4;
    addEventHandlers();
    document.body.appendChild(renderer.domElement);
    mainLoop(rotatingGroups, renderer, scene, camera, clock, animationMixers);
})();

/** 
 * @param {Number} viewportRatio 
 * @returns {THREE.Vector2}
 * */
function getViewportSize(viewportRatio) {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let displayWidth = 0;
    let displayHeight = 0;
    if (screenWidth / screenHeight >= viewportRatio) {
        displayWidth = screenHeight * viewportRatio;
        displayHeight = screenHeight;
    } else {
        displayWidth = screenWidth;
        displayHeight = screenWidth * (1 / viewportRatio);
    }
    let size = new THREE.Vector2(displayWidth, displayHeight);
    return size;
}

/** @returns {THREE.WebGLRenderer} */
function createRenderer() {
    let _renderer = new THREE.WebGLRenderer();
    _renderer.shadowMap.enabled = true;
    _renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    _renderer.outputEncoding = THREE.sRGBEncoding;
    return _renderer;
}

/** @returns {THREE.Scene} */
function createScene() {
    let _scene = new THREE.Scene();
    _scene.background = new THREE.Color('skyblue');
    return _scene;
}

/** @param {string} url
 *  @returns {Promise<GLTFObject3D>} */
async function loadObject3D(url) {
    let object3D = null
    let done = function () { };
    let fail = function () { };
    let loadAsync = new Promise(function (done, fail) {
        let loader = new GLTFLoader();
        loader.load(url, function (_object3D) {
            _object3D.meshesToDispose = [];
            _object3D.scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.castShadow = true;
                    _object3D.meshesToDispose.push(node);
                }
            });
            object3D = _object3D;
            done();
        });
    });
    await loadAsync;
    return object3D;
}

/** @param {object} gltf
 *  @returns {THREE.AnimationMixer} */
function createAnimationMixer(gltf) {
    let mixer = new THREE.AnimationMixer(gltf.scene);
    let action = mixer.clipAction(gltf.animations[0]);
    action.play();
    return mixer;
}

/** @returns {Promise<GLTFObject3D>} */
async function createFloor() {
    let floor = null;
    let done = function () { };
    let fail = function () { };
    let loadAsync = new Promise(function (done, fail) {
        let loader = new GLTFLoader();
        loader.load('../assets/floor.glb', function (_object3D) {
            _object3D.meshesToDispose = [];
            _object3D.scene.traverse(function (node) {
                if (node instanceof THREE.Mesh) {
                    node.receiveShadow = true;
                    _object3D.meshesToDispose.push(node);
                }
            });
            _object3D.scene.position.y -= 0.1;
            floor = _object3D;
            done();
        });
    });
    await loadAsync;
    return floor;
}

/** @returns {THREE.PerspectiveCamera} */
function createCamera() {
    let _camera = new THREE.PerspectiveCamera(80, 4 / 3, 0.1, 1000);
    _camera.position.z = 2;
    _camera.position.y = 0.5;
    _camera.rotation.deltaX = 0;
    _camera.rotation.deltaWorldY = 0;
    //camera.rotation.deltaZ = 0;
    _camera.moving = true;
    return _camera;
}

/** @returns {THREE.AmbientLight} */
function createAmbientLight() {
    let ambientLight = new THREE.AmbientLight('#fff', 0.5);
    return ambientLight;
}

/** @return {THREE.PointLight}*/
function createPointLight() {
    let pointLight = new THREE.SpotLight("#fff");
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 1024;
    pointLight.shadow.mapSize.height = 1024;
    pointLight.shadow.camera.near = 0.5;
    pointLight.shadow.camera.far = 30;
    pointLight.position.set(-10, 15, 0);;
    pointLight.target.position.set(0, 0, 0);
    pointLight.distance = 25;
    pointLight.intensity = 2;
    //scene.add(pointLight.target);
    //scene.add(pointLight);
    let sphereSize = 1;
    let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    //scene.add(pointLightHelper);
    return pointLight;
}

const worldX = new THREE.Vector3(1, 0, 0);
const worldY = new THREE.Vector3(0, 1, 0);
const worldZ = new THREE.Vector3(0, 0, 1);
let beginAngleX;
let beginAngleY;
let beginTouchAngleX;
let beginTouchAngleY;
let movingAngle = false;

function addEventHandlers() {
    window.addEventListener("resize", function () {
        let viewportSize = getViewportSize(VIEWPORT_RATIO);
        renderer.setSize(viewportSize.x, viewportSize.y);
    });
    window.addEventListener("mousedown", function (mouseEvent) {
        beginAngleX = mouseEvent.clientX;
        beginAngleY = mouseEvent.clientY;
        movingAngle = true;
    });
    window.addEventListener("mousemove", function (mouseEvent) {
        if (movingAngle) {
            let viewportSize = new THREE.Vector2();
            renderer.getSize(viewportSize);
            let angleX = (mouseEvent.clientX - beginAngleX) / viewportSize.x * 2;
            let angleY = (mouseEvent.clientY - beginAngleY) / viewportSize.y * 2;
            camera.rotateOnWorldAxis(worldY, angleX);
            camera.rotation.deltaWorldY += angleX;
            if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360) {
                if (radians_to_degrees(camera.rotation.deltaWorldY) > 0) {
                    camera.rotation.deltaWorldY -= Math.PI * 2;
                } else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0) {
                    camera.rotation.deltaWorldY += Math.PI * 2;
                }
            }
            //console.log(radians_to_degrees(camera.rotation.deltaWorldY));
            beginAngleX = mouseEvent.clientX;
            if (Math.abs(radians_to_degrees(camera.rotation.deltaX + angleY)) <= 60) {
                camera.rotateX(angleY);
                camera.rotation.deltaX += angleY;
            }
            //console.log(radians_to_degrees(camera.rotation.deltaX));
            beginAngleY = mouseEvent.clientY;
        }
    });
    window.addEventListener("mouseup", function (mouseEvent) {
        movingAngle = false;
    });
    window.addEventListener("wheel", function (e) {
        e.preventDefault();
        if (e.deltaY < 0) {
            if (camera.fov >= 15) {
                camera.fov -= 3;
            }
        } else if (e.deltaY > 0) {
            if (camera.fov <= 75) {
                camera.fov += 3;
            }
        }
        camera.updateProjectionMatrix();
    });
    window.addEventListener("touchstart", function (e) {
        beginTouchAngleX = e.touches[0].clientX;
        beginTouchAngleY = e.touches[0].clientY;
        movingAngle = true;
    });
    window.addEventListener('touchmove', function (e) {
        e.preventDefault();
        if (movingAngle) {
            let viewportSize = new THREE.Vector2();
            renderer.getSize(viewportSize);
            let deltaTouchAngleX = (e.changedTouches[0].clientX - beginTouchAngleX) / viewportSize.x * 2;
            let deltaTouchAngleY = (e.changedTouches[0].clientY - beginTouchAngleY) / viewportSize.y * 2;
            camera.rotateOnWorldAxis(worldY, deltaTouchAngleX);
            camera.rotation.deltaWorldY += deltaTouchAngleX;
            if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360) {
                if (radians_to_degrees(camera.rotation.deltaWorldY) > 0) {
                    camera.rotation.deltaWorldY -= Math.PI * 2;
                } else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0) {
                    camera.rotation.deltaWorldY += Math.PI * 2;
                }
            }
            beginTouchAngleX = e.changedTouches[0].clientX;
            if (Math.abs(radians_to_degrees(camera.rotation.deltaX + deltaTouchAngleY)) <= 60) {
                camera.rotateX(deltaTouchAngleY);
                camera.rotation.deltaX += deltaTouchAngleY;
            }
            beginTouchAngleY = e.changedTouches[0].clientY;
        }
    });
    window.addEventListener("touchend", function (e) {
        movingAngle = false;
    });
    window.addEventListener('beforeunload', function (e) {
        isPlaying = false;
        toDispose.forEach(mesh => {
            scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.geometry = undefined;
            if (mesh.material.map) {
                mesh.material.map.dispose();
            }
            mesh.material.dispose();
            mesh = undefined;
        });
        renderer.dispose();
    });
}

/** @param {[THREE.Group]} groups
 *  @param {THREE.WebGLRenderer} _renderer
 *  @param {THREE.Scene} _scene
 *  @param {THREE.PerspectiveCamera} _camera
 *  @param {THREE.Clock} _clock
 *  @param {[THREE.AnimationMixer]} _animationMixers
 */
function mainLoop(groups, _renderer, _scene, _camera, _clock, _animationMixers) {
    groups.forEach(group => {
        if (group) {
            group.rotateY(degrees_to_radians(-1));
        };
    });
    if (isPlaying) {
        _renderer.render(_scene, _camera);
        let delta = _clock.getDelta();
        _animationMixers.forEach(function (mixer) {
            if (mixer) {
                mixer.update(delta);
            }
        });
        requestAnimationFrame(function () {
            mainLoop(groups, _renderer, _scene, _camera, _clock, _animationMixers);
        });
    }
}


//import * as THREE from './Three.js';
//import {GLTFLoader} from './GLTFLoader.js';
//import {radians_to_degrees} from './mathTool.js';
//import {degrees_to_radians} from './mathTool.js';

//let isPlaying = true;
//const toDispose = [];

//var renderer = new THREE.WebGLRenderer();
//renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.PCFSoftShadowMap;
//renderer.outputEncoding = THREE.sRGBEncoding;

//var scene = new THREE.Scene();
//scene.background = new THREE.Color('skyblue');

//var camera = new THREE.PerspectiveCamera( 80, 4/3 , 0.1, 1000 );
//camera.position.z = 15;
//camera.position.y = 3;
//camera.rotation.deltaX = 0;
//camera.rotation.deltaWorldY = 0;
////camera.rotation.deltaZ = 0;

//camera.moving = true;

//var screenWidth = window.innerWidth;
//var screenHeight = window.innerHeight;
//var displayWidth;
//var displayHeight;
//if (screenWidth/screenHeight >= 4/3){
//    renderer.setSize(screenHeight*4/3,screenHeight);
//    displayWidth = screenHeight*4/3;
//    displayHeight = screenHeight;
//}else{
//    renderer.setSize(screenWidth,screenWidth*3/4);
//    displayWidth = screenWidth;
//    displayHeight = screenWidth*3/4;
//}
//window.addEventListener("resize",function(){
    
//    screenWidth = window.innerWidth;
//    screenHeight = window.innerHeight;

//    if (screenWidth/screenHeight >= 4/3){
//        renderer.setSize(screenHeight*4/3,screenHeight);
//        displayWidth = screenHeight*4/3;
//        displayHeight = screenHeight;
//    }else{
//        renderer.setSize(screenWidth,screenWidth*3/4);
//        displayWidth = screenWidth;
//        displayHeight = screenWidth*3/4;
//    }
//});

//document.body.appendChild( renderer.domElement );

//var models = [];

//var kingTut;
//var loader = new GLTFLoader();
//loader.load('king_tut_glb.glb',function(model){
//    kingTut = model;
//    kingTut.scene.traverse(function(node) {
//        if(node instanceof THREE.Mesh) {
//            node.castShadow = true;
//            toDispose.push(node);
//        }
//    });
//    scene.add(kingTut.scene);
//    kingTut.scene.position.x -= 5;
//    window.kingTut = kingTut;
//    models.push(kingTut);
//});

//var nefertiti;
//var loader = new GLTFLoader();
//loader.load('Nefertiti.glb',function(model){
//    nefertiti = model;
//    nefertiti.scene.traverse(function(node) {
//        if(node instanceof THREE.Mesh) {
//            node.castShadow = true;
//            toDispose.push(node);
//        }
//    });
//    scene.add(nefertiti.scene);
//    nefertiti.scene.position.x += 5;
//    window.nefertiti = nefertiti;
//    models.push(nefertiti);
//});

//var floor;
//var loader = new GLTFLoader();
//loader.load('floor.glb',function(model){
//    floor = model;
//    floor.scene.traverse(function(node) {
//        if(node instanceof THREE.Mesh) {
//            node.receiveShadow = true;
//            toDispose.push(node);
//        }
//    });
//    scene.add(floor.scene);
//    window.floor = floor;
//});


//var ambientLight = new THREE.AmbientLight('#fff',0.5);
//scene.add(ambientLight);
//var pointLight = new THREE.SpotLight("#fff");
//pointLight.castShadow = true;
//pointLight.shadow.mapSize.width = 512;
//pointLight.shadow.mapSize.height = 512;
//pointLight.shadow.camera.near = 0.5;
//pointLight.shadow.camera.far = 30;
//pointLight.position.set(-10,15,0);;
//pointLight.target.position.set(0,0,0);
//pointLight.distance = 25;
//pointLight.intensity = 2;
//scene.add(pointLight.target);
//scene.add(pointLight);
//var sphereSize = 1;
//var pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
////scene.add(pointLightHelper);


//function animate() {

//    models.forEach(model => {
//        if(model){
//            model.scene.rotateY(degrees_to_radians(-1));
//        };        
//    });
    
//    if(isPlaying){        
//        renderer.render(scene, camera);
//        requestAnimationFrame(animate);
//    }
    
//}

//animate();

//var worldX = new THREE.Vector3(1, 0, 0);
//var worldY = new THREE.Vector3(0, 1, 0);
//var worldZ = new THREE.Vector3(0, 0, 1);

//var beginAngleX;
//var beginAngleY;
//var movingAngle = false;

//window.addEventListener("mousedown",function(mouseEvent){
//    beginAngleX = mouseEvent.clientX;
//    beginAngleY = mouseEvent.clientY;
//    movingAngle = true;
//});

//window.addEventListener("mouseup",function(mouseEvent){
//    movingAngle = false;
//});

//window.addEventListener("mousemove",function(mouseEvent){
    
//    var angleX = (mouseEvent.clientX - beginAngleX) / displayWidth*2;
//    var angleY = (mouseEvent.clientY - beginAngleY) / displayHeight*2;

//    if (movingAngle){
//        camera.rotateOnWorldAxis(worldY,angleX);
//        camera.rotation.deltaWorldY += angleX;
//        if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360){
//            if (radians_to_degrees(camera.rotation.deltaWorldY) > 0){
//                camera.rotation.deltaWorldY -= Math.PI * 2;
//            }else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0){
//                camera.rotation.deltaWorldY += Math.PI * 2;
//            }
//        }
//        //console.log(radians_to_degrees(camera.rotation.deltaWorldY));
//        beginAngleX = mouseEvent.clientX;
//        if (Math.abs(radians_to_degrees(camera.rotation.deltaX + angleY)) <= 60){
//            camera.rotateX(angleY);
//            camera.rotation.deltaX += angleY;
//        }
//        //console.log(radians_to_degrees(camera.rotation.deltaX));
//        beginAngleY = mouseEvent.clientY;
//    }
//});

//window.addEventListener("wheel",function(e){
//    e.preventDefault();
//    if (e.deltaY < 0){
//        if (camera.fov >= 15){
//            camera.fov -= 3;
//        }
//    }else if (e.deltaY > 0){
//        if (camera.fov <= 60){
//            camera.fov += 3;
//        }
//    }
//    camera.updateProjectionMatrix();    
//});

//var beginTouchAngleX;
//var beginTouchAngleY;

//window.addEventListener("touchstart",function(e){
//    beginTouchAngleX = e.touches[0].clientX;
//    beginTouchAngleY = e.touches[0].clientY;
//    movingAngle = true;
//});

//window.addEventListener('touchmove', function(e) {
//    e.preventDefault();
//    if(movingAngle){
//        var deltaTouchAngleX, deltaTouchAngleY;
//        deltaTouchAngleX = (e.changedTouches[0].clientX - beginTouchAngleX)/ displayWidth*2;
//        deltaTouchAngleY = (e.changedTouches[0].clientY - beginTouchAngleY)/ displayHeight*2;
//        camera.rotateOnWorldAxis(worldY, deltaTouchAngleX);
//        camera.rotation.deltaWorldY += deltaTouchAngleX;
//        if (Math.abs(radians_to_degrees(camera.rotation.deltaWorldY)) >= 360){
//            if (radians_to_degrees(camera.rotation.deltaWorldY) > 0){
//                camera.rotation.deltaWorldY -= Math.PI * 2;
//            }else if (radians_to_degrees(camera.rotation.deltaWorldY) < 0){
//                camera.rotation.deltaWorldY += Math.PI * 2;
//            }
//        }
//        beginTouchAngleX = e.changedTouches[0].clientX;
//        if (Math.abs(radians_to_degrees(camera.rotation.deltaX + deltaTouchAngleY)) <= 60){
//            camera.rotateX(deltaTouchAngleY);
//            camera.rotation.deltaX += deltaTouchAngleY;
//        }
//        beginTouchAngleY = e.changedTouches[0].clientY;
//    }
//});

//window.addEventListener("touchend",function(e){
//    movingAngle = false;
//});

//window.addEventListener('beforeunload', function (e) {

//    isPlaying = false;
//    toDispose.forEach(mesh => {
//        scene.remove(mesh);
//        mesh.geometry.dispose();
//        mesh.geometry = undefined;
//        if(mesh.material.map){
//            mesh.material.map.dispose();
//        }      
//        mesh.material.dispose();      
//        mesh = undefined;
//    });
    
//});
