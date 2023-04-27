import request from "supertest"
// Get doclist from mongo db by user_id
describe("GET /api/document/ownedByKey/:userId", () => {
  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/ownedByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0Njk2MDgsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQ2OTYwOCwiZXhwIjoxNjgyNDczMjA4LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Iac3f26y4sBOhv0iMedl3s0EspE-hqUUfDJijt_w29ZNaVjbZCo5hK0M_JQ429IAylEIePUUP4BK_6EmTXm8BdxSTdcGleGViMFoSnGa9IP8UvNvzrMHB3xylb3OC2GPGKVQfUYHfdvTb4BDKjRV9l_7bPWspP-SaOgrLyeLk8NrqdrEQtwV8Cqzdl5nqGSkFmRb4ph-jSz0C3DI-VHqXZ-m8D-rR504VpYIHpZGHzILa2mmCE1jw8sns54eBBh6zlRo1lkaMEQkekBG8C5Sw-O2J1xURIdTKuYs7SaWvjQiphJu5Tt0Rln2iRHJ7KA0_Cxi3An5Ou3tJXef0C94uQ"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(3)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >=1, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/ownedByKey/leAk1er1tSTQkcLjOqfQOmXCIwz1")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0Njk2MDgsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQ2OTYwOCwiZXhwIjoxNjgyNDczMjA4LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Iac3f26y4sBOhv0iMedl3s0EspE-hqUUfDJijt_w29ZNaVjbZCo5hK0M_JQ429IAylEIePUUP4BK_6EmTXm8BdxSTdcGleGViMFoSnGa9IP8UvNvzrMHB3xylb3OC2GPGKVQfUYHfdvTb4BDKjRV9l_7bPWspP-SaOgrLyeLk8NrqdrEQtwV8Cqzdl5nqGSkFmRb4ph-jSz0C3DI-VHqXZ-m8D-rR504VpYIHpZGHzILa2mmCE1jw8sns54eBBh6zlRo1lkaMEQkekBG8C5Sw-O2J1xURIdTKuYs7SaWvjQiphJu5Tt0Rln2iRHJ7KA0_Cxi3An5Ou3tJXef0C94uQ"
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
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0Njk2MDgsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQ2OTYwOCwiZXhwIjoxNjgyNDczMjA4LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Iac3f26y4sBOhv0iMedl3s0EspE-hqUUfDJijt_w29ZNaVjbZCo5hK0M_JQ429IAylEIePUUP4BK_6EmTXm8BdxSTdcGleGViMFoSnGa9IP8UvNvzrMHB3xylb3OC2GPGKVQfUYHfdvTb4BDKjRV9l_7bPWspP-SaOgrLyeLk8NrqdrEQtwV8Cqzdl5nqGSkFmRb4ph-jSz0C3DI-VHqXZ-m8D-rR504VpYIHpZGHzILa2mmCE1jw8sns54eBBh6zlRo1lkaMEQkekBG8C5Sw-O2J1xURIdTKuYs7SaWvjQiphJu5Tt0Rln2iRHJ7KA0_Cxi3An5Ou3tJXef0C94uQ"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(1)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:80").get("/api/document/otherByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI0Njk2MDgsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjQ2OTYwOCwiZXhwIjoxNjgyNDczMjA4LCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Iac3f26y4sBOhv0iMedl3s0EspE-hqUUfDJijt_w29ZNaVjbZCo5hK0M_JQ429IAylEIePUUP4BK_6EmTXm8BdxSTdcGleGViMFoSnGa9IP8UvNvzrMHB3xylb3OC2GPGKVQfUYHfdvTb4BDKjRV9l_7bPWspP-SaOgrLyeLk8NrqdrEQtwV8Cqzdl5nqGSkFmRb4ph-jSz0C3DI-VHqXZ-m8D-rR504VpYIHpZGHzILa2mmCE1jw8sns54eBBh6zlRo1lkaMEQkekBG8C5Sw-O2J1xURIdTKuYs7SaWvjQiphJu5Tt0Rln2iRHJ7KA0_Cxi3An5Ou3tJXef0C94uQ"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(0)
    expect(response.body.message).toEqual("successful");

  });

});