import './Upload.scss';

import React, { useState } from 'react';

export default function Upload() {
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [imageName, setImageName] = useState<string | null>(null);
	const [modelName, setModelName] = useState<string | null>(null);

	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setImageName(file.name);
			const reader = new FileReader();
			reader.onload = (e) => setImagePreview(e.target?.result as string);
			reader.readAsDataURL(file);
		}
	};

	const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setModelName(file.name);
		}
	};

	return (
		<main className='upload'>
			<div className="wrapper">
				<form className='addModelForm'>
					<section className="loadPreviewBlock">
						<div className="imgPreview">
							{imagePreview ? (
								<img src={imagePreview} alt="Preview" />
							) : (
								<p>No image</p>
							)}
						</div>
						<input
							type="file"
							id="loadImg"
							hidden
							accept="image/*"
							onChange={handleImageChange}
						/>
						<div className='loadLabel'>
							<label htmlFor="loadImg" className="loadImg">
								Load preview
							</label>
							{imagePreview && <p>{imageName}</p>}
						</div>
					</section>
					<section className="loadModelBlock">
						<input
							type="file"
							id="loadModel"
							hidden
							onChange={handleModelChange}
						/>
						<div className='loadLabel'>
							<label htmlFor="loadModel" className="loadModel">
								Load model
							</label>
							{modelName && <p>{modelName}</p>}
						</div>
					</section>
					<section className="addDescriptionBlock">
						<textarea className="addDescription" placeholder="Your text..." />
					</section>
					<button type="submit" className='submit'>Submit</button>
				</form>
			</div>
		</main>
	);
}
