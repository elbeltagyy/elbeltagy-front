import { Helmet } from 'react-helmet-async';
import { lang } from '../settings/constants/arlang';

function SEOHelmetAsync({
    title, desc, url, img, isIndexed = true, isSiteLink = false
}) {

    const ogData = {
        title,
        description: desc,
        url,
        image: img || "/assets/logo.webp",
        siteName: lang.LOGO,
    };

    return (
        <Helmet>
            <title>{ogData.title}</title>
            <meta name="description" content={ogData.description} />
            <link rel="canonical" href={ogData.url} />

            {isIndexed ?
                <meta name="robots" content="index, follow" />
                :
                <meta name="robots" content="noindex, nofollow" />
            }

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={ogData.title} />
            <meta property="og:description" content={ogData.description} />
            <meta property="og:url" content={ogData.url} />
            <meta property="og:image" content={ogData.image} />
            <meta property="og:site_name" content={ogData.siteName} />
            {/* You can add more Open Graph tags as needed */}

            {isSiteLink && (
                <script type="application/ld+json">{`
                    "@context": "http://schema.org",
                    "@type": "WebSite",
                    "name": ${ogData.title},
                    "url": ${ogData.url},
                    `}</script>
            )}
        </Helmet>
    )
}
//@type: 'WebPage'
export default SEOHelmetAsync
