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
import Brand from '@components/layout/Brand';
import styles from '@components/network/NetworksPage.module.scss';
import React from 'react';
import { Container, Navbar, Row } from 'react-bootstrap';
export default function GenericErrorPage({ message }: { message: string }) {
    return (
        <Background>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Brand />
                </Container>
            </Navbar>
            <Container>
                <Row>
                    <div className={styles.hero}>
                        <h1>Error</h1>
                        <p>{message}</p>
                    </div>
                </Row>
            </Container>
        </Background>
    );
}
