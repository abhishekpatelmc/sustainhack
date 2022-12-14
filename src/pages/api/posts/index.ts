import clientPromise from "../../../server/lib/mongodb";

export default async function handler(req: any, res: any) {
  const client = await clientPromise;
  const db = client.db("test");
  switch (req.method) {
    case "POST":
      try {
        const bodyObject = JSON.parse(req.body);
        const myPost = await db.collection("posts").insertOne(bodyObject);
        res.json(myPost);
      } catch (error) {
        console.log(error);
      }
      const bodyObject = JSON.parse(req.body);
      const myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost);
      break;
    case "GET":
      try {
        const allPosts = await db.collection("posts").find({}).toArray();
        res.json(allPosts);
      } catch (error) {
        console.log(error);
      }

      break;
  }
}
