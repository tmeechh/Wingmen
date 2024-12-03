import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Home from '../pages/Home';
import { useProductStore } from '../store/productStore';
import axios from 'axios';
import '@testing-library/jest-dom';

// Mock Zustand's `useProductStore` hook
jest.mock('../store/productStore', () => ({
  useProductStore: jest.fn(),
}));

// Mock ProductCard and Pagination components
jest.mock('../components/ProductCard', () => ({
  __esModule: true,
  default: ({
    title,
    price,
    rating,
  }: {
    title: string;
    price: number;
    rating: number;
  }) => (
    <div>
      <p>{title}</p>
      <p>{price}</p>
      <p>{rating}</p>
    </div>
  ),
}));

jest.mock('../components/Pagination', () => ({
  __esModule: true,
  default: ({
    currentPage,
    setCurrentPage,
  }: {
    currentPage: number;
    setCurrentPage: jest.Mock;
  }) => (
    <div>
      <button onClick={() => setCurrentPage(currentPage - 1)}>Prev</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
    </div>
  ),
}));

// Mock axios to prevent hitting the real API
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Home Component', () => {
  const mockSetProducts = jest.fn();
  const mockSetSearchQuery = jest.fn();
  const mockSetSortOption = jest.fn();

  // This will mock `useProductStore` to return the default values
  const mockedUseProductStore = useProductStore as jest.MockedFunction<
    typeof useProductStore
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock the initial return of `useProductStore` for each test
    mockedUseProductStore.mockReturnValue({
      products: [],
      searchQuery: '',
      sortOption: 'default',
      setProducts: mockSetProducts,
      setSearchQuery: mockSetSearchQuery,
      setSortOption: mockSetSortOption,
    });

    // Mock the axios.get method to return a sample response
    mockAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          title: 'Product 1',
          price: 20,
          image: '',
          rating: { rate: 4, count: 100 },
        },
        {
          id: 2,
          title: 'Product 2',
          price: 40,
          image: '',
          rating: { rate: 5, count: 200 },
        },
      ],
    });
  });

  it('filters products based on search query', () => {
    mockedUseProductStore.mockReturnValue({
      products: [
        {
          id: 1,
          title: 'Product 1',
          price: 20,
          image: '',
          rating: { rate: 4, count: 100 },
        },
        {
          id: 2,
          title: 'Product 2',
          price: 40,
          image: '',
          rating: { rate: 5, count: 200 },
        },
      ],
      searchQuery: 'Product 1',
      sortOption: 'default',
      setProducts: mockSetProducts,
      setSearchQuery: mockSetSearchQuery,
      setSortOption: mockSetSortOption,
    });

    render(<Home />);

    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('handles pagination correctly', async () => {
    mockedUseProductStore.mockReturnValue({
      products: Array.from({ length: 16 }, (_, i) => ({
        id: i + 1,
        title: `Product ${i + 1}`,
        price: (i + 1) * 10,
        image: '',
        rating: { rate: 4, count: 100 },
      })),
      searchQuery: '',
      sortOption: 'default',
      setProducts: mockSetProducts,
      setSearchQuery: mockSetSearchQuery,
      setSortOption: mockSetSortOption,
    });

    render(<Home />);

    // Check products on the first page
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 8')).toBeInTheDocument();
      expect(screen.queryByText('Product 9')).not.toBeInTheDocument();
    });

    // Simulate pagination
    fireEvent.click(screen.getByText('Next'));

    // Check that the products on the next page are rendered
    await waitFor(() => {
      expect(screen.getByText('Product 9')).toBeInTheDocument();
      expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    });
  });

  it('displays "No products found" when search yields no results', () => {
    mockedUseProductStore.mockReturnValue({
      products: [],
      searchQuery: 'Nonexistent Product',
      sortOption: 'default',
      setProducts: mockSetProducts,
      setSearchQuery: mockSetSearchQuery,
      setSortOption: mockSetSortOption,
    });

    render(<Home />);

    expect(
      screen.getByText('No products found for "Nonexistent Product"')
    ).toBeInTheDocument();
  });
});
