

//other stuff for js func
document.querySelector('.opener').addEventListener('change', function () {
  const parameters = document.querySelector('.parameters');
  if (this.checked) {
    parameters.style.transform = 'translateX(0)';  // Change color on check
  } else {
    parameters.style.transform = 'translateX(-100%)';  // Reset color when unchecked
  }
});

const reset = document.getElementById('reset');


// Add a click event listener to the button
reset.addEventListener('click', function() {
   xRange.value = -0.9;
   yRange.value = 0.254;
   IterationsRange.value = 100;
   AnSpeedRange.value = 0.01;
   AnRangeRange.value = 0.05;
 

  
});



import * as THREE from "https://cdn.skypack.dev/three@0.146.0";
const scene = new THREE.Scene();
const bufferScene = new THREE.Scene();
const sizes = {
  width: window.innerWidth,  
  height: window.innerHeight
};
const dataTexture = createDataTexture();
const geometry = new THREE.PlaneGeometry(2, 2);
const resolution = new THREE.Vector3(
  sizes.width,
  sizes.height,
  window.devicePixelRatio
);
//boilerplate ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^





var mouseX = 0;
var mouseY = 0;

window.addEventListener('mousemove', (event) => {
   mouseX = event.clientX; // X coordinate relative to the viewport
   mouseY = event.clientY; // Y coordinate relative to the viewport
});
let deltaX =0.; // Horizontal scroll amount
let deltaY = 0.; // Vertical scroll amount
window.addEventListener('wheel', (event) => {
  
   deltaX += event.deltaX; // Horizontal scroll amount
   deltaY += event.deltaY; // Vertical scroll amount
});

var RightClicked = false;
var LeftClicked = false;
var RightClick = false;
var LeftClick = false;
document.addEventListener('mousedown', function(event) {
  if (event.button === 2) {
    
      // Right-click detected
      RightClicked = true;
      RightClick = true;
  } else if (event.button === 0) {
      // Left-click detected
      LeftClicked = true;
      LeftClick = true;
  }
});
// Mouse down event listener to detect mouse press
document.addEventListener('mouseup', function(event) {
  if (event.button === 2) {
      // Right-click detected
      RightClick = false;
  } else if (event.button === 0) {
      // Left-click detected
      LeftClick = false;
  }
});




let renderBufferA = new THREE.WebGLRenderTarget(
    sizes.width,
    sizes.height,
    {
        // In this demo UV coordinates are float values in the range of [0,1]. 
        // If you render these values into a 32bit RGBA buffer (a render target in format RGBA and type UnsignedByte), you will lose precision since you can only store 8 bit (256 possible integer values) per color channel. 
        // This loss is visible if you use the sampled uv coordinates for a texture fetch.
        // You can fix the issue if you add this parameter when creating the render target type: THREE.FloatType. 
        // The underlying texture is now a float texture that can hold your uv coordinates and retain precision.
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        stencilBuffer: false
    }
)

let renderBufferB = new THREE.WebGLRenderTarget(
    sizes.width,
    sizes.height,
    {
        minFilter: THREE.NearestFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType,
        stencilBuffer: false
    }
)




// Buffer Material
const bufferMaterial = new THREE.ShaderMaterial({
    uniforms: {
        uTexture: { value: dataTexture },
        uResolution: {
            value: resolution
        },
        x: {value: 0.0},
        y: {value: 0.0},
        mSize: {value: 0.0},
        Iterations: {value: 0},
        u_zoom: {value: 0.0},
        u_center: { value: new THREE.Vector2(2, 2) },
        u_mousePosition: { value: new THREE.Vector2(2, 2) }
    },
    vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShaderBuffer").textContent
});

//Screen Material
const quadMaterial = new THREE.ShaderMaterial({
  uniforms: {
    //The screen will receive it's texture from our off screen framebuffer
    uTexture: { value: null },
    uResolution: {
      value: resolution
    }
    
  },
  vertexShader: document.getElementById("vertexShader").textContent,
  fragmentShader: document.getElementById("fragmentShaderScreen").textContent
});

// Meshes
const mesh = new THREE.Mesh(geometry, quadMaterial);
scene.add(mesh)

// Meshes
const bufferMesh = new THREE.Mesh(geometry, bufferMaterial);
bufferScene.add(bufferMesh)
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement);

