"use client";
import { BreadcrumbList } from "@/components/breadcrumb";
import Seo from "@/components/common/Seo";
import {
  ProductFeatureDescribe,
  ProductFeatureImage,
  ProductFeatureInfo,
  ProductFeatureReview,
  ProductFeatureSimilar,
} from "@/components/product";
import { ReviewList } from "@/components/reviews/ReviewList";
import { useProductSimilar, useReviewList } from "@/hook";
import { useProductDetails } from "@/hook/use-product-details";
import { Box, Divider, Stack } from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

/* SSR fetch + metadata */

// export async function generateMetadata(
//     { params, searchParams }: Props,
//     parent: ResolvingMetadata
// ): Promise<Metadata> {
//     // read route params
//     const id = params.id
//     // fetch data
//     const product = await getProduct(id)
//     return {
//         title: product.data.name,
//         description: product.data.name + 'Mua hàng qua mạng uy tín, tiện lợi. NoiThatKzone đảm bảo nhận hàng, hoặc được hoàn lại tiền Giao Hàng Miễn Phí. XEM NGAY!',
//         openGraph: {
//             title: product.data.name,
//             description: product.data.name + 'Mua hàng qua mạng uy tín, tiện lợi. NoiThatKzone đảm bảo nhận hàng, hoặc được hoàn lại tiền Giao Hàng Miễn Phí. XEM NGAY!',
//         },
//     }
// }

// const getProduct = async (id: number | string) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings/${id}`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }

// const getProductSimilar = async (id: number) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/listings/${id}/similar`, {
//         next: { revalidate: 300 }
//     })
//     return res.json();
// }

// const getProductReviews = async (params: any) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/reviews?product_id=${params.product_id}&page=${params.page}`, { cache: 'no-store' })
//     return res.json();
// }

export default function ProductDetail({ params }: { params: { id: number } }) {
  // const product = await getProduct(params.id)
  // const productSimilar = await getProductSimilar(params.id)
  // const productReviews = await getProductReviews({ product_id: params.id, page: 1 })

  const { data: product, isLoading } = useProductDetails({ productId: params.id });
  const { data: productSimilar } = useProductSimilar({ productId: params.id });
  const { data: productReviews } = useReviewList({
    params: { product_id: params.id, page: 1, limit: 10 },
  });
if (isLoading) return <Loading/>

  return (
    <>
      <Seo
        data={{
          title: product?.data.name!,
          description:
            product?.data.name! +
            "Mua hàng qua mạng uy tín, tiện lợi. NoiThatKzone đảm bảo nhận hàng, hoặc được hoàn lại tiền Giao Hàng Miễn Phí. XEM NGAY!",
        }}
      />
      <Box component="section">
        <ToastContainer />
        <Box
          sx={{
            width: "100%",
            maxWidth: "1460px",
            margin: "auto",
            padding: "20px",
          }}
        >
          <BreadcrumbList breadcrumb={product?.data}></BreadcrumbList>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            bgcolor={"#FFFFFF"}
          >
            <Box width={{ xs: "100%", md: "43%" }}>
              <Box position={"sticky"} top={"15px"} padding={"15px"}>
                <ProductFeatureImage
                  productImages={[product?.data.thumbnail]}
                ></ProductFeatureImage>
              </Box>
            </Box>

            <Box width={{ xs: "100%", md: "55%" }}>
              <ProductFeatureInfo product={product?.data}></ProductFeatureInfo>
            </Box>
          </Stack>
          <Divider></Divider>

          <Box marginBlockStart={"15px"}>
            <ProductFeatureSimilar
              products={productSimilar?.data}
            ></ProductFeatureSimilar>
          </Box>

          <Box marginBlockStart={"25px"}>
            <ProductFeatureDescribe
              describe={product?.data.describe}
            ></ProductFeatureDescribe>
          </Box>

          <Box marginBlockStart={"15px"}>
            <ProductFeatureReview productId={params.id}></ProductFeatureReview>
          </Box>

          <Box marginBlockStart={"15px"}>
            <Box component="section" marginBlockStart={"15px"}>
              <Box
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"}
                padding={"15px"}
              >
                <ReviewList
                  productId={params.id}
                  lastPage={productReviews?.last_page!}
                ></ReviewList>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
