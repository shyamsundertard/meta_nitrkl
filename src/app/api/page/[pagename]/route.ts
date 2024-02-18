import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req:NextRequest,{params}:{params?:{pagename?:string}}){
    const title =params?.pagename;
    try {
        const data = await prisma.metainfo.findUnique({
            where:{
                title:title
            }
        });
        return new Response(JSON.stringify(data),{status:200});
    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
};

export async function PUT(req:NextRequest,{params}:{params?:{pagename?:string}}){
    const title=params?.pagename;
    const body = await req.json();
    try {
         await prisma.metainfo.update({
            where:{
                title:title
            },
            data:{
                description:{
                    push:{
                        heading: body.heading,
                        detail: body.detail
                    }
                }
            },
        });
        return new Response(JSON.stringify("Section added successfully"),{status:200})
    } catch (error) {
        return new Response(JSON.stringify({error: "Failed to add Section"}),{status:500})  
    }
}