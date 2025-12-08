import { Webhook } from "svix";
import User from "../models/user.model.js";



export const clerkWebHook = async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  console.log(WEBHOOK_SECRET, "this is webhook")
  if (!WEBHOOK_SECRET) {
    throw new Error("Webhook secret needed!");
  }

  const wh = new Webhook(WEBHOOK_SECRET);
  console.log(wh, "this is new webhook key")
  let evt;
  try {
    evt = wh.verify(req.body, req.headers); 
    console.log("Verified event:", evt);
  } catch (err) {
    return res.status(400).json({ message: "Webhook verification failed!" });
  }

const id = evt.data.id
const type = evt.type
console.log(type, "this is type")
console.log(id, "this is user id from clert");

if (evt.type === "user.created") {
  const newUser = new User({
    clerkUserId: id,
    username: evt.data.username || evt.data.email_addresses[0].email_address,
    email: evt.data.email_addresses[0].email_address,
    img: evt.data.profile_img_url,
  });

  console.log(newUser, "this is processing to user")
  await newUser.save();
  console.log("new user created")
}
  if (evt.type === "user.updated") {
    const existingUser = await User.findOne({ clerkUserId: id });
    console.log(existingUser, "this is existing user")

    if (existingUser) {
            existingUser.username = evt.data.username || evt.data.email_addresses[0].email_address;
            existingUser.email = evt.data.email_addresses[0].email_address;
            existingUser.img = evt.data.profile_image_url;
            await existingUser.save();
            console.log("new user updated")
        } else {
          
            const newUser = new User({
                clerkUserId: id,
                username: evt.data.username || evt.data.email_addresses[0].email_address,
                email: evt.data.email_addresses[0].email_address,
                img: evt.data.profile_image_url,
            });
      
            console.log(newUser, "this is new user")
            await newUser.save();
    console.log("new user created")
          }
  }
  
  return res.status(200).json({ message: "Webhook received" });
};