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

	if (!post) return <div className='detail-page'>Loading...</div>
	const mergedPost = { ...post, ...(overrides[id] || {}) }

	return (
		<div className='detail-page'>
			<button className='back-button' onClick={() => navigate('/')}>
				←
			</button>
			<div className='detail-page__content'>
				<h2 className='detail-page__id'>#{id}</h2>
				<h3 className='detail-page__title'>{mergedPost.title}</h3>
				<p className='detail-page__body'>{mergedPost.body}</p>
				<button
					className='detail-page__edit-button'
					onClick={() => navigate(`/edit/${id}`)}
				>
					Редактировать
				</button>
			</div>
		</div>
	)
}

export default DetailPage
