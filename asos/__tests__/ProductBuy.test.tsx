// ProductBuy.test.tsx
import { render, screen } from '@testing-library/react';
import ProductBuy from '@/components/homepage/ProductBuy';
import '@testing-library/jest-dom';
import React from 'react';

// Mock Image Component to avoid actual image loading
jest.mock('next/image', () => ({
    __esModule: true,
    default: ({ src, alt, ...props }) => <img src={src} alt={alt} {...props} />, // Return a simple img tag with the src and alt attributes
}));

describe('ProductBuy Component', () => {
    const product = {
        id: '1',
        name: 'Cutting grass',
        photoPath: 'cutting.png',
        description: 'I will cut your grass for you!',
        category: 'service',
        available: 5,
        price: 20.00,
        city: 'Chicago',
    };

    const user = {
        name: 'John Doe',
        photoUrl: '/profilovka_bob.jpg',
    };

    it('renders product details correctly', () => {
        render(<ProductBuy product={product} user={undefined} />);

        // Check product details
        expect(screen.getByText('Cutting grass')).toBeInTheDocument();
        expect(screen.getByText('I will cut your grass for you!')).toBeInTheDocument();
        expect(screen.getByText('service')).toBeInTheDocument();
        expect(screen.getByText('Chicago')).toBeInTheDocument();

        // Check the "Buy Now" button
        expect(screen.getByRole('link', { name: 'Buy Now' })).toHaveAttribute(
            'href',
            '/checkout?productId=1'
        );
    });

    it('renders seller information if user is provided', () => {
        render(<ProductBuy product={product} user={user} />);

        // Check seller details
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Seller')).toBeInTheDocument();

        // Check seller image alt text
        const sellerImage = screen.getByAltText("Seller profile picture");
        expect(sellerImage).toBeInTheDocument();
        expect(sellerImage).toHaveAttribute('src', '/profilovka_bob.jpg');
    });

    it('renders a default seller image if no photo URL is provided', () => {
        const userWithoutPhoto = { ...user, photoUrl: null };

        render(<ProductBuy product={product} user={userWithoutPhoto} />);

        const defaultImage = screen.getByAltText('Seller profile picture');
        expect(defaultImage).toBeInTheDocument();
        expect(defaultImage).toHaveAttribute('src', '/public/default.png');
    });
});
