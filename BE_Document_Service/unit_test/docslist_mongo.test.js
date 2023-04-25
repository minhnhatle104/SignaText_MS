import request from "supertest"
// Get doclist from mongo db by user_id
describe("GET /api/document/ownedByKey/:userId", () => {
  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/ownedByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0MTcyMDUsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQxNzIwNSwiZXhwIjoxNjgyNDIwODA1LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WB85O4m-tfSxtmSvxM5YBEQvmNVN4BHURtUp2U5aRRY84U8C-lKijviJvI_clfsTwnys05JjGp45cpBP3deBHQXggcw678pBAa9tn7T1ADqBnzD5bbXgNWL9tuFIU2WDOHVZMEohLAU2xLO8DxDdTWL4wu5ltXYifnW5PKjdC5SlnQQu5XeMxI2MrOlfwkQJ029Ul1j_etEFEHgOjAZg1o0iICA8HkhQYtGvaV0cEvZm3eYxOvGafTku37EwSI76ApUsd8hU3kUkK-f3h7IHmWnvcnXdlcd7xEZ4xbVyqRaSo3G9OUNYNK-8cmSNeLfcbI3cm0DQvomcaz3CMrs-lA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(3)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >=1, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/ownedByKey/leAk1er1tSTQkcLjOqfQOmXCIwz1")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0MTcyMDUsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQxNzIwNSwiZXhwIjoxNjgyNDIwODA1LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WB85O4m-tfSxtmSvxM5YBEQvmNVN4BHURtUp2U5aRRY84U8C-lKijviJvI_clfsTwnys05JjGp45cpBP3deBHQXggcw678pBAa9tn7T1ADqBnzD5bbXgNWL9tuFIU2WDOHVZMEohLAU2xLO8DxDdTWL4wu5ltXYifnW5PKjdC5SlnQQu5XeMxI2MrOlfwkQJ029Ul1j_etEFEHgOjAZg1o0iICA8HkhQYtGvaV0cEvZm3eYxOvGafTku37EwSI76ApUsd8hU3kUkK-f3h7IHmWnvcnXdlcd7xEZ4xbVyqRaSo3G9OUNYNK-8cmSNeLfcbI3cm0DQvomcaz3CMrs-lA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(1)
    expect(response.body.message).toEqual("successful");

  });
  
});

// Get doclist from mongo db by user_id
describe("GET /api/document/otherByKey/:userId", () => {
  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/otherByKey/leAk1er1tSTQkcLjOqfQOmXCIwz1")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0MTcyMDUsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQxNzIwNSwiZXhwIjoxNjgyNDIwODA1LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WB85O4m-tfSxtmSvxM5YBEQvmNVN4BHURtUp2U5aRRY84U8C-lKijviJvI_clfsTwnys05JjGp45cpBP3deBHQXggcw678pBAa9tn7T1ADqBnzD5bbXgNWL9tuFIU2WDOHVZMEohLAU2xLO8DxDdTWL4wu5ltXYifnW5PKjdC5SlnQQu5XeMxI2MrOlfwkQJ029Ul1j_etEFEHgOjAZg1o0iICA8HkhQYtGvaV0cEvZm3eYxOvGafTku37EwSI76ApUsd8hU3kUkK-f3h7IHmWnvcnXdlcd7xEZ4xbVyqRaSo3G9OUNYNK-8cmSNeLfcbI3cm0DQvomcaz3CMrs-lA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(1)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/otherByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE2ZGE4NmU4MWJkNTllMGE4Y2YzNTgwNTJiYjUzYjUzYjE4MzA3NzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0MTcyMDUsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQxNzIwNSwiZXhwIjoxNjgyNDIwODA1LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.WB85O4m-tfSxtmSvxM5YBEQvmNVN4BHURtUp2U5aRRY84U8C-lKijviJvI_clfsTwnys05JjGp45cpBP3deBHQXggcw678pBAa9tn7T1ADqBnzD5bbXgNWL9tuFIU2WDOHVZMEohLAU2xLO8DxDdTWL4wu5ltXYifnW5PKjdC5SlnQQu5XeMxI2MrOlfwkQJ029Ul1j_etEFEHgOjAZg1o0iICA8HkhQYtGvaV0cEvZm3eYxOvGafTku37EwSI76ApUsd8hU3kUkK-f3h7IHmWnvcnXdlcd7xEZ4xbVyqRaSo3G9OUNYNK-8cmSNeLfcbI3cm0DQvomcaz3CMrs-lA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(0)
    expect(response.body.message).toEqual("successful");

  });

});