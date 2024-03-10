/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from 'next/og'


export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { id: number } }) {
  const post = await fetch(`https://admin.noithatkzone.shop/api/v1/listings/${params.id}`).then((res) => res.json())

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          color: "dark",
          width: "100%",
          height: "100%",
          display: "flex",
          padding: '10px',
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img
          src={post.thumbnail}
          width={500}
          height={500}
          alt="devtomars blog"
        />
        <h2>{post.name}</h2>
      </div>
    ),
    { ...size }
  );
}