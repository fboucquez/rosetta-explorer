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
import MetadataView from '@components/basic/MetadataView';
import BlockIdentifierView, { BlockIdentifierParams } from '@components/block/BlockIdentifierView';
import TransactionView from '@components/transaction/TransactionView';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BlockResponse } from 'rosetta-client-typescript';
export default function BlockPage(props: BlockIdentifierParams & { blockResponse?: BlockResponse }) {
    const block = props.blockResponse?.block;
    if (!block) {
        return <Loading />;
    }
    const index = block?.block_identifier.index;
    return (
        <>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <h1>Block {index}</h1>
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
            {block.metadata && (
                <Row className="bg-white border mb-3 pb-3 pt-3">
                    <Col>
                        <MetadataView metadata={block.metadata} />
                    </Col>
                </Row>
            )}
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <h2>{block.transactions.length || 0} Transactions</h2>
                <Container>
                    {block.transactions.map((transaction) => {
                        const identifier = transaction.transaction_identifier;
                        if (!identifier) {
                            return <div key={index}>EMPTY</div>;
                        }
                        return (
                            <Row key={identifier.hash} className="border-bottom pt-2 pb-2">
                                <Col>
                                    <TransactionView
                                        blockchain={props.blockchain}
                                        network={props.network}
                                        index={block.block_identifier.index}
                                        hash={identifier.hash}
                                        transaction={transaction}
                                    />
                                </Col>
                            </Row>
                        );
                    })}
                </Container>
            </Row>
            <MetadataView metadata={block.metadata} />
        </>
    );
}
