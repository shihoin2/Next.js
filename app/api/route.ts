import { NextRequest, NextResponse } from "next/server";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { InferGetStaticPropsType, GetServerSideProps } from "next";

export async function GET(req: NextRequest) {
  const res = await
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=34&lon=135&units=metric&appid=d068bb96a1d7ba8987f892ea7c2d81ab`)
  const data = await res.json()
  return NextResponse.json({data});
}
