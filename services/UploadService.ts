import { v4 as uuid } from 'uuid';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "../loaders/logger";
import { IUser, LooseObject } from "../utils/interfaces";

import { makeS3KeyForUser } from "../utils/utils";

const bucketName = process.env.S3_BUCKET_NAME;

const s3 = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_IAM_ACCESS || "",
		secretAccessKey: process.env.AWS_IAM_SECRET || "",
	},
    region: process.env.S3_BUCKET_REGION || "",
});

export const GenerateS3PreSignedURL = async (data: LooseObject, token: IUser) => {

	try {

		let key = "";
        
        if (data.folder) {
            key = `${data.folder}/${data.name}`;
        } else {
            key = `${makeS3KeyForUser(token.id || uuid(), token.name)}/${data.name}`;
        }

        const options = {
            Key: key,
            Bucket: bucketName,
            ContentType: data.type
        };

		const command = new PutObjectCommand(options);
		const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 });

        return { status: 200, url: { signedUrl, key } };
		
	} catch (error) {
		logger.error(error);
		return { status: 500, message: "Internal Server Error" };
	}
}