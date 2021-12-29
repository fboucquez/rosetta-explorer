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
import Search from '@components/layout/Search';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { NetworkIdentifier } from 'rosetta-client-typescript';
import { Copyright } from './Copyright';

export default function Explorer(props: NetworkIdentifier & { children?: ReactNode }) {
    return (
        <Background>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Brand />
                    <Search network={props.network} blockchain={props.blockchain} />
                </Container>
            </Navbar>
            <div className="hero">
                <Container className="gap-3">
                    <Row className="pt-3 pb-2">
                        <Col>
                            <h1 className="text-uppercase">
                                <Link href={`/networks/${props.blockchain}/${props.network}`}>
                                    {props.blockchain + ' - ' + props.network}
                                </Link>
                            </h1>
                        </Col>
                    </Row>
                    {props.children}
                    <Row className="mt-3 mb-3">
                        <Col>
                            <Copyright />
                        </Col>
                    </Row>
                </Container>
            </div>
        </Background>
    );
}
