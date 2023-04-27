import NavigationPaths from "./navigationPath";
const HeaderLinks = [
    // status === 0:"links" ,status===1 :"button"
    { route: NavigationPaths.ABOUTUS, text: "About Us", status: 0 },
    { route: NavigationPaths.FEATURE, text: "Features", status: 0 },
    { route: NavigationPaths.WHYPICKZONE, text: "Why Pickzon ?", status: 0 },
    { route: NavigationPaths.FAQ, text: "FAQ", status: 0 },
    // { route: NavigationPaths.CAREER, text: "Career", status: 0 },
    { route: NavigationPaths.BLOGS, text: "Blogs", status: 0 },
    { route: NavigationPaths.LOGIN, text: "Web", status: 1 },
]

export default HeaderLinks;