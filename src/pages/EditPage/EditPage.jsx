import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useStore } from '../../store/useStore'
import { getPostDetails } from '../../api/client'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { editSchema } from '../../utils/validationSchema'

const EditPage = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const { overrides, setOverride } = useStore()
	const [initialValues, setInitialValues] = useState({
		title: '',
		body: '',
	})

	useEffect(() => {
		const loadData = async () => {
			const apiData = await getPostDetails(id)
			const mergedData = {
				...apiData,
				...(overrides[id] || {}),
			}

			setInitialValues({
				title: mergedData.title,
				body: mergedData.body,
			})
		}

		loadData()
	}, [id, overrides])

	const handleSubmit = values => {
		const saveData = {
			title: String(values.title),
			body: String(values.body),
		}
		setOverride(id, saveData)
		navigate(`/post/${id}`)
	}

	if (!initialValues.title) return <div className='edit-form'>Loading...</div>

	return (
		<div className='edit-form'>
			<button className='back-button' onClick={() => navigate(`/post/${id}`)}>
				←
			</button>
			<h2>Редактирование поста #{id}</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={editSchema}
				onSubmit={handleSubmit}
				enableReinitialize
			>
				{({ isSubmitting }) => (
					<Form>
						<div className='form-group'>
							<label htmlFor='title'>Заголовок</label>
							<Field name='title' type='text' placeholder='Введите заголовок' />
							<ErrorMessage name='title' component='div' className='error' />
						</div>
						<div className='form-group'>
							<label htmlFor='body'>Содержание</label>
							<Field
								name='body'
								as='textarea'
								rows='4'
								placeholder='Введите содержание'
							/>
							<ErrorMessage name='body' component='div' className='error' />
						</div>
						<div className='form-actions'>
							<button type='submit' disabled={isSubmitting}>
								Сохранить
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default EditPage
