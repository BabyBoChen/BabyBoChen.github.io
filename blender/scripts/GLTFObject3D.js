import * as THREE from '../lib/three.js/Three.js';
import { GLTFParser } from '../lib/three.js/GLTFLoader.js';

class GLTFObject3D {
    constructor() {
        /** @type {[THREE.AnimationClip]} */
        this.animations = [];
        this.asset = {};
        this.cameras = [];
        /** @type {[THREE.Mesh]}*/
        this.meshesToDispose = [];
        /** @type {GLTFParser}*/
        this.parser = null;
        /** @type {THREE.Group}*/
        this.scene = null;
        /** @type {[THREE.Group]}*/
        this.scenes = null;
        this.userData = null;
    }
}

export { GLTFObject3D  }