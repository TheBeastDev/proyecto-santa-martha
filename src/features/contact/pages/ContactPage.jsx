import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import Input from '@shared/components/Input'
import Button from '@shared/components/Button'

export default function ContactPage() {
  const [messageSent, setMessageSent] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = (data) => {
    // Mock envío de formulario
    console.log('Mensaje enviado:', data)
    setMessageSent(true)
    reset()
    
    setTimeout(() => {
      setMessageSent(false)
    }, 5000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Dirección',
      content: 'Av. Principal #123, Col. Centro',
      subContent: 'Ciudad de México, CP 01000'
    },
    {
      icon: Phone,
      title: 'Teléfono',
      content: '+52 (55) 1234-5678',
      subContent: 'Lun - Sáb: 8:00 AM - 8:00 PM'
    },
    {
      icon: Mail,
      title: 'Correo Electrónico',
      content: 'contacto@santamartha.com',
      subContent: 'Respuesta en 24 horas'
    },
    {
      icon: Clock,
      title: 'Horario de Atención',
      content: 'Lunes a Sábado: 8:00 AM - 8:00 PM',
      subContent: 'Domingo: 9:00 AM - 3:00 PM'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] bg-brown-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1600)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Contáctanos
            </h1>
            <p className="text-xl text-gray-200">
              ¿Tienes alguna pregunta? Nos encantaría escucharte. 
              Estamos aquí para ayudarte.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                  <info.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-700 font-medium text-sm mb-1">
                  {info.content}
                </p>
                <p className="text-gray-500 text-xs">
                  {info.subContent}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form & Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Envíanos un Mensaje
              </h2>
              <p className="text-gray-600 mb-8">
                Completa el formulario y nos pondremos en contacto contigo lo antes posible.
              </p>

              {messageSent && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="Nombre Completo"
                  type="text"
                  placeholder="Juan Pérez"
                  error={errors.name?.message}
                  {...register('name', {
                    required: 'El nombre es requerido',
                    minLength: {
                      value: 3,
                      message: 'El nombre debe tener al menos 3 caracteres'
                    }
                  })}
                />

                <Input
                  label="Correo Electrónico"
                  type="email"
                  placeholder="tu@email.com"
                  error={errors.email?.message}
                  {...register('email', {
                    required: 'El correo es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                />

                <Input
                  label="Teléfono (Opcional)"
                  type="tel"
                  placeholder="+52 (55) 1234-5678"
                  {...register('phone')}
                />

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">
                    Asunto
                  </label>
                  <select
                    className="input-field"
                    {...register('subject', {
                      required: 'Selecciona un asunto'
                    })}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta General</option>
                    <option value="pedido">Información de Pedidos</option>
                    <option value="sugerencia">Sugerencias</option>
                    <option value="reclamo">Reclamo</option>
                    <option value="otro">Otro</option>
                  </select>
                  {errors.subject && (
                    <p className="text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-medium text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Escribe tu mensaje aquí..."
                    className="input-field resize-none"
                    {...register('message', {
                      required: 'El mensaje es requerido',
                      minLength: {
                        value: 10,
                        message: 'El mensaje debe tener al menos 10 caracteres'
                      }
                    })}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>

                <Button type="submit" size="lg" fullWidth icon={Send}>
                  Enviar Mensaje
                </Button>
              </form>
            </div>

            {/* Mapa */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Encuéntranos
              </h2>
              <p className="text-gray-600 mb-8">
                Visítanos en nuestra panadería. Te esperamos con los brazos abiertos 
                y el pan recién horneado.
              </p>

              {/* Google Maps Embed Placeholder */}
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-[450px] mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6796284165626!2d-99.16526292391983!3d19.432607981863764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd1563%3A0x6c366f0e2de02ff7!2sMonumento%20a%20la%20Revoluci%C3%B3n!5e0!3m2!1ses!2smx!4v1698765432100!5m2!1ses!2smx"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación Panadería Santa Martha"
                />
              </div>

              {/* Info adicional */}
              <div className="bg-cream rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Información de Transporte
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🚇</span>
                    <span>Metro: Estación Revolución (Línea 2)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🚌</span>
                    <span>Autobús: Rutas 10, 15, 23</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">🚗</span>
                    <span>Estacionamiento disponible</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-gray-600">
              Encuentra respuestas a las preguntas más comunes.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: '¿Realizan entregas a domicilio?',
                answer: 'Sí, realizamos entregas en un radio de 10 km. El costo de envío varía según la distancia.'
              },
              {
                question: '¿Puedo hacer pedidos personalizados?',
                answer: 'Por supuesto. Aceptamos pedidos personalizados de tortas y panes especiales con al menos 48 horas de anticipación.'
              },
              {
                question: '¿Tienen opciones sin gluten?',
                answer: 'Sí, contamos con una línea de productos sin gluten. Consulta disponibilidad en tienda o por teléfono.'
              },
              {
                question: '¿Aceptan pedidos al mayoreo?',
                answer: 'Sí, ofrecemos precios especiales para pedidos al mayoreo. Contáctanos para más información.'
              }
            ].map((faq, index) => (
              <details
                key={index}
                className="bg-white rounded-lg shadow-md p-6 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer flex items-center justify-between">
                  {faq.question}
                  <span className="text-primary group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
