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
import DateTime from '@components/basic/DateTime';
import Loading from '@components/basic/Loading';
import BlockIdentifierView from '@components/block/BlockIdentifierView';
import TransactionBodyView from '@components/transaction/TransactionBodyView';
import TransactionIdentifierView, { TransactionIdentifierParams } from '@components/transaction/TransactionIdentifierView';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BlockResponse, Transaction } from 'rosetta-client-typescript';

export default function TransactionPage(props: TransactionIdentifierParams & { blockResponse?: BlockResponse; transaction?: Transaction }) {
    const transaction = props.transaction;
    const block = props?.blockResponse?.block;
    if (!transaction || !block) {
        return <Loading />;
    }
    const hash = transaction.transaction_identifier.hash;
    return (
        <>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <h3>
                        Transaction Hash{' '}
                        <TransactionIdentifierView
                            blockchain={props.blockchain}
                            network={props.network}
                            index={props.index}
                            hash={transaction.transaction_identifier.hash}
                        />
                    </h3>
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>Block Height:</Col>
                <Col>
                    <BlockIdentifierView blockchain={props.blockchain} network={props.network} index={props.index} />
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>Timestamp:</Col>
                <Col>
                    <DateTime timestamp={block.timestamp} />
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <TransactionBodyView
                        transaction={transaction}
                        blockchain={props.blockchain}
                        network={props.network}
                        index={block.block_identifier.index}
                        hash={hash}
                    />
                </Col>
            </Row>
        </>
    );
}
