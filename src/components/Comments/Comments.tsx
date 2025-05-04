import './Comments.scss';

import React from 'react';

export default function Comments() {
	return (
		<section className="comments">
			<h2>Comments</h2>
			<form>
				<textarea id="commentInput" placeholder="Your text..."></textarea>
				<button type="submit">Send</button>
			</form>
		</section>
	);
}
