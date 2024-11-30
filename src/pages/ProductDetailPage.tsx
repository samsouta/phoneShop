import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { Star, Shield, Truck, RefreshCw } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function ProductDetailPage() {
  const { id } = useParams();
  const { dispatch } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-gray-500">Product not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? 'fill-current' : 'fill-transparent'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.reviews} reviews)</span>
          </div>

          <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
          
          <p className="text-gray-600">{product.description}</p>

          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="text-lg font-semibold mb-4">Key Specifications</h3>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <dt className="text-sm text-gray-500 capitalize">{key}</dt>
                  <dd className="text-sm font-medium text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            >
              Add to Cart
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center text-sm text-gray-600">
                <Truck className="h-5 w-5 mr-2" />
                Free Shipping
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="h-5 w-5 mr-2" />
                2 Year Warranty
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <RefreshCw className="h-5 w-5 mr-2" />
                30-Day Returns
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}