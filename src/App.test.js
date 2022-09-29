test("Get User Api test", async () => {
  const req = await fetch(
    "https://randomuser.me/api/?response=json&page=1&seed=1&results=1&inc=name,email,picture,phone,location,id"
  );
  // Test req status
  expect(req.status).toBe(200);

  const data = await req.json();
  const results = data.results[0];
  expect(results).toHaveProperty("email");
});
