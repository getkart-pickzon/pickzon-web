import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Icon, Dimmer, Grid, Loader, Container, Image } from "semantic-ui-react";
import socketIOClient from "socket.io-client";
import { Helmet } from "react-helmet";
import { LoginMeta } from "../../../../utils/meta";
import { getBrowserLocation } from "../../../../helper/getDeviceLocation"
import { makeUserProfileImgURL, setUserSession } from "../../../../utils/common";
import { GET } from "../../../../Services"
import { CURRENT_SIO_URL } from "../../../../config/getCurrentURL";
import Assets from "../../../../assets/Assets";
import "./style.css"

let socket = socketIOClient(CURRENT_SIO_URL());
const Login = () => {
  let router = useHistory()
  const [QRImage, setQRImage] = useState("")
  const [imageInterval, setImageInterval] = useState(false)

  useEffect(() => {
    function callUseEff() {
      try {
        socket.on('IO_loggedIn', async (data) => {
          try {
            data.payload.profile_pic = data.payload.ProfilePic;
            data.payload.ProfilePic = await makeUserProfileImgURL(data.payload.ProfilePic);
          } catch (er) { console.log(er) };
          setUserSession(data.authToken, data.payload)
          router.push("/feed");
          window.location.reload()
        })
        fetchQImage()
      } catch (er) { console.log(er) }
    }
    callUseEff()
  }, [])

  const fetchQImage = async () => {
    try {
      socket.emit('connectionForLogin', { name: 'name', room: 'room' }, (error) => {
      });

      socket.on('connectedSuccess', async (data) => {
        let obj = { ... await getBrowserLocation(), socketId: socket.id }
        const { payload } = await GET("/auth/fetch-QRImage", obj)
        setQRImage(payload)
        setImageInterval(false)
        setTimeout(() => {
          setImageInterval(true)
        }, 150000);
      })
    } catch (er) { console.log(er) }
  }

  return (
    <>
      <Helmet>
        <title>{LoginMeta.title}</title>
        <link rel="canonical" href={window.location.href} />
        <meta name="description" content={LoginMeta.description} />
        <meta name="keywords" content={LoginMeta.keywords} />
      </Helmet>
      <section className="use-pickzon" style={{ backgroundImage: `url(${Assets.Login.loginBg.img})` }}>
        <Container>
          <Grid stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <div className="login-left-area-outer">
                  <div className="login-left-area-inner">
                    <h1 className="login-title">USE Pickzon on your phone to scan the code</h1>
                    <div className="login-text-inner" style={{ marginLeft: "1em" }}>
                      <ol className="text-inner">
                        <li>Open Pickzon App on your phone.</li>
                        <li>Tap more <Icon name="ellipsis horizontal" size="small" circular /> and profile option.</li>
                        <li>In profile option select Pickzon Web Login.</li>
                        <li>Point your phone to this screen to capture the QR code.</li>
                      </ol>
                      <div class="reduce-mobile">
                        To reduce mobile data usage, connect your phone to Wi-Fi
                      </div>
                    </div>
                    <div className="loginapparea">
                      <Image src={Assets.clip.googlePayNormal.img} alt={Assets.clip.googlePayNormal.alt}
                        href="https://play.google.com/store/apps/details?id=com.chat.pickzon" target="_blank"
                      />
                      <Image src={Assets.clip.appStoreNormal.img} alt={Assets.clip.appStoreNormal.alt}
                        href="https://apps.apple.com/in/app/pickzon/id1560097730" target="_blank"
                      />
                    </div>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column>
                <div className="rightlogin">
                  <Image src={Assets.Login.loginDevice.img} alt={Assets.Login.loginDevice.alt} size='medium' />
                  {
                    !QRImage ?
                      <Loader active size="large" />
                      :
                      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}>
                        {imageInterval === false ?
                          <>
                            {QRImage ?
                              <img src={QRImage} alt="pickzon_QR" style={{ height: "150px" }} />
                              :
                              <img src={Assets.Login.loginReloadQR.img} alt={Assets.Login.loginReloadQR.alt} style={{ cursor: 'pointer', height: "150px" }} onClick={fetchQImage} />
                            }
                          </>
                          :
                          <img src={Assets.Login.loginReloadQR.img} alt={Assets.Login.loginReloadQR.alt} style={{ cursor: 'pointer', height: "150px" }} onClick={fetchQImage} />
                        }
                      </div>
                  }
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </section>
    </>
  );
};

export default Login;
