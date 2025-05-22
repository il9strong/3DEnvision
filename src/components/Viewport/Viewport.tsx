import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MyModelProps {
	url: string;
}

function MyModel({ url }: MyModelProps) {
	const gltf = useGLTF(url);
	const glassMeshes = useRef<THREE.Mesh[]>([]);
	const groupRef = useRef<THREE.Group>(null);
	const controlsRef = useRef<any>(null);
	const { camera } = useThree();

	const [targetPosition, setTargetPosition] = useState(new THREE.Vector3());
	const [initialAnimationDone, setInitialAnimationDone] = useState(false);

	useEffect(() => {
		const glassArray: THREE.Mesh[] = [];

		gltf.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				if (child.material.transparent) {
					child.material.depthWrite = false;
					child.renderOrder = 2; // Устанавливаем порядок рендеринга
				}
				if (child.material.name === 'Glass') {
					child.material = new THREE.MeshPhysicalMaterial({
						transmission: 1,
						roughness: 0.05,
						thickness: 0.5, // Добавляем толщину для эффекта стекла
						metalness: 0,
						clearcoat: 1,
						ior: 1.5,
						transparent: true,
						envMapIntensity: 1,
					});
					glassArray.push(child);
				}
			}
		});

		glassMeshes.current = glassArray;
	}, [gltf]);

	useFrame(({ camera }) => {
		// glassMeshes.current.sort((a, b) => {
		// 	const distanceA = a.position.distanceTo(camera.position);
		// 	const distanceB = b.position.distanceTo(camera.position);
		// 	return distanceA - distanceB;
		// });
		if (!initialAnimationDone && groupRef.current && controlsRef.current) {
			camera.position.lerp(targetPosition, 0.02);
			const target = controlsRef.current.target;
			const modelCenter = groupRef.current.position;
			target.lerp(modelCenter, 0.02);
			controlsRef.current.update();

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
				controlsRef.current.target.copy(center);
				controlsRef.current.update();
			}
		}
	}, [camera]);

	useEffect(() => {
		const controls = controlsRef.current;
		if (!controls) return;

		const handleStart = () => setInitialAnimationDone(true);
		controls.addEventListener('start', handleStart);

		return () => {
			controls?.removeEventListener('start', handleStart);
		};
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

export default function Viewport({ fileName }: { fileName: string }) {
	const modelUrl = `http://localhost:3001/assets/models/${fileName}`;

	return (
		<article className="viewportBlock">
			<Canvas
				className="canvas"
				shadows
				gl={{
					alpha: true,
					antialias: true,
					logarithmicDepthBuffer: true,
				}}
			>
				<ambientLight intensity={0.5} />
				<Environment preset="sunset" blur={0.5} />
				{/* <directionalLight intensity={2} position={[500, 1000, 0]} /> */}
				{/* <directionalLight intensity={1} position={[-500, 1000, 0]} />
				<directionalLight intensity={2} position={[200, 1000, -300]} />
				<directionalLight intensity={2} position={[200, 1000, 300]} /> */}

				<MyModel url={modelUrl} />
			</Canvas>
		</article>
	);
}
