import { Heart, Award, Clock, Users } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión por el Pan',
      description: 'Cada producto es elaborado con amor y dedicación, manteniendo vivas las recetas tradicionales.'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Utilizamos solo ingredientes de primera calidad para garantizar el mejor sabor en cada bocado.'
    },
    {
      icon: Clock,
      title: 'Horneado Diario',
      description: 'Productos frescos horneados cada día para asegurar la mejor experiencia a nuestros clientes.'
    },
    {
      icon: Users,
      title: 'Familia Santa Martha',
      description: 'Más que una panadería, somos una familia que comparte la tradición y el sabor de generación en generación.'
    }
  ]

  const team = [
    {
      name: 'María Rodríguez',
      role: 'Maestra Panadera',
      image: 'https://images.unsplash.com/photo-1625489409904-324a5e9591e1?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description: '25 años de experiencia en panadería artesanal.'
    },
    {
      name: 'Carlos Mendoza',
      role: 'Chef Pastelero',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80',
      description: 'Especialista en tortas y postres personalizados.'
    },
    {
      name: 'Ana López',
      role: 'Gerente de Tienda',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&q=80',
      description: 'Garantiza la mejor atención y experiencia para nuestros clientes.'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] bg-brown-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1600)',
            filter: 'brightness(0.5)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center text-center">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Sobre Nosotros
            </h1>
            <p className="text-xl text-gray-200">
              Una tradición familiar que comenzó hace más de 30 años, 
              llevando el sabor auténtico del pan casero a cada hogar.
            </p>
          </div>
        </div>
      </section>

      {/* Historia Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  La Panadería Santa Martha nació en 1990 de la mano de doña Martha Rodríguez, 
                  quien con su amor por la cocina tradicional mexicana decidió compartir sus 
                  recetas familiares con la comunidad.
                </p>
                <p>
                  Lo que comenzó como un pequeño horno en casa, se transformó en una de las 
                  panaderías más queridas de la región. Cada pieza que elaboramos lleva consigo 
                  el cariño y la dedicación que caracterizó a nuestra fundadora.
                </p>
                <p>
                  Hoy, más de tres décadas después, continuamos honrando esa tradición, 
                  combinando técnicas artesanales con ingredientes de la más alta calidad 
                  para ofrecer productos que no solo alimentan el cuerpo, sino también el alma.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800"
                alt="Panadería Santa Martha"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-xl shadow-lg">
                <p className="text-4xl font-bold">30+</p>
                <p className="text-sm">Años de tradición</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada día nuestro trabajo y dedicación.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestro Equipo
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas que hacen posible la magia detrás de cada producto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-cream rounded-2xl pt-8 overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="flex justify-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromiso Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Nuestro Compromiso Contigo
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
            En Panadería Santa Martha nos comprometemos a ofrecer productos de la más 
            alta calidad, elaborados con ingredientes frescos y naturales. Cada día 
            trabajamos para mantener viva la tradición panadera y llevar a tu mesa 
            el sabor que nos caracteriza.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <p className="text-5xl font-bold mb-2">100%</p>
              <p className="text-lg">Ingredientes Naturales</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">1000+</p>
              <p className="text-lg">Clientes Satisfechos</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-lg">Productos Únicos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
