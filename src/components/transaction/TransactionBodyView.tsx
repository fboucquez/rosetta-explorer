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
import Loading from '@components/basic/Loading';
import MetadataView from '@components/basic/MetadataView';
import { TransactionIdentifierParams } from '@components/transaction/TransactionIdentifierView';
import React from 'react';
import { Transaction } from 'rosetta-client-typescript';

export default function TransactionBodyView(props: { transaction?: Transaction } & TransactionIdentifierParams) {
    const transaction = props.transaction;
    if (!transaction) {
        return <Loading />;
    }
    return (
        <div>
            <h4 className="pt-3">Operations</h4>
            <ul>
                {transaction.operations.map((operation) => (
                    <li key={operation.operation_identifier.index}>
                        <span>{operation.type}</span> <span>{operation.status}</span>{' '}
                        {operation.account && (
                            <AccountIdentifierView
                                blockchain={props.blockchain}
                                network={props.network}
                                address={operation.account.address}
                            />
                        )}{' '}
                        <AmountView amount={operation.amount} />
                        <MetadataView metadata={operation.metadata} />
                    </li>
                ))}
            </ul>
            <MetadataView metadata={transaction.metadata} />
        </div>
    );
}
