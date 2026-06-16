'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function HeroOrb() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const container = mountRef.current
    const width = container.clientWidth || 256
    const height = container.clientHeight || 256

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.z = 2.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    container.appendChild(renderer.domElement)

    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;
      
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        
        vec3 pos = position;
        pos.x += sin(pos.y * 2.0 + uTime) * 0.1;
        pos.y += cos(pos.x * 2.0 + uTime) * 0.1;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `

    const fragmentShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform float uTime;
      
      void main() {
        vec3 color1 = vec3(0.486, 0.361, 1.0); 
        vec3 color2 = vec3(0.302, 0.545, 1.0); 
        vec3 color3 = vec3(0.212, 0.839, 0.765); 
        
        float mix1 = sin(vUv.x * 3.0 + uTime * 0.5) * 0.5 + 0.5;
        float mix2 = cos(vUv.y * 2.0 - uTime * 0.3) * 0.5 + 0.5;
        
        vec3 color = mix(color1, color2, mix1);
        color = mix(color, color3, mix2);
        
        float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        color += fresnel * 0.4;
        
        gl_FragColor = vec4(color, 0.8);
      }
    `

    const geometry = new THREE.SphereGeometry(1, 64, 64)
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 }
      },
      transparent: true,
      side: THREE.DoubleSide
    })

    const orb = new THREE.Mesh(geometry, material)
    scene.add(orb)

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)
    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(5, 5, 5)
    scene.add(pointLight)

    let animationFrameId: number
    let uTime = 0
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)
      uTime += 0.01
      material.uniforms.uTime.value = uTime
      
      orb.rotation.y += 0.005
      orb.rotation.x += 0.002
      
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const newWidth = container.clientWidth
      const newHeight = container.clientHeight
      camera.aspect = newWidth / newHeight
      camera.updateProjectionMatrix()
      renderer.setSize(newWidth, newHeight)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />
}
