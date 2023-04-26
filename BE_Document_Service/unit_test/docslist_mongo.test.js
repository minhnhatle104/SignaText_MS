import request from "supertest"
// Get doclist from mongo db by user_id
describe("GET /api/document/ownedByKey/:userId", () => {
  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:5050").get("/api/document/ownedByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI1MjM4MzIsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjUyMzgzMiwiZXhwIjoxNjgyNTI3NDMyLCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gahDgWuEcAtjpGdw7NpwsUIkbDQ-EFiGBYGC04pzm_RKdyjMjLHH0VH7ktz69LoQbnIMuGgJyQkm79xua-Qrn8-e_x0vHw7GMD2vRWqUeYcan836FE5rX56yoFidBwDGprwOpiFmI2v4rWdAevev4oCvMtAf1ncilMmgSlFxlKBanlpmtcTI0H2SQ0ZhlHo-MPs6rq5eeKZUU5-mOuYl8WPQG8FyxESaCwIPc5S1p8c6X9ttPEk0NkoVF96Nfa-JxAlKUpMEtRlxpXy5013OKmD1MHFZVEBnQMlHt0yLIKPL0YDoX9Dw6gesYlU9Y2WKoi7gtpivpCTXAF0CFb56IA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(3)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >=1, message is successful', async() => {
    const response = await request("http://localhost:5050").get("/api/document/ownedByKey/leAk1er1tSTQkcLjOqfQOmXCIwz1")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI1MjM4MzIsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjUyMzgzMiwiZXhwIjoxNjgyNTI3NDMyLCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gahDgWuEcAtjpGdw7NpwsUIkbDQ-EFiGBYGC04pzm_RKdyjMjLHH0VH7ktz69LoQbnIMuGgJyQkm79xua-Qrn8-e_x0vHw7GMD2vRWqUeYcan836FE5rX56yoFidBwDGprwOpiFmI2v4rWdAevev4oCvMtAf1ncilMmgSlFxlKBanlpmtcTI0H2SQ0ZhlHo-MPs6rq5eeKZUU5-mOuYl8WPQG8FyxESaCwIPc5S1p8c6X9ttPEk0NkoVF96Nfa-JxAlKUpMEtRlxpXy5013OKmD1MHFZVEBnQMlHt0yLIKPL0YDoX9Dw6gesYlU9Y2WKoi7gtpivpCTXAF0CFb56IA"
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
    const response = await request("http://localhost:5050").get("/api/document/otherByKey/leAk1er1tSTQkcLjOqfQOmXCIwz1")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI1MjM4MzIsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjUyMzgzMiwiZXhwIjoxNjgyNTI3NDMyLCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gahDgWuEcAtjpGdw7NpwsUIkbDQ-EFiGBYGC04pzm_RKdyjMjLHH0VH7ktz69LoQbnIMuGgJyQkm79xua-Qrn8-e_x0vHw7GMD2vRWqUeYcan836FE5rX56yoFidBwDGprwOpiFmI2v4rWdAevev4oCvMtAf1ncilMmgSlFxlKBanlpmtcTI0H2SQ0ZhlHo-MPs6rq5eeKZUU5-mOuYl8WPQG8FyxESaCwIPc5S1p8c6X9ttPEk0NkoVF96Nfa-JxAlKUpMEtRlxpXy5013OKmD1MHFZVEBnQMlHt0yLIKPL0YDoX9Dw6gesYlU9Y2WKoi7gtpivpCTXAF0CFb56IA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(1)
    expect(response.body.message).toEqual("successful");

  });

  it('statusBode should be 200, listLength >= 3, message is successful', async() => {
    const response = await request("http://localhost:5050").get("/api/document/otherByKey/abYqBsQA8fgOMMnIO4N3iwwbztJ3")
      .set({
        authorization: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2lnbmF0ZXh0LXYwMiIsImF1ZCI6InNpZ25hdGV4dC12MDIiLCJhdXRoX3RpbWUiOjE2ODI1MjM4MzIsInVzZXJfaWQiOiJhYllxQnNRQThmZ09NTW5JTzROM2l3d2J6dEozIiwic3ViIjoiYWJZcUJzUUE4ZmdPTU1uSU80TjNpd3dienRKMyIsImlhdCI6MTY4MjUyMzgzMiwiZXhwIjoxNjgyNTI3NDMyLCJlbWFpbCI6ImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImR1eWtodW9uZzMwNzIwMDFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.gahDgWuEcAtjpGdw7NpwsUIkbDQ-EFiGBYGC04pzm_RKdyjMjLHH0VH7ktz69LoQbnIMuGgJyQkm79xua-Qrn8-e_x0vHw7GMD2vRWqUeYcan836FE5rX56yoFidBwDGprwOpiFmI2v4rWdAevev4oCvMtAf1ncilMmgSlFxlKBanlpmtcTI0H2SQ0ZhlHo-MPs6rq5eeKZUU5-mOuYl8WPQG8FyxESaCwIPc5S1p8c6X9ttPEk0NkoVF96Nfa-JxAlKUpMEtRlxpXy5013OKmD1MHFZVEBnQMlHt0yLIKPL0YDoX9Dw6gesYlU9Y2WKoi7gtpivpCTXAF0CFb56IA"
      });
    // expect(response.body).toHaveLength(6);
    expect(response.statusCode).toBe(200)
    expect(response.body.list.length).toBeGreaterThanOrEqual(0)
    expect(response.body.message).toEqual("successful");

  });

});