import React, { useState } from "react";
import { Segment, Header, Icon, Button, Divider, Modal, Form } from "semantic-ui-react";
import useRazorpay from "react-razorpay";

import { POST, POSTWITHTOKEN } from "../../../Services";
import { getUser } from "../../../utils/common";
import { loader, stopLoader } from "../../../utils/sweetAlert";

const numericRegex = /^\d+$/;
const defaultObj = {
  walletHistoryList: [],
  title: "",
  walletCurrency: "INR",
  walletAmount: 500
};

const AddWalletPayment = ({ walletStates = {}, addWalletCallBack }) => {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState(defaultObj);
  const loggedUser = getUser();
  const Razorpay = useRazorpay();

  const changeHandler = (e) => {
    try {
      let name = e.target.name;
      if (name === 'walletAmount') {
        if (e.target.value) {
          if (!numericRegex.test(e.target.value)) { return };
        } if (parseInt(e.target.value) > 10000) { return }
      };
      setState((pre) => ({
        ...pre,
        [name]: e.target.value
      }));
    } catch (er) { console.log(er) };
  }

  const ProceedToPayBtn = async () => {
    try {
      setOpen(true)
      if (state.walletAmount > 99) {
        let razorPayRes = await openRazorPay({
          currency: state.walletCurrency,
          totalAmount: state.walletAmount,
          userId: loggedUser._id
        });
        console.clear();
        if (!razorPayRes.paymentId) { return };
        await POST("/payment/add-wallet-balance", {
          userId: loggedUser._id,
          title: state.title,
          createdPaymentId: razorPayRes.createdPaymentId
        });
        addWalletCallBack();
        setOpen(false);
      } else { alert('Minimum balance should be more than 100') };
    } catch (er) { console.log(er) };
  };

  const openRazorPay = async (dataOBJ) => {
    try {
      return await new Promise(async (resolve, reject, pending) => {
        loader()
        const { status, message, payload } = await POST("/createPayment", {
          currency: dataOBJ.currency,
          amount: dataOBJ.totalAmount,
          userId: dataOBJ.userId
        });
        stopLoader()

        if (status === 0) {
          return alert(message);
        }
        const options = {
          key: payload.key,
          amount: payload.amount,
          currency: payload.currency,
          name: "Vishwajeet Sharma",
          description: "Test Transaction",
          image: "https://pickzon.com/app/site/public/image/piczone-logo-80.png",
          order_id: payload.orderId,
          handler: async function (response) {
            const paymentRes = await POSTWITHTOKEN("/addPayment", payload.authToken,
              {
                userId: dataOBJ.userId,
                createdPaymentId: payload.createdPaymentId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                paymentStatus: "done",
              }
            );
            if (paymentRes.status === 0) {
              alert(paymentRes.message);
              return resolve({ status: "failed", paymentId: response.razorpay_payment_id });
            }
            let createdPaymentId = paymentRes.payload.createdPaymentId;
            resolve({ status: "done", paymentId: response.razorpay_payment_id, createdPaymentId: createdPaymentId });
          },
          prefill: {
            name: "Vishwajeet",
            email: "Vishwajeet.dev@gmail.com",
            contact: "8770521520",
          },
          notes: {
            address: "Pickzon",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", async function (response) {
          try {
            document.getElementById("fd-hide").click();
            setTimeout(() => {
              document.getElementById("modal-close").click();
            }, 200);
            await POSTWITHTOKEN("/addPayment", payload.authToken, {
              userId: dataOBJ.userId,
              createdPaymentId: payload.createdPaymentId,
              paymentId: response.razorpay_payment_id,
              signature: "failed",
              paymentStatus: "failed",
            });

            if (response.error.code === 'BAD_REQUEST_ERROR') {
              alert(response.error.description);
              resolve({ status: "failed", paymentId: response.razorpay_payment_id });
            } else {
              alert("Your transaction has failed");
              resolve({ status: "failed", paymentId: response.razorpay_payment_id });
            }
          } catch (er) { console.log(er) }
        });
        rzp1.open();
      });
    } catch (er) { console.log(er) };
  };

  return (
    <>
      <Modal
        closeIcon
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        open={open}
        size="mini"
        trigger={<Button positive >Add Money</Button>}
      >
        <Segment raised style={{ top: '-14px', marginBottom: '-14px' }}>
          <Modal.Content>
            <Header as='h3'>
              Wallet Balance
              <Header.Subheader style={{ paddingTop: '9px' }}>
                <Icon name='rupee' fitted color='red' size='big' />
                <b style={{ paddingLeft: '6px', fontSize: '18px' }} > {walletStates.walletBalance} </b>
              </Header.Subheader>
            </Header>
          </Modal.Content>
          <Divider />

          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input fluid
                    icon="rupee" iconPosition='left'
                    label='Topup Wallet'
                    name="walletAmount"
                    value={state.walletAmount}
                    onChange={(e) => changeHandler(e)}
                    placeholder='Enter Amount'
                    title="Minimum 100, Maximum 10000"
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <Form.Input fluid
                    label='Remark (Optional)'
                    name="title"
                    value={state.title}
                    onChange={(e) => changeHandler(e)}
                    placeholder='Remark'
                    title="Minimum 100, Maximum 10000"
                  />
                </Form.Field>
              </Form.Group>

            </Form>
            <br />

            <Header.Subheader> Recommended</Header.Subheader> <br />
            {[{ label: '500', icon: 'rupee', value: 500 },
            { label: '2,500', icon: 'rupee', value: 2500 },
            { label: '5,000', icon: 'rupee', value: 5000 }
            ].map((item, index) => {
              return <Button key={index} basic style={{ marginRight: '15px' }}
                onClick={() => { setState((pre) => ({ ...pre, walletAmount: item.value })) }}
              ><Icon name='rupee' />{item.label}
              </Button>
            })}

          </Modal.Content>
          <Divider />
          <Button floated style={{ marginLeft: '24%' }}
            positive
            disabled={state.walletAmount ? false : true}
            onClick={() => ProceedToPayBtn()}
          >PROCEED TO TOPUP</Button>
        </Segment>
      </Modal>
    </>
  )
}
export default AddWalletPayment;