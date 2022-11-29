import { db } from "../../server/db"; 

export default function handler(req: any, res: any) {
    res.status(200).json(db.users);
}