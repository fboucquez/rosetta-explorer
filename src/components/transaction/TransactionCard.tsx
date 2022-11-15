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
import TransactionIdentifierView, { TransactionIdentifierParams } from '@components/transaction/TransactionIdentifierView';
import { TransactionRowInformation } from '@services/TransactionUtils';
import { Col } from 'react-bootstrap';

export default function TransactionCard(props: { transaction?: TransactionRowInformation } & TransactionIdentifierParams) {
    const transaction = props.transaction;
    if (!transaction) {
        return <Loading />;
    }
    return (
        <>
            <Col sm={3}>
                <div>Tx</div>
                <div className="text-truncate">
                    <TransactionIdentifierView
                        blockchain={props.blockchain}
                        network={props.network}
                        index={props.index}
                        hash={transaction.hash}
                    />{' '}
                </div>
                <div>
                    <small className="text-muted">
                        <DateTime timestamp={transaction.timestamp} />
                    </small>
                </div>
            </Col>
            <Col sm={7}>
                {transaction.from && transaction.to && (
                    <div>
                        <div className="text-truncate">
                            From <AccountIdentifierView blockchain={props.blockchain} network={props.network} address={transaction.from} />
                        </div>
                        <div className="text-truncate">
                            To <AccountIdentifierView blockchain={props.blockchain} network={props.network} address={transaction.to} />
                        </div>
                    </div>
                )}
            </Col>
            <Col sm={2}>
                {transaction.amount && (
                    <div className="text-truncate">
                        <AmountView amount={transaction.amount} title="Amount" />
                    </div>
                )}
            </Col>
        </>
    );
}
