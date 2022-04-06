import mongoose, { Document } from "mongoose";
import { EJSON } from "bson";

import type { IUser } from "./user.model";

import { mongoDatabase } from "./mongodb";
import { User } from "./user.model";
import usersData from "./datasets/users.json";

const deserializeBSON = (obj: any) => EJSON.deserialize(obj);

async function main() {
    const uri = await mongoDatabase.start();
    await mongoose.connect(uri);
    await User.insertMany(deserializeBSON(usersData) as IUser & Document);

    const user = await User.findOne({
        "external.id": "usr_p1C5xM7Kb2eh4bjyKQpHtJ3s"
    }).lean();
    if (!user) {
        throw new Error("no such user");
    }

    user.firstName = "Foofoo";
    await User.updateOne(
        {
            "external.id": user.external?.id
        },
        user
    );

    await mongoose.connection.close();
    await mongoDatabase.stop();
}

main().catch((err) => console.log(`main got error: ${err}`));
