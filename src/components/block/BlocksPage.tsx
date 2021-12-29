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
import { BlockRowInformation } from '@services/BlockUtils';
import React from 'react';
import { Col, Pagination, Row, Table } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';

export default function BlocksPage(
    props: NetworkIdentifier & { blocks?: BlockRowInformation[]; pageSize: number; currentBlock: number; maxBlock: number }
) {
    if (!props.blocks) {
        return <Loading />;
    }

    const totalPages = Math.ceil(props.maxBlock / props.pageSize);
    const pageIndex = Math.floor((props.maxBlock - props.currentBlock) / props.pageSize);

    const items = [
        <Pagination.First
            key="first"
            disabled={pageIndex == 0}
            href={`/networks/${props.blockchain}/${props.network}/blocks?fromBlock?pageNumber=1`}
        />,
        <Pagination.Prev
            key="prev"
            disabled={pageIndex == 0}
            href={`/networks/${props.blockchain}/${props.network}/blocks?fromBlock?pageNumber=${pageIndex}`}
        />,
        <Pagination.Item key={pageIndex} active={true}>
            {pageIndex + 1} of {totalPages} pages
        </Pagination.Item>,
        <Pagination.Next
            key="next"
            disabled={pageIndex == totalPages - 1}
            href={`/networks/${props.blockchain}/${props.network}/blocks?pageNumber=${pageIndex + 2}`}
        />,
        <Pagination.Last
            key="last"
            disabled={pageIndex == totalPages - 1}
            href={`/networks/${props.blockchain}/${props.network}/blocks?pageNumber=${totalPages}`}
        />,
    ];

    return (
        <>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <h1>Blocks</h1>
                </Col>
            </Row>
            <Row className="bg-white border mb-3 pb-3 pt-3">
                <Col>
                    <Pagination>{items}</Pagination>
                    <Table>
                        <thead>
                            <tr>
                                <th>Block</th>
                                <th>Timestamp</th>
                                <th>Txn</th>
                                <th>Miner</th>
                                <th>Reward</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.blocks.map((row) => {
                                return (
                                    <tr key={row.index}>
                                        <td>
                                            <BlockIdentifierView blockchain={props.blockchain} network={props.network} index={row.index} />
                                        </td>
                                        <td>
                                            <DateTime timestamp={row.timestamp} />
                                        </td>
                                        <td>{row.transactionsCount}</td>
                                        <td>
                                            {row.miner && (
                                                <AccountIdentifierView
                                                    blockchain={props.blockchain}
                                                    network={props.network}
                                                    address={row.miner}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <AmountView amount={row.rewardAmount} />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                    <Pagination>{items}</Pagination>
                </Col>
            </Row>
        </>
    );
}
