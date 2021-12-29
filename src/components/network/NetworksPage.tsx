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
import Background from '@components/layout/Background';
import { Copyright } from '@components/layout/Copyright';
import Link from 'next/link';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';
import styles from './NetworksPage.module.scss';

export default function NetworksPage({ networks }: { networks?: NetworkIdentifier[] }) {
    return (
        <Background>
            <Container>
                <Row>
                    <Col className={styles.hero}>
                        <h1>Rosetta Explorer</h1>
                        <p>Navigate any blockchain</p>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.networks}>
                        <p>Select your network:</p>
                        <ul>
                            {(networks || []).map((networkIdentifier) => (
                                <li key={`${networkIdentifier.blockchain}_${networkIdentifier.network}`}>
                                    <Link href={`/networks/${networkIdentifier.blockchain}/${networkIdentifier.network}`}>
                                        {networkIdentifier.blockchain + ' ' + networkIdentifier.network}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-3 mb-3">
                    <Col>
                        <Copyright />
                    </Col>
                </Row>
            </Container>
        </Background>
    );
}
