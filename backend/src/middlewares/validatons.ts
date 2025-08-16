import { celebrate, Joi, Segments } from 'celebrate';

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.base': 'Поле "title" должно быть строкой',
        'string.empty': 'Поле "title" не должно быть пустым',
        'string.min': 'Минимальная длина поля "title" - 2',
        'string.max': 'Максимальная длина поля "title" - 30',
        'any.required': 'Поле "title" обязательно для заполнения',
      }),
    image: Joi.object().keys({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }).required(),
    category: Joi.string().required().messages({
      'string.empty': 'Поле "category" не должно быть пустым',
      'any.required': 'Поле "category" обязательно для заполнения',
    }),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).optional(),
  }),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required().messages({
      'string.email': 'Поле "email" должно быть валидным email',
      'any.required': 'Поле "email" обязательно для заполнения',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Поле "phone" обязательно для заполнения',
    }),
    address: Joi.string().required().messages({
      'any.required': 'Поле "address" обязательно для заполнения',
    }),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.string().required()).min(1).required()
      .messages({
        'array.min': 'Поле "items" должно содержать хотя бы один элемент',
        'any.required': 'Поле "items" обязательно для заполнения',
      }),
  }),
});
