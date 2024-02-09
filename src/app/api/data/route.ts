import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';
import prisma from "../../../../prisma/prisma";

const createDataSchema = z.object({
    title :z.string().min(1).max(500),
    description: z.array(z.record(z.unknown())).min(1)
})

export async function POST(req:NextRequest) {
    const body = await req.json();
    const validation = createDataSchema.safeParse(body);
    if(!validation.success)
    return NextResponse.json(validation.error.errors,{status:400});

     await prisma.metainfo.create({
        data:{
            title: body.title,
            description: body.description
        }
    });
    return NextResponse.json("Data Saved",{status:201});
}