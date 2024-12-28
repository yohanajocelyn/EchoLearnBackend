import { NextFunction, Request, Response } from "express";

export class FileController{

    static getDefaultProfilePictures(
        req: Request, 
        res: Response, 
        next: NextFunction
    ) {
        try{
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            const profilePictures = [
                `${baseUrl}/public/images/profilePicture1.jpg`,
                `${baseUrl}/public/images/profilePicture2.jpg`,
                `${baseUrl}/public/images/profilePicture3.jpg`,
                `${baseUrl}/public/images/profilePicture4.jpg`,
            ];
            res.json(profilePictures);
        }catch(error){
            next(error)
        }
    }
    
}