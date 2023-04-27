import NavigationPaths from "./navigationPath";
import { Mail, Facebook, Instagram, LinkedIn, YouTube, } from "@mui/icons-material";

const FooterLinks = {
    // upper_footer
    upperFooter: {
        summary: [
            {
                title: "Engage with the world",
                description: "The most creative and feature rich social engagement App, that lets you share your thoughts, engage with the Audience and have fun.",
                icon: <Mail />,
                label: "help@pickzon.com",
                to: "mailto:help@pickzon.com"

            }
        ],
        links: [
            {
                title: "Company",
                description: [
                    // { route: NavigationPaths.SERVICES, text: "Services", status: 0, },

                    { route: NavigationPaths.PRIVACYPOLICY, text: "Privacy Policy", status: 0, },
                    { route: NavigationPaths.TERM, text: "Terms of Service", status: 0 },
                    { route: NavigationPaths.SECURITY, text: "Security", status: 0, },
                    { route: NavigationPaths.CONTACT, text: "Contact Us", status: 0 },
                ],
            },
            {
                title: "Features",
                description: [
                    { route: NavigationPaths.FEEDCONTENT, text: "Feed", status: 0 },
                    { route: NavigationPaths.BUSINESSPAGE, text: "Business Promotion", status: 0, },


                ],
            },
            {
                title: "Discover",
                description: [
                    { route: NavigationPaths.SEARCHEXPLORE, text: "Search & Explore", status: 0, },
                    { route: NavigationPaths.SOCIALCREATOR, text: "Social Creator", status: 0, },
                ],
            },

        ],
    },
    // lower_footer
    lowerFooter: {
        licence: {
            copyRight: "© 2023 PickZon Inc.",
            rightReserved: "All Rights Reserved.",
            path: NavigationPaths.IPROPERTYPOLICY,
        },
        followUs: {
            title: "Follow Us :",
            socialText: [
                {
                    label: "Pickzon_Facebook",
                    icon: <Facebook sx={{ fontSize: "1.5rem" }} />,
                    href: "https://www.facebook.com/pickzon.inc"
                }, {
                    label: "Pickzon_Youtube",
                    icon: <YouTube sx={{ fontSize: "1.5rem" }} />,
                    href: "https://www.youtube.com/channel/UCOBHbUldqArDDdUD0hZfsOQ"
                }, {
                    label: "Pickzon_Instagram",
                    icon: <Instagram sx={{ fontSize: "1.5rem" }} />,
                    href: "https://www.instagram.com/pickzon_/"
                }, {
                    label: "Pickzon_Linkedin",
                    icon: <LinkedIn sx={{ fontSize: "1.5rem" }} />,
                    href: "https://www.linkedin.com/company/pickzon"
                },
            ]
        }
    }
}


export default FooterLinks;
