import { Helmet } from 'react-helmet-async';
const Metatags = ({
    title = 'Pickzon - Connecting the World',
    description = 'Looking for Fun, Masti & Shopping at one place? One of the most engaging and the best short video making app packed with never ending entertainment.',
    image = 'https://d3t5gz5ttp8loj.cloudfront.net/common_images/pickzon_logo.png',
    keywords = 'Make connections for better reach, Make social media connections, Meet professionals on social media, Connect with professionals on Pickzon, Better career opportunities on pickzon, Make connections on social media, Create engaging social media profile, Indian Social Media App, Social media app in India, Pickzon social media app, Social media apps,Social networking apps, Become a social media star on pickzon, Social media marketing, Social media optimization, Make money with social media, Share photos on social media, Social media for business, Social media for influencers, Social media app in worldwide, Social media feeds app, Increase social media engagement',
    route = 'https://www.pickzon.com/'
}) => {
    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@pickzon" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:keywords" content={keywords} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:keywords" content={keywords} />
            <meta property="og:image" content={image} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <link rel="canonical" href={route} />
            <link rel="icon" href="/favicon.ico" />
        </Helmet>
    );
}
export default Metatags;