const onWindowResize = () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    // camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    //update uniforms
    quadMaterial.uniforms.uResolution.value.x = sizes.width
    quadMaterial.uniforms.uResolution.value.y = sizes.height
    
    
}

window.addEventListener('resize', onWindowResize)

/**
 * Camera
 */
// Base camera
const camera = new THREE.OrthographicCamera(- 1, 1, 1, - 1, 0, 1);


const div = document.querySelector('.parameters');

// Get the dimensions of the div
const rect = div.getBoundingClientRect();

const checkbox = document.querySelector('.opener');


// Extract width and height
const widthParameters = rect.width;
const heightParameters = rect.height;
/**
 * Animate
 */

let t = 1.;
let start;
let end;
let offsetX, offsetY;
let juliaX = 0
let juliaY = 0
let oldmouse = [0,0]
const tick = () => {
   //prepare ranges
   xVal.textContent = xRange.value;
   yVal.textContent = yRange.value;
   iterationsVal.textContent = IterationsRange.value;
   anmSpedVal.textContent = Math.round(AnSpeedRange.value*1000)/100;
   anmRangeVal.textContent = AnRangeRange.value;
   t++;
   let zoom =  1.5+(deltaY/3000.) 
   

  
  console.log(checkbox.checked)
  if (checkbox.checked) {
    
    if (mouseX < widthParameters && mouseY < heightParameters) {
      mouseX = oldmouse[0];
      mouseY = oldmouse[1];
      
    }
    
  
    //mouseX = newMouseX;
    //mouseY = newMouseY;
  }
  oldmouse[0] = mouseX;
  oldmouse[1] = mouseY;
  
  
 
  
   if (LeftClick){
    offsetX = mouseX - start[0];
    offsetY = mouseY - start[1];
   
    juliaX -= offsetX*zoom*2.
    juliaY += offsetY*zoom*2.

   }
   start = [mouseX,mouseY]
   
    
  
   // Explicitly set renderBufferA as the framebuffer to render to
   //the output of this rendering pass will be stored in the texture associated with renderBufferA
    renderer.setRenderTarget(renderBufferA)
    // This will contain the ping-pong accumulated texture
    renderer.render(bufferScene, camera)
  
    mesh.material.uniforms.uTexture.value = renderBufferA.texture;
    //This will set the default framebuffer (i.e. the screen) back to being the output
    renderer.setRenderTarget(null)
  //Render to screen
    renderer.render(scene, camera);
  
    // Ping-pong the framebuffers by swapping them
    // at the end of each frame render
    //Now prepare for the next cycle by swapping renderBufferA and renderBufferB
    //so that the previous frame's *output* becomes the next frame's *input*
    const temp = renderBufferA
    renderBufferA = renderBufferB
    renderBufferB = temp
    bufferMaterial.uniforms.uTexture.value = renderBufferB.texture;
    bufferMaterial.uniforms.x.value = juliaX;
    bufferMaterial.uniforms.y.value = juliaY;
    bufferMaterial.uniforms.mSize.value = 0.001;
    bufferMaterial.uniforms.u_zoom.value = zoom;
    bufferMaterial.uniforms.Iterations.value = Math.round(IterationsRange.value*10);
    bufferMaterial.uniforms.u_center.value = new THREE.Vector2(xRange.value,yRange.value-Math.sin(t*AnSpeedRange.value)* AnRangeRange.value);//0.254+Math.sin(t * 0.00005)*0.3
    bufferMaterial.uniforms.u_mousePosition.value = new THREE.Vector2(mouseX,mouseY);
    

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()


/**
 * CREATE RANDOM NOISY TEXTURE
 */




function createDataTexture() {
  // create a buffer with color data

  

  var size = sizes.width * sizes.height;
  var data = new Uint8Array(4 * size);

  for (var i = 0; i < size; i++) {
    var stride = i * 4;
    

    
     
    data[stride] = 0;
    data[stride + 1] = 0;
    data[stride + 2] = Math.random()*255;
    data[stride + 3] = 1;

    
  }

  // used the buffer to create a DataTexture

  console.log(data);
  var texture = new THREE.DataTexture(
    data,
    sizes.width,
    sizes.height,
    THREE.RGBAFormat
  );

  // just a weird thing that Three.js wants you to do after you set the data for the texture
  texture.needsUpdate = true;

  return texture;
}

