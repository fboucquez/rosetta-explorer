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
import MetadataView from '@components/basic/MetadataView';
import PeerIdentifierView from '@components/peer/PeerIdentifierView';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NetworkIdentifier, Peer as PeerData } from 'rosetta-client-typescript';

export default function PeerPage(props: NetworkIdentifier & { peer?: PeerData }) {
    const { peer } = props;
    if (!peer) {
        return <Loading />;
    }
    return (
        <Row className="bg-white rounded-3 border mb-3 pb-3 pt-3">
            <Col>
                <h2>
                    Peer{' '}
                    <PeerIdentifierView
                        blockchain={props.blockchain}
                        network={props.network}
                        peerId={peer.peer_id}
                        name={(peer.metadata as any)?.name}
                    />
                </h2>
                <MetadataView metadata={peer.metadata} />
            </Col>
        </Row>
    );
}
