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
import { Col } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';
import styles from './BlockCard.module.scss';

export default function BlockCard(props: { block?: BlockRowInformation } & NetworkIdentifier) {
    const block = props.block;
    if (!block) {
        return <Loading />;
    }

    return (
        <>
            <Col sm={4}>
                <div className={styles.blockBadge}>Bk</div>
                <div className={styles.blockHeight}>
                    <BlockIdentifierView blockchain={props.blockchain} network={props.network} index={block.index} />
                </div>
                <div className={styles.blockTimestamp}>
                    <small className="text-muted">
                        <DateTime timestamp={block.timestamp} />
                    </small>
                </div>
            </Col>
            <Col sm={6} className="text-truncate">
                {block.miner && (
                    <div>
                        <div>
                            Miner <AccountIdentifierView blockchain={props.blockchain} network={props.network} address={block.miner} />
                        </div>
                        <div>
                            <small className="text-muted">{block.transactionsCount} txns</small>
                        </div>
                    </div>
                )}
            </Col>
            <Col sm={2} className="me-auto">
                {block.rewardAmount && <AmountView amount={block.rewardAmount} title="Block Reward" />}
            </Col>
        </>
    );
}
