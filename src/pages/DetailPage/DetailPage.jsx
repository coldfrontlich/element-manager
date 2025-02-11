import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { getPostDetails } from '../../api/client'

const DetailPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [post, setPost] = useState(null)
	const { overrides } = useStore()

	useEffect(() => {
		getPostDetails(id).then(data => setPost(data))
	}, [id])

	if (!post) return <div>Loading...</div>
	const mergedPost = { ...post, ...(overrides[id] || {}) }

	return (
		<div>
			<h1>{mergedPost.title}</h1>
			<p>{mergedPost.body}</p>
			<button onClick={() => navigate(`/edit/${id}`)}>Редактировать</button>
		</div>
	)
}

export default DetailPage
