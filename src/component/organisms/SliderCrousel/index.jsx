import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { Button } from '@mui/material'
// import "./style.css"

const SliderCrousel = ({ element, arr, slidesShow, scrollShow, imgSize, autoplay, centerPadding, centerMode, slideShow1024, slideShow768, slideShow520, slideShow480, style, dots, afterChange }) => {

    const PrevArrow = ({ onClick }) => {
        return (<>{style ?
            <Button icon='angle left' circular onClick={onClick} style={style.preBtn} size="massive" />
            : null}
        </>);
    }

    const NextArrow = ({ onClick }) => {
        return (<>
            {style ?
                <Button icon='angle right' circular onClick={onClick} style={style.nextBtn} size="massive" />
                : null}
        </>);
    }

    const responsiveness = [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: slideShow1024,
                slidesToScroll: 1,
                centerPadding: 0,
                centerMode: true
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: slideShow768,
                slidesToScroll: 1,
                centerPadding: 0,
                centerMode: false
            }
        },
        {
            breakpoint: 520,
            settings: {
                slidesToShow: slideShow520,
                slidesToScroll: 1,
                centerPadding: 0
            }
        },
        {
            breakpoint: 520,
            settings: {
                slidesToShow: slideShow520,
                slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: slideShow480,
                slidesToScroll: 1,
                centerPadding: 0
            }
        }
    ]

    const elementFnc = () => element.map((item) => {
        return (<React.Fragment key={item}>
            {item}
        </React.Fragment>);
    })

    const imgaeFnc = () => arr.map((item) => {
        return (<div key={item}>
            <img src={item.img} size={imgSize} style={{ margin: "0 auto" }} alt={typeof item === 'object' ? item.alt : "pickzon"} />
        </div>)
    })

    return (
        <Slider
            className='slick-center'
            centerMode={centerMode}
            centerPadding={centerPadding}
            slidesToScroll={scrollShow}
            slidesToShow={slidesShow}
            autoplay={autoplay}
            autoplaySpeed={2000}
            infinite={true}
            arrows={true}
            dots={dots}
            prevArrow={<PrevArrow />}
            nextArrow={<NextArrow />}
            responsive={responsiveness}
            afterChange={afterChange}
        >
            {element ?
                elementFnc()
                :
                imgaeFnc()}
        </Slider>
    )
}

export default SliderCrousel;

// .slick-slide.slick-center {
//     transform: scale(1.2);
//   }