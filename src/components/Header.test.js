import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';

test('renders header with custom title', () => {
  render(
    <BrowserRouter>
      <Header title="Header Title" />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Header Title/i);
  expect(linkElement).toBeInTheDocument();
});

test('open drawer by user event', () => {
  render(
    <BrowserRouter>
      <Header title="Header Title" />
    </BrowserRouter>
  )
  const drawerElement = screen.getByLabelText(/drawer/i);
  expect(drawerElement).not.toBeVisible();

  fireEvent.click(screen.getByLabelText(/menu-icon/i));
  expect(drawerElement).toBeVisible();
})