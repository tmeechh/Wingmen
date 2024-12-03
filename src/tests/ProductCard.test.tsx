import { render, screen } from '@testing-library/react';
import ProductCard from '../components/ProductCard';
import '@testing-library/jest-dom';

describe('ProductCard Component', () => {
  it('renders product details correctly', () => {
    render(
      <ProductCard
        title="Sample Product"
        price={29.99}
        image="https://via.placeholder.com/150"
        rating={4.5}
      />
    );

    expect(screen.getByText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByAltText('Sample Product')).toBeInTheDocument();
    expect(screen.getByText('(4.5)')).toBeInTheDocument();
  });
});
