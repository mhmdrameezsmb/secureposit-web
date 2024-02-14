import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: any) {
  const data = await req.json();

  const b = data.file;

  const fileNameAfterSlash = data.type.split("/").pop();

  const patten1 = "data:";
  const patten2 = ";base64,";

  const df = data.file.replace(new RegExp(patten1 + data.type + patten2), "");

  var buf = Buffer.from(df, "base64");

  const s3Client = new S3Client({
    region: "us-east-1",
    credentials: {
      accessKeyId: `${process.env.accessKeyId}`,
      secretAccessKey: `${process.env.secretAccessKey}`,
    },
  });

  const target = {
    Bucket: "aunties3bucket",
    Key: `${Date.now().toString()}.${fileNameAfterSlash}`,
    Body: buf,
    ContentEncoding: "base64",
    ContentType: `${data.type}`,
  };

  try {
    const parellelUploads = new Upload({
      client: s3Client,
      leavePartsOnError: true,
      params: target,
    });

    let _progress = null;

    parellelUploads.on("httpUploadProgress", (progress) => {
      _progress = progress;
    });

    const response = await parellelUploads.done();

    if (response)
      return NextResponse.json({
        success: "upload success",
        data: {
          image: response["Location"],
        },
      });
    else return NextResponse.json({ err: "error" });
  } catch (err: any) {
    return NextResponse.json({ err: err });
  }
}
