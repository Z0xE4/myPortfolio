import './scss/style.scss'

import * as three from 'three'


let scene = new three.Scene()
let camera = new three.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 5)
let ambient = new three.AmbientLight(0x555555)
scene.add(ambient)

let renderer = new three.WebGLRenderer()
renderer.setSize( window.innerWidth, window.innerHeight)
renderer.setClearColor('#FFFFFF')
document.body.appendChild(renderer.domElement)

let Material = new three.MeshBasicMaterial({ 
    color: 0x6886C5 
})

let cubeGeometry = new three.BoxGeometry(2, 2, 0.2)
let cube = new three.Mesh(cubeGeometry, Material)
scene.add(cube)
cube.position.set(-6, -0.2)

let cubeNeCubeGeometry = new three.OctahedronGeometry()
let cubeNeCube = new three.Mesh(cubeNeCubeGeometry, Material)
cubeNeCube.position.set(3, 3)
scene.add(cubeNeCube)

let ringGeometry = new three.RingGeometry()
let ring = new three.Mesh(ringGeometry, Material)
ring.position.set(0, -3)
scene.add(ring)

function render() {
    renderer.render(scene, camera)

    cubeNeCube.rotation.x += 0.001
    cubeNeCube.rotation.y += 0.001
    cube.rotation.y -= 0.001
    cube.rotation.x -= 0.005
    ring.rotation.z -= 0.005


    requestAnimationFrame(render)
}

render()


let bg =  document.getElementsByTagName('canvas')[0]
bg.style.position = 'fixed'
bg.style.top = '0px'
bg.style.left = '0px'
bg.style.height = '100vh'
bg.style.width = '100%'
bg.style.zIndex = '-1'


let first = document.getElementById('first')
let second = document.getElementById('second')
let thrid = document.getElementById('thrid')
let fourth = document.getElementById('fourth')
let firstBlockHeightOnOpacity
let secondBlockHeightOnOpacity
let thridBlockHeightOnOpacity

let zistus = document.getElementById('zistus')
let meysix = document.getElementById('meysix')

meysix.onclick = () => {
    window.open('https://meysix.com/')
}
zistus.onclick = () => {
    window.open('https://zistus.com/')
}


window.onbeforeunload = () => {
    window.scrollTo(0, 0)
}


// function animateFadeIn(time, el){
//     setTimeout(() => {
//         el.style.opacity = 10 / time + Number(el.style.opacity)
//         if(el.style.opacity < 1) animateFadeIn(time, el)
//         else return true
//     }, 1)
// }

document.body.style.height = `${document.body.scrollHeight + window.innerHeight}px`


window.addEventListener("scroll", (e) => {
    second.style.opacity = 0
    first.style.opacity = 0
    thrid.style.opacity = 0
    fourth.style.opacity = 0
    second.style.display = 'none'
    thrid.style.display = 'none'
    fourth.style.display = 'none'

    let opacityForFirstBlock = 1 - ((window.scrollY * 100 / (first.scrollHeight * 50 / 100)) / 100)

    if(opacityForFirstBlock <= 1 || opacityForFirstBlock >= 0) {
        first.style.opacity = opacityForFirstBlock
    }
    if(opacityForFirstBlock <= 0) {
        second.style.display = 'flex'
        if(!firstBlockHeightOnOpacity) firstBlockHeightOnOpacity = window.scrollY
        let opacityForSecondBlock = Math.max(0.001, (((window.scrollY - firstBlockHeightOnOpacity)  * 100 / (second.scrollHeight * 50 / 100)) / 100))
        opacityForSecondBlock = opacityForSecondBlock >= 0.9 && opacityForSecondBlock <= 1 ? 1 : opacityForSecondBlock
        if (opacityForSecondBlock <= 1 || opacityForSecondBlock >= 0) {
            second.style.opacity = opacityForSecondBlock
        }
        if(opacityForSecondBlock > 1) {
            opacityForSecondBlock = 1 - ((((window.scrollY - firstBlockHeightOnOpacity) * 100 / (second.scrollHeight * 50 / 100)) - 100) / 100)
            second.style.opacity = opacityForSecondBlock
        }
        if (opacityForSecondBlock <= 0) {
            thrid.style.display = 'flex'
            if(!secondBlockHeightOnOpacity) secondBlockHeightOnOpacity = window.scrollY
            let opacityForThridBlock = Math.max(0.001,(((window.scrollY - secondBlockHeightOnOpacity)  * 100 / thrid.scrollHeight) / 100))
            opacityForThridBlock = opacityForThridBlock >= 0.9 && opacityForThridBlock <= 1 ? 1 : opacityForThridBlock
            if ( opacityForThridBlock <= 1 || opacityForThridBlock >= 0) {
                thrid.style.opacity = opacityForThridBlock
            }
            if(opacityForThridBlock > 1) {
                opacityForThridBlock = 1 - ((((window.scrollY - secondBlockHeightOnOpacity - firstBlockHeightOnOpacity) * 100 / (thrid.scrollHeight * 50 / 100)) - 100) / 100)
                thrid.style.opacity = opacityForThridBlock
            }
            if (opacityForThridBlock <= 0) {
                fourth.style.display = 'flex'
                if(!thridBlockHeightOnOpacity) thridBlockHeightOnOpacity = window.scrollY
                let opacityForfourthBlock = ((window.scrollY - thridBlockHeightOnOpacity)  * 100 / fourth.scrollHeight) / 100
                opacityForfourthBlock = opacityForfourthBlock >= 0.9 && opacityForfourthBlock <= 1 ? 1 : opacityForfourthBlock
                if ( opacityForfourthBlock <= 1 || opacityForfourthBlock >= 0) {
                    fourth.style.opacity = opacityForfourthBlock
                }
            }
        }
    }
}, false);