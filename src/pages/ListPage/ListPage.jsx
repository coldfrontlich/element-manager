import React, { useEffect, useState } from 'react'
import { getPosts } from '../../api/client'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'

const ListPage = () => {
	const [posts, setPosts] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(() => {
		return Number(localStorage.getItem('currentPage')) || 1
	})
	const { overrides } = useStore()
	const navigate = useNavigate()

	useEffect(() => {
		setLoading(true)
		getPosts(currentPage).then(data => {
			setLoading(false)
			setPosts(data)
		})
	}, [currentPage])

	useEffect(() => {
		localStorage.setItem('currentPage', currentPage)
	}, [currentPage])

	const getMergedPost = post => ({
		...post,
		title: overrides[post.id]?.title || post.title,
		body: overrides[post.id]?.body || post.body,
	})

	return (
		<div className='list-page'>
			<h1 className='list-page__header'>Список постов</h1>
			{loading ? (
				<div>Loading...</div>
			) : (
				<div className='list-page__posts'>
					{posts.map(post => (
						<div
							key={post.id}
							className='list-post'
							onClick={() => navigate(`/post/${post.id}`)}
						>
							<h2 className='list-post__id'>#{post.id}</h2>
							<h3 className='list-post__title'>{getMergedPost(post).title}</h3>
							<p className='list-post__body'>{getMergedPost(post).body}</p>
						</div>
					))}
					<div className='list-page__pagination'>
						<button
							className='list-page__pagination-button'
							onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
						>
							Назад
						</button>
						<button
							className='list-page__pagination-button'
							onClick={() => setCurrentPage(page => page + 1)}
						>
							Вперед
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default ListPage
