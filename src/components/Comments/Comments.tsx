import './Comments.scss';

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { Comment, CommentsProps } from '@/interfaces/interfaces';

import Loader from '../Loader/Loader';

export default function Comments({ modelId }: CommentsProps) {
	const { user } = useAuth();
	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [commentText, setCommentText] = useState('');

	const limit = 10;
	const offsetRef = useRef(0);

	const fetchComments = async () => {
		if (isLoading || !hasMore) return;
		setIsLoading(true);
		try {
			const response = await axios.get(
				`http://localhost:3001/comments/model/${modelId}?limit=${limit}&offset=${offsetRef.current}`
			);

			const newComments: Comment[] = response.data.requestBody;
			console.log(newComments.map((c) => c.id));

			if (newComments.length < limit) {
				setHasMore(false);
			}

			setComments((prev) => [...prev, ...newComments]);
			offsetRef.current += newComments.length;
		} catch (error) {
			console.error('Ошибка при загрузке комментариев', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!commentText.trim() || !user) return;

		try {
			const response = await axios.post('http://localhost:3001/comments', {
				user_id: user.id,
				model_id: modelId,
				comment: commentText.trim(),
			});

			const newComment: Comment = response.data.requestBody;
			console.log('Новый комментарий:', newComment);

			setComments((prev) => [newComment, ...prev]);
			setCommentText('');
		} catch (error) {
			console.error('Ошибка при отправке комментария', error);
		}
	};

	useEffect(() => {
		setComments([]);
		offsetRef.current = 0;
		setHasMore(true);
		fetchComments();
	}, [modelId]);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 50 &&
				!isLoading &&
				hasMore
			) {
				fetchComments();
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading, hasMore]);

	return (
		<section className="comments">
			<h2>Комментарии</h2>

			{user && (
				<form onSubmit={handleSubmit}>
					<textarea
						id="commentInput"
						placeholder="Your text..."
						value={commentText}
						onChange={(e) => setCommentText(e.target.value)}
					></textarea>
					<button type="submit" disabled={!commentText.trim()}>
						Отправить
					</button>
				</form>
			)}

			{comments.map((c) => (
				<div key={c.id} className="comment">
					<strong>{c.user?.nickname || 'Неизвестный автор'}</strong>
					<p>{c.comment}</p>
					<small>{new Date(c.date).toLocaleDateString()}</small>
				</div>
			))}

			{isLoading && <Loader />}
		</section>
	);
}
