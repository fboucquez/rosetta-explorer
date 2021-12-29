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
import Explorer from '@components/layout/Explorer';
import styles from '@components/network/NetworksPage.module.scss';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';
export default function NetworkErrorPage(props: NetworkIdentifier & { message: string }) {
    return (
        <Explorer blockchain={props.blockchain} network={props.network}>
            <Row>
                <Col className={styles.hero}>
                    <h1>Error</h1>
                    <p>{props.message}</p>
                </Col>
            </Row>
        </Explorer>
    );
}
