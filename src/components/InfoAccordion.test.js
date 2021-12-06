import { render, screen, fireEvent } from '@testing-library/react';
import InfoAccordion from './InfoAccordion';

test('renders info accordion with custom props', () => {
  render(<InfoAccordion title="Accordion" info={[{ accordionChild: { name: 'name-1' } }, { accordionChild: { name: 'name-2' } }]} keyName="accordionChild" />);
  const accordionTitleElm = screen.getByText(/Accordion/g);
  const accordionChildElm = screen.getByText(/name 1/i);
  const accordionChildElm2 = screen.getByText(/name 1/i);
  
  expect(accordionTitleElm).toBeInTheDocument();
  expect(accordionChildElm).toBeInTheDocument();
  expect(accordionChildElm2).toBeInTheDocument();

  expect(accordionChildElm).not.toBeVisible();
  fireEvent.click(accordionTitleElm);
  expect(accordionChildElm).toBeVisible();
});