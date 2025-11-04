import { Link } from 'react-router-dom'
import { ArrowRight, Cookie, Cake, Wheat } from 'lucide-react'
import { useSelector } from 'react-redux'
import ProductCard from '@shared/components/ProductCard'
import Button from '@shared/components/Button'

export default function HomePage() {
  const products = useSelector((state) => state.products.products)
  const featuredProducts = products.slice(0, 4)

  const categories = [
    {
      name: 'Pan',
      icon: Wheat,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600',
      description: 'Freshly Baked Daily'
    },
    {
      name: 'Facturas',
      icon: Cookie,
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600',
      description: 'Discover Our Sweetest Creations'
    },
    {
      name: 'Tortas',
      icon: Cake,
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600',
      description: 'Weekly Special: 20% Off All Cakes'
    }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-brown-dark overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1600)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Creaciones de frutas comestibles
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Disfruta de cada sabor, elaborado desde princesas elaboradas para parecer frutas una colecciones de abuela en cada mordisco.
            </p>
            <div className="flex gap-4">
              <Link to="/catalogo">
                <Button size="lg" icon={ArrowRight}>
                  Shop Now
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:!text-gray-900 transition-all">
                  View Offer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/catalogo?category=${category.name}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <category.icon className="w-8 h-8 text-primary" />
                    <h3 className="text-2xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <p className="text-gray-200 text-sm">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link to="/catalogo">
              <Button variant="outline">
                Ver todos
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Bundle Deal Section */}
      <section className="py-16 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary to-orange-600 rounded-3xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Bundle Deal!</h2>
            <p className="text-xl mb-8">
              Get a coffee and a croissant for only $8.
            </p>
            <Button size="lg" className="bg-white !text-primary hover:bg-primary hover:!text-white">
              View Offer
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
