import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";
import { createDataSchema } from "../../validationSchema";

export async function GET(req:NextRequest) {

     const data = await prisma.metainfo.findMany({});
    return NextResponse.json(data,{status:200});
}

export async function POST(req:NextRequest) {
    const body = await req.json();
    const validation = createDataSchema.safeParse(body);
    if(!validation.success)
    return NextResponse.json(validation.error.format(),{status:400})
    else{
        await prisma.metainfo.create({
           data:{
               title: body.title,
               description: body.description,
               parentId: body.parentId
           }
       });
       return NextResponse.json("Data Saved",{status:201});
    }
    

}