import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../components/Header';
import { useProductStore } from '../store/productStore';
import { JestMock } from './utils'; // Ensure the path to `utils.ts` is correct

// Mock Zustand's `useProductStore` hook
jest.mock('../store/productStore', () => ({
  useProductStore: jest.fn(),
}));

describe('Header Component', () => {
  it('updates search query on input change', () => {
    // Explicitly cast `useProductStore` as a Jest mock, converting to `unknown` first
    const mockedUseProductStore = useProductStore as unknown as JestMock<
      () => {
        searchQuery: string;
        setSearchQuery: jest.Mock;
        setProducts: jest.Mock;
        setSortOption: jest.Mock;
      }
    >;

    // Create the mock function for setSearchQuery
    const mockSetSearchQuery = jest.fn();

    // Mock implementation using the mockSetSearchQuery
    mockedUseProductStore.mockReturnValue({
      searchQuery: '',
      setSearchQuery: mockSetSearchQuery,
      setProducts: jest.fn(),
      setSortOption: jest.fn(),
    });

    // Render the component
    render(<Header />);

    // Fire input change
    const input = screen.getByPlaceholderText('Search products...');
    fireEvent.change(input, { target: { value: 'test' } });

    // Check if `setSearchQuery` was called
    expect(mockSetSearchQuery).toHaveBeenCalledWith('test');
  });
});
