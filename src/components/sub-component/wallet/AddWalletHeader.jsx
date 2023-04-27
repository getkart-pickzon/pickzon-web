import React, { useCallback, useEffect, useState } from "react";
import { Segment, Grid, Statistic, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";

import { POST } from "../../../Services";
import { getUser } from "../../../utils/common";
import { loader, stopLoader } from "../../../utils/sweetAlert";
import AddWalletPayment from "./AddWalletPayment";

const defaultObj = {
  walletBalance: '',
  walletCurrency: "INR"
};

const AddWalletHeader = ({ walletCallBack }) => {
  const [state, setState] = useState(defaultObj);
  const loggedUser = getUser();
  useEffect(() => {
    try {
      function callEffect() {
        callWalletApis();
      } callEffect();
    } catch (er) { console.log(er); };
  }, []);

  const callWalletApis = () => {
    try {
      fetchWalletBalance();
      walletCallBack();
    } catch (er) { console.log(er); };
  };

  const walletReduxDetails = useSelector((state) => state.walletReducers);
  useEffect(() => {
    try {
      function callEffect() {
        setState((pre) => ({
          ...pre,
          walletBalance: walletReduxDetails.walletBalance,
          walletCurrency: walletReduxDetails.currency
        }));
      } callEffect();
    } catch (er) { console.log(er); };
  }, [walletReduxDetails])

  const fetchWalletBalance = useCallback(async () => {
    try {
      loader();
      let { status, message, payload } = await POST("/payment/fetch-wallet-balance", { userId: loggedUser._id });
      stopLoader();
      if (status === 0) { return console.log(message); };
      // dispatch({ type: "wallet_data", payload: { walletBalance: parseFloat(payload.totalAmount).toFixed(2), currency: "INR" } });
      setState((pre) => ({
        ...pre,
        walletBalance: parseFloat(payload.totalAmount).toFixed(2),
        walletCurrency: payload.currency
      }));
    } catch (err) { return console.log(err); };
  });

  return (
    <>
      <Segment secondary >
        <Grid stackable textAlign='center'>
          <Grid.Row verticalAlign='middle'>
            <Grid.Column width={9} textAlign="left">
              <Statistic size="small" color="green">
                <Statistic.Value style={{ textAlign: 'left' }}>
                  {state.walletBalance > 1000 ?
                    <>
                      <Icon name='rupee' color='green' size="small" fitted flipped />
                      <span style={{ paddingLeft: '8px', fontSize: '28px' }}>{state.walletBalance}</span>
                    </>
                    : <>
                      <Icon name='rupee' color='red' size="small" fitted flipped />
                      <span style={{ paddingLeft: '8px', fontSize: '28px', color: "red" }}>{state.walletBalance}</span>
                    </>
                  }
                </Statistic.Value>
                <Statistic.Label style={{ color: 'gray' }}>CURRENT WALLET BALANCE</Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column width={7} textAlign='right'>
              <AddWalletPayment walletStates={state} addWalletCallBack={callWalletApis} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  )
}
export default AddWalletHeader;