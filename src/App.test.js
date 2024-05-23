import { render, screen } from './helpers/test-utils';
import App from './App';

test('renders Welcome to Postagram', () => {
  render(
    <App />
  );

  const textElement = screen.getByText(/Welcome to Postagram/i);

  expect(textElement).toBeInTheDocument();
});
