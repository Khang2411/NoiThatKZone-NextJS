type SeoData = {
    title: string
    description: string
}

export interface SeoProps {
    data: SeoData
}

export default function Seo({ data }: SeoProps) {
    const { title, description  } = data

    return (
        <>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />

            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
        </>
    )
}