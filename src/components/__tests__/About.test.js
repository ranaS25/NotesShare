import About from '../About';

const { render, screen } = require("@testing-library/react")
import '@testing-library/jest-dom'


test("should Load button in About Component", () => { 
  render(<About />)
  
  //assertion
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();
})


test('count of imput box should be 2', () => {
  render(<About />);
  const headinglen = screen.getAllByRole("heading").length;
  const paralength = screen.getAllByRole("paragraph").length; //return react elements  or we can sasy js objects


  //assertion
  expect(headinglen).toBe(1)
  expect(paralength).toBe(1)
})