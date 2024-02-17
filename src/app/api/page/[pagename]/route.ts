import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/prisma";

export async function GET(req:NextRequest,{params}:{params?:{pagename?:string}}){
    const title =params?.pagename;
    try {
        const data = await prisma.metainfo.findUnique({
            where:{
                title:title
            }
        })
        return new Response(JSON.stringify(data),{status:200});
    } catch (error) {
        return new Response((title),{status:500})
    }
};
