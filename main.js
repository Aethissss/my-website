const canvas = document.getElementById('three-canvas')

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	2000
)
camera.position.z = 500

const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true,
	alpha: true,
})
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x000000, 1)

const starCount = 1000
const geometry = new THREE.BufferGeometry()
const positions = new Float32Array(starCount * 3)

for (let i = 0; i < starCount; i++) {
	positions[i * 3] = (Math.random() - 0.5) * 2000
	positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
	positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

const material = new THREE.PointsMaterial({
	color: 0xffffff,
	size: 2,
	sizeAttenuation: true,
})

const stars = new THREE.Points(geometry, material)
scene.add(stars)

let targetX = 0
let targetY = 0
let currentX = 0
let currentY = 0

document.addEventListener('mousemove', event => {
	targetX = (event.clientX / window.innerWidth) * 2 - 1
	targetY = -(event.clientY / window.innerHeight) * 2 + 1
})

function animate() {
	requestAnimationFrame(animate)

	currentX += (targetX - currentX) * 0.05
	currentY += (targetY - currentY) * 0.05

	stars.rotation.y = currentX * 0.5
	stars.rotation.x = currentY * 0.5
	stars.rotation.z += 0.001

	renderer.render(scene, camera)
}

animate()

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()

	renderer.setSize(window.innerWidth, window.innerHeight)
})

// Создаём кастомный курсор — маленькая белая светящаяся точка
const cursor = document.createElement('div')
cursor.classList.add('custom-cursor')
document.body.appendChild(cursor)

// Двигаем точку за курсором мыши
window.addEventListener('mousemove', e => {
	cursor.style.top = e.clientY + 'px'
	cursor.style.left = e.clientX + 'px'
})

// Прячем кастомный курсор при наведении на иконки соцсетей
const icons = document.querySelectorAll('.icons a')

icons.forEach(icon => {
	icon.addEventListener('mouseenter', () => {
		cursor.style.display = 'none' // скрываем кастомный курсор
	})
	icon.addEventListener('mouseleave', () => {
		cursor.style.display = 'block' // показываем кастомный курсор
	})
})
