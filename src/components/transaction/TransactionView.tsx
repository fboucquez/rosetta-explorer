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
import Loading from '@components/basic/Loading';
import TransactionBodyView from '@components/transaction/TransactionBodyView';
import TransactionIdentifierView, { TransactionIdentifierParams } from '@components/transaction/TransactionIdentifierView';
import { Transaction } from 'rosetta-client-typescript';

export default function TransactionView(props: { transaction?: Transaction } & TransactionIdentifierParams) {
    const transaction = props.transaction;
    if (!transaction) {
        return <Loading />;
    }
    return (
        <div>
            <h3>
                Transaction Hash{' '}
                <TransactionIdentifierView
                    blockchain={props.blockchain}
                    network={props.network}
                    index={props.index}
                    hash={transaction.transaction_identifier.hash}
                />
            </h3>
            <TransactionBodyView
                transaction={transaction}
                hash={props.hash}
                index={props.index}
                blockchain={props.blockchain}
                network={props.network}
            />
        </div>
    );
}
