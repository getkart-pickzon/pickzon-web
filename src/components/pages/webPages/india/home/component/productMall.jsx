import React from "react";
import { Link } from 'react-router-dom'
import { Icon, Grid, Image, Button, Card } from "semantic-ui-react";
import Assets from "../../../../../../assets/Assets";
import ".././style.css"
const ProductMall = () => {
    return (
        <div>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8} className="text-middle" style={{ display: "flex" }}>
                        <div className="product-text-out">
                            <h2 className="product-text" style={{ marginBottom: "0" }}>Largest</h2>
                            <h2 className="product-text" style={{ marginTop: "0" }}>Multi-Market</h2>
                            <p className="font-100">The application allows you to list and sell products online without any hassle from your phone easily and without paying any commissions to anyone. Never miss the chance to grab the deals around you through the best social media app. The application is user-friendly and also allows you to connect with other people.</p>
                            <Button right medium primary style={{ float: "right" }} className="nofloat">
                                <Link to="/mall-content" className="color-white">Explore More</Link></Button>
                        </div>
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <Grid centered>
                            <Grid.Row className="rightm">
                                <Grid.Column width={6}>
                                    <Card className="custom-border">
                                        <Image src={Assets.home.productMall1.img} wrapped ui={false} alt={Assets.home.productMall1.alt} />
                                        <Card.Content>
                                            <Card.Header>$36.99</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Women’s Fashion Kit</span>
                                            </Card.Meta>
                                            <Card.Meta>
                                                <span><Icon name='map marker alternate' size='small' /> Austin, Texas</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>

                                </Grid.Column>
                                <Grid.Column width={6}>
                                    <Card className="custom-border">
                                        <Image src={Assets.home.productMall2.img} wrapped ui={false} alt={Assets.home.productMall2.alt} />
                                        <Card.Content>
                                            <Card.Header>$35.99</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Women’s Purse</span>
                                            </Card.Meta>
                                            <Card.Meta>
                                                <span><Icon name='map marker alternate' size='small' />Chicago, Illinois</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={6}>
                                    <Card className="custom-border">
                                        <Image src={Assets.home.productMall3.img} wrapped ui={false} alt={Assets.home.productMall3.alt} />
                                        <Card.Content>
                                            <Card.Header>$38.99</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Women’s Bodylotion</span>
                                            </Card.Meta>
                                            <Card.Meta>
                                                <span><Icon name='map marker alternate' size='small' />Los Angleles, California</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card></Grid.Column>
                                <Grid.Column width={6}>
                                    <Card className="custom-border">
                                        <Image src={Assets.home.productMall4.img} wrapped ui={false} alt={Assets.home.productMall4.alt} />
                                        <Card.Content>
                                            <Card.Header>$42.99</Card.Header>
                                            <Card.Meta>
                                                <span className='date'>Unisex Sneaker</span>
                                            </Card.Meta>
                                            <Card.Meta>
                                                <span><Icon name='map marker alternate' size='small' /> Las Vegas, Nevada</span>
                                            </Card.Meta>
                                        </Card.Content>
                                    </Card></Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    )
}

export default ProductMall;