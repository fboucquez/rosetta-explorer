/*
 * Copyright 2022 Fernando Boucquez
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { AccountIdentifierParams } from '@components/account/AccountIdentifierView';
import AmountView from '@components/basic/AmountView';
import MetadataView from '@components/basic/MetadataView';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AccountBalanceResponse, AccountCoinsResponse } from 'rosetta-client-typescript';

export default function AccountPage(
    props: AccountIdentifierParams & { accountBalance?: AccountBalanceResponse; accountCoins?: AccountCoinsResponse }
) {
    const { accountBalance, accountCoins } = props;

    return (
        <>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <h2>Address {props.address}</h2>
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    {accountBalance && (
                        <div>
                            <h3>Balances</h3>
                            {accountBalance.balances.map((balance) => {
                                return (
                                    <div key={balance.currency.symbol} className="pb-3">
                                        <AmountView amount={balance} />
                                        <MetadataView metadata={balance.metadata} />
                                    </div>
                                );
                            })}
                            <MetadataView metadata={accountBalance.metadata} />
                        </div>
                    )}
                    {accountCoins && (
                        <div>
                            <h3>Coins</h3>
                            {accountCoins.coins.map((coin) => {
                                return (
                                    <div key={coin.coin_identifier.identifier}>
                                        <AmountView amount={coin.amount} />
                                    </div>
                                );
                            })}
                            <MetadataView metadata={accountCoins.metadata} />
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
}
