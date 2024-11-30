import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../lib/utils';
import { Button } from '../ui/Button';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'fill-transparent'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-2">
            ({product.reviews} reviews)
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{product.brand}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}