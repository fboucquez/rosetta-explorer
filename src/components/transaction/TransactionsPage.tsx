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
import AccountIdentifierView from '@components/account/AccountIdentifierView';
import AmountView from '@components/basic/AmountView';
import DateTime from '@components/basic/DateTime';
import Loading from '@components/basic/Loading';
import BlockIdentifierView from '@components/block/BlockIdentifierView';
import TransactionIdentifierView from '@components/transaction/TransactionIdentifierView';
import { TransactionRowInformation } from '@services/TransactionUtils';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';

export default function TransactionsPage(props: NetworkIdentifier & { transactions?: TransactionRowInformation[] }) {
    if (!props.transactions) {
        return <Loading />;
    }
    return (
        <>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <h1>Transactions</h1>
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <div>
                        <Table hover style={{ tableLayout: 'fixed' }}>
                            <thead>
                                <tr>
                                    <th>Hash</th>
                                    <th>Block</th>
                                    <th>Timestamp</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.transactions.map((row) => {
                                    return (
                                        <tr key={row.hash}>
                                            <td className="text-truncate">
                                                <TransactionIdentifierView
                                                    blockchain={props.blockchain}
                                                    network={props.network}
                                                    index={row.index}
                                                    hash={row.hash}
                                                />
                                            </td>
                                            <td>
                                                <BlockIdentifierView
                                                    blockchain={props.blockchain}
                                                    network={props.network}
                                                    index={row.index}
                                                />
                                            </td>
                                            <td>
                                                <DateTime timestamp={row.timestamp} />
                                            </td>
                                            <td className="text-truncate">
                                                {row.from && (
                                                    <AccountIdentifierView
                                                        blockchain={props.blockchain}
                                                        network={props.network}
                                                        address={row.from}
                                                    />
                                                )}
                                            </td>
                                            <td className="text-truncate">
                                                {row.to && (
                                                    <AccountIdentifierView
                                                        blockchain={props.blockchain}
                                                        network={props.network}
                                                        address={row.to}
                                                    />
                                                )}
                                            </td>
                                            <td className="text-end">
                                                <AmountView amount={row.amount} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </>
    );
}
