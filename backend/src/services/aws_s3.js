const {S3Client,PutObjectCommand,GetObjectCommand}=require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const express = require("express");
const { EventEmitter } = require("events");

const fs=require('fs');
const {
    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
    ASW_BUCKET_NAME,
    ASW_BUCKET_REGION  
}=require('./s3');
const client=new S3Client({
    region:ASW_BUCKET_REGION,
    accessKeyId:AWS_ACCESS_KEY_ID,
    secretAccessKey:AWS_SECRET_ACCESS_KEY

});

const emitter = new EventEmitter();

module.exports={
    emitter,
    uploadFile:async(file)=>{
        const stream=fs.createReadStream(file.tempFilePath);
        
        try {
        const parallelUploads3 = new Upload({
            client:client,
            params:{
                Bucket:ASW_BUCKET_NAME,
                Key:file.name,
                Body:stream
            },
            queueSize:4,
            partSize:1024 * 1024 *5,
            leavePartsOnError: false
        })
        parallelUploads3.on("httpUploadProgress", (progress) => {
            const percentage = Math.round((progress.loaded / progress.total) * 100);
            emitter.emit("progress", percentage);
        });
        const result = await parallelUploads3.done();
        return result;
        } catch (error) {
            return error;
        }
    }
}