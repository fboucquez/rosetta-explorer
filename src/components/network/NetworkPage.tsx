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
import BlockCard from '@components/block/BlockCard';
import BlockIdentifierView from '@components/block/BlockIdentifierView';
import PeerIdentifierView from '@components/peer/PeerIdentifierView';
import TransactionCard from '@components/transaction/TransactionCard';
import { BlockRowInformation } from '@services/BlockUtils';
import { TransactionRowInformation } from '@services/TransactionUtils';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { NetworkIdentifier, NetworkOptionsResponse, NetworkStatusResponse } from 'rosetta-client-typescript';

export default function NetworkPage(
    props: NetworkIdentifier & {
        networkStatus: NetworkStatusResponse;
        networkOptions: NetworkOptionsResponse;
        blocks: BlockRowInformation[] | undefined;
        transactions: TransactionRowInformation[] | undefined;
    }
) {
    const blocks = props.blocks;
    const transactions = props.transactions;
    const networkStatus = props.networkStatus;
    const networkOptions = props.networkOptions;

    if (!networkStatus) {
        return <Loading />;
    }

    return (
        <>
            <Row className="bg-white rounded border mb-3 pb-3 pt-3">
                <Col>
                    <h2>
                        Current Block{'  '}
                        <BlockIdentifierView
                            blockchain={props.blockchain}
                            network={props.network}
                            index={networkStatus.current_block_identifier.index}
                        />
                    </h2>
                    <DateTime timestamp={networkStatus.current_block_timestamp} />
                </Col>
            </Row>
            <Row className="gap-3">
                <Col className="bg-white rounded border pb-3 pt-3">
                    <h2>Latest Blocks</h2>
                    <Container className="p-0">
                        {blocks ? (
                            blocks.map((block, index) => {
                                return (
                                    <Row key={index} className="border-bottom pt-2 pb-2">
                                        <BlockCard blockchain={props.blockchain} network={props.network} block={block} />
                                    </Row>
                                );
                            })
                        ) : (
                            <Loading />
                        )}
                    </Container>
                    <div className="pt-3">
                        <Button href={`/networks/${props.blockchain}/${props.network}/blocks`}>View all blocks</Button>
                    </div>
                </Col>
                <Col className="bg-white border rounded pb-3 pt-3">
                    <h2>Latest Transactions</h2>
                    <Container className="p-0">
                        {transactions ? (
                            transactions.map((transaction, index) => {
                                return (
                                    <Row key={transaction.hash} className="border-bottom pt-2 pb-2">
                                        <TransactionCard
                                            blockchain={props.blockchain}
                                            network={props.network}
                                            index={transaction.index}
                                            hash={transaction.hash}
                                            transaction={transaction}
                                        />
                                    </Row>
                                );
                            })
                        ) : (
                            <Loading />
                        )}
                    </Container>
                    <div className="pt-3">
                        <Button href={`/networks/${props.blockchain}/${props.network}/transactions`}>View all transactions</Button>
                    </div>
                </Col>
            </Row>
            {networkStatus.peers.length > 0 && (
                <Row className="pt-3">
                    <Col className="bg-white border rounded pb-3 pt-3">
                        <h2>Peers</h2>
                        <Container className="p-0">
                            {networkStatus.peers.map((peer) => {
                                const identifier = peer.peer_id;

                                return (
                                    <Row key={identifier} className="border-bottom pt-2 pb-2">
                                        <PeerIdentifierView
                                            blockchain={props.blockchain}
                                            network={props.network}
                                            peerId={identifier}
                                            name={(peer.metadata as any)?.name}
                                        />
                                    </Row>
                                );
                            })}
                        </Container>
                    </Col>
                </Row>
            )}
        </>
    );
}
