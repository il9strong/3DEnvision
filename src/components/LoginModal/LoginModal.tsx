import './LoginModal.scss';

import React, { useEffect, useState } from 'react';

export default function LoginModal({ onClose }: { onClose: () => void }) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setVisible(true);
		}, 10);
		return () => clearTimeout(timeout);
	}, []);
	return (
		<div className={`modalOverlay ${visible ? 'show' : ''}`} onClick={onClose}>
			<div className="modalContent" onClick={(e) => e.stopPropagation()}>
				<h2>AUTHORIZATION</h2>
				<p>You need to log in</p>
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
}
