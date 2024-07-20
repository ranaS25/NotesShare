const { sum } = require("../sample")


test("Sum should calc the sum of two numbers", () => {
  
  const res = sum(4, 6);


  //Assertion is important not mandetary but it doesnt mean we dont write assertion
  expect(res).toBe(10)
})