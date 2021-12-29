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
import { rosettaClientFactory } from '@components/basic/GlobalContext';
import { Utils } from '@services/Utils';
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { Button, Form, FormControl, InputGroup, Toast, ToastContainer } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';

export default function Search(props: NetworkIdentifier) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchError, setSearchError] = useState('');
    const router = useRouter();
    const rosettaRestClientFactory = rosettaClientFactory.get(props.blockchain);
    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const lowerCaseTerm = searchTerm.toLowerCase();
        if (Utils.isTransactionHash(lowerCaseTerm)) {
            try {
                const transactions = await rosettaRestClientFactory.search().searchTransactions({
                    network_identifier: props,
                    transaction_identifier: {
                        hash: lowerCaseTerm,
                    },
                });
                const transaction = transactions.transactions.find((t) => t.transaction.transaction_identifier.hash === lowerCaseTerm);
                if (transaction) {
                    return router.push(
                        `/networks/${props.blockchain}/${props.network}/block/${transaction.block_identifier.index}/transaction/${lowerCaseTerm}`
                    );
                }
                setSearchError(`Transaction with hash ${lowerCaseTerm} not found!`);
            } catch (e: unknown) {
                setSearchError(`Cannot search transaction. Error: ${Utils.getMessage(e)}`);
            }
        } else if (Utils.isAddress(lowerCaseTerm)) {
            return router.push(`/networks/${props.blockchain}/${props.network}/account/${lowerCaseTerm}`);
        } else if (parseInt(lowerCaseTerm)) {
            return router.push(`/networks/${props.blockchain}/${props.network}/block/${lowerCaseTerm}`);
        } else {
            setSearchError('Entered value is not a block number, address or transaction hash!');
        }
    };
    return (
        <>
            <ToastContainer className="m-3 position-absolute" position="top-center" style={{ zIndex: 1000 }}>
                <Toast onClose={() => setSearchError('')} show={!!searchError} delay={3000} autohide>
                    <Toast.Header>
                        <strong>Error</strong>
                    </Toast.Header>
                    <Toast.Body>{searchError}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Form className="d-flex" onSubmit={onSubmit}>
                <InputGroup>
                    <Button type="submit" variant="outline-light">
                        <i className="bi bi-search" />
                    </Button>
                    <FormControl
                        size="sm"
                        style={{ minWidth: '280px' }}
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by Address / Txn Hash / Block"
                        className="me-3"
                        aria-label="Search"
                    />
                </InputGroup>
            </Form>
        </>
    );
}
