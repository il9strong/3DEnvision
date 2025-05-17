import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame,useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

import Model from '@/assets/models/theatre.glb';

function MyModel() {
	const gltf = useGLTF(Model);
	const groupRef = useRef<THREE.Group>(null);
	const controlsRef = useRef<any>(null);
	const { camera } = useThree();

	const [targetPosition, setTargetPosition] = useState(new THREE.Vector3());
	const [initialAnimationDone, setInitialAnimationDone] = useState(false);

	useFrame(() => {
		if (!initialAnimationDone && groupRef.current && controlsRef.current) {
			// Анимация позиции камеры
			camera.position.lerp(targetPosition, 0.02);

			// Анимация цели OrbitControls
			const target = controlsRef.current.target;
			const modelCenter = groupRef.current.position;
			target.lerp(modelCenter, 0.02);
			controlsRef.current.update();

			// Завершение анимации
			if (camera.position.distanceTo(targetPosition) < 0.05) {
				camera.position.copy(targetPosition);
				target.copy(modelCenter);
				controlsRef.current.update();
				setInitialAnimationDone(true);
			}
		}
	});

	useEffect(() => {
		if (!groupRef.current) return;

		const box = new THREE.Box3().setFromObject(groupRef.current);
		const size = box.getSize(new THREE.Vector3());
		const center = box.getCenter(new THREE.Vector3());

		if (camera instanceof THREE.PerspectiveCamera) {
			const maxDim = Math.max(size.x, size.y, size.z);
			const fov = (camera.fov * Math.PI) / 180;
			const distance = maxDim / (2 * Math.tan(fov / 2));

			const newCameraPosition = new THREE.Vector3(
				center.x + distance * 0.4,
				center.y + distance * 0.2,
				center.z + distance * 1
			);

			setTargetPosition(newCameraPosition);

			if (controlsRef.current) {
				controlsRef.current.target.copy(center); // начальное направление взгляда
				controlsRef.current.update();
			}
		}
	}, [camera]);

	useEffect(() => {
		if (controlsRef.current) {
			const handleStart = () => setInitialAnimationDone(true);
			controlsRef.current.addEventListener('start', handleStart);
			return () => controlsRef.current.removeEventListener('start', handleStart);
		}
	}, []);

	return (
		<>
			<group ref={groupRef}>
				<primitive object={gltf.scene} />
			</group>
			<OrbitControls ref={controlsRef} enableZoom enablePan />
		</>
	);
}


export default function Viewport() {
	return (
		<article className="viewportBlock">
			<Canvas className="canvas" shadows>
				<ambientLight intensity={0.5} />
				<directionalLight intensity={2} position={[500, 1000, 0]} />
				<directionalLight intensity={1} position={[-500, 1000, 0]} />
				<directionalLight intensity={2} position={[200, 1000, -300]} />
				<directionalLight intensity={2} position={[200, 1000, 300]} />

				<MyModel />
			</Canvas>
		</article>
	);
}
