import * as yup from 'yup'

export const editSchema = yup.object().shape({
	title: yup
		.string()
		.min(3, 'Заголовок должен быть минимум 3 символа в длину')
		.required('Заголовок обязателен'),

  body: yup
    .string()
    .min(10, 'Текст должен быть минимум 10 символов в длину')
    .required('Текст обязателен'),
})
