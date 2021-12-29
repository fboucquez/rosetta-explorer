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
import React from 'react';
import { NetworkIdentifier, TransactionIdentifier } from 'rosetta-client-typescript';

export type TransactionIdentifierParams = NetworkIdentifier & TransactionIdentifier & { index: number };

export default function TransactionIdentifierView(props: TransactionIdentifierParams) {
    if (!props) {
        return <span />;
    }
    return (
        <a href={`/networks/${props.blockchain}/${props.network}/block/${props.index}/transaction/${props.hash}`}>
            <span title={props.hash}>{props.hash}</span>
        </a>
    );
}
