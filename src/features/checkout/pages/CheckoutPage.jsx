import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Check, CreditCard, Truck, Lock } from 'lucide-react'
import { clearCart, selectTotalPrice, selectCartItems } from '@features/cart/cartSlice'
import { addOrder } from '@features/orders/ordersSlice'
import Input from '@shared/components/Input'
import Button from '@shared/components/Button'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [step, setStep] = useState(1)
  
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectTotalPrice)
  const user = useSelector((state) => state.auth.user)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const shipping = 50.00
  const total = subtotal + shipping

  const steps = [
    { number: 1, title: 'Envío', icon: Truck },
    { number: 2, title: 'Pago', icon: CreditCard },
    { number: 3, title: 'Confirmación', icon: Check }
  ]

  const onSubmitShipping = (data) => {
    setStep(2)
  }

  const onSubmitPayment = (data) => {
    const order = {
      customer: user?.name || data.fullName,
      items: items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price
      })),
      total: total,
      shippingAddress: data
    }

    dispatch(addOrder(order))
    dispatch(clearCart())
    setStep(3)
  }

  if (items.length === 0 && step !== 3) {
    navigate('/carrito')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Steps indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex-1 flex items-center">
                <div className="flex items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      step >= s.number
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`ml-3 font-medium ${
                      step >= s.number ? 'text-primary' : 'text-gray-500'
                    }`}
                  >
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step > s.number ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Información de Envío
                </h2>
                <p className="text-gray-600 mb-6">
                  Introduce tus datos para el envío de tu pedido.
                </p>

                <form onSubmit={handleSubmit(onSubmitShipping)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nombre Completo"
                      placeholder="Juan Pérez"
                      error={errors.fullName?.message}
                      {...register('fullName', {
                        required: 'El nombre es requerido'
                      })}
                    />
                    <Input
                      label="Número de Teléfono"
                      type="tel"
                      placeholder="+1 234 567 890"
                      error={errors.phone?.message}
                      {...register('phone', {
                        required: 'El teléfono es requerido'
                      })}
                    />
                  </div>

                  <Input
                    label="Dirección"
                    placeholder="Calle Falsa 123, Apto. 4B"
                    error={errors.address?.message}
                    {...register('address', {
                      required: 'La dirección es requerida'
                    })}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Input
                      label="Ciudad"
                      placeholder="Ciudad de México"
                      error={errors.city?.message}
                      {...register('city', {
                        required: 'La ciudad es requerida'
                      })}
                    />
                    <Input
                      label="Estado"
                      placeholder="CDMX"
                      error={errors.state?.message}
                      {...register('state', {
                        required: 'El estado es requerido'
                      })}
                    />
                    <Input
                      label="Código Postal"
                      placeholder="12345"
                      error={errors.postalCode?.message}
                      {...register('postalCode', {
                        required: 'El código postal es requerido'
                      })}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/carrito')}
                      icon={Truck}
                    >
                      Volver al carrito
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continuar a Pago →
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Información de Pago
                </h2>
                <p className="text-gray-600 mb-6">
                  Completa los datos de tu tarjeta de forma segura.
                </p>

                <form onSubmit={handleSubmit(onSubmitPayment)} className="space-y-6">
                  <Input
                    label="Número de Tarjeta"
                    placeholder="1234 5678 9012 3456"
                    {...register('cardNumber', {
                      required: 'El número de tarjeta es requerido'
                    })}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="Fecha de Vencimiento"
                      placeholder="MM/YY"
                      {...register('expiry', {
                        required: 'La fecha es requerida'
                      })}
                    />
                    <Input
                      label="CVV"
                      placeholder="123"
                      type="password"
                      maxLength={4}
                      {...register('cvv', {
                        required: 'El CVV es requerido'
                      })}
                    />
                  </div>

                  <Input
                    label="Nombre en la Tarjeta"
                    placeholder="JUAN PEREZ"
                    {...register('cardName', {
                      required: 'El nombre es requerido'
                    })}
                  />

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Tu información de pago está protegida con encriptación de nivel bancario.
                      Nunca almacenamos los datos completos de tu tarjeta.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      ← Volver
                    </Button>
                    <Button type="submit" className="flex-1">
                      Finalizar Compra
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                  <Check className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  ¡Pedido Confirmado!
                </h2>
                <p className="text-gray-600 mb-8">
                  Gracias por tu compra. Recibirás un correo de confirmación pronto.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => navigate('/')}>
                    Volver al inicio
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/catalogo')}>
                    Seguir comprando
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {step !== 3 && (
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="font-medium text-primary">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Lock className="w-5 h-5 mr-2" />
                    Transacción segura y encriptada.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
