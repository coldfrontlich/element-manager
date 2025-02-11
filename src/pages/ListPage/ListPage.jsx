import React, { useEffect, useState } from 'react'
import { getPosts } from '../../api/client'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'

const ListPage = () => {
	const [posts, setPosts] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const { overrides } = useStore()
	const navigate = useNavigate()

	useEffect(() => {
		getPosts(currentPage).then(data => setPosts(data))
	}, [currentPage])

  const getMergedPost = (post) => ({
    ...post,
    ...getPosts(overrides[post.id] || {}),
  })

	return (
		<div>
			{posts.map(post => (
				<div
					key={post.id}
					className='list-post'
					onClick={() => navigate(`/post/${post.id}`)}
				>
					<h3>{getMergedPost(post).title}</h3>
					<h4>{getMergedPost(post).body}</h4>
				</div>
			))}
			<button onClick={() => setCurrentPage(page => Math.max(1, page - 1))}>
				Назад
			</button>
			<button onClick={() => setCurrentPage(page => page + 1)}>Вперед</button>
		</div>
	)
}

export default ListPage
