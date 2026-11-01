import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { connection } from "next/server";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";

export const metadata: Metadata = {
  title: "Sanity Studio | Sumaq Center Gym",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

async function DynamicMarker() {
  await connection();
  return null;
}

export default function StudioPage() {
  return (
    <>
      <Suspense fallback={null}>
        <DynamicMarker />
      </Suspense>
      <NextStudio config={config} />
    </>
  );
}